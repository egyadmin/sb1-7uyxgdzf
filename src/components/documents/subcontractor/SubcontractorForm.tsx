import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface SubcontractorFormProps {
  projectId: string;
  onSubmit: (data: SubcontractorData) => void;
}

export interface SubcontractorData {
  contractNumber: string;
  subcontractorName: string;
  workType: string;
  startDate: string;
  endDate: string;
  contractValue: number;
  scopeOfWork: string;
  paymentTerms: string;
  file: File | null;
}

export const SubcontractorForm: React.FC<SubcontractorFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = useState<SubcontractorData>({
    contractNumber: '',
    subcontractorName: '',
    workType: '',
    startDate: '',
    endDate: '',
    contractValue: 0,
    scopeOfWork: '',
    paymentTerms: '',
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
      subcontractorName: '',
      workType: '',
      startDate: '',
      endDate: '',
      contractValue: 0,
      scopeOfWork: '',
      paymentTerms: '',
      file: null,
    });
  };

  const workTypes = [
    'أعمال الحفر',
    'التشطيبات',
    'الكهرباء',
    'السباكة',
    'التكييف',
    'الأعمال المدنية',
    'البنية التحتية',
    'أعمال الطرق',
    'أخرى'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">إضافة عقد مقاول باطن جديد</h3>
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
              اسم المقاول الباطن
            </label>
            <input
              type="text"
              value={formData.subcontractorName}
              onChange={(e) => setFormData(prev => ({ ...prev, subcontractorName: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل اسم المقاول الباطن"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع العمل
            </label>
            <select
              value={formData.workType}
              onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">اختر نوع العمل</option>
              {workTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ بدء العقد
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ انتهاء العقد
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              قيمة العقد (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.contractValue}
              onChange={(e) => setFormData(prev => ({ ...prev, contractValue: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نطاق العمل
            </label>
            <textarea
              value={formData.scopeOfWork}
              onChange={(e) => setFormData(prev => ({ ...prev, scopeOfWork: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل وصف نطاق العمل"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شروط الدفع
            </label>
            <textarea
              value={formData.paymentTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل شروط الدفع وجدول الدفعات"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          حفظ عقد المقاول الباطن
        </button>
      </form>
    </div>
  );
};