import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface RectoriaSectionProps {
  onBack: () => void;
}

const RectoriaSection: React.FC<RectoriaSectionProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const rectorMessage = [
    "A nombre de la comunidad del Colegio Sagrados Corazones de Manquehue quisiera darles la más cordial bienvenida a todos quienes visitan nuestra página web, tanto a quienes son parte de la comunidad como a las personas que quieren conocernos un poco más. En este espacio encontrarán la información básica para que puedan conocer quiénes somos, qué es lo que buscamos y cómo estamos organizados para lograr nuestros objetivos.",
    
    "En primer lugar, somos un colegio de Iglesia que busca vivir su seguimiento a Jesús desde la espiritualidad de la Congregación de los Sagrados Corazones de Jesús y de María. Esto significa que queremos hacer nuestros los criterios, valores y opciones de Jesús en la realidad que nos corresponde vivir, para construir una sociedad más justa y solidaria. Queremos ser una comunidad en la que no solo se enseñen, sino que realmente se vivan nuestros valores institucionales: fraternidad, solidaridad, responsabilidad y respeto. Nuestro lema para este año, \"Aprendemos y crecemos siguiendo a Cristo y sirviendo al mundo\", resume nuestro anhelo como comunidad educativa: todos estamos llamados a aprender y desarrollarnos como personas, ya que el ser humano es siempre inacabado; en este proceso de crecimiento constante nuestro modelo y nuestra meta como comunidad es Jesús de Nazaret; en el Espíritu, es Él quien nos guía en la misión de construir un mundo más justo y solidario, donde cada persona sea respetada y pueda desarrollar sus potencialidades.",
    
    "Para la realización de esta gran tarea contamos con un gran equipo de profesores, que guían estos procesos buscando que cada estudiante desarrolle un amor por el aprendizaje, con altas expectativas respecto a cada uno de ellos y en constantes procesos de perfeccionamiento profesional. Este equipo es apoyado por todos quienes trabajamos en el colegio: orientadores, psicólogos, psicopedagogos, inspectores, auxiliares, administrativos y equipo directivo.",
    
    "Para que nuestro esfuerzo y dedicación nos permitan alcanzar nuestros objetivos contamos con el apoyo y trabajo conjunto con nuestras familias, con los padres y madres, como también con la creciente autonomía y compromiso de los estudiantes para con sus propios procesos de crecimiento y aprendizaje."
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (currentParagraph >= rectorMessage.length) return;

    const text = rectorMessage[currentParagraph];
    let index = 0;

    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
          setDisplayedText('');
        }, 500);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [currentParagraph]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Header with back button */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Rectoría
          </h1>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className={`relative h-[500px] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://i.postimg.cc/QtzdTX6C/rectoria.jpg"
          alt="Colegio Sagrados Corazones de Manquehue"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/40"></div>
        
        {/* Logo superpuesto */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="https://i.postimg.cc/pX9SpVm3/logosscc.png"
            alt="Logo Colegio Manquehue SSCC"
            className="h-48 w-48 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            {/* Rector's Message */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg shadow-md p-8 border-t-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Mensaje del Rector</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed min-h-[600px]">
                {rectorMessage.map((paragraph, index) => (
                  <p key={index} className={index < currentParagraph ? 'opacity-100' : index === currentParagraph ? 'opacity-100' : 'opacity-0'}>
                    {index < currentParagraph ? paragraph : index === currentParagraph ? displayedText : ''}
                    {index === currentParagraph && displayedText.length < paragraph.length && (
                      <span className="inline-block w-1 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                    )}
                  </p>
                ))}
                
                {currentParagraph >= rectorMessage.length && (
                  <div className="mt-8 text-center animate-fade-in">
                    <p className="font-semibold text-gray-800">Les saluda afectuosamente,</p>
                    <p className="text-xl font-bold text-blue-900 mt-2">Fernando Maffioletti Celedón</p>
                    <p className="text-gray-600 italic">Rector</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectoriaSection;
