import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { TimelineData } from '../../types/timeline';

interface TimelineParserProps {
  onDataParsed: (data: TimelineData) => void;
}

export const TimelineParser: React.FC<TimelineParserProps> = ({ onDataParsed }) => {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        // Read file content
        const text = await file.text();
        const lines = text.split('\n');
        
        // Parse XER file structure
        const activities: any[] = [];
        let currentSection = '';
        
        for (const line of lines) {
          if (line.startsWith('%T')) {
            currentSection = line.split('\t')[1];
            continue;
          }

          if (line.startsWith('%F') || line.startsWith('%R')) {
            const fields = line.split('\t');
            
            if (currentSection === 'TASK' && line.startsWith('%R')) {
              activities.push({
                id: fields[1],
                name: fields[15] || 'Unnamed Activity',
                startDate: fields[29],
                endDate: fields[30],
                progress: parseInt(fields[16]) || 0,
                critical: fields[13] === 'TK_Critical',
                dependencies: [],
                status: fields[12],
                duration: parseInt(fields[17]) || 0,
              });
            }
          }
        }

        onDataParsed({
          activities,
          criticalPath: activities
            .filter(activity => activity.critical)
            .map(activity => activity.id)
        });
        
        setError(null);
      } catch (err) {
        setError('Error parsing XER file. Please ensure it is a valid Primavera P6 export file.');
      }
    }
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.xer'],
      'text/xml': ['.xml'],
      'application/xml': ['.xml']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-600 mb-2">
          {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف الجدول الزمني هنا أو انقر للاختيار'}
        </p>
        <p className="text-sm text-gray-500">
          الصيغ المدعومة: XER (Primavera P6), XML
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};