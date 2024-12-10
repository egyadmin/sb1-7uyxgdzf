import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface VariationOrderFormProps {
  projectId: string;
  onSubmit: (data: VariationOrderData) => void;
}

export interface VariationOrderData {
  orderNumber: string;
  issueDate: string;
  description: string;
  reason: string;
  additionalCost: number;
  file: File | null;
}

export const VariationOrderForm: React.FC<VariationOrderFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = useState<VariationOrderData>({
    orderNumber: '',
    issueDate: '',
    description: '',
    reason: '',
    additionalCost: 0,
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
      alert('الرجاء اختيار ملف البند المستحدث');
      return;
    }
    onSubmit(formData);
    setFormData({
      orderNumber: '',
      issueDate: '',
      description: '',
      reason: '',
      additionalCost: 0,
      file: null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">إضافة بند مستحدث جديد</h3>
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
            {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف البند المستحدث هنا أو انقر للاختيار'}
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

        {/* Variation Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم البند المستحدث
            </label>
            <input
              type="text"
              value={formData.orderNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل رقم البند المستحدث"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ الإصدار
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف التغيير
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل وصف التغيير المطلوب"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              سبب التغيير
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل سبب التغيير"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التكلفة الإضافية (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.additionalCost}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalCost: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          حفظ البند المستحدث
        </button>
      </form>
    </div>
  );
};