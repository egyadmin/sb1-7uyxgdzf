```typescript
import { TimelineData } from '../../types/timeline';
import { processXERFile } from './xerProcessor';
import { processMPPFile } from './mppProcessor';

export async function processTimelineFile(file: File): Promise<TimelineData> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  try {
    switch (extension) {
      case 'xer':
        return await processXERFile(file);
      case 'mpp':
        return await processMPPFile(file);
      default:
        throw new Error('صيغة الملف غير مدعومة. يرجى استخدام ملفات XER أو MPP');
    }
  } catch (error) {
    console.error('Error processing timeline file:', error);
    throw new Error(error instanceof Error ? error.message : 'فشل في معالجة الملف');
  }
}

export function validateTimelineData(data: TimelineData): void {
  if (!data.activities || !Array.isArray(data.activities)) {
    throw new Error('بيانات الأنشطة غير صالحة');
  }

  if (!data.criticalPath || !Array.isArray(data.criticalPath)) {
    throw new Error('بيانات المسار الحرج غير صالحة');
  }

  // Validate each activity
  data.activities.forEach(activity => {
    if (!activity.id || !activity.name) {
      throw new Error('بيانات النشاط غير مكتملة');
    }
  });
}
```