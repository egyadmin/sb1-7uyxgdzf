```tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileSpreadsheet, Upload, AlertCircle } from 'lucide-react';
import { read, utils } from 'xlsx';
import { BudgetData } from '../../types/budget';

interface BudgetUploaderProps {
  onDataLoaded: (data: BudgetData) => void;
}

export const BudgetUploader: React.FC<BudgetUploaderProps> = ({ onDataLoaded }) => {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processExcelFile = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);

      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);

      const result: BudgetData = {
        summary: {},
        categories: {},
        details: [],
      };

      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet);

        switch (sheetName.toLowerCase()) {
          case 'summary':
            result.summary = processSummarySheet(data);
            break;
          case 'categories':
            result.categories = processCategoriesSheet(data);
            break;
          case 'details':
            result.details = processDetailsSheet(data);
            break;
        }
      });

      onDataLoaded(result);
    } catch (err) {
      setError('حدث خطأ أثناء معالجة الملف. يرجى التأكد من تنسيق الملف الصحيح.');
      console.error('Excel processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await processExcelFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <div className="animate-pulse">
            <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <p className="text-lg text-gray-600">جاري معالجة الملف...</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600 mb-2">
              {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف Excel هنا أو انقر للاختيار'}
            </p>
            <p className="text-sm text-gray-500">
              الصيغ المدعومة: XLSX, XLS
            </p>
          </>
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

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">تنسيق الملف المطلوب:</h3>
        <div className="space-y-2 text-blue-700">
          <p>يجب أن يحتوي الملف على الأوراق التالية:</p>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>Summary: ملخص الميزانية</li>
            <li>Categories: تصنيفات الميزانية</li>
            <li>Details: تفاصيل بنود الميزانية</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function processSummarySheet(data: any[]): Record<string, any> {
  const summary: Record<string, any> = {};
  data.forEach(row => {
    if (row.Category && row.Amount) {
      summary[row.Category] = row.Amount;
    }
  });
  return summary;
}

function processCategoriesSheet(data: any[]): Record<string, any> {
  const categories: Record<string, any> = {};
  data.forEach(row => {
    if (row.Category && row.Budget) {
      categories[row.Category] = {
        budget: row.Budget,
        spent: row.Spent || 0,
        remaining: row.Budget - (row.Spent || 0)
      };
    }
  });
  return categories;
}

function processDetailsSheet(data: any[]): any[] {
  return data.map(row => ({
    id: row.ID,
    category: row.Category,
    description: row.Description,
    unit: row.Unit,
    quantity: row.Quantity,
    unitPrice: row.UnitPrice,
    totalAmount: row.TotalAmount,
    notes: row.Notes
  }));
}
```