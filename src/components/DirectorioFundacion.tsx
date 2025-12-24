import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface FundacionData {
  description: string;
  names: string[];
  photoPath?: string; // storage path inside bucket
}

const BUCKET = 'images';
const JSON_PATH = 'fundacion_directorio/data.json';
const PHOTO_FOLDER = 'fundacion_directorio';

const DirectorioFundacion: React.FC = () => {
  const [data, setData] = useState<FundacionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Try to download JSON file from storage
      const { data: file, error } = await supabase.storage.from(BUCKET).download(JSON_PATH);
      if (error) {
        // If not found, initialize empty
        console.warn('No JSON found for fundacion directorio:', error.message);
        setData({ description: '', names: [], photoPath: undefined });
      } else {
        const text = await file.text();
        const parsed = JSON.parse(text) as FundacionData;
        setData(parsed);
        if (parsed.photoPath) {
          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(parsed.photoPath);
          setPhotoUrl(urlData.publicUrl);
        }
      }
    } catch (err) {
      console.error('Error fetching fundacion data', err);
      setData({ description: '', names: [], photoPath: undefined });
    } finally {
      setLoading(false);
    }
  };



  if (loading || !data) {
    return <div className="py-8 text-center text-gray-600">Cargando Directorio Fundación...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="p-8 md:p-12">
        {/* Image Section */}
        <div className="mb-12">
          <div className="relative">
            {photoUrl ? (
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={photoUrl}
                  alt="Directorio Fundación"
                  className="w-full h-auto max-h-[600px] object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                <p className="text-gray-400 text-lg">No hay foto cargada</p>
              </div>
            )}
            
            {/* Names directly below image */}
            {data.names && data.names.length > 0 && (
              <div className="text-center mt-3">
                <p className="text-gray-700 text-sm italic">
                  Izquierda a derecha: {data.names.join(', ')}
                </p>
              </div>
            )}
            
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>

        {/* Description Section */}
        {data.description && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg shadow-md p-6 mb-8 border-t-4 border-red-600">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
              {data.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorioFundacion;
