import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface InvoiceFormProps {
  projectId: string;
  onSubmit: (data: InvoiceData) => void;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  periodStart: string;
  periodEnd: string;
  totalAmount: number;
  retentionAmount: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  ownerEntity: string;
  workDescription: string;
  file: File | null;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNumber: '',
    issueDate: '',
    periodStart: '',
    periodEnd: '',
    totalAmount: 0,
    retentionAmount: 0,
    netAmount: 0,
    status: 'pending',
    ownerEntity: '',
    workDescription: '',
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
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert('الرجاء اختيار ملف المستخلص');
      return;
    }
    onSubmit(formData);
    setFormData({
      invoiceNumber: '',
      issueDate: '',
      periodStart: '',
      periodEnd: '',
      totalAmount: 0,
      retentionAmount: 0,
      netAmount: 0,
      status: 'pending',
      ownerEntity: '',
      workDescription: '',
      file: null,
    });
  };

  const calculateNetAmount = (total: number, retention: number) => {
    return total - retention;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">إضافة مستخلص جديد</h3>
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
            {isDragActive ? 'أفلت الملف هنا' : 'اسحب وأفلت ملف المستخلص هنا أو انقر للاختيار'}
          </p>
          <p className="text-sm text-gray-500">
            الصيغ المدعومة: PDF, DOC, DOCX, XLS, XLSX
          </p>
          {formData.file && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-flex items-center">
              <FileText className="w-5 h-5 text-blue-500 ml-2" />
              <span className="text-blue-600">{formData.file.name}</span>
            </div>
          )}
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم المستخلص
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل رقم المستخلص"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ المستخلص
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فترة العمل من
            </label>
            <input
              type="date"
              value={formData.periodStart}
              onChange={(e) => setFormData(prev => ({ ...prev, periodStart: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              فترة العمل إلى
            </label>
            <input
              type="date"
              value={formData.periodEnd}
              onChange={(e) => setFormData(prev => ({ ...prev, periodEnd: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              القيمة الإجمالية (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.totalAmount}
              onChange={(e) => {
                const total = Number(e.target.value);
                setFormData(prev => ({
                  ...prev,
                  totalAmount: total,
                  netAmount: calculateNetAmount(total, prev.retentionAmount)
                }));
              }}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              قيمة المستقطع (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.retentionAmount}
              onChange={(e) => {
                const retention = Number(e.target.value);
                setFormData(prev => ({
                  ...prev,
                  retentionAmount: retention,
                  netAmount: calculateNetAmount(prev.totalAmount, retention)
                }));
              }}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صافي القيمة (ريال سعودي)
            </label>
            <input
              type="number"
              value={formData.netAmount}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              جهة المالك
            </label>
            <input
              type="text"
              value={formData.ownerEntity}
              onChange={(e) => setFormData(prev => ({ ...prev, ownerEntity: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="أدخل اسم جهة المالك"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تفاصيل العمل المنجز
            </label>
            <textarea
              value={formData.workDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, workDescription: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
              placeholder="أدخل وصف الأعمال المنجزة"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          حفظ المستخلص
        </button>
      </form>
    </div>
  );
};