import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  FileText, Shield, Users, Receipt, Mail, 
  FileEdit, Mails, ChevronDown, ChevronUp 
} from 'lucide-react';
import { DocumentUpload } from './DocumentUpload';
import { DocumentList } from './DocumentList';
import { DocumentType, LetterType } from '../../types/document';
import { documentCategories } from '../../data/documentCategories';

interface DocumentManagerProps {
  projectId: string;
  documentType: DocumentType;
}

const documentIcons = {
  contract: FileText,
  'award-letter': Mail,
  'variation-orders': FileEdit,
  letters: Mails,
  insurance: Shield,
  subcontractor: Users,
  invoice: Receipt,
};

export const DocumentManager: React.FC<DocumentManagerProps> = ({ projectId, documentType }) => {
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType | null>(null);
  const [isLettersExpanded, setIsLettersExpanded] = useState(false);
  
  const category = documentCategories.find(cat => cat.id === documentType);
  const Icon = documentIcons[documentType];

  if (!category) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-900">
          <FormattedMessage id={`document.category.${documentType}`} />
        </h2>
      </div>

      {documentType === 'letters' ? (
        <div className="space-y-4">
          <button
            onClick={() => setIsLettersExpanded(!isLettersExpanded)}
            className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <span className="font-medium">
              {selectedLetterType ? (
                <FormattedMessage id={`document.letter.${selectedLetterType}`} />
              ) : (
                <FormattedMessage id="document.selectLetterType" />
              )}
            </span>
            {isLettersExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          {isLettersExpanded && (
            <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm">
              {category.subCategories?.map(subCat => (
                <button
                  key={subCat.id}
                  onClick={() => {
                    setSelectedLetterType(subCat.id as LetterType);
                    setIsLettersExpanded(false);
                  }}
                  className="w-full text-right p-2 hover:bg-gray-50 rounded"
                >
                  {subCat.nameAr}
                </button>
              ))}
            </div>
          )}

          {selectedLetterType && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <DocumentUpload 
                projectId={projectId} 
                type={documentType} 
                letterType={selectedLetterType} 
              />
              <div className="mt-6">
                <DocumentList 
                  projectId={projectId} 
                  type={documentType}
                  letterType={selectedLetterType}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <DocumentUpload projectId={projectId} type={documentType} />
          <div className="mt-6">
            <DocumentList projectId={projectId} type={documentType} />
          </div>
        </div>
      )}
    </div>
  );
};