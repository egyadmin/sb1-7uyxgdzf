import React from 'react';
import { 
  Truck, 
  Wrench, 
  Package, 
  Users, 
  Calendar,
  Hammer 
} from 'lucide-react';
import { Project } from '../../../types/project';
import { ResourceCategoryCard } from '../ResourceCategoryCard';
import { MaterialsManager } from '../materials/MaterialsManager';
import { EquipmentManager } from '../equipment/EquipmentManager';

interface ResourceCategoriesProps {
  project: Project;
}

export const ResourceCategories: React.FC<ResourceCategoriesProps> = ({ project }) => {
  return (
    <div className="space-y-8">
      <EquipmentManager />
      <MaterialsManager />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCategoryCard
          category={{
            id: 'heavy-equipment',
            title: 'المعدات الثقيلة',
            icon: Truck,
            items: [
              { name: 'حفارات', count: 12, utilization: 85 },
              { name: 'جرافات', count: 8, utilization: 75 },
              { name: 'لوادر', count: 15, utilization: 90 },
              { name: 'شاحنات قلابة', count: 25, utilization: 95 },
            ],
          }}
        />
        
        <ResourceCategoryCard
          category={{
            id: 'tools',
            title: 'المعدات والأدوات',
            icon: Hammer,
            items: [
              { name: 'معدات تسوية', count: 6, utilization: 70 },
              { name: 'مداحل طرق', count: 10, utilization: 80 },
              { name: 'معدات أسفلت', count: 4, utilization: 65 },
              { name: 'معدات خرسانة', count: 8, utilization: 85 },
            ],
          }}
        />
      </div>
    </div>
  );
};