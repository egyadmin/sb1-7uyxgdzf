```typescript
import { TimelineData, Activity } from '../../types/timeline';
import { parseString } from 'xml2js';
import JSZip from 'jszip';

export async function processMPPFile(file: File): Promise<TimelineData> {
  try {
    const buffer = await file.arrayBuffer();
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(buffer);
    
    const projectXml = zipContents.file('project.xml');
    if (!projectXml) {
      throw new Error('ملف MPP غير صالح: لم يتم العثور على project.xml');
    }

    const xmlContent = await projectXml.async('text');
    return await parseMPPContent(xmlContent);
  } catch (error) {
    console.error('Error processing MPP file:', error);
    throw new Error('فشل في معالجة ملف MPP. يرجى التأكد من صحة الملف.');
  }
}

function parseMPPContent(xmlContent: string): Promise<TimelineData> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (err, result) => {
      if (err) {
        reject(new Error('فشل في تحليل محتوى XML'));
        return;
      }

      try {
        const project = result.Project;
        const activities = extractActivities(project);
        const projectInfo = extractProjectInfo(project);

        resolve({
          activities,
          criticalPath: activities.filter(a => a.critical).map(a => a.id),
          ...projectInfo
        });
      } catch (error) {
        reject(new Error('فشل في معالجة بيانات المشروع'));
      }
    });
  });
}

function extractActivities(project: any): Activity[] {
  const tasks = project.Tasks?.[0]?.Task || [];
  return tasks
    .filter((task: any) => task.Name && !task.Summary)
    .map((task: any) => ({
      id: task.ID[0],
      name: task.Name[0],
      startDate: task.Start[0],
      endDate: task.Finish[0],
      progress: parseFloat(task.PercentComplete[0]) || 0,
      critical: task.Critical?.[0] === 'true',
      dependencies: task.PredecessorLink?.map((link: any) => link.PredecessorUID[0]) || [],
      status: determineTaskStatus(task),
      duration: parseInt(task.Duration[0]) || 0,
      baselineStart: task.BaselineStart?.[0],
      baselineEnd: task.BaselineFinish?.[0],
      baselineProgress: parseFloat(task.BaselineWork?.[0]) || 0,
      totalFloat: parseFloat(task.TotalSlack?.[0]) || 0,
      freeFloat: parseFloat(task.FreeSlack?.[0]) || 0,
      earnedValue: parseFloat(task.BCWP?.[0]) || 0,
      plannedValue: parseFloat(task.BCWS?.[0]) || 0,
      actualCost: parseFloat(task.ACWP?.[0]) || 0,
    }));
}

function determineTaskStatus(task: any): Activity['status'] {
  const percentComplete = parseFloat(task.PercentComplete[0]) || 0;
  const actualStart = task.ActualStart?.[0];
  
  if (percentComplete === 100) return 'completed';
  if (actualStart && percentComplete > 0) return 'inProgress';
  if (task.ConstraintType?.[0] === '4') return 'delayed';
  return 'planned';
}

function extractProjectInfo(project: any): Partial<TimelineData> {
  return {
    projectName: project.Name?.[0],
    projectCode: project.ProjectCode?.[0],
    dataDate: project.StatusDate?.[0],
    projectManager: project.Manager?.[0],
  };
}
```