import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';

interface ContractFormProps {
  projectId: string;
  onSubmit: (data: ContractData) => void;
}

export interface ContractData {
  contractNumber: string;
  signDate: string;
  signingAuthority: string;
  totalValue: number;
  duration: number;
  file: File | null;
}

export const ContractForm: React.FC<ContractFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = React.useState<ContractData>({
    contractNumber: '',
    signDate: '',
    signingAuthority: '',
    totalValue: 0,
    duration: 0,
    file: null,
  });

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData(prev => ({ ...prev, file: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert('الرجاء اختيار ملف العقد');
      return;
    }
    onSubmit(formData);
    setFormData({
      contractNumber: '',
      signDate: '',
      signingAuthority: '',
      totalValue: 0,
      duration: 0,
      file: null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">إضافة عقد جديد</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600 mb-2">
            {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف العقد هنا أو انقر للاختيار'}
          </p>
          <p className="text-sm text-gray-500">
            الصيغ المدعومة: PDF, DOC, DOCX
          </p>
          {formData.file && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-flex items-center">
              <FileText className="w-5 h-5 text-blue-500 ml-2" />
              <span className="text-blue-600">{formData.file.name}</span>
            </div>
          )}
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم العقد
            </label>
            <input
              type="text"
              value={formData.contractNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, contractNumber: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل رقم العقد"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ التوقيع
            </label>
            <input
              type="date"
              value={formData.signDate}
              onChange={(e) => setFormData(prev => ({ ...prev, signDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الجهة الموقعة
            </label>
            <input
              type="text"
              value={formData.signingAuthority}
              onChange={(e) => setFormData(prev => ({ ...prev, signingAuthority: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل اسم الجهة الموقعة"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              القيمة الإجمالية (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.totalValue}
              onChange={(e) => setFormData(prev => ({ ...prev, totalValue: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مدة العقد (بالشهور)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              required
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          حفظ العقد
        </button>
      </form>
    </div>
  );
};