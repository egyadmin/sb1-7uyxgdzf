import { TimelineData, Activity } from '../types/timeline';
import { parseString } from 'xml2js';
import JSZip from 'jszip';

export async function parseMPPFile(file: File): Promise<TimelineData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(arrayBuffer);
    
    const projectXml = zipContents.file('project.xml');
    if (!projectXml) {
      throw new Error('ملف MPP غير صالح: لم يتم العثور على project.xml');
    }

    const xmlContent = await projectXml.async('text');
    return await parseProjectXml(xmlContent);
  } catch (error) {
    console.error('Error parsing MPP file:', error);
    throw new Error('فشل في معالجة ملف MPP. يرجى التأكد من صحة الملف.');
  }
}

async function parseProjectXml(xmlContent: string): Promise<TimelineData> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (err, result) => {
      if (err) {
        reject(new Error('فشل في تحليل محتوى XML'));
        return;
      }

      try {
        const project = result.Project;
        const tasks = project.Tasks[0].Task || [];
        const activities: Activity[] = [];
        const criticalPath: string[] = [];

        tasks.forEach((task: any) => {
          if (task.Name && !task.Summary) {
            const activity: Activity = {
              id: task.ID[0],
              name: task.Name[0],
              startDate: task.Start[0],
              endDate: task.Finish[0],
              progress: parseFloat(task.PercentComplete[0]) || 0,
              critical: task.Critical[0] === 'true',
              dependencies: task.PredecessorLink?.map((link: any) => link.PredecessorUID[0]) || [],
              status: determineStatus(task),
              duration: parseInt(task.Duration[0]) || 0,
              baselineStart: task.BaselineStart?.[0],
              baselineEnd: task.BaselineFinish?.[0],
              baselineProgress: parseFloat(task.BaselineWork?.[0]) || 0,
              earnedValue: parseFloat(task.BCWP?.[0]) || 0,
              plannedValue: parseFloat(task.BCWS?.[0]) || 0,
              actualCost: parseFloat(task.ACWP?.[0]) || 0,
            };

            activities.push(activity);
            if (activity.critical) {
              criticalPath.push(activity.id);
            }
          }
        });

        resolve({
          activities,
          criticalPath,
          projectName: project.Name?.[0],
          projectCode: project.ProjectCode?.[0],
          dataDate: project.StatusDate?.[0],
        });
      } catch (error) {
        reject(new Error('فشل في معالجة بيانات المشروع'));
      }
    });
  });
}

function determineStatus(task: any): Activity['status'] {
  const percentComplete = parseFloat(task.PercentComplete[0]) || 0;
  const actualStart = task.ActualStart?.[0];
  
  if (percentComplete === 100) return 'completed';
  if (actualStart && percentComplete > 0) return 'inProgress';
  if (task.ConstraintType?.[0] === '4') return 'delayed';
  return 'planned';
}