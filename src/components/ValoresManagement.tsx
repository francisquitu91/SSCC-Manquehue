import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ValoresData {
  id: number;
  matricula_incorporacion: {
    hijo1: number;
    hijo2: number;
    hijo3: number;
    hijo4: number;
    hijo5: number;
  };
  otros_cargos: {
    matricula: number;
    cpp: number;
    caa: number;
    ayuda_mutua: number;
    seguro_escolaridad: string;
  };
  colegiatura_anual: {
    hijo1: number;
    hijo2: number;
    hijo3: number;
    hijo4: number;
    hijo5: number;
    hijo6: number;
  };
  contacto: {
    nombre: string;
    telefono: string;
    email: string;
  };
}

interface ValoresManagementProps {
  onBack: () => void;
}

const ValoresManagement: React.FC<ValoresManagementProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState<ValoresData>({
    id: 1,
    matricula_incorporacion: {
      hijo1: 75,
      hijo2: 56.25,
      hijo3: 37.5,
      hijo4: 18.75,
      hijo5: 0
    },
    otros_cargos: {
      matricula: 12,
      cpp: 1.9,
      caa: 0.2,
      ayuda_mutua: 0.6,
      seguro_escolaridad: 'Cubre el pago de mensualidades del Colegio hasta IVº Medio o 6 años de universidad, en caso de fallecimiento, o invalidez 2/3, de los apoderados. Es obligatorio para los apoderados menores de 65 años. Cubre 100% al primer sostenedor y 50% al segundo sostenedor.'
    },
    colegiatura_anual: {
      hijo1: 100,
      hijo2: 98,
      hijo3: 90,
      hijo4: 60,
      hijo5: 20,
      hijo6: 0
    },
    contacto: {
      nombre: 'Arantzazu Vicente Urcelay',
      telefono: '227194306',
      email: 'administracion@ssccmanquehue.cl'
    }
  });

  useEffect(() => {
    fetchValores();
  }, []);

  const fetchValores = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('valores_matricula')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching valores:', error);
        throw error;
      }
      
      if (data) {
        setFormData(data);
      }
      // Si no hay data, se mantienen los valores predeterminados
    } catch (error) {
      console.error('Error fetching valores:', error);
      setMessage({ 
        type: 'error', 
        text: 'Error al cargar los datos. Se muestran valores predeterminados.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      const dataToSave = {
        id: 1,
        matricula_incorporacion: formData.matricula_incorporacion,
        otros_cargos: formData.otros_cargos,
        colegiatura_anual: formData.colegiatura_anual,
        contacto: formData.contacto,
        updated_at: new Date().toISOString()
      };

      // Usar upsert que inserta o actualiza automáticamente
      const { data, error } = await supabase
        .from('valores_matricula')
        .upsert(dataToSave, {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Datos guardados exitosamente:', data);
      setMessage({ type: 'success', text: 'Valores actualizados correctamente' });
      
      // Recargar datos después de un pequeño delay
      setTimeout(() => {
        fetchValores();
      }, 500);
    } catch (error: any) {
      console.error('Error saving valores:', error);
      setMessage({ 
        type: 'error', 
        text: `Error al guardar los cambios: ${error.message || 'Error desconocido'}` 
      });
    } finally {
      setSaving(false);
    }
  };

  const updateMatriculaIncorporacion = (field: keyof typeof formData.matricula_incorporacion, value: string) => {
    setFormData({
      ...formData,
      matricula_incorporacion: {
        ...formData.matricula_incorporacion,
        [field]: parseFloat(value) || 0
      }
    });
  };

  const updateOtrosCargos = (field: keyof typeof formData.otros_cargos, value: string) => {
    setFormData({
      ...formData,
      otros_cargos: {
        ...formData.otros_cargos,
        [field]: field === 'seguro_escolaridad' ? value : parseFloat(value) || 0
      }
    });
  };

  const updateColegiaturaAnual = (field: keyof typeof formData.colegiatura_anual, value: string) => {
    setFormData({
      ...formData,
      colegiatura_anual: {
        ...formData.colegiatura_anual,
        [field]: parseFloat(value) || 0
      }
    });
  };

  const updateContacto = (field: keyof typeof formData.contacto, value: string) => {
    setFormData({
      ...formData,
      contacto: {
        ...formData.contacto,
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Panel de Administración
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Valores de Matrícula</h1>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {message.text}
          </div>
        )}

        {/* Forms */}
        <div className="space-y-8">
          {/* Matrícula de Incorporación */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Matrícula de Incorporación (UF)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">1° hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.matricula_incorporacion.hijo1}
                  onChange={(e) => updateMatriculaIncorporacion('hijo1', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">2° hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.matricula_incorporacion.hijo2}
                  onChange={(e) => updateMatriculaIncorporacion('hijo2', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">3° hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.matricula_incorporacion.hijo3}
                  onChange={(e) => updateMatriculaIncorporacion('hijo3', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">4° hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.matricula_incorporacion.hijo4}
                  onChange={(e) => updateMatriculaIncorporacion('hijo4', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">5° hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.matricula_incorporacion.hijo5}
                  onChange={(e) => updateMatriculaIncorporacion('hijo5', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Otros Cargos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Otros Cargos (UF)</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matrícula</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otros_cargos.matricula}
                  onChange={(e) => updateOtrosCargos('matricula', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPP</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otros_cargos.cpp}
                  onChange={(e) => updateOtrosCargos('cpp', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CAA</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otros_cargos.caa}
                  onChange={(e) => updateOtrosCargos('caa', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ayuda Mutua</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.otros_cargos.ayuda_mutua}
                  onChange={(e) => updateOtrosCargos('ayuda_mutua', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción Seguro de Escolaridad-Vida</label>
              <textarea
                value={formData.otros_cargos.seguro_escolaridad}
                onChange={(e) => updateOtrosCargos('seguro_escolaridad', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Colegiatura Anual */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Valor Colegiatura Anual (%)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">1 hijo/a</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo1}
                  onChange={(e) => updateColegiaturaAnual('hijo1', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">2 hijos/as</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo2}
                  onChange={(e) => updateColegiaturaAnual('hijo2', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">3 hijos/as</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo3}
                  onChange={(e) => updateColegiaturaAnual('hijo3', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">4 hijos/as</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo4}
                  onChange={(e) => updateColegiaturaAnual('hijo4', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">5 hijos/as</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo5}
                  onChange={(e) => updateColegiaturaAnual('hijo5', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">6 hijos/as</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.colegiatura_anual.hijo6}
                  onChange={(e) => updateColegiaturaAnual('hijo6', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.contacto.nombre}
                  onChange={(e) => updateContacto('nombre', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  value={formData.contacto.telefono}
                  onChange={(e) => updateContacto('telefono', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.contacto.email}
                  onChange={(e) => updateContacto('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValoresManagement;
