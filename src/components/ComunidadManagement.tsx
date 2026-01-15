import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Trash2, Edit2, Plus, Loader2, AlertCircle, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ComunidadManagementProps {
  onBack: () => void;
}

interface Bloque {
  id: string;
  bloque_numero: number;
  titulo: string;
  descripcion: string;
  boton_texto: string;
  boton_url: string;
  mostrar_integrantes: boolean;
  activo: boolean;
  order_index: number;
}

interface Foto {
  id: string;
  bloque_id: string;
  photo_url: string;
  photo_name: string;
  caption: string;
  order_index: number;
}

interface Integrante {
  id: string;
  bloque_id: string;
  nombre: string;
  cargo: string;
  foto_url: string;
  email: string;
  telefono: string;
  descripcion: string;
  order_index: number;
}

const ComunidadManagement: React.FC<ComunidadManagementProps> = ({ onBack }) => {
  const [bloques, setBloques] = useState<Bloque[]>([]);
  const [fotos, setFotos] = useState<{ [bloqueId: string]: Foto[] }>({});
  const [integrantes, setIntegrantes] = useState<{ [bloqueId: string]: Integrante[] }>({});
  const [expandedBloque, setExpandedBloque] = useState<string | null>(null);
  const [editingBloque, setEditingBloque] = useState<Bloque | null>(null);
  const [editingIntegrante, setEditingIntegrante] = useState<Integrante | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: bloquesData, error: bloquesError } = await supabase
        .from('comunidad_bloques')
        .select('*')
        .order('order_index');

      if (bloquesError) {
        console.error('Error fetching bloques:', bloquesError);
        throw bloquesError;
      }
      
      console.log('Bloques fetched:', bloquesData);
      setBloques(bloquesData || []);

      const { data: fotosData, error: fotosError } = await supabase
        .from('comunidad_fotos')
        .select('*')
        .order('order_index');

      if (fotosError) throw fotosError;

      const fotosPorBloque: { [bloqueId: string]: Foto[] } = {};
      fotosData?.forEach((foto) => {
        if (!fotosPorBloque[foto.bloque_id]) {
          fotosPorBloque[foto.bloque_id] = [];
        }
        fotosPorBloque[foto.bloque_id].push(foto);
      });
      setFotos(fotosPorBloque);

      const { data: integrantesData, error: integrantesError } = await supabase
        .from('comunidad_integrantes')
        .select('*')
        .order('order_index');

      if (integrantesError) throw integrantesError;

      const integrantesPorBloque: { [bloqueId: string]: Integrante[] } = {};
      integrantesData?.forEach((integrante) => {
        if (!integrantesPorBloque[integrante.bloque_id]) {
          integrantesPorBloque[integrante.bloque_id] = [];
        }
        integrantesPorBloque[integrante.bloque_id].push(integrante);
      });
      setIntegrantes(integrantesPorBloque);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBloque = async () => {
    if (!editingBloque) return;
    setSaving(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('comunidad_bloques')
        .update({
          titulo: editingBloque.titulo,
          descripcion: editingBloque.descripcion,
          boton_texto: editingBloque.boton_texto,
          boton_url: editingBloque.boton_url,
          mostrar_integrantes: editingBloque.mostrar_integrantes,
          activo: editingBloque.activo,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingBloque.id)
        .select();

      if (error) {
        console.error('Error updating bloque:', error);
        throw error;
      }
      
      console.log('Bloque updated successfully:', data);
      await fetchData();
      setSuccess('Bloque actualizado correctamente');
      setEditingBloque(null);
    } catch (err: any) {
      console.error('Error in handleSaveBloque:', err);
      setError(err.message || 'Error al actualizar el bloque');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadFoto = async (bloqueId: string, file: File) => {
    setSaving(true);
    try {
      const fileName = `comunidad/${bloqueId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('news-images').getPublicUrl(fileName);

      const currentFotos = fotos[bloqueId] || [];
      const { error: insertError } = await supabase.from('comunidad_fotos').insert([
        {
          bloque_id: bloqueId,
          photo_url: data.publicUrl,
          photo_name: fileName,
          order_index: currentFotos.length,
        },
      ]);

      if (insertError) throw insertError;
      setSuccess('Foto subida correctamente');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFoto = async (foto: Foto) => {
    if (!confirm('¿Eliminar esta foto?')) return;
    setSaving(true);
    try {
      await supabase.storage.from('news-images').remove([foto.photo_name]);
      await supabase.from('comunidad_fotos').delete().eq('id', foto.id);
      setSuccess('Foto eliminada');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveIntegrante = async (bloqueId: string, integrante: Partial<Integrante>) => {
    setSaving(true);
    try {
      if (editingIntegrante && editingIntegrante.id) {
        // Actualizar integrante existente - excluir id, bloque_id, order_index, created_at, updated_at
        const { id, bloque_id, order_index, created_at, updated_at, ...updateData } = integrante;
        const { error } = await supabase
          .from('comunidad_integrantes')
          .update(updateData)
          .eq('id', editingIntegrante.id);
        if (error) throw error;
        setSuccess('Integrante actualizado');
      } else {
        // Crear nuevo integrante - excluir id, created_at, updated_at
        const currentIntegrantes = integrantes[bloqueId] || [];
        const { id, created_at, updated_at, ...insertData } = integrante;
        const { error } = await supabase.from('comunidad_integrantes').insert([
          {
            ...insertData,
            bloque_id: bloqueId,
            order_index: currentIntegrantes.length,
          },
        ]);
        if (error) throw error;
        setSuccess('Integrante agregado');
      }
      setEditingIntegrante(null);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteIntegrante = async (integrante: Integrante) => {
    if (!confirm('¿Eliminar este integrante?')) return;
    setSaving(true);
    try {
      if (integrante.foto_url) {
        const urlParts = integrante.foto_url.split('/');
        const fileName = urlParts.slice(-3).join('/');
        if (fileName && fileName.startsWith('comunidad/integrantes/')) {
          await supabase.storage.from('news-images').remove([fileName]);
        }
      }
      await supabase.from('comunidad_integrantes').delete().eq('id', integrante.id);
      setSuccess('Integrante eliminado');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUploadIntegranteFoto = async (integranteId: string, file: File) => {
    setSaving(true);
    try {
      const fileName = `comunidad/integrantes/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('news-images').getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('comunidad_integrantes')
        .update({ foto_url: data.publicUrl })
        .eq('id', integranteId);

      if (updateError) throw updateError;
      setSuccess('Foto de integrante subida');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver al Panel
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Comunidad</h1>

        {/* Mensajes */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircle className="mr-2" size={20} />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Bloques */}
        <div className="space-y-6">
          {bloques.map((bloque) => {
            const isExpanded = expandedBloque === bloque.id;
            const isEditing = editingBloque?.id === bloque.id;
            const bloqueFotos = fotos[bloque.id] || [];
            const bloqueIntegrantes = integrantes[bloque.id] || [];

            return (
              <div key={bloque.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header del Bloque */}
                <div
                  className="p-4 bg-blue-50 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => setExpandedBloque(isExpanded ? null : bloque.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {bloque.bloque_numero}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{bloque.titulo}</h2>
                      <p className="text-sm text-gray-500">
                        {bloqueFotos.length} fotos • {bloqueIntegrantes.length} integrantes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bloque.activo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {bloque.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Contenido del Bloque */}
                {isExpanded && (
                  <div className="p-6 space-y-6">
                    {/* Editar Bloque */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Edit2 size={18} />
                        Configuración del Bloque
                      </h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Título
                            </label>
                            <input
                              type="text"
                              value={editingBloque.titulo}
                              onChange={(e) =>
                                setEditingBloque({ ...editingBloque, titulo: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Descripción
                            </label>
                            <textarea
                              value={editingBloque.descripcion}
                              onChange={(e) =>
                                setEditingBloque({ ...editingBloque, descripcion: e.target.value })
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Texto del Botón
                              </label>
                              <input
                                type="text"
                                value={editingBloque.boton_texto}
                                onChange={(e) =>
                                  setEditingBloque({ ...editingBloque, boton_texto: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL del Botón (opcional)
                              </label>
                              <input
                                type="text"
                                value={editingBloque.boton_url}
                                onChange={(e) =>
                                  setEditingBloque({ ...editingBloque, boton_url: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editingBloque.mostrar_integrantes}
                                onChange={(e) =>
                                  setEditingBloque({
                                    ...editingBloque,
                                    mostrar_integrantes: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Mostrar integrantes
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={editingBloque.activo}
                                onChange={(e) =>
                                  setEditingBloque({ ...editingBloque, activo: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm font-medium text-gray-700">Activo</span>
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveBloque}
                              disabled={saving}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                            >
                              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingBloque(null)}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-2">{bloque.descripcion}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            Botón: "{bloque.boton_texto}" {bloque.boton_url && `→ ${bloque.boton_url}`}
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            Mostrar integrantes: {bloque.mostrar_integrantes ? 'Sí' : 'No'}
                          </p>
                          <button
                            onClick={() => setEditingBloque(bloque)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                          >
                            <Edit2 size={18} />
                            Editar
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Fotos */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Upload size={18} />
                        Carrusel de Fotos
                      </h3>
                      <div className="mb-4">
                        <label className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer inline-flex items-center gap-2">
                          <Upload size={18} />
                          Subir Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadFoto(bloque.id, file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {bloqueFotos.map((foto) => (
                          <div key={foto.id} className="relative group">
                            <img
                              src={foto.photo_url}
                              alt={foto.caption || 'Foto'}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => handleDeleteFoto(foto)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={16} />
                            </button>
                            {foto.caption && (
                              <p className="text-xs text-gray-600 mt-1 truncate">{foto.caption}</p>
                            )}
                          </div>
                        ))}
                        {bloqueFotos.length === 0 && (
                          <p className="col-span-full text-gray-500 text-center py-4">
                            No hay fotos. Sube la primera foto.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Integrantes */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users size={18} />
                        Integrantes
                      </h3>
                      <button
                        onClick={() =>
                          setEditingIntegrante({
                            id: '',
                            bloque_id: bloque.id,
                            nombre: '',
                            cargo: '',
                            foto_url: '',
                            email: '',
                            telefono: '',
                            descripcion: '',
                            order_index: bloqueIntegrantes.length,
                          })
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 mb-4"
                      >
                        <Plus size={18} />
                        Agregar Integrante
                      </button>

                      {editingIntegrante && editingIntegrante.bloque_id === bloque.id && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                              </label>
                              <input
                                type="text"
                                value={editingIntegrante.nombre}
                                onChange={(e) =>
                                  setEditingIntegrante({ ...editingIntegrante, nombre: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cargo
                              </label>
                              <input
                                type="text"
                                value={editingIntegrante.cargo}
                                onChange={(e) =>
                                  setEditingIntegrante({ ...editingIntegrante, cargo: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                value={editingIntegrante.email}
                                onChange={(e) =>
                                  setEditingIntegrante({ ...editingIntegrante, email: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono
                              </label>
                              <input
                                type="text"
                                value={editingIntegrante.telefono}
                                onChange={(e) =>
                                  setEditingIntegrante({ ...editingIntegrante, telefono: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Descripción
                            </label>
                            <textarea
                              value={editingIntegrante.descripcion}
                              onChange={(e) =>
                                setEditingIntegrante({ ...editingIntegrante, descripcion: e.target.value })
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveIntegrante(bloque.id, editingIntegrante)}
                              disabled={saving || !editingIntegrante.nombre}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                            >
                              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingIntegrante(null)}
                              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bloqueIntegrantes.map((integrante) => (
                          <div key={integrante.id} className="bg-gray-50 p-4 rounded-lg flex gap-4">
                            <div className="flex-shrink-0">
                              {integrante.foto_url ? (
                                <img
                                  src={integrante.foto_url}
                                  alt={integrante.nombre}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                  <Users size={24} className="text-gray-500" />
                                </div>
                              )}
                              <label className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline block text-center">
                                Cambiar
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleUploadIntegranteFoto(integrante.id, file);
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{integrante.nombre}</h4>
                              <p className="text-sm text-blue-600">{integrante.cargo}</p>
                              {integrante.email && (
                                <p className="text-xs text-gray-600">{integrante.email}</p>
                              )}
                              {integrante.telefono && (
                                <p className="text-xs text-gray-600">{integrante.telefono}</p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => setEditingIntegrante(integrante)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteIntegrante(integrante)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {bloqueIntegrantes.length === 0 && (
                          <p className="col-span-full text-gray-500 text-center py-4">
                            No hay integrantes. Agrega el primero.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComunidadManagement;
