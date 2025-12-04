'use client'

import { useActionState, useState, ChangeEvent } from 'react'
import { registerAction } from '@/actions/register-action'
import { useTranslations } from 'next-intl'

export default function RegisterForm() {
  const t = useTranslations('Auth')
  const [state, action, isPending] = useActionState(registerAction, { error: null, success: false })

  const [useSameData, setUseSameData] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '', apellidoUno: '', apellidoDos: '', identificador: '',
    email: '', password: '', confirmPassword: '', telefono: '', web: '',
    direccion: '', codigoPostal: '', localizacion: '',
    empresa: '', identificadorFiscalEmpresa: '', direccionEmpresa: '', codigoPostalEmpresa: '', localizacionEmpresa: ''
  })

  // ... (Toda la lógica de handleChange y handleCheckboxChange es idéntica) ...
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    /* ... código igual ... */
  }
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
     /* ... código igual ... */
  }

  if (state.success) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in text-white">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/50 text-4xl">
          📩
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{t('successTitle')}</h3>
        <p className="text-gray-300 mb-6">
          {t('successMsg')}
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4 text-left">
      
      {/* --- DATOS PERSONALES --- */}
      <div className="space-y-3">
        <h4 className="border-b border-white/10 pb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
            {t('personalData')}
        </h4>
        
        {/* ... (Aquí van todos tus inputs igual que antes) ... */}
        {/* Solo asegúrate de que usen className="input-style" */}
        
        {/* Ejemplo resumido de inputs: */}
        <div className="grid grid-cols-2 gap-3">
             <input name="nombre" placeholder={t('placeholders.name')} required className="input-style" />
             <input name="apellidoUno" placeholder={t('placeholders.surname1')} required className="input-style" />
        </div>
        {/* ... etc ... */}
        <input name="email" type="email" placeholder={t('emailLabel')} required className="input-style w-full" />
        <div className="grid grid-cols-2 gap-3">
            <input name="password" type="password" placeholder={t('passwordLabel')} required className="input-style" />
            <input name="confirmPassword" type="password" placeholder={t('confirmPassword')} required className="input-style" />
        </div>
      </div>

      {/* --- CHECKBOX --- */}
      <div className="flex items-center gap-2 py-2">
        <input 
            type="checkbox" 
            id="sameData" 
            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-green-600 focus:ring-green-500 cursor-pointer"
        />
        <label htmlFor="sameData" className="text-sm text-gray-300 cursor-pointer select-none">
            {t('useSameData')}
        </label>
      </div>

      {/* --- DATOS EMPRESA --- */}
      <div className={`space-y-3 transition-opacity duration-300 ${useSameData ? 'opacity-50' : 'opacity-100'}`}>
         <h4 className="border-b border-white/10 pb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
             {t('companyData')}
         </h4>
         {/* ... inputs empresa ... */}
         <input name="empresa" placeholder={t('placeholders.companyName')} className="input-style w-full" />
      </div>

      {state?.error && (
        <div className="rounded-md bg-red-900/50 p-2 text-sm text-red-200 border border-red-800 text-center">
          🚨 {state.error}
        </div>
      )}

      <div className="pt-2">
        <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded-md px-4 py-3 font-bold text-white transition-all shadow-md
            ${isPending 
                ? 'bg-green-800 cursor-wait' 
                : 'bg-green-600 hover:bg-green-500 hover:shadow-lg'
            }`}
        >
            {isPending ? t('creating') : t('registerBtn')}
        </button>
      </div>
      
      {/* 👇 AQUÍ FORZAMOS EL ESTILO OSCURO PARA TODOS LOS INPUTS */}
      <style jsx>{`
        .input-style {
            width: 100%;
            border-radius: 0.375rem;
            /* Fondo oscuro translúcido */
            background-color: rgba(255, 255, 255, 0.05);
            /* Borde sutil */
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            /* Texto blanco */
            color: #ffffff;
            outline: none;
            transition: all 0.2s;
        }
        .input-style::placeholder {
            color: #9ca3af; /* Gris claro para el placeholder */
        }
        .input-style:focus {
            border-color: #22c55e;
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 1px #22c55e;
        }
      `}</style>
    </form>
  )
}