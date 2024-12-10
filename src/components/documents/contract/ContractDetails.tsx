import React from 'react';
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { FileText, Calendar, User, DollarSign, Clock } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface ContractDetailsProps {
  contract: {
    contractNumber: string;
    signDate: string;
    signingAuthority: string;
    totalValue: number;
    duration: number;
    fileName: string;
  };
  onDownload: () => void;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({ contract, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          <FormattedMessage id="contract.details" defaultMessage="Contract Details" />
        </h3>
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <FileText className="w-5 h-5" />
          <span>{contract.fileName}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <FormattedMessage id="contract.number" defaultMessage="Contract Number" />
            </p>
            <p className="font-medium">{contract.contractNumber}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <FormattedMessage id="contract.signDate" defaultMessage="Sign Date" />
            </p>
            <p className="font-medium">
              <FormattedDate
                value={contract.signDate}
                year="numeric"
                month="long"
                day="numeric"
              />
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <FormattedMessage id="contract.authority" defaultMessage="Signing Authority" />
            </p>
            <p className="font-medium">{contract.signingAuthority}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <FormattedMessage id="contract.value" defaultMessage="Total Value" />
            </p>
            <p className="font-medium">{formatCurrency(contract.totalValue)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <FormattedMessage id="contract.duration" defaultMessage="Duration" />
            </p>
            <p className="font-medium">
              <FormattedNumber value={contract.duration} /> {' '}
              <FormattedMessage id="contract.months" defaultMessage="months" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};