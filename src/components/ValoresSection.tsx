import React, { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Users, FileText, Shield, Loader } from 'lucide-react';
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
  updated_at: string;
}

interface ValoresSectionProps {
  onBack: () => void;
}

const ValoresSection: React.FC<ValoresSectionProps> = ({ onBack }) => {
  const [valoresData, setValoresData] = useState<ValoresData | null>(null);
  const [loading, setLoading] = useState(true);

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
        setValoresData(data);
      } else {
        // Si no hay datos en la BD, usar valores predeterminados
        setValoresData({
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
          },
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching valores:', error);
      // Set default values if database query fails
      setValoresData({
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
        },
        updated_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Botón Volver */}
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </button>

        {/* Encabezado */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Valores de Matrícula y Colegiaturas
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Información detallada sobre los costos y aranceles del colegio
          </p>
        </div>

        {/* Contenido Principal */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Cargando información...</p>
          </div>
        ) : valoresData ? (
          <div className="space-y-8">
            {/* Matrícula de Incorporación */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Matrícula de Incorporación
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">1° hijo/a</p>
                  <p className="text-2xl font-bold text-blue-600">{valoresData.matricula_incorporacion.hijo1} UF</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">2° hijo/a</p>
                  <p className="text-2xl font-bold text-blue-600">{valoresData.matricula_incorporacion.hijo2} UF</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">3° hijo/a</p>
                  <p className="text-2xl font-bold text-blue-600">{valoresData.matricula_incorporacion.hijo3} UF</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">4° hijo/a</p>
                  <p className="text-2xl font-bold text-blue-600">{valoresData.matricula_incorporacion.hijo4} UF</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">5° hijo/a</p>
                  <p className="text-2xl font-bold text-blue-600">{valoresData.matricula_incorporacion.hijo5} UF</p>
                </div>
              </div>
            </div>

            {/* Otros Cargos */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-500">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Otros Cargos
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Matrícula</span>
                  <span className="text-xl font-bold text-indigo-600">{valoresData.otros_cargos.matricula} UF</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">CPP (Centro de Padres)</span>
                  <span className="text-xl font-bold text-indigo-600">{valoresData.otros_cargos.cpp} UF</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">CAA (Centro de Alumnos)</span>
                  <span className="text-xl font-bold text-indigo-600">{valoresData.otros_cargos.caa} UF</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Ayuda Mutua</span>
                  <span className="text-xl font-bold text-indigo-600">{valoresData.otros_cargos.ayuda_mutua} UF</span>
                </div>
                
                {/* Seguro de Escolaridad */}
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6 mt-6">
                  <div className="flex items-start mb-3">
                    <Shield className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Seguro de Escolaridad-Vida (Proporcional)
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {valoresData.otros_cargos.seguro_escolaridad}
                  </p>
                </div>
              </div>
            </div>

            {/* Valor Colegiatura Anual */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Valor Colegiatura Anual (Porcentaje por hijo)
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">1 hijo/a</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo1}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">2 hijos/as</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo2}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">3 hijos/as</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo3}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">4 hijos/as</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo4}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">5 hijos/as</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo5}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">6 hijos/as</p>
                  <p className="text-2xl font-bold text-green-600">{valoresData.colegiatura_anual.hijo6}%</p>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Para Mayor Información</h2>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold">Contacto:</span> {valoresData.contacto.nombre}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Teléfono:</span>{' '}
                  <a href={`tel:${valoresData.contacto.telefono}`} className="hover:underline">
                    {valoresData.contacto.telefono}
                  </a>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span>{' '}
                  <a href={`mailto:${valoresData.contacto.email}`} className="hover:underline">
                    {valoresData.contacto.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              La información de valores no está disponible en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValoresSection;
