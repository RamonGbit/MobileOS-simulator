import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Delete } from 'lucide-react';

interface NumericPadProps {
  onComplete: (pin: string) => void;
  onCancel?: () => void;
  title?: string;
  errorMessage?: string;
  showCancel?: boolean;
}

const NumericPad: React.FC<NumericPadProps> = ({ 
  onComplete, 
  onCancel, 
  title = "Introduce PIN", 
  errorMessage,
  showCancel = true 
}) => {
  const [pin, setPin] = useState("");
  const controls = useAnimation();

  // Si hay un error externo, sacudimos y borramos el input
  useEffect(() => {
    if (errorMessage) {
      controls.start({
        x: [-10, 10, -10, 10, -5, 5, 0],
        transition: { duration: 0.4 }
      });
      // Pequeño delay antes de borrar para que el usuario procese el error
      const timer = setTimeout(() => setPin(""), 600);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, controls]);

  const handlePress = (num: string) => {
    if (pin.length < 12) { // Un límite razonable
      setPin(prev => prev + num);
      // Removed auto-submit for length-independent keys
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleOK = () => {
    if (pin.length >= 4) {
      onComplete(pin);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto h-full text-white no-select">
      
      {/* Cabecera */}
      <motion.div animate={controls} className="flex flex-col items-center mb-10 h-32 justify-end">
        <h2 className="text-xl font-medium mb-6 drop-shadow-md">
          {errorMessage || title}
        </h2>
        
        {/* Passcode Dots or Text */}
        <div className="flex justify-center items-center h-4 space-x-4">
          {pin.length === 0 ? (
            <div className="text-white/40 text-sm italic tracking-widest px-2">_ _ _ _</div>
          ) : (
            Array.from({ length: Math.max(4, pin.length) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-3.5 h-3.5 rounded-full border border-white transition-colors duration-200 ${
                  i < pin.length ? 'bg-white' : 'bg-transparent border-white/40'
                }`}
              />
            ))
          )}
        </div>
      </motion.div>

      {/* Teclado Numérico */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-10 text-[28px] font-light">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num.toString())}
            className="w-[75px] h-[75px] rounded-full bg-white/10 backdrop-blur-xl border border-white/5 active:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
          >
            {num}
          </button>
        ))}
        
        {/* Botón Inferior Izquierdo: Backspace / Delete */}
        <button
          onClick={handleDelete}
          disabled={pin.length === 0}
          className="w-[75px] h-[75px] rounded-full bg-transparent flex items-center justify-center active:bg-white/10 transition-colors disabled:opacity-30 text-lg group"
        >
          <Delete size={28} className="text-white group-active:scale-95 transition-transform" />
        </button>

        {/* Botón 0 */}
        <button
          onClick={() => handlePress('0')}
          className="w-[75px] h-[75px] rounded-full bg-white/10 backdrop-blur-xl border border-white/5 active:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
        >
          0
        </button>

        {/* Botón Inferior Derecho: OK */}
        <button
          onClick={handleOK}
          disabled={pin.length < 4}
          className="w-[75px] h-[75px] rounded-full flex items-center justify-center text-lg font-medium active:bg-white/10 transition-colors disabled:opacity-30"
        >
          OK
        </button>
      </div>

      {/* Acciones Adicionales (Ej. Cancelar) */}
      <div className="h-10">
        {showCancel && onCancel && (
          <button 
            onClick={onCancel}
            className="text-white/80 active:text-white transition-colors tracking-wide text-[15px]"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default NumericPad;
