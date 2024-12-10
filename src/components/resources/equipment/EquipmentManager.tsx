import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Truck, Plus, Edit2, Trash2, Clock } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'maintenance' | 'inactive';
  utilization: number;
  cost: number;
  workingHours: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  lastMaintenance: string;
  nextMaintenance: string;
  operator?: string;
}

export const EquipmentManager: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'حفار كاتربيلر 320',
      category: 'معدات ثقيلة',
      status: 'active',
      utilization: 85,
      cost: 1200,
      workingHours: {
        daily: 10,
        weekly: 60, // 6 days excluding Friday
        monthly: 260 // ~4.33 weeks
      },
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      operator: 'محمد أحمد'
    }
  ]);

  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [showForm, setShowForm] = useState(false);

  const calculateWorkingHours = (dailyHours: number) => ({
    daily: dailyHours,
    weekly: dailyHours * 6, // Excluding Friday
    monthly: dailyHours * 6 * 4.33 // Average weeks per month
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingEquipment) {
      setEquipment(equipment.map(eq => 
        eq.id === editingEquipment.id ? editingEquipment : eq
      ));
    } else {
      const newEquipment: Equipment = {
        ...editingEquipment!,
        id: crypto.randomUUID(),
        workingHours: calculateWorkingHours(editingEquipment!.workingHours.daily)
      };
      setEquipment([...equipment, newEquipment]);
    }
    setEditingEquipment(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المعدة؟')) {
      setEquipment(equipment.filter(eq => eq.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">إدارة المعدات</h3>
        <button
          onClick={() => {
            setEditingEquipment(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة معدة جديدة
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h4 className="text-lg font-semibold mb-4">
              {editingEquipment ? 'تعديل معدة' : 'إضافة معدة جديدة'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">اسم المعدة</label>
                  <input
                    type="text"
                    value={editingEquipment?.name || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      name: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الفئة</label>
                  <select
                    value={editingEquipment?.category || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      category: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    <option value="معدات ثقيلة">معدات ثقيلة</option>
                    <option value="معدات خفيفة">معدات خفيفة</option>
                    <option value="معدات نقل">معدات نقل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الحالة</label>
                  <select
                    value={editingEquipment?.status || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      status: e.target.value as Equipment['status']
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="active">نشط</option>
                    <option value="maintenance">في الصيانة</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ساعات العمل اليومية</label>
                  <input
                    type="number"
                    value={editingEquipment?.workingHours?.daily || ''}
                    onChange={e => {
                      const dailyHours = Number(e.target.value);
                      setEditingEquipment({
                        ...editingEquipment!,
                        workingHours: calculateWorkingHours(dailyHours)
                      });
                    }}
                    className="w-full border rounded-lg p-2"
                    required
                    min="0"
                    max="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">التكلفة اليومية</label>
                  <input
                    type="number"
                    value={editingEquipment?.cost || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      cost: Number(e.target.value)
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">نسبة الاستخدام (%)</label>
                  <input
                    type="number"
                    value={editingEquipment?.utilization || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      utilization: Number(e.target.value)
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">آخر صيانة</label>
                  <input
                    type="date"
                    value={editingEquipment?.lastMaintenance || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      lastMaintenance: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الصيانة القادمة</label>
                  <input
                    type="date"
                    value={editingEquipment?.nextMaintenance || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      nextMaintenance: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">المشغل</label>
                  <input
                    type="text"
                    value={editingEquipment?.operator || ''}
                    onChange={e => setEditingEquipment({
                      ...editingEquipment!,
                      operator: e.target.value
                    })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingEquipment(null);
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
                  {editingEquipment ? 'حفظ التعديلات' : 'إضافة المعدة'}
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المعدة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ساعات العمل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التكلفة اليومية</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نسبة الاستخدام</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipment.map(eq => (
              <tr key={eq.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-gray-400 ml-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{eq.name}</div>
                      <div className="text-sm text-gray-500">
                        المشغل: {eq.operator || 'غير محدد'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {eq.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    eq.status === 'active' ? 'bg-green-100 text-green-800' :
                    eq.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {eq.status === 'active' ? 'نشط' :
                     eq.status === 'maintenance' ? 'في الصيانة' :
                     'غير نشط'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>يومي: {eq.workingHours.daily} ساعة</div>
                  <div>أسبوعي: {eq.workingHours.weekly} ساعة</div>
                  <div>شهري: {Math.round(eq.workingHours.monthly)} ساعة</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(eq.cost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          eq.utilization >= 90 ? 'bg-green-600' :
                          eq.utilization >= 70 ? 'bg-blue-600' :
                          eq.utilization >= 50 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${eq.utilization}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{eq.utilization}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setEditingEquipment(eq);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(eq.id)}
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