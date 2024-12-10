import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Package, Plus, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  minStock: number;
  supplier: string;
}

export const MaterialsManager: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'أسفلت',
      quantity: 5000,
      unit: 'طن',
      unitPrice: 500,
      totalValue: 2500000,
      minStock: 1000,
      supplier: 'شركة الأسفلت المتحدة'
    },
    {
      id: '2',
      name: 'حصى ورمل',
      quantity: 12000,
      unit: 'متر مكعب',
      unitPrice: 75,
      totalValue: 900000,
      minStock: 2000,
      supplier: 'مصنع الحصى والرمل'
    }
  ]);

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingMaterial) {
      setMaterials(materials.map(m => 
        m.id === editingMaterial.id ? editingMaterial : m
      ));
    } else {
      const newMaterial: Material = {
        ...editingMaterial!,
        id: crypto.randomUUID(),
        totalValue: editingMaterial!.quantity * editingMaterial!.unitPrice
      };
      setMaterials([...materials, newMaterial]);
    }
    setEditingMaterial(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المادة؟')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">إدارة المواد</h3>
        <button
          onClick={() => {
            setEditingMaterial(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مادة جديدة
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h4 className="text-lg font-semibold mb-4">
              {editingMaterial ? 'تعديل مادة' : 'إضافة مادة جديدة'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">اسم المادة</label>
                  <input
                    type="text"
                    value={editingMaterial?.name || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      name: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الكمية</label>
                  <input
                    type="number"
                    value={editingMaterial?.quantity || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      quantity: Number(e.target.value)
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الوحدة</label>
                  <input
                    type="text"
                    value={editingMaterial?.unit || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      unit: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">سعر الوحدة</label>
                  <input
                    type="number"
                    value={editingMaterial?.unitPrice || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      unitPrice: Number(e.target.value)
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الحد الأدنى للمخزون</label>
                  <input
                    type="number"
                    value={editingMaterial?.minStock || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      minStock: Number(e.target.value)
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">المورد</label>
                  <input
                    type="text"
                    value={editingMaterial?.supplier || ''}
                    onChange={e => setEditingMaterial({
                      ...editingMaterial!,
                      supplier: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMaterial(null);
                    setShowForm(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingMaterial ? 'حفظ التعديلات' : 'إضافة المادة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المادة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمية</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">سعر الوحدة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">القيمة الإجمالية</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المورد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.map(material => (
              <tr key={material.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 ml-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{material.name}</div>
                      <div className="text-sm text-gray-500">
                        الحد الأدنى: {material.minStock} {material.unit}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {material.quantity} {material.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(material.unitPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(material.totalValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {material.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setEditingMaterial(material);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};