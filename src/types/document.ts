import { LetterType } from './letters';

export type DocumentType = 
  | 'project-contract'
  | 'award-letter'
  | 'variation-orders'
  | 'letters'
  | 'insurance'
  | 'subcontractor'
  | 'invoice';

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: DocumentType;
  file: File;
  uploadDate: string;
  size: number;
  metadata?: {
    // Contract metadata
    contractNumber?: string;
    signDate?: string;
    signingAuthority?: string;
    totalValue?: number;
    duration?: number;

    // Award letter metadata
    letterNumber?: string;
    issueDate?: string;
    awardAmount?: number;
    startDate?: string;
    endDate?: string;
    senderAuthority?: string;
    receiverAuthority?: string;

    // Variation order metadata
    orderNumber?: string;
    description?: string;
    reason?: string;
    additionalCost?: number;

    // Letter metadata
    letterType?: LetterType;
    quantity?: string;
    authority?: string;
    delayDuration?: string;
    claimAmount?: number;

    // Insurance metadata
    policyNumber?: string;
    insuranceCompany?: string;
    insuranceType?: string;
    amount?: number;
    coverage?: string;
    exclusions?: string;

    // Subcontractor metadata
    subcontractorName?: string;
    workType?: string;
    contractValue?: number;
    scopeOfWork?: string;
    paymentTerms?: string;
    status?: 'active' | 'completed' | 'suspended';
    progress?: number;
    paidAmount?: number;
    payments?: Array<{
      id: string;
      date: string;
      amount: number;
      description: string;
      status: 'pending' | 'approved' | 'rejected';
    }>;

    // Invoice metadata
    invoiceNumber?: string;
    periodStart?: string;
    periodEnd?: string;
    totalAmount?: number;
    retentionAmount?: number;
    netAmount?: number;
    ownerEntity?: string;
    workDescription?: string;
    invoiceStatus?: 'pending' | 'approved' | 'rejected';
    attachments?: Array<{
      id: string;
      name: string;
      type: string;
      file: File;
    }>;
    comments?: Array<{
      id: string;
      date: string;
      text: string;
      author: string;
    }>;
  };
}

export interface DocumentCategory {
  id: DocumentType;
  nameEn: string;
  nameAr: string;
  icon: string;
  subCategories?: { id: string; nameEn: string; nameAr: string }[];
}