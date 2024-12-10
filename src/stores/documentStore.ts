import { create } from 'zustand';
import { Document } from '../types/document';

interface DocumentStore {
  documents: Document[];
  addDocument: (document: Document) => void;
  updateDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  getProjectDocuments: (projectId: string) => Document[];
}

// Create a mock PDF file
const createMockFile = () => {
  const content = 'Mock PDF content';
  return new File([content], 'mock-document.pdf', { type: 'application/pdf' });
};

// Create mock invoice
const mockInvoice: Document = {
  id: 'mock-invoice-1',
  projectId: '100325',
  name: 'مستخلص رقم 1.pdf',
  type: 'invoice',
  file: createMockFile(),
  uploadDate: new Date().toISOString(),
  size: 1024 * 1024,
  metadata: {
    invoiceNumber: 'INV-2024-001',
    issueDate: '2024-03-01',
    periodStart: '2024-02-01',
    periodEnd: '2024-02-29',
    totalAmount: 500000,
    retentionAmount: 50000,
    netAmount: 450000,
    ownerEntity: 'شركة تطوير المشاريع',
    workDescription: 'أعمال الحفر والردم للموقع وفقاً للمخططات المعتمدة',
    invoiceStatus: 'pending',
    attachments: [
      {
        id: 'att-1',
        name: 'جدول الكميات.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        file: createMockFile(),
      }
    ],
    comments: [
      {
        id: 'comment-1',
        date: '2024-03-02T10:00:00Z',
        text: 'يرجى مراجعة الكميات المنفذة',
        author: 'مدير المشروع'
      }
    ]
  }
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [mockInvoice],
  
  addDocument: (document) => 
    set((state) => ({ 
      documents: [...state.documents, document] 
    })),
  
  updateDocument: (document) =>
    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === document.id ? document : doc
      ),
    })),
  
  removeDocument: (id) =>
    set((state) => ({ 
      documents: state.documents.filter(doc => doc.id !== id) 
    })),
  
  getProjectDocuments: (projectId) =>
    get().documents.filter(doc => doc.projectId === projectId),
}));