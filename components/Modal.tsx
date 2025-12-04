'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" // Más oscuro el fondo
          />

          {/* Contenedor del Modal - FORZADO MODO OSCURO */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // AQUÍ ESTÁN LOS CAMBIOS DE COLOR:
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 text-white shadow-2xl"
          >
            
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <button 
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {children}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}