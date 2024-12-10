import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface InsuranceFormProps {
  projectId: string;
  onSubmit: (data: InsuranceData) => void;
}

export interface InsuranceData {
  policyNumber: string;
  insuranceCompany: string;
  insuranceType: string;
  startDate: string;
  endDate: string;
  amount: number;
  coverage: string;
  exclusions: string;
  file: File | null;
}

export const InsuranceForm: React.FC<InsuranceFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = useState<InsuranceData>({
    policyNumber: '',
    insuranceCompany: '',
    insuranceType: '',
    startDate: '',
    endDate: '',
    amount: 0,
    coverage: '',
    exclusions: '',
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
      alert('الرجاء اختيار ملف التأمين');
      return;
    }
    onSubmit(formData);
    setFormData({
      policyNumber: '',
      insuranceCompany: '',
      insuranceType: '',
      startDate: '',
      endDate: '',
      amount: 0,
      coverage: '',
      exclusions: '',
      file: null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">إضافة وثيقة تأمين جديدة</h3>
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
            {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت وثيقة التأمين هنا أو انقر للاختيار'}
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

        {/* Insurance Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم وثيقة التأمين
            </label>
            <input
              type="text"
              value={formData.policyNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل رقم وثيقة التأمين"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شركة التأمين
            </label>
            <input
              type="text"
              value={formData.insuranceCompany}
              onChange={(e) => setFormData(prev => ({ ...prev, insuranceCompany: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل اسم شركة التأمين"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع التأمين
            </label>
            <select
              value={formData.insuranceType}
              onChange={(e) => setFormData(prev => ({ ...prev, insuranceType: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">اختر نوع التأمين</option>
              <option value="general">تأمين المسؤولية العامة</option>
              <option value="property">تأمين الممتلكات</option>
              <option value="workers">تأمين العمالة</option>
              <option value="equipment">تأمين المعدات</option>
              <option value="professional">تأمين المسؤولية المهنية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ بدء التأمين
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
              تاريخ انتهاء التأمين
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
              قيمة التأمين (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تفاصيل التغطية التأمينية
            </label>
            <textarea
              value={formData.coverage}
              onChange={(e) => setFormData(prev => ({ ...prev, coverage: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل تفاصيل التغطية التأمينية"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاستثناءات
            </label>
            <textarea
              value={formData.exclusions}
              onChange={(e) => setFormData(prev => ({ ...prev, exclusions: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              placeholder="أدخل الاستثناءات (اختياري)"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          حفظ وثيقة التأمين
        </button>
      </form>
    </div>
  );
};