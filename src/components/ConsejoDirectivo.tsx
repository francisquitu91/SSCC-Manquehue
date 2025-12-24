import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConsejoDirectivoProps {
  onBack: () => void;
}

interface ConsejoDirectivoData {
  description: string;
  names: string[];
  photoPath?: string;
}

const ConsejoDirectivo: React.FC<ConsejoDirectivoProps> = ({ onBack }) => {
  const [data, setData] = useState<ConsejoDirectivoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Cargar el JSON desde Supabase Storage
      const { data: fileData, error: fileError } = await supabase.storage
        .from('images')
        .download('consejo_directivo/data.json');

      if (fileError) {
        console.error('Error loading data:', fileError);
        setLoading(false);
        return;
      }

      const text = await fileData.text();
      const jsonData = JSON.parse(text) as ConsejoDirectivoData;
      setData(jsonData);

      // Si hay una imagen, obtener su URL
      if (jsonData.photoPath) {
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(jsonData.photoPath);

        if (urlData.publicUrl) {
          setImageUrl(urlData.publicUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header con botón de regreso */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Consejo Directivo
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : data ? (
          <div className="space-y-8">
            {/* Imagen centrada */}
            {imageUrl && (
              <div className="relative w-full max-w-3xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={imageUrl}
                    alt="Consejo Directivo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Cuadro de descripción con diseño elegante */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-blue-600">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>

            {/* Nombres como caption debajo */}
            {data.names && data.names.length > 0 && (
              <div className="text-center">
                <p className="text-gray-600 text-sm italic">
                  {data.names.join(' • ')}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No hay información disponible en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsejoDirectivo;
