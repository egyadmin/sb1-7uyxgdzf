import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { FileText, Download, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../../stores/documentStore';
import { formatCurrency } from '../../../utils/formatters';
import { Document } from '../../../types/document';

interface InvoiceListProps {
  projectId: string;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ projectId }) => {
  const documents = useDocumentStore(
    (state) => state.getProjectDocuments(projectId).filter(doc => doc.type === 'invoice')
  );
  const removeDocument = useDocumentStore((state) => state.removeDocument);

  const totalAmount = documents.reduce((sum, doc) => sum + (doc.metadata?.totalAmount || 0), 0);
  const totalRetention = documents.reduce((sum, doc) => sum + (doc.metadata?.retentionAmount || 0), 0);
  const totalNet = documents.reduce((sum, doc) => sum + (doc.metadata?.netAmount || 0), 0);

  const handleDownload = (doc: Document) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          <FormattedMessage id="invoice.noDocuments" defaultMessage="لا توجد مستخلصات مرفوعة" />
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">إجمالي المستخلصات</p>
            <p className="text-xl font-semibold text-blue-600">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">إجمالي المستقطع</p>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(totalRetention)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">صافي المستحق</p>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(totalNet)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                رقم المستخلص
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                التاريخ
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الفترة
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                القيمة
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الحالة
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 ml-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.metadata?.invoiceNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <FormattedDate
                    value={doc.metadata?.issueDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <FormattedDate
                    value={doc.metadata?.periodStart}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                  {' - '}
                  <FormattedDate
                    value={doc.metadata?.periodEnd}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatCurrency(doc.metadata?.totalAmount || 0)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(doc.metadata?.status || 'pending')
                  }`}>
                    {doc.metadata?.status === 'approved' && 'تمت الموافقة'}
                    {doc.metadata?.status === 'rejected' && 'مرفوض'}
                    {doc.metadata?.status === 'pending' && 'قيد المراجعة'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="text-blue-600 hover:text-blue-900"
                      title="تحميل"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-600 hover:text-red-900"
                      title="حذف"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};