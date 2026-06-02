"use client";

import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type AlertType = "success" | "error" | "info";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: AlertType;
}

export function AlertModal({ isOpen, onClose, title, message, type = "info" }: AlertModalProps) {
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // Lock body scroll when modal is open and trap focus
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "unset";
      previouslyFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const icons = {
    success: <CheckCircle className="w-8 h-8 text-green-400" />,
    error: <AlertTriangle className="w-8 h-8 text-red-400" />,
    info: <Info className="w-8 h-8 text-blue-400" />
  };

  const gradients = {
    success: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(6,182,212,0.1) 100%)",
    error: "linear-gradient(135deg, rgba(248,113,113,0.15) 0%, rgba(239,68,68,0.1) 100%)",
    info: "linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(59,130,246,0.1) 100%)"
  };

  const borderColors = {
    success: "border-green-500/30",
    error: "border-red-500/30",
    info: "border-blue-500/30"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={`relative w-full max-w-sm overflow-hidden rounded-2xl border ${borderColors[type]} p-6 shadow-2xl`}
            style={{ background: gradients[type] }}
          >
            {/* Shimmer effect for success */}
            {type === 'success' && (
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
                style={{ 
                  background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  animation: "shimmer 3s infinite"
                }}
              />
            )}
            
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {icons[type]}
              </div>
              <h2 id="modal-title" className="text-xl font-bold mb-2">
                {title}
              </h2>
              <p id="modal-desc" className="text-sm text-muted-foreground mb-6">
                {message}
              </p>
              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
