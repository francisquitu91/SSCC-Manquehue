import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Plus, Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdmisionManagementProps {
  onBack: () => void;
}

interface InfoCard {
  id?: number;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  image_url: string;
  order_index: number;
}

interface ProcessStep {
  id?: number;
  step_number: number;
  step_label: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  order_index: number;
}

interface ContactInfo {
  id?: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  photo_url: string;
}

const AdmisionManagement: React.FC<AdmisionManagementProps> = ({ onBack }) => {
  const [infoCards, setInfoCards] = useState<InfoCard[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'steps' | 'contact'>('cards');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch info cards
      const { data: cardsData } = await supabase
        .from('admision_info_cards')
        .select('*')
        .order('order_index');
      if (cardsData) setInfoCards(cardsData);

      // Fetch process steps
      const { data: stepsData } = await supabase
        .from('admision_process_steps')
        .select('*')
        .order('order_index');
      if (stepsData) setProcessSteps(stepsData);

      // Fetch contact info
      const { data: contactData } = await supabase
        .from('admision_contact')
        .select('*')
        .single();
      if (contactData) setContactInfo(contactData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('admision-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('admision-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSaveCard = async (card: InfoCard) => {
    setLoading(true);
    try {
      if (card.id) {
        await supabase
          .from('admision_info_cards')
          .update(card)
          .eq('id', card.id);
      } else {
        await supabase
          .from('admision_info_cards')
          .insert([card]);
      }
      setMessage('Tarjeta guardada exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error saving card:', error);
      setMessage('Error al guardar tarjeta');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta tarjeta?')) return;
    
    setLoading(true);
    try {
      await supabase
        .from('admision_info_cards')
        .delete()
        .eq('id', id);
      setMessage('Tarjeta eliminada');
      fetchData();
    } catch (error) {
      console.error('Error deleting card:', error);
      setMessage('Error al eliminar tarjeta');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStep = async (step: ProcessStep) => {
    setLoading(true);
    try {
      if (step.id) {
        await supabase
          .from('admision_process_steps')
          .update(step)
          .eq('id', step.id);
      } else {
        await supabase
          .from('admision_process_steps')
          .insert([step]);
      }
      setMessage('Etapa guardada exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error saving step:', error);
      setMessage('Error al guardar etapa');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStep = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta etapa?')) return;
    
    setLoading(true);
    try {
      await supabase
        .from('admision_process_steps')
        .delete()
        .eq('id', id);
      setMessage('Etapa eliminada');
      fetchData();
    } catch (error) {
      console.error('Error deleting step:', error);
      setMessage('Error al eliminar etapa');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async (contact: ContactInfo) => {
    setLoading(true);
    try {
      if (contact.id) {
        await supabase
          .from('admision_contact')
          .update(contact)
          .eq('id', contact.id);
      } else {
        await supabase
          .from('admision_contact')
          .insert([contact]);
      }
      setMessage('Contacto guardado exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error saving contact:', error);
      setMessage('Error al guardar contacto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al panel de administración
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Admisión</h1>
          <p className="text-gray-600">Administra las tarjetas informativas, etapas del proceso y datos de contacto</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage('')}>
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('cards')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'cards'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tarjetas Informativas
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'steps'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Etapas del Proceso
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'contact'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Datos de Contacto
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Tarjetas Informativas (Flip 3D)</h2>
              <p className="text-gray-600 mb-4">
                Gestiona las 3 tarjetas principales que se muestran con animación 3D
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Iconos disponibles:</strong> FileText, Users, CheckCircle, Calendar, Award
                <br />
                <strong>Colores:</strong> from-blue-600 to-blue-800, from-green-600 to-green-800, from-purple-600 to-purple-800
              </div>
              {/* Card editing interface would go here */}
              <p className="text-gray-500 italic">Interfaz de edición de tarjetas...</p>
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Etapas del Proceso</h2>
              <p className="text-gray-600 mb-4">
                Gestiona las etapas horizontales que se expanden suavemente al pasar el mouse
              </p>
              {/* Steps editing interface would go here */}
              <p className="text-gray-500 italic">Interfaz de edición de etapas...</p>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Datos de Contacto</h2>
              <p className="text-gray-600 mb-4">
                Actualiza la información de la persona encargada de admisión
              </p>
              {contactInfo && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={contactInfo.role}
                      onChange={(e) => setContactInfo({ ...contactInfo, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Foto
                    </label>
                    <input
                      type="text"
                      value={contactInfo.photo_url}
                      onChange={(e) => setContactInfo({ ...contactInfo, photo_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    onClick={() => handleSaveContact(contactInfo)}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmisionManagement;
