import { DocumentCategory } from '../types/document';

export const documentCategories: DocumentCategory[] = [
  {
    id: 'contracts',
    nameEn: 'Contracts',
    nameAr: 'العقود',
    icon: 'FileText',
    subCategories: [
      { id: 'project-contract', nameEn: 'Project Contract', nameAr: 'عقد المشروع' },
      { id: 'award-letter', nameEn: 'Award Letter', nameAr: 'خطاب الترسية' },
      { id: 'variation-orders', nameEn: 'Variation Orders (VO)', nameAr: 'بنود مستحدثة' },
      {
        id: 'letters',
        nameEn: 'Letters',
        nameAr: 'خطابات',
        subCategories: [
          { id: 'handover', nameEn: 'Handover', nameAr: 'تسليم' },
          { id: 'takeover', nameEn: 'Takeover', nameAr: 'استلام' },
          { id: 'suspension', nameEn: 'Suspension', nameAr: 'ايقاف' }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    nameEn: 'Insurance',
    nameAr: 'التأمينات',
    icon: 'Shield'
  },
  {
    id: 'subcontractor',
    nameEn: 'Subcontractor Agreements',
    nameAr: 'عقود المقاولين الباطن',
    icon: 'Users'
  },
  {
    id: 'invoice',
    nameEn: 'Owner Invoices',
    nameAr: 'مستخلصات المالك',
    icon: 'Receipt'
  }
];