import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { CircleDot, CheckCircle2, XCircle } from 'lucide-react';
import { Document } from '../../../types/document';
import { formatCurrency } from '../../../utils/formatters';

interface SubcontractorStatusProps {
  document: Document;
  onStatusChange: (documentId: string, status: 'active' | 'completed' | 'suspended') => void;
  onProgressUpdate: (documentId: string, progress: number) => void;
  onPaymentUpdate: (documentId: string, paidAmount: number) => void;
}

export const SubcontractorStatus: React.FC<SubcontractorStatusProps> = ({
  document,
  onStatusChange,
  onProgressUpdate,
  onPaymentUpdate,
}) => {
  const metadata = document.metadata || {};
  const contractValue = metadata.contractValue || 0;
  const paidAmount = metadata.paidAmount || 0;
  const progress = metadata.progress || 0;
  const status = metadata.status || 'active';

  const remainingAmount = contractValue - paidAmount;
  const progressPercentage = (paidAmount / contractValue) * 100;

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    suspended: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    active: <CircleDot className="w-4 h-4" />,
    completed: <CheckCircle2 className="w-4 h-4" />,
    suspended: <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contract Status */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">حالة العقد</h4>
          <div className="flex items-center space-x-4">
            <select
              value={status}
              onChange={(e) => onStatusChange(document.id, e.target.value as any)}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status as keyof typeof statusColors]}`}
            >
              <option value="active">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
              <option value="suspended">متوقف</option>
            </select>
            <span>{statusIcons[status as keyof typeof statusIcons]}</span>
          </div>
        </div>

        {/* Technical Progress */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">نسبة الإنجاز الفني</h4>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <input
              type="number"
              value={progress}
              onChange={(e) => onProgressUpdate(document.id, Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
              min="0"
              max="100"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>

        {/* Financial Progress */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">التكاليف المصروفة</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>القيمة المدفوعة:</span>
              <span className="font-medium">{formatCurrency(paidAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>المتبقي:</span>
              <span className="font-medium">{formatCurrency(remainingAmount)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                <FormattedNumber 
                  value={progressPercentage} 
                  maximumFractionDigits={1}
                />%
              </span>
            </div>
            <div className="mt-2">
              <input
                type="number"
                placeholder="أدخل قيمة الدفعة"
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                onChange={(e) => onPaymentUpdate(document.id, Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};