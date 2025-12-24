import React from "react";

const calendario = [
  { fecha: "29/10", hora: "9:00 hrs", proceso: "Inicio proceso inscripción a través pág web" },
  { fecha: "04/11", hora: "20:00 hrs", proceso: "Cierre inscripción" },
  { fecha: "12/11", hora: "15:00 hrs", proceso: "Evaluaciones académicas a postulantes." },
  { fecha: "10/11 al 25/11", hora: "14:00 hrs 15:35 hrs 17:00 hrs", proceso: "Entrevistas apoderados de postulantes. (se enviará correo electrónico para que se puedan inscribir)" },
  { fecha: "10/11 al 25/11", hora: "14:00 hrs 15:35 hrs 17:00 hrs", proceso: "Entrevista personal a postulantes con psicólogo. (Se enviará correo electrónico para que se puedan inscribir)" },
  { fecha: "28/11", hora: "20:00 hrs", proceso: "Entrega resultados por correo a Familias Postulantes" },
  { fecha: "1 al 5/12", hora: "8:30 a 13:30 14:30 a 15:30", proceso: "Pago Matrícula" },
];

export default function AdmisionKinderIISection() {
  return (
    <section className="max-w-2xl mx-auto mt-12 mb-12 p-6 bg-white rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Admisión Kínder a II°</h2>
      <div className="text-gray-700 text-center text-base">Aquí irá la información de Admisión Kínder a II°.</div>
    </section>
  );
}
