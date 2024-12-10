import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  LayoutDashboard,
  FileText,
  ScrollText,
  Calendar,
  DollarSign,
  Boxes,
  ClipboardList,
  Users,
  BarChart2,
  PieChart,
  FolderOpen,
  Shield,
  Receipt,
  Mail,
  FileEdit,
  Mails,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';
import { Project } from '../../types/project';
import { MainView, ProjectSubPage, DocumentSubPage } from '../../types/navigation';

interface SidebarProps {
  selectedProject: Project | null;
  currentView: MainView;
  currentSubPage: ProjectSubPage | null;
  currentDocumentPage: DocumentSubPage | null;
  onViewChange: (view: MainView) => void;
  onSubPageChange: (subPage: ProjectSubPage) => void;
  onDocumentPageChange: (subPage: DocumentSubPage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedProject,
  currentView,
  currentSubPage,
  currentDocumentPage,
  onViewChange,
  onSubPageChange,
  onDocumentPageChange,
}) => {
  const { locale } = useIntl();
  const isRTL = locale === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderNavItem = (
    icon: React.ReactNode,
    messageId: string,
    onClick: () => void,
    isActive: boolean,
    hasSubItems = false
  ) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-3 rounded-lg transition-colors
        ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
    >
      {icon}
      <span className="flex-1 text-right">
        <FormattedMessage id={messageId} />
      </span>
      {hasSubItems && (
        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === messageId ? 'transform rotate-180' : ''}`} />
      )}
    </button>
  );

  const documentCategories = [
    { id: 'project-contract', icon: FileText, messageId: 'document.category.project-contract' },
    { id: 'award-letter', icon: Mail, messageId: 'document.category.award-letter' },
    { id: 'variation-orders', icon: FileEdit, messageId: 'document.category.variation-orders' },
    { id: 'letters', icon: Mails, messageId: 'document.category.letters' },
    { id: 'insurance', icon: Shield, messageId: 'document.category.insurance' },
    { id: 'subcontractor', icon: Users, messageId: 'document.category.subcontractor' },
    { id: 'invoice', icon: Receipt, messageId: 'document.category.invoice' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} 
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}
          lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">
              <FormattedMessage id="app.title" />
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Dashboard */}
            {renderNavItem(
              <LayoutDashboard className="w-5 h-5" />,
              'nav.dashboard',
              () => onViewChange('dashboard'),
              currentView === 'dashboard'
            )}

            {/* Projects */}
            {renderNavItem(
              <FolderOpen className="w-5 h-5" />,
              'nav.projects',
              () => onViewChange('projects'),
              currentView === 'projects',
              true
            )}

            {/* Project Sub-pages */}
            {selectedProject && currentView === 'projects' && (
              <div className={`mt-2 ${isRTL ? 'mr-4' : 'ml-4'} space-y-1`}>
                {/* Documents Section */}
                <div>
                  {renderNavItem(
                    <FileText className="w-4 h-4" />,
                    'nav.documents',
                    () => onSubPageChange('documents'),
                    currentSubPage === 'documents',
                    true
                  )}

                  {currentSubPage === 'documents' && (
                    <div className={`mt-1 ${isRTL ? 'mr-4' : 'ml-4'} space-y-1`}>
                      {documentCategories.map(category => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => onDocumentPageChange(category.id as DocumentSubPage)}
                            className={`w-full flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 p-2 rounded-lg text-sm
                              ${currentDocumentPage === category.id
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>
                              <FormattedMessage id={category.messageId} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Other Project Sections */}
                {[
                  { id: 'contract', icon: ScrollText, messageId: 'nav.contract' },
                  { id: 'timeline', icon: Calendar, messageId: 'nav.timeline' },
                  { id: 'costs', icon: DollarSign, messageId: 'nav.costs' },
                  { id: 'resources', icon: Boxes, messageId: 'nav.resources' },
                  { id: 'periodic', icon: ClipboardList, messageId: 'nav.periodic' },
                  { id: 'labor', icon: Users, messageId: 'nav.labor' },
                  { id: 'kpi', icon: BarChart2, messageId: 'nav.kpi' },
                  { id: 'budget', icon: PieChart, messageId: 'nav.budget' }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => onSubPageChange(section.id as ProjectSubPage)}
                    className={`w-full flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 p-2 rounded-lg text-sm
                      ${currentSubPage === section.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span>
                      <FormattedMessage id={section.messageId} />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};