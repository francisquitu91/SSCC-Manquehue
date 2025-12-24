import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import Historia from './components/Historia';
import HistoriaCongregacion from './components/HistoriaCongregacion';
import HistoriaColegio from './components/HistoriaColegio';
import VisionMision from './components/VisionMision';
import NewsSection from './components/NewsSection';
import NewsManagement from './components/NewsManagement';
import DirectoryManagement from './components/DirectoryManagement';
import ProyectoEducativo from './components/ProyectoEducativo';
import ProyectoEducativoManagement from './components/ProyectoEducativoManagement';
import StudentWithdrawalControl from './components/StudentWithdrawalControl';
import AdminDashboard from './components/AdminDashboard';
import Tour360Section from './components/Tour360Section';
import ACLESSection from './components/ACLESSection';
import DepartamentoOrientacionSection from './components/DepartamentoOrientacionSection';
import DepartamentoOrientacionManagement from './components/DepartamentoOrientacionManagement';
import VicerretoriaFormacionSection from './components/VicerretoriaFormacionSection';
import InstitutionalDocuments from './components/InstitutionalDocuments';
import InstitutionalDocumentsManagement from './components/InstitutionalDocumentsManagement';
import CEALSection from './components/CEALSection';
import PastoralJuvenilSection from './components/PastoralJuvenilSection';
import CEALManagement from './components/CEALManagement';
import PastoralManagement from './components/PastoralManagement';
import FundacionPentecostes from './components/FundacionPentecostes';
import DirectorioFundacion from './components/DirectorioFundacion';
import AdmisionSection from './components/AdmisionSection';
import AdmisionManagement from './components/AdmisionManagement';
import BibliotecaSection from './components/BibliotecaSection';
import BibliotecaManagement from './components/BibliotecaManagement';
import UtilesEscolaresSection from './components/UtilesEscolaresSection';
import UtilesEscolaresManagement from './components/UtilesEscolaresManagement';
import CasinoModal from './components/CasinoModal';
import CasinoManagement from './components/CasinoManagement';
import UniformesEscolaresSection from './components/UniformesEscolaresSection';
import UniformesEscolaresManagement from './components/UniformesEscolaresManagement';
import HorariosSection from './components/HorariosSection';
import HorariosManagement from './components/HorariosManagement';
import PagosSection from './components/PagosSection';
import PagosManagement from './components/PagosManagement';
import RecursosDigitalesSection from './components/RecursosDigitalesSection';
import RecursosDigitalesManagement from './components/RecursosDigitalesManagement';
import FechasImportantesSection from './components/FechasImportantesSection';
import FechasImportantesManagement from './components/FechasImportantesManagement';
import AnnouncementPopup from './components/AnnouncementPopup';
import AnnouncementManagement from './components/AnnouncementManagement';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import ColegioInfoSection from './components/ColegioInfoSection';
import PlanLectorSection from './components/PlanLectorSection';
import PlanLectorManagement from './components/PlanLectorManagement';
import DirectorioFundacionManagement from './components/DirectorioFundacionManagement';
import RectoriaSection from './components/RectoriaSection';
import ProyectoEducativoDocumento from './components/ProyectoEducativoDocumento';
import ProyectoEducativoDocumentoManagement from './components/ProyectoEducativoDocumentoManagement';
import ConsejoDirectivo from './components/ConsejoDirectivo';
import ConsejoDirectivoManagement from './components/ConsejoDirectivoManagement';
import ValoresSection from './components/ValoresSection';
import ValoresManagement from './components/ValoresManagement';
import AdmisionKinderIISection from './components/AdmisionKinderIISection';
import CalendarioCicloSection from './components/CalendarioCicloSection';

const backgroundImages = [
  'https://i.postimg.cc/4N3HzXdH/mjsscc.jpg',
  'https://i.postimg.cc/sg7jWLpM/hbasquetsscc.jpg',
  'https://i.postimg.cc/ydkYD8n8/voleysscc.jpg',
  'https://i.postimg.cc/fRfbFFJD/ateltasscc.jpg',
  'https://i.postimg.cc/BbSpTR8R/ceremonia1sscc.jpg',
  'https://i.postimg.cc/fWCBzWph/ceremonia2sscc.jpg',
  'https://i.postimg.cc/8CG6fMft/frasesscc.jpg'
];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showCasinoModal, setShowCasinoModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePageChange = (page: string) => {
    if (page === 'casino') {
      setShowCasinoModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  // Expose a simple global navigation helper so inner components
  // can switch pages without threading the onPageChange prop everywhere.
  // This keeps existing state-driven navigation but allows button links
  // in components like BibliotecaSection to open the Plan Lector view.
  (window as any).navigateTo = handlePageChange;

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleBackToAdmin = () => {
    setCurrentPage('admin');
  };

  if (currentPage === 'historia') {
    return <Historia onBack={handleBackToHome} />;
  }

  if (currentPage === 'historia-congregacion') {
    return <HistoriaCongregacion onBack={handleBackToHome} />;
  }

  if (currentPage === 'historia-colegio') {
    return <HistoriaColegio onBack={handleBackToHome} />;
  }

  if (currentPage === 'vision-mision') {
    return <VisionMision onBack={handleBackToHome} />;
  }

  if (currentPage === 'acles') {
    return <ACLESSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'departamento-orientacion') {
    return <DepartamentoOrientacionSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'vicerrectoria-formacion') {
    return <VicerretoriaFormacionSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'tour-virtual') {
    return <Tour360Section onBack={handleBackToHome} />;
  }

  if (currentPage === 'documentos-institucionales') {
    return <InstitutionalDocuments onBack={handleBackToHome} />;
  }

  if (currentPage === 'ceal') {
    return <CEALSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'pastoral-juvenil') {
    return <PastoralJuvenilSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'rectoria') {
    return <RectoriaSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'institutional-documents-management') {
    return <InstitutionalDocumentsManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'ceal-management') {
    return <CEALManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'pastoral-management') {
    return <PastoralManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'fundacion-pentecostes') {
    return <FundacionPentecostes onBack={handleBackToHome} />;
  }

  if (currentPage === 'directorio-fundacion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
        {/* Header with back button */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Directorio Fundación</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <DirectorioFundacion />
        </div>
      </div>
    );
  }

  if (currentPage === 'consejo-directivo') {
    return <ConsejoDirectivo onBack={handleBackToHome} />;
  }

  if (currentPage === 'admision') {
    return <AdmisionSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'biblioteca') {
    return <BibliotecaSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'utiles-escolares') {
    return <UtilesEscolaresSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'uniformes-escolares') {
    return <UniformesEscolaresSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'horarios') {
    return <HorariosSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'pagos') {
    return <PagosSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'valores') {
    return <ValoresSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'recursos-digitales') {
    return <RecursosDigitalesSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'fechas-importantes') {
    return <FechasImportantesSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'admision-management') {
    return <AdmisionManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'biblioteca-management') {
    return <BibliotecaManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'utiles-escolares-management') {
    return <UtilesEscolaresManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'casino-management') {
    return <CasinoManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'uniformes-escolares-management') {
    return <UniformesEscolaresManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'horarios-management') {
    return <HorariosManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'pagos-management') {
    return <PagosManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'recursos-digitales-management') {
    return <RecursosDigitalesManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'fechas-importantes-management') {
    return <FechasImportantesManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'valores-management') {
    return <ValoresManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'announcement-management') {
    return <AnnouncementManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'departamento-orientacion-management') {
    return <DepartamentoOrientacionManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'news-management') {
    return <NewsManagement onBack={handleBackToAdmin} />;
  }


  if (currentPage === 'directory-management') {
    return <DirectoryManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'directorio-fundacion-management') {
    return <DirectorioFundacionManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'consejo-directivo-management') {
    return <ConsejoDirectivoManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'proyecto-educativo') {
    return <ProyectoEducativoDocumento onBack={handleBackToHome} />;
  }

  if (currentPage === 'proyecto-educativo-equipo') {
    return <ProyectoEducativo onBack={handleBackToHome} />;
  }

  if (currentPage === 'plan-lector') {
    return <PlanLectorSection onBack={handleBackToHome} />;
  }

  if (currentPage === 'plan-lector-management') {
    return <PlanLectorManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'proyecto-educativo-management') {
    return <ProyectoEducativoDocumentoManagement onBack={handleBackToAdmin} />;
  }

  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminDashboard onNavigate={handlePageChange} onLogout={handleAdminLogout} />;
  }

  if (currentPage === 'student-withdrawal') {
    return <StudentWithdrawalControl onBack={handleBackToHome} />;
  }

  if (currentPage === 'admision-kinder-ii') {
    return <AdmisionKinderIISection />;
  }

  if (currentPage === 'calendario-primer-ciclo') {
    return <CalendarioCicloSection ciclo="primer" onBack={handleBackToHome} />;
  }
  if (currentPage === 'calendario-segundo-ciclo') {
    return <CalendarioCicloSection ciclo="segundo" onBack={handleBackToHome} />;
  }
  if (currentPage === 'calendario-tercer-ciclo') {
    return <CalendarioCicloSection ciclo="tercer" onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Announcement Popup */}
      <AnnouncementPopup />
      
      {/* Navigation - Fixed at top */}
      <Navbar onPageChange={handlePageChange} />

      {/* Hero Section with Background */}
      <div className="relative min-h-screen overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Overlay negro solo para la tercera imagen */}
            {index === 2 && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </div>
        ))}
        
        {/* Light Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <main className="px-8 md:px-12 lg:px-16">
          <div className="text-left max-w-4xl">
            <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight tracking-wide drop-shadow-lg">
              ¿POR QUÉ ELEGIR<br />SAGRADOS CORAZONES<br />DE MANQUEHUE?
            </h1>
            
            <p className="text-white text-xs md:text-sm lg:text-base mb-6 leading-relaxed font-medium max-w-2xl drop-shadow-md">
              FORMACIÓN INTEGRAL – ESPIRITUALIDAD SSCC
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => handlePageChange('proyecto-educativo')}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-transparent border-2 border-white rounded-none overflow-hidden transition-all duration-300 hover:bg-white hover:text-gray-800 drop-shadow-lg uppercase tracking-wide"
              >
                <span className="relative z-10 flex items-center">
                  VER MÁS
                </span>
              </button>
              
              <button
                onClick={() => {
                  const newsSection = document.getElementById('news-section');
                  if (newsSection) {
                    newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-transparent border-2 border-white rounded-none overflow-hidden transition-all duration-300 hover:bg-white hover:text-gray-800 drop-shadow-lg uppercase tracking-wide"
              >
                <span className="relative z-10 flex items-center">
                  NOTICIAS
                </span>
              </button>
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      </div>


      {/* Sección ¿Por qué elegir Sagrados Corazones de Manquehue? */}
      <ColegioInfoSection />

      {/* Quiénes Somos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 font-medium" style={{color: '#2563EB'}}>
                <div className="w-8 h-0.5" style={{backgroundColor: '#2563EB'}}></div>
                <span>Quiénes Somos</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 leading-tight">
                El Colegio Sagrados Corazones de Manquehue
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                El Colegio Sagrados Corazones de Manquehue forma estudiantes comprometidos con la transformación social. Fundado en 1955, creció junto al barrio y hoy reúne una comunidad educativa amplia, con una fuerte identidad institucional y más de 2.000 estudiantes. Nuestra misión es educar en el respeto, la solidaridad y la excelencia académica.
              </p>
              <button 
                onClick={() => handlePageChange('historia')}
                className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 group"
              >
                Ver Más
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            {/* Right Image */}
            <div className="relative">
              <div className="relative">
                {/* Decorative blue circle background */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20"></div>
                {/* Main image with circular crop */}
                <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl">
                  <img
                    src="https://i.postimg.cc/CdpBGVYm/Whats-App-Image-2025-09-28-at-5-25-28-PM.jpg"
                    alt="Colegio Sagrados Corazones de Manquehue"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                </div>
                {/* Additional decorative elements */}
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-30 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Editorial Section removed */}

      {/* 360 Tour Section */}
      <div id="tour-virtual-section">
        <Tour360Section />
      </div>

      {/* Map Section */}
      <MapSection />

      {/* Footer */}
      <Footer />

      {/* Casino Modal */}
      <CasinoModal isOpen={showCasinoModal} onClose={() => setShowCasinoModal(false)} />
    </div>

  );
}

export default App;