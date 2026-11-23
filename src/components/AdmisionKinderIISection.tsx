import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface AdmissionStep {
  stage: string;
  date: string;
  detail: string;
}

interface AdmisionKinderIISectionProps {
  onBack?: () => void;
}

const admissionRows: AdmissionStep[] = [
  { stage: 'Apertura de Inscripciones', date: '13/07 al 17/07', detail: '' },
  {
    stage: 'Exámenes Académicos',
    date: '05/08 (15:00 a 18:00 hrs)',
    detail: 'Los exámenes son de Lenguaje, Matemáticas e Inglés.',
  },
  {
    stage: 'Entrevistas Apoderados de Postulantes',
    date: '27/07 al 21/08',
    detail: '15:45 y 17:00 horas.',
  },
  {
    stage: 'Entrevista Postulantes con Psicólogos',
    date: '31/07 al 21/08',
    detail: '15:45 y 17:00 horas.',
  },
  {
    stage: 'Ex colectivo postulantes de 5 básico a I medio',
    date: '30/07',
    detail: '14:00 a 15:00 horas.',
  },
  {
    stage: 'Publicación de Resultados',
    date: '04/09 (20:00 horas)',
    detail: 'Se enviará por correo electrónico a las familias y se publicarán en la portería del Colegio.',
  },
  {
    stage: 'Matrícula',
    date: '07 al 09/09',
    detail:
      'Este proceso se realiza en Administración (Padre Damián de Veuster 2215, de 8:30 a 13:30 horas y de 14:30 a 16:30 horas).',
  },
];

const vacancies = ['1° Básico', '2° Básico', '4° Básico', '6° Básico', '8° Básico', 'I Medio'];

export default function AdmisionKinderIISection({ onBack }: AdmisionKinderIISectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBack = () => {
    if (onBack) onBack();
    else if (window.navigateTo) window.navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-white text-[#20315f]">
      <div className="bg-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="group mb-4 flex items-center text-[#20315f] transition-all duration-300 hover:opacity-75"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </button>
          <h1 className="text-4xl font-bold tracking-tight text-[#20315f]">
            Admisión Kínder a I Medio
          </h1>
          <p className="mt-3 max-w-3xl text-justify text-sm leading-6 text-[#20315f]">
            Revisa el proceso de postulación 2027, los hitos clave y el acceso directo a la
            plataforma oficial.
          </p>
        </div>
      </div>

      <nav aria-label="Secciones de admisión" className="hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            <span aria-disabled="true" className="flex-shrink-0 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-[#20315f] whitespace-nowrap">
              Calendario
            </span>
            <span aria-disabled="true" className="flex-shrink-0 border-b-2 border-transparent px-6 py-4 text-sm font-semibold text-[#20315f] whitespace-nowrap">
              Vacantes y enlace
            </span>
          </div>
        </div>
      </nav>

      <section
        id="hero-admision"
        className={`mx-auto max-w-4xl px-4 py-16 transition-all duration-1000 sm:px-6 lg:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="rounded-2xl border border-[#20315f] bg-white p-8 shadow-xl">
          <h2
            role="status"
            className="mb-6 text-center text-3xl font-bold text-[#20315f]"
          >
            Nuestro proceso de admisión 2027 se encuentra cerrado. Gracias de antemano por la
            comprensión.
          </h2>
          <div className="mb-8 flex justify-center">
            <a
              href="https://manquehue.postulaciones.colegium.com/loginColegio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a7d7ef] px-6 py-4 text-center font-semibold text-[#20315f] shadow-lg transition-colors hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#20315f] focus:ring-offset-2"
            >
              Ingresa aquí
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
            </a>
          </div>
          <div className="mb-8 flex justify-center">
            <img
              src="https://i.postimg.cc/W4y9DVsx/kinderprimeromedio.jpg"
              alt="Admisión Kínder a I Medio"
              className="h-auto max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="hidden">
        <section id="calendario-admision" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-[#20315f]">Calendario de admisión</h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-xl">
              <div className="border-b border-slate-300 px-4 py-3 text-center text-base font-semibold text-[#20315f] sm:text-lg">
                Proceso de Admisión Marzo 2027
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white text-left text-sm sm:text-base">
                  <tbody>
                    {admissionRows.map((row) => (
                      <tr key={row.stage} className="border-b border-slate-300 align-top last:border-b-0">
                        <td className="w-[28%] border-r border-slate-300 px-4 py-4 font-semibold text-[#20315f] sm:px-5">
                          {row.stage}
                        </td>
                        <td className="w-[22%] border-r border-slate-300 px-4 py-4 text-[#20315f] sm:px-5">
                          {row.date}
                        </td>
                        <td className="px-4 py-4 text-[#20315f] sm:px-5">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="vacantes-admision" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#20315f] bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#20315f]">Vacantes y acceso</h2>
              <p className="mt-2 text-justify text-[#20315f]">
                En esta oportunidad, contamos con una vacante para cada uno de los siguientes
                niveles:
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {vacancies.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[#20315f] bg-white px-4 py-3 text-center text-sm font-semibold text-[#20315f]"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl border border-[#20315f] bg-white p-6">
              <p className="text-justify text-sm leading-6 text-[#20315f] sm:text-base">
                Las postulaciones se realizan exclusivamente a través de nuestra página web, en{' '}
                <span className="font-semibold underline decoration-[#20315f] underline-offset-4">
                  este enlace
                </span>
                . No se tomarán en consideración postulaciones realizadas por otra vía.
              </p>
              <p className="mt-4 text-justify text-sm leading-6 text-[#20315f] sm:text-base">
                Matrícula: 07 al 09/09. Este proceso se realiza en Administración (Padre Damián de
                Veuster 2215, de 8:30 a 13:30 horas y de 14:30 a 16:30 horas).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
