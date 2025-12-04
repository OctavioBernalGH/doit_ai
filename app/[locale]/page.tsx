"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function LandingPage() {
  const t = useTranslations("Landing");
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );
  const closeModal = () => setActiveModal(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* 1. Fondos */}
      <div className="absolute inset-0 z-0 opacity-20 bg-animated-grid pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_5%,rgb(var(--background))_90%)] pointer-events-none"></div>

      {/* 2. Barra Superior */}
      <nav className="absolute top-0 right-0 z-50 p-6 flex gap-4 items-center">
        <ThemeToggle />
        <LanguageSwitcher />

        {/* BOTÓN LOGIN */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal("login")}
          className="hidden sm:block rounded-full border-2 border-primary hover:border-green-600 bg-primary px-6 py-2 text-sm font-bold text-foreground shadow-[0_0_20px_rgba(var(--primary),0.4)] transition hover:bg-green-600"
        >
          {t("login")}
        </motion.button>

        {/* BOTÓN REGISTRO */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal("register")}
          className="hidden sm:block rounded-full border-2 border-primary hover:border-green-600 bg-primary px-6 py-2 text-sm font-bold text-foreground shadow-[0_0_20px_rgba(var(--primary),0.4)] transition hover:bg-green-600"
        >
          {t("register")}
        </motion.button>
      </nav>

      {/* 3. Contenido Central */}
      <motion.div
        className="z-10 flex flex-col items-center px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LOGO */}
        <motion.div
          className="relative mb-8 drop-shadow-[0_0_25px_rgba(var(--primary),0.6)]"
          variants={itemVariants}
        >
          <Image
            src="/logo.png"
            alt="Doit AI Logo"
            width={160}
            height={160}
            className="h-auto w-auto"
            priority
          />
        </motion.div>

        {/* TÍTULO */}
        <motion.h1
          variants={itemVariants}
          // El 'glow-text' hereda el color del 'text-foreground' (definido en el main)
          className="mb-6 max-w-3xl text-4xl font-black tracking-tight sm:text-7xl glow-text"
        >
          {t("heroTitle")
            .split(" ")
            .map((word, i) => {
              const cleanWord = word
                .toLowerCase()
                .replace(/[^a-zA-Záéíóúüñ]/g, "");
              const isKeyword =
                cleanWord === "negocio" || cleanWord === "business";

              return isKeyword ? (
                <span key={i} className="text-primary italic">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              );
            })}
        </motion.h1>

        {/* SUBTITULO */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* BOTONES HERO */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Botón Empezar Gratis: Usa bg-foreground y text-background para crear contraste inverso */}
          <button
            onClick={() => setActiveModal("register")}
            className="group relative overflow-hidden rounded-lg bg-foreground text-background px-8 py-3.5 font-bold transition hover:opacity-90 shadow-lg"
          >
            <span className="relative z-10">Empezar Gratis</span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent z-0"></div>
          </button>

          {/* Botón Saber Más */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModal("login")}
            className="rounded-lg border border-gray-300 dark:border-white/10 bg-transparent px-8 py-3.5 font-bold text-foreground backdrop-blur-md transition hover:bg-gray-100 dark:hover:bg-white/10 hover:border-primary/50"
          >
            Saber más
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 4. MODALES */}
      <Modal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        title={t("login")}
      >
        <LoginForm />
        <div className="mt-4 text-center text-sm text-gray-500">
          ¿Aún no tienes cuenta?
          <button
            onClick={() => setActiveModal("register")}
            className="ml-1 text-primary font-bold hover:underline"
          >
            Crea una
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        title={t("register")}
      >
        <div className="max-h-[80vh] overflow-y-auto px-1 scrollbar-hide">
          <RegisterForm />
          <div className="mt-6 border-t pt-4 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?
            <button
              onClick={() => setActiveModal("login")}
              className="ml-1 text-primary font-bold hover:underline"
            >
              Inicia sesión
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
