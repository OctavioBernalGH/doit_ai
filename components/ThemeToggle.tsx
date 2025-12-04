"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    // Mantenemos el hueco pero invisible para evitar saltos de layout
    return <div className="w-10 h-10 opacity-0" /> 
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      // 1. Animación de Entrada (Igual que en page.tsx)
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 }} // Un poco antes que el botón de Login (que tiene 1.0)
      
      // 2. Interacción (Reemplaza a las clases hover:scale de CSS para mayor fluidez)
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      
      onClick={() => setTheme(isDark ? "light" : "dark")}
      
      // He quitado 'hover:scale-110' y 'active:scale-95' del className porque ahora lo hace Framer Motion
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-sm transition-colors hover:bg-white/20 border border-white/10"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        ☀️ 
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        🌙 
      </motion.div>
    </motion.button>
  )
}