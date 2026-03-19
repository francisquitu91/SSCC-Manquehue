import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RectoriaSectionProps {
  onBack: () => void;
}

const LOGO_FILENAME = 'site-main-logo';

const RectoriaSection: React.FC<RectoriaSectionProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  const rectorMessage = [
    "Querida Comunidad del Colegio Sagrados Corazones de Manquehue:",
    "¡Bienvenidos al año escolar 2026!",
    "\"Ustedes son la luz del mundo\" (Mt 5,14).",
    "Con especial alegría y emoción los saludo al iniciar este nuevo año. Para muchos será un comienzo lleno de expectativas; para otros, el cierre de una etapa significativa. Para mí, tiene un sentido muy especial, ya que asumo como rectora de un colegio que ha sido parte fundamental de mi vida.",
    "Llegué el año 1999 como profesora de inglés, y aquí descubrí mucho más que un lugar de trabajo: una comunidad con identidad, sentido de pertenencia y una profunda vocación formativa. Inspirados en la espiritualidad de los Sagrados Corazones de Jesús y de María, entendemos la educación como un acto de amor, que busca formar personas íntegras, comprometidas y capaces de servir con generosidad.",
    "Asumo este desafío con gratitud y responsabilidad, convencida de que el liderazgo es, ante todo, servicio. Confío plenamente en nuestra comunidad: en el compromiso de nuestros educadores, en la riqueza de nuestros estudiantes y en el rol fundamental de las familias, con quienes compartimos la misión de educar.",
    "Seguiremos fortaleciendo nuestro proyecto educativo, poniendo a los estudiantes en el centro, promoviendo una formación integral que combine excelencia académica, desarrollo personal, innovación pedagógica y una vivencia profunda de nuestra espiritualidad. La vida pastoral, el deporte, las artes y las diversas actividades seguirán siendo espacios clave para crecer en comunidad y desarrollar talentos.",
    "Encomendamos este año a los Sagrados Corazones de Jesús y de María, para que nos inspiren a amar, acoger y servir con alegría.",
    "Los invito a caminar juntos, como una sola comunidad, construyendo un colegio donde cada persona se sienta valorada y llamada a aportar al bien común.",
    "Con mucho cariño,"
  ];

  useEffect(() => {
    setIsVisible(true);
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('news-images')
        .list('', {
          search: LOGO_FILENAME
        });

      if (error) {
        console.error('Error fetching logo:', error);
        return;
      }

      const logoFile = files?.find((f) => f.name.startsWith(LOGO_FILENAME));

      if (logoFile) {
        const {
          data: { publicUrl }
        } = supabase.storage.from('news-images').getPublicUrl(logoFile.name);

        setLogoUrl(publicUrl);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

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
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo Colegio Manquehue SSCC"
              className="h-48 w-48 object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="h-48 w-48" aria-hidden="true"></div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            {/* Rector's Message */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg shadow-md p-8 border-t-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Mensaje de la Rectora</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed min-h-[900px]">
                <div className="float-right ml-4 mb-3 mt-1">
                  <img
                    src="https://i.postimg.cc/NfkX5tV7/Whats-App-Image-2026-03-16-at-15-42-42.jpg"
                    alt="Comunidad educativa Colegio Sagrados Corazones de Manquehue"
                    className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-lg shadow-md border border-blue-100"
                  />
                </div>

                {rectorMessage.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    <p className={index < currentParagraph ? 'opacity-100' : index === currentParagraph ? 'opacity-100' : 'opacity-0'}>
                      {index < currentParagraph ? paragraph : index === currentParagraph ? displayedText : ''}
                      {index === currentParagraph && displayedText.length < paragraph.length && (
                        <span className="inline-block w-1 h-5 bg-blue-600 ml-1 animate-pulse"></span>
                      )}
                    </p>
                  </React.Fragment>
                ))}
                
                {currentParagraph >= rectorMessage.length && (
                  <div className="clear-both mt-8 text-center animate-fade-in">
                    <p className="text-xl font-bold text-blue-900 mt-2">Sandra Durán Vega</p>
                    <p className="text-gray-600 italic">Rectora</p>
                    <p className="text-gray-700">Colegio Sagrados Corazones de Manquehue</p>
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
