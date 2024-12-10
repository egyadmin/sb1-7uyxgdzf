export interface LetterData {
  letterNumber: string;
  issueDate: string;
  letterType: 'handover' | 'takeover' | 'suspension';
  description: string;
  quantity?: string;
  reason?: string;
  authority?: string;
  file: File | null;
}