import { Project } from '../types/project';

// Generate random projects with realistic data
function generateMockProjects(): Project[] {
  const areas = [
    'Northern Central Location',
    'Southern Development Zone',
    'Eastern Industrial Area',
    'Western Commercial District',
    'Central Business Hub'
  ];

  const projectTypes = [
    'أعمال تجهيز الموقع',
    'أعمال الطرق',
    'أعمال البنية التحتية',
    'مشروع تطوير',
    'أعمال المباني',
    'مشروع إنشاءات'
  ];

  const projects: Project[] = [];
  const startYear = 2022;
  const currentDate = new Date();

  for (let i = 0; i < 20; i++) {
    const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const number = (100300 + i).toString();
    
    // Generate random dates within a realistic range
    const startDate = new Date(startYear + Math.floor(i / 8), Math.floor(Math.random() * 12), 1);
    const duration = 12 + Math.floor(Math.random() * 24); // 12-36 months
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration);

    // Generate realistic budget and costs
    const budget = 1000000 + Math.floor(Math.random() * 5000000);
    const progress = Math.min((currentDate.getTime() - startDate.getTime()) / 
                            (endDate.getTime() - startDate.getTime()), 1);
    const actualCosts = Math.floor(budget * (progress * 0.8 + Math.random() * 0.4));

    // Determine status based on dates
    const status = currentDate > endDate ? 'completed' : 'active';

    projects.push({
      id: number,
      name: `${projectType} بقيمة نيوم عقد رقم ${4200000000 + i} تبليغ رقم ${String(i + 1).padStart(3, '0')}`,
      number,
      status,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      budget,
      actualCosts,
      area
    });
  }

  return projects.sort((a, b) => b.budget - a.budget);
}

export const mockProjects = generateMockProjects();