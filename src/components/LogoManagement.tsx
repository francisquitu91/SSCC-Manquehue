import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LogoManagementProps {
  onNavigate: (page: string) => void;
}

// Nombre fijo para el logo - siempre será el mismo archivo
const LOGO_FILENAME = 'site-main-logo';

const LogoManagement: React.FC<LogoManagementProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    checkExistingLogo();
  }, []);

  const checkExistingLogo = async () => {
    try {
      // Buscar si existe un logo en el bucket
      const { data: files, error } = await supabase.storage
        .from('news-images')
        .list('', {
          search: LOGO_FILENAME
        });

      if (error) {
        console.error('Error checking for logo:', error);
        setLoading(false);
        return;
      }

      // Buscar el archivo del logo
      const logoFile = files?.find(f => f.name.startsWith(LOGO_FILENAME));
      
      if (logoFile) {
        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(logoFile.name);
        
        setCurrentLogoUrl(publicUrl);
        setPreviewUrl(publicUrl);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es muy grande. El tamaño máximo es 5MB');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadLogo = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo primero');
      return;
    }

    setUploading(true);
    try {
      // Primero eliminar logos anteriores
      const { data: existingFiles } = await supabase.storage
        .from('news-images')
        .list('', {
          search: LOGO_FILENAME
        });

      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles
          .filter(f => f.name.startsWith(LOGO_FILENAME))
          .map(f => f.name);
        
        if (filesToDelete.length > 0) {
          await supabase.storage
            .from('news-images')
            .remove(filesToDelete);
        }
      }

      // Subir nuevo logo con nombre fijo + extensión
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${LOGO_FILENAME}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert(`Error al subir: ${uploadError.message}`);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      setCurrentLogoUrl(publicUrl);
      setPreviewUrl(publicUrl);
      setSelectedFile(null);

      alert('¡Logo subido exitosamente! Recarga la página para ver los cambios en la navbar.');
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      alert(`Error: ${error?.message || 'Error desconocido'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLogo = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar el logo?')) return;

    try {
      const { data: existingFiles } = await supabase.storage
        .from('news-images')
        .list('', {
          search: LOGO_FILENAME
        });

      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles
          .filter(f => f.name.startsWith(LOGO_FILENAME))
          .map(f => f.name);
        
        if (filesToDelete.length > 0) {
          await supabase.storage
            .from('news-images')
            .remove(filesToDelete);
        }
      }

      setCurrentLogoUrl(null);
      setPreviewUrl(null);
      alert('Logo eliminado. Recarga la página para ver los cambios.');
    } catch (error: any) {
      alert(`Error: ${error?.message || 'Error desconocido'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b2540] to-[#08304a] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b2540] to-[#08304a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => onNavigate('admin')}
          className="flex items-center text-blue-200 hover:text-white transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al Panel de Administración
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Gestión del Logo Principal</h1>
          <p className="text-blue-100 text-lg">
            Administra el logo que aparece en la barra de navegación del sitio
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Current Logo Preview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-6 h-6 mr-2" />
              Logo Actual
            </h2>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-8 min-h-[200px]">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Logo actual"
                    className="max-h-48 max-w-full object-contain mb-4"
                    onError={() => {
                      setPreviewUrl(null);
                      setCurrentLogoUrl(null);
                    }}
                  />
                  {currentLogoUrl && !selectedFile && (
                    <button
                      onClick={handleDeleteLogo}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-800 mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar logo</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="text-gray-400 text-center">
                  <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                  <p>No hay logo configurado</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload New Logo */}
          <div className="mb-8 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Upload className="w-6 h-6 mr-2" />
              Subir Nuevo Logo
            </h2>
            <p className="text-gray-600 mb-4">
              Sube un archivo de imagen desde tu computadora (PNG, JPG, SVG). Tamaño máximo: 5MB
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Seleccionar archivo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                />
              </div>

              {selectedFile && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Archivo seleccionado:</strong> {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              <button
                onClick={handleUploadLogo}
                disabled={!selectedFile || uploading}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  !selectedFile || uploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>{uploading ? 'Subiendo...' : 'Subir Logo'}</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📌 Recomendaciones
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Usa imágenes en formato PNG con fondo transparente para mejores resultados</li>
              <li>• Dimensiones recomendadas: 200x200 píxeles o más</li>
              <li>• El logo se ajustará automáticamente al tamaño de la barra de navegación</li>
              <li>• <strong>Recarga la página</strong> después de subir para ver los cambios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoManagement;
