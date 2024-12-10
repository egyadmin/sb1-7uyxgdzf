import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Document } from '../../../types/document';
import { formatCurrency } from '../../../utils/formatters';

interface InsuranceDetailsProps {
  document: Document;
}

export const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ document }) => {
  const metadata = document.metadata || {};
  const endDate = metadata.endDate ? new Date(metadata.endDate) : null;
  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const isExpired = endDate && endDate < today;
  const expiringInOneMonth = endDate && endDate > today && endDate < oneMonthFromNow;

  const getStatusColor = () => {
    if (isExpired) return 'bg-red-100 text-red-800 border-red-200';
    if (expiringInOneMonth) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusIcon = () => {
    if (isExpired) return <AlertTriangle className="w-5 h-5" />;
    if (expiringInOneMonth) return <AlertTriangle className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  const getStatusMessage = () => {
    if (isExpired) return 'وثيقة التأمين منتهية';
    if (expiringInOneMonth) return 'وثيقة التأمين تنتهي خلال شهر';
    return 'وثيقة التأمين سارية';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">تفاصيل وثيقة التأمين</h3>
        </div>
        <div className={`px-4 py-2 rounded-lg border ${getStatusColor()} flex items-center space-x-2`}>
          {getStatusIcon()}
          <span className="font-medium">{getStatusMessage()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">رقم الوثيقة</p>
          <p className="font-medium">{metadata.policyNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">شركة التأمين</p>
          <p className="font-medium">{metadata.insuranceCompany}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">نوع التأمين</p>
          <p className="font-medium">
            {metadata.insuranceType === 'general' && 'تأمين المسؤولية العامة'}
            {metadata.insuranceType === 'property' && 'تأمين الممتلكات'}
            {metadata.insuranceType === 'workers' && 'تأمين العمالة'}
            {metadata.insuranceType === 'equipment' && 'تأمين المعدات'}
            {metadata.insuranceType === 'professional' && 'تأمين المسؤولية المهنية'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">قيمة التأمين</p>
          <p className="font-medium">{formatCurrency(metadata.amount || 0)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">تاريخ البداية</p>
          <p className="font-medium">
            {metadata.startDate && (
              <FormattedDate
                value={metadata.startDate}
                year="numeric"
                month="long"
                day="numeric"
              />
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">تاريخ الانتهاء</p>
          <p className="font-medium">
            {metadata.endDate && (
              <FormattedDate
                value={metadata.endDate}
                year="numeric"
                month="long"
                day="numeric"
              />
            )}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500 mb-1">التغطية التأمينية</p>
          <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line">
            {metadata.coverage}
          </div>
        </div>

        {metadata.exclusions && (
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">الاستثناءات</p>
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-600">
              {metadata.exclusions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};