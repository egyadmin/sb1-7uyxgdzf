import React, { useState } from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Plus, FileText } from 'lucide-react';
import { Document } from '../../../types/document';
import { formatCurrency } from '../../../utils/formatters';

interface Payment {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface SubcontractorPaymentsProps {
  document: Document;
  onAddPayment: (documentId: string, payment: Omit<Payment, 'id'>) => void;
  onUpdatePaymentStatus: (documentId: string, paymentId: string, status: Payment['status']) => void;
}

export const SubcontractorPayments: React.FC<SubcontractorPaymentsProps> = ({
  document,
  onAddPayment,
  onUpdatePaymentStatus,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: '',
    amount: 0,
    description: '',
  });

  const payments = document.metadata?.payments || [];
  const contractValue = document.metadata?.contractValue || 0;
  const totalPaid = payments.reduce((sum: number, payment: Payment) => 
    payment.status === 'approved' ? sum + payment.amount : sum, 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPayment(document.id, {
      ...newPayment,
      status: 'pending',
    });
    setNewPayment({ date: '', amount: 0, description: '' });
    setShowForm(false);
  };

  const getStatusClassName = (status: Payment['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">المستخلصات المالية</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مستخلص</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                التاريخ
              </label>
              <input
                type="date"
                value={newPayment.date}
                onChange={(e) => setNewPayment(prev => ({ ...prev, date: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                القيمة
              </label>
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف
              </label>
              <input
                type="text"
                value={newPayment.description}
                onChange={(e) => setNewPayment(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              حفظ
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div>
            <span>قيمة العقد: </span>
            <span className="font-medium">{formatCurrency(contractValue)}</span>
          </div>
          <div>
            <span>إجمالي المدفوعات: </span>
            <span className="font-medium">{formatCurrency(totalPaid)}</span>
          </div>
          <div>
            <span>المتبقي: </span>
            <span className="font-medium">{formatCurrency(contractValue - totalPaid)}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  القيمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الوصف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment: Payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <FormattedDate
                      value={payment.date}
                      year="numeric"
                      month="long"
                      day="numeric"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={payment.status}
                      onChange={(e) => onUpdatePaymentStatus(document.id, payment.id, e.target.value as Payment['status'])}
                      className={`px-2 py-1 rounded text-sm font-medium ${getStatusClassName(payment.status)}`}
                    >
                      <option value="pending">قيد المراجعة</option>
                      <option value="approved">تمت الموافقة</option>
                      <option value="rejected">مرفوض</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};