import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { DocumentView } from './components/DocumentView';
import { Dashboard } from './components/dashboard/Dashboard';
import { Sidebar } from './components/layout/Sidebar';
import { MainLayout } from './components/layout/MainLayout';
import { ProjectView } from './components/projects/ProjectView';
import { ProjectContent } from './components/project/ProjectContent';
import { mockProjects } from './data/mockProjects';
import messages from './i18n/messages';
import { Locale } from './i18n/types';
import { Project } from './types/project';
import { MainView, ProjectSubPage, DocumentSubPage } from './types/navigation';

function App() {
  const [locale, setLocale] = useState<Locale>('ar');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<MainView>('dashboard');
  const [currentSubPage, setCurrentSubPage] = useState<ProjectSubPage | null>(null);
  const [currentDocumentPage, setCurrentDocumentPage] = useState<DocumentSubPage | null>(null);

  const stats = {
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter(p => p.status === 'active').length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    totalCosts: mockProjects.reduce((sum, p) => sum + p.actualCosts, 0),
    variance: mockProjects.reduce((sum, p) => sum + (p.budget - p.actualCosts), 0),
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentSubPage('documents');
    setCurrentDocumentPage('project-contract');
  };

  const handleViewChange = (view: MainView) => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setSelectedProject(null);
      setCurrentSubPage(null);
      setCurrentDocumentPage(null);
    }
  };

  const handleSubPageChange = (subPage: ProjectSubPage) => {
    setCurrentSubPage(subPage);
    if (subPage !== 'documents') {
      setCurrentDocumentPage(null);
    }
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <div className="min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Sidebar
          selectedProject={selectedProject}
          currentView={currentView}
          currentSubPage={currentSubPage}
          currentDocumentPage={currentDocumentPage}
          onViewChange={handleViewChange}
          onSubPageChange={handleSubPageChange}
          onDocumentPageChange={setCurrentDocumentPage}
        />
        <MainLayout locale={locale} onLocaleChange={setLocale}>
          {currentView === 'dashboard' && (
            <Dashboard projects={mockProjects} stats={stats} />
          )}
          {currentView === 'projects' && !selectedProject && (
            <ProjectView
              projects={mockProjects}
              onProjectSelect={handleProjectSelect}
            />
          )}
          {currentView === 'projects' && selectedProject && (
            <ProjectContent
              project={selectedProject}
              currentSubPage={currentSubPage || 'documents'}
              currentDocumentPage={currentDocumentPage}
              projects={mockProjects}
              onProjectSelect={handleProjectSelect}
            />
          )}
        </MainLayout>
      </div>
    </IntlProvider>
  );
}

export default App;