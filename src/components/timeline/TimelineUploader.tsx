import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader, AlertCircle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { TimelineData } from '../../types/timeline';
import { parseMPPFile } from '../../utils/mppParser';

interface TimelineUploaderProps {
  onDataLoaded: (data: TimelineData) => void;
}

export const TimelineUploader: React.FC<TimelineUploaderProps> = ({ onDataLoaded }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setUploadedFile(file);

    try {
      const data = await parseMPPFile(file);
      onDataLoaded(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل في معالجة الملف');
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-project': ['.mpp'],
      'application/x-project': ['.mpp'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <>
            <Loader className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-spin" />
            <p className="text-lg text-gray-600">جاري معالجة الملف...</p>
          </>
        ) : (
          <>
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600 mb-2">
              {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف MS Project هنا أو انقر للاختيار'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              الصيغ المدعومة: MPP (Microsoft Project)
            </p>
          </>
        )}

        {uploadedFile && !isProcessing && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-flex items-center">
            <FileText className="w-5 h-5 text-blue-500 ml-2" />
            <span className="text-blue-600">{uploadedFile.name}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 ml-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">تعليمات رفع ملف MS Project:</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-700 mr-4">
          <li>افتح المشروع في Microsoft Project</li>
          <li>تأكد من تحديث كافة البيانات والتواريخ</li>
          <li>احفظ الملف بصيغة MPP</li>
          <li>قم برفع الملف هنا</li>
        </ol>
        <p className="mt-4 text-sm text-blue-600">
          * سيتم استخراج كافة بيانات المشروع تلقائياً بما فيها المهام والتواريخ والعلاقات
        </p>
      </div>
    </div>
  );
};