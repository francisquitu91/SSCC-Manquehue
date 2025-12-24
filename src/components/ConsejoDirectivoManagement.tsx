import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Trash2, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConsejoDirectivoManagementProps {
  onBack: () => void;
}

interface ConsejoDirectivoData {
  description: string;
  names: string[];
  photoPath?: string;
}

const ConsejoDirectivoManagement: React.FC<ConsejoDirectivoManagementProps> = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>(['']);
  const [currentPhotoPath, setCurrentPhotoPath] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadCurrentData();
  }, []);

  const loadCurrentData = async () => {
    try {
      setLoading(true);

      // Cargar datos del JSON
      const { data: fileData, error: fileError } = await supabase.storage
        .from('images')
        .download('consejo_directivo/data.json');

      if (!fileError && fileData) {
        const text = await fileData.text();
        const jsonData = JSON.parse(text) as ConsejoDirectivoData;
        
        setDescription(jsonData.description || '');
        setNames(jsonData.names && jsonData.names.length > 0 ? jsonData.names : ['']);
        setCurrentPhotoPath(jsonData.photoPath || '');

        // Cargar vista previa de la imagen actual
        if (jsonData.photoPath) {
          const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(jsonData.photoPath);
          
          if (urlData.publicUrl) {
            setPhotoPreview(urlData.publicUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddName = () => {
    setNames([...names, '']);
  };

  const handleRemoveName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames.length > 0 ? newNames : ['']);
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    setCurrentPhotoPath('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      let photoPath = currentPhotoPath;

      // Si hay una nueva foto, subirla
      if (photoFile) {
        // Eliminar foto anterior si existe
        if (currentPhotoPath) {
          await supabase.storage
            .from('images')
            .remove([currentPhotoPath]);
        }

        // Subir nueva foto
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `consejo-${Date.now()}.${fileExt}`;
        photoPath = `consejo_directivo/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(photoPath, photoFile, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          throw uploadError;
        }
      }

      // Crear objeto de datos
      const data: ConsejoDirectivoData = {
        description,
        names: names.filter(name => name.trim() !== ''),
        photoPath: photoPath || undefined
      };

      // Guardar JSON
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });

      const { error: jsonError } = await supabase.storage
        .from('images')
        .upload('consejo_directivo/data.json', jsonBlob, {
          cacheControl: '3600',
          upsert: true
        });

      if (jsonError) {
        throw jsonError;
      }

      setMessage({ type: 'success', text: 'Datos guardados exitosamente' });
      setCurrentPhotoPath(photoPath);
      setPhotoFile(null);

      // Recargar datos
      setTimeout(() => {
        loadCurrentData();
      }, 1000);

    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'Error al guardar los datos' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Panel
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Gestión Consejo Directivo
          </h1>
          <p className="text-gray-600 mt-2">
            Edite la información del Consejo Directivo
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <span>{message.text}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Imagen */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Fotografía del Consejo Directivo
              </label>
              
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full max-w-2xl rounded-lg shadow-md"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Haga clic para subir una imagen</p>
                  </label>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Escriba la descripción del Consejo Directivo..."
              />
            </div>

            {/* Nombres */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Nombres de los Miembros
                </label>
                <button
                  onClick={handleAddName}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-semibold">Agregar nombre</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {names.map((name, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Nombre ${index + 1}`}
                    />
                    {names.length > 1 && (
                      <button
                        onClick={() => handleRemoveName(index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-end pt-6 border-t">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span className="font-semibold">
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsejoDirectivoManagement;
