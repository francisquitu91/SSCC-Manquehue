import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOurOpen, setIsOurOpen] = useState(false);
  const [isAdmisionOpen, setIsAdmisionOpen] = useState(false);
  const [calendarsOpen, setCalendarsOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
    setIsOurOpen(false);
    setIsAdmisionOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* TOP THIN BAR - Dark background with contact info */}
      <div className="w-full bg-[#0b2540] border-b border-[#08304a] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-48">
          <div className="flex items-center justify-between h-12 text-sm text-white">
            
            {/* Left: Contact Information */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white" />
                <span className="text-xs">(+56 2) 2719 4300</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white" />
                <span className="text-xs">colegio@ssccmanquehue.cl</span>
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="hidden sm:flex items-center space-x-6">
              <button className="text-xs text-white hover:underline">Comunidad</button>
              <button className="text-xs text-white hover:underline">Áreas de Apoyo</button>
              <button className="text-xs text-white hover:underline">Contacto</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN THICK BAR - White background with logo and navigation */}
      <nav className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">

            {/* LEFT: LOGO AND SCHOOL NAME */}
            <div className="flex items-center">
              <a href="#" aria-label="Inicio" className="flex items-center mt-4">
                <div className="relative">
                  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="mx-auto w-full h-6 bg-white rounded-md shadow-sm" style={{maxWidth: '420px'}} />
                  </div>

                  <img
                    src="https://ssccmanquehue.cl/wp-content/uploads/2025/03/70SSCC_OK_transparente-4-1-1-1.png"
                    alt="Colegio Manquehue SSCC logo"
                    className="h-40 w-40 object-cover rounded-full shadow-lg relative z-50 mt-0"
                  />
                </div>

                <div className="ml-6 leading-tight -mt-6">
                  <div className="text-xl md:text-2xl text-gray-900 uppercase font-sans">
                    <span className="font-normal">COLEGIO </span>
                    <span className="font-extrabold">MANQUEHUE</span>
                    <span className="font-normal"> SSCC</span>
                  </div>
                </div>
              </a>
            </div>

            {/* CENTER: DESKTOP MAIN MENU */}
            <div className="hidden xl:flex items-center space-x-8 max-w-3xl flex-1 justify-center">
              
              {/* NUESTRO COLEGIO - Dropdown */}
              <div className="relative group">
                <button
                  className="text-sm text-gray-800 uppercase whitespace-nowrap hover:text-blue-700 font-medium transition-colors"
                  onMouseEnter={() => setIsOurOpen(true)}
                  onMouseLeave={() => setIsOurOpen(false)}
                >
                  Nuestro Colegio
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 top-full w-64 bg-[#0b2540] border border-[#08304a] rounded-lg shadow-lg py-2 z-[9999] transition-all duration-150 ${
                    isOurOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setIsOurOpen(true)}
                  onMouseLeave={() => setIsOurOpen(false)}
                >
                  <ul className="space-y-1 px-2">
                    <li>
                      <button onClick={() => handleNavigation('historia-congregacion')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Historia Congregación
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('historia-colegio')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Historia del Colegio
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('directorio-fundacion')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Directorio Fundación
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('documentos-institucionales')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Documentos Oficiales
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('rectoria')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Rectoría
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('proyecto-educativo')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Proyecto Educativo
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('utiles-escolares')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Listas útiles escolares
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('consejo-directivo')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Consejo Directivo
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('valores')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Valores de matrícula y colegiaturas
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Other Main Menu Items */}
              <button 
                onClick={() => {
                  const element = document.getElementById('tour-virtual-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    handleNavigation('tour-virtual');
                  }
                  setIsMenuOpen(false);
                }}
                className="text-sm text-gray-800 uppercase whitespace-nowrap hover:text-blue-700 font-medium transition-colors"
              >
                Tour Virtual
              </button>
              {/* ADMISION - Dropdown */}
              <div className="relative group">
                <button
                  className="text-sm text-gray-800 uppercase whitespace-nowrap hover:text-blue-700 font-medium transition-colors"
                  onMouseEnter={() => setIsAdmisionOpen(true)}
                  onMouseLeave={() => setIsAdmisionOpen(false)}
                >
                  Admisión
                </button>
                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 top-full w-64 bg-[#0b2540] border border-[#08304a] rounded-lg shadow-lg py-2 z-[9999] transition-all duration-150 ${isAdmisionOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                  onMouseEnter={() => setIsAdmisionOpen(true)}
                  onMouseLeave={() => setIsAdmisionOpen(false)}
                >
                  <ul className="space-y-1 px-2">
                    <li>
                      <button onClick={() => handleNavigation('admision-prekinder')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Admisión Pre Kínder
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('admision-kinder-ii')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Admisión Kínder a II°
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <button onClick={() => handleNavigation('admin')} className="text-sm text-gray-800 uppercase whitespace-nowrap hover:text-blue-700 font-medium transition-colors">
                Intranet
              </button>
              {/* CALENDARIOS - Dropdown */}
              <div className="relative group">
                <button
                  className="text-sm text-gray-800 uppercase whitespace-nowrap hover:text-blue-700 font-medium transition-colors"
                  onMouseEnter={() => setCalendarsOpen(true)}
                  onMouseLeave={() => setCalendarsOpen(false)}
                >
                  Calendarios
                </button>
                <div
                  className={`absolute left-0 top-full w-64 bg-[#0b2540] border border-[#08304a] rounded-lg shadow-lg py-2 z-[9999] transition-all duration-150 ${
                    calendarsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setCalendarsOpen(true)}
                  onMouseLeave={() => setCalendarsOpen(false)}
                >
                  <ul className="space-y-1 px-2">
                    <li>
                      <button onClick={() => handleNavigation('calendario-primer-ciclo')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Primer Ciclo
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('calendario-segundo-ciclo')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Segundo Ciclo
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation('calendario-tercer-ciclo')} className="w-full text-left px-3 py-2 text-xs text-white rounded hover:bg-blue-700 transition-colors">
                        Tercer Ciclo
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT: MOBILE MENU TOGGLE */}
            <div className="flex items-center space-x-3">
              <div className="xl:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-800 hover:bg-gray-100"
                  aria-label="Abrir menú"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE/TABLET MENU */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-t">
            <div className="px-4 pt-4 pb-6 space-y-2">
              
              {/* Mobile Main Menu Items */}
              <button onClick={() => handleNavigation('historia')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-800">
                Nuestro Colegio
              </button>
              <button onClick={() => handleNavigation('tour-virtual')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-800">
                Tour Virtual
              </button>
              {/* Admisión - Mobile Dropdown */}
              <div className="block w-full">
                <button
                  onClick={() => setIsOurOpen(!isOurOpen)}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-800"
                >
                  Admisión
                </button>
                {isOurOpen && (
                  <div className="pl-4 border-l ml-2">
                    <button onClick={() => handleNavigation('admision-prekinder')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50 text-sm font-medium text-gray-700">
                      Admisión Pre Kínder
                    </button>
                    <button onClick={() => handleNavigation('admision-kinder-ii')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50 text-sm font-medium text-gray-700">
                      Admisión Kínder a II°
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => handleNavigation('admin')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-800">
                Intranet
              </button>
              <button onClick={() => handleNavigation('fechas-importantes')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-800">
                Calendarios
              </button>

              {/* Nuestro Colegio Submenu (Mobile) */}
              <div className="mt-2 pl-2 border-l">
                <button onClick={() => handleNavigation('historia-congregacion')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Historia Congregación
                </button>
                <button onClick={() => handleNavigation('historia-colegio')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Historia del Colegio
                </button>
                <button onClick={() => handleNavigation('directorio-fundacion')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Directorio Fundación
                </button>
                <button onClick={() => handleNavigation('documentos-institucionales')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Documentos Oficiales
                </button>
                <button onClick={() => handleNavigation('rectoria')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Rectoría
                </button>
                <button onClick={() => handleNavigation('proyecto-educativo')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Proyecto Educativo
                </button>
                <button onClick={() => handleNavigation('utiles-escolares')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Listas útiles escolares
                </button>
                <button onClick={() => handleNavigation('consejo-directivo')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Consejo Directivo
                </button>
                <button onClick={() => handleNavigation('valores')} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Valores de matrícula y colegiaturas
                </button>
              </div>

              {/* Contact Info Section */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Teléfono</div>
                    <div className="text-sm">(+56 2) 2719 4300</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Email</div>
                    <div className="text-sm">colegio@ssccmanquehue.cl</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;