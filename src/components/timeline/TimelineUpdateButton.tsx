import React, { useRef, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface TimelineUpdateButtonProps {
  onFileSelected: (file: File) => void;
}

export const TimelineUpdateButton: React.FC<TimelineUpdateButtonProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['xer', 'xml', 'mpp'].includes(extension || '')) {
        setError('يرجى اختيار ملف بتنسيق XER, XML, أو MPP');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('حجم الملف يتجاوز الحد المسموح به (10 ميجابايت)');
        return;
      }

      setError(null);
      onFileSelected(file);
    }
    // Reset input value to allow selecting the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xer,.xml,.mpp"
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors w-full"
      >
        <Upload className="w-5 h-5 ml-2" />
        <span className="text-lg">تحديث الجدول الزمني</span>
      </button>

      {error && (
        <div className="mt-4 bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700 flex items-center">
            <AlertCircle className="w-5 h-5 ml-2" />
            {error}
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 ml-2" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">خطوات تحديث الجدول الزمني:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mr-4">
              <li>افتح برنامج Primavera P6 وحدد المشروع المراد تحديثه</li>
              <li>اختر من القائمة File > Export</li>
              <li>حدد تنسيق XER في نافذة التصدير</li>
              <li>تأكد من تحديد الخيارات التالية:
                <ul className="list-disc list-inside mr-6 mt-1 text-gray-500">
                  <li>Project Data</li>
                  <li>Resource Assignments</li>
                  <li>Activity Data</li>
                  <li>Relationships</li>
                  <li>Baseline Data</li>
                </ul>
              </li>
              <li>اختر مكان حفظ الملف واضغط على Export</li>
              <li>اختر الملف المصدر هنا للتحديث</li>
            </ol>
          </div>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg">
          <p className="text-blue-700">
            <span className="font-semibold">ملاحظة هامة:</span> سيتم الاحتفاظ بالبيانات التالية من الجدول الحالي:
          </p>
          <ul className="list-disc list-inside mr-6 mt-2 text-blue-600">
            <li>نسب الإنجاز الفعلية للأنشطة</li>
            <li>التكاليف الفعلية المسجلة</li>
            <li>الملاحظات والتعليقات</li>
          </ul>
        </div>
      </div>
    </div>
  );
};