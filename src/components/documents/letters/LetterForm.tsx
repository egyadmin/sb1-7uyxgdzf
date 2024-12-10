import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { LetterType } from '../../../types/document';

interface LetterFormProps {
  projectId: string;
  onSubmit: (data: LetterData) => void;
}

export interface LetterData {
  letterNumber: string;
  issueDate: string;
  letterType: LetterType;
  description: string;
  senderAuthority: string;
  receiverAuthority: string;
  quantity?: string;
  reason?: string;
  authority?: string;
  delayDuration?: string;
  claimAmount?: number;
  file: File | null;
}

export const LetterForm: React.FC<LetterFormProps> = ({ projectId, onSubmit }) => {
  const [formData, setFormData] = useState<LetterData>({
    letterNumber: '',
    issueDate: '',
    letterType: 'start',
    description: '',
    senderAuthority: '',
    receiverAuthority: '',
    quantity: '',
    reason: '',
    authority: '',
    delayDuration: '',
    claimAmount: 0,
    file: null,
  });

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData(prev => ({ ...prev, file: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert('الرجاء اختيار ملف الخطاب');
      return;
    }
    onSubmit(formData);
    setFormData({
      letterNumber: '',
      issueDate: '',
      letterType: 'start',
      description: '',
      senderAuthority: '',
      receiverAuthority: '',
      quantity: '',
      reason: '',
      authority: '',
      delayDuration: '',
      claimAmount: 0,
      file: null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">
        <FormattedMessage id="letters.new" />
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600 mb-2">
            <FormattedMessage 
              id={isDragActive ? 'letters.dropzone.active' : 'letters.dropzone.text'}
            />
          </p>
          <p className="text-sm text-gray-500">
            <FormattedMessage id="letters.dropzone.formats" />
          </p>
          {formData.file && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-flex items-center">
              <FileText className="w-5 h-5 text-blue-500 ml-2" />
              <span className="text-blue-600">{formData.file.name}</span>
            </div>
          )}
        </div>

        {/* Letter Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.number" />
            </label>
            <input
              type="text"
              value={formData.letterNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, letterNumber: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.date" />
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.type" />
            </label>
            <select
              value={formData.letterType}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                letterType: e.target.value as LetterType
              }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="start">
                <FormattedMessage id="letters.type.start" />
              </option>
              <option value="delay">
                <FormattedMessage id="letters.type.delay" />
              </option>
              <option value="claim">
                <FormattedMessage id="letters.type.claim" />
              </option>
              <option value="clarification">
                <FormattedMessage id="letters.type.clarification" />
              </option>
              <option value="handover">
                <FormattedMessage id="letters.type.handover" />
              </option>
              <option value="takeover">
                <FormattedMessage id="letters.type.takeover" />
              </option>
              <option value="suspension">
                <FormattedMessage id="letters.type.suspension" />
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.senderAuthority" />
            </label>
            <input
              type="text"
              value={formData.senderAuthority}
              onChange={(e) => setFormData(prev => ({ ...prev, senderAuthority: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.receiverAuthority" />
            </label>
            <input
              type="text"
              value={formData.receiverAuthority}
              onChange={(e) => setFormData(prev => ({ ...prev, receiverAuthority: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FormattedMessage id="letters.description" />
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              required
            />
          </div>

          {/* Conditional fields based on letter type */}
          {(formData.letterType === 'handover' || formData.letterType === 'takeover') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FormattedMessage id="letters.quantity" />
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {formData.letterType === 'delay' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FormattedMessage id="letters.delayDuration" />
              </label>
              <input
                type="text"
                value={formData.delayDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, delayDuration: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {formData.letterType === 'claim' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FormattedMessage id="letters.claimAmount" />
              </label>
              <input
                type="number"
                value={formData.claimAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, claimAmount: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          )}

          {(formData.letterType === 'suspension' || formData.letterType === 'delay') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FormattedMessage id="letters.reason" />
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FormattedMessage id="letters.authority" />
                </label>
                <input
                  type="text"
                  value={formData.authority}
                  onChange={(e) => setFormData(prev => ({ ...prev, authority: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FormattedMessage id="letters.save" />
        </button>
      </form>
    </div>
  );
};