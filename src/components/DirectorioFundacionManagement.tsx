import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface FundacionData {
  description: string;
  names: string[];
  photoPath?: string;
}

const BUCKET = 'images';
const JSON_PATH = 'fundacion_directorio/data.json';

const DirectorioFundacionManagement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<FundacionData>({ description: '', names: [], photoPath: undefined });
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [namesText, setNamesText] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: file, error } = await supabase.storage.from(BUCKET).download(JSON_PATH);
      if (!error && file) {
        const text = await file.text();
        const parsed = JSON.parse(text) as FundacionData;
        setData(parsed);
        setDescription(parsed.description || '');
        setNamesText((parsed.names || []).join(', '));
        if (parsed.photoPath) {
          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(parsed.photoPath);
          setPhotoUrl(urlData.publicUrl);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const path = `fundacion_directorio/fundacion-${Date.now()}.${ext}`;
    try {
      setUploading(true);
      const { data: up, error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(up.path);
      setPhotoUrl(urlData.publicUrl);
      setData((d) => ({ ...d, photoPath: up.path }));
    } catch (err) {
      console.error(err);
      alert('Error subiendo la imagen');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    const payload: FundacionData = { description, names: namesText.split(',').map(s => s.trim()).filter(Boolean), photoPath: data.photoPath };
    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      await supabase.storage.from(BUCKET).upload(JSON_PATH, blob, { upsert: true });
      setData(payload);
      alert('Guardado correctamente');
    } catch (err) {
      console.error(err);
      alert('Error guardando');
    }
  };

  if (loading) return <div className="py-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={onBack} className="mb-4 text-red-600">Volver al panel de administración</button>

        <h2 className="text-2xl font-bold mb-4">Gestión Directorio Fundación</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Foto principal</label>
          {photoUrl ? <img src={photoUrl} className="max-h-72 my-2" alt="foto" /> : <div className="h-40 bg-gray-100 my-2 flex items-center justify-center">Sin foto</div>}
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Texto introductorio</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full p-2 border" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nombres (separados por coma)</label>
          <input value={namesText} onChange={(e) => setNamesText(e.target.value)} className="w-full p-2 border" />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={save} className="px-4 py-2 bg-red-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default DirectorioFundacionManagement;
