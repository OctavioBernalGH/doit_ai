'use client'

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // 👈 Importamos motion

// Mapeo entre tus idiomas y las clases de las banderas (ISO 3166)
const FLAG_CODES: Record<string, string> = {
  es: 'fi-es',
  en: 'fi-gb',
  fr: 'fi-fr',
  de: 'fi-de',
  it: 'fi-it',
  ca: 'fi-es-ct',
  eu: 'fi-es-pv',
};

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown si haces clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const changeLanguage = (nextLocale: string) => {
    setIsOpen(false);
    if (nextLocale === currentLocale) return;

    startTransition(() => {
      let pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
      if (pathWithoutLocale.length === 0) pathWithoutLocale = '/';
      router.replace(`/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
    });
  };

  return (
    // 1. ANIMACIÓN DE ENTRADA (Wrapper)
    // Usamos motion.div para que todo el componente entre deslizándose
    <motion.div 
      className="relative z-[100]" // Corregido z-100 a z-[100] para Tailwind arbitrario
      ref={dropdownRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      // Delay 0.95s: Justo entre ThemeToggle (0.9s) y Login (1.0s)
      transition={{ delay: 0.95 }} 
    >
      {/* 2. ANIMACIÓN DE INTERACCIÓN (Botón) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        
        // Efectos Framer Motion (reemplazan a hover:scale de CSS)
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        
        // Quitamos las clases hover:scale y active:scale de Tailwind para evitar conflictos
        className="flex items-center justify-center rounded-full bg-white/10 p-2 text-2xl transition-colors hover:bg-white/20 backdrop-blur-sm border border-white/10"
        title="Cambiar idioma"
      >
        <span className={`fi ${FLAG_CODES[currentLocale]} fis rounded-full`} />
      </motion.button>

      {/* Lista Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-16 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-1">
            {Object.entries(FLAG_CODES).map(([code, flagClass]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex items-center justify-center rounded-lg p-2 transition hover:bg-gray-100 ${
                  currentLocale === code ? 'bg-green-50 ring-1 ring-green-200' : ''
                }`}
                title={code.toUpperCase()}
              >
                <span className={`fi ${flagClass} fis rounded-full text-xl`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}