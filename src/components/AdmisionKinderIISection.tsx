import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ArrowLeft } from 'lucide-react';

interface CalendarioItem {
  id: number;
  fecha: string;
  hora: string;
  proceso: string;
  order_index: number;
}



export default function AdmisionKinderIISection({ onBack }: { onBack?: () => void }) {
  const [calendario, setCalendario] = useState<CalendarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendario = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('admision_kinder_ii_calendario')
        .select('*')
        .order('order_index');
      if (error) setError('Error al cargar el calendario');
      else setCalendario(data || []);
      setLoading(false);
    };
    fetchCalendario();
  }, []);

  // Handler para volver
  const handleBack = () => {
    if (onBack) onBack();
    else if (window.navigateTo) window.navigateTo('home');
  };

  return (
    <section className="max-w-2xl mx-auto mt-12 mb-12 p-6 bg-white rounded-xl shadow-lg border border-blue-100">
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver
      </button>
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Admisión Kínder a II°</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <p className="text-lg font-semibold text-blue-900">
          Proceso cerrado hasta nuevo aviso
        </p>
      </div>
    </section>
  );
}
