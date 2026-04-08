import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SettingSection from '../components/SettingSection';
import SettingRow from '../components/SettingRow';
import { FileSystem } from '../../../kernel/FileSystem';
import NumericPad from '../../../ui/Keyboard/NumericPad';

interface SecurityViewProps {
  onBack: () => void;
}

type SecurityFlow = 'main' | 'enter_new' | 'confirm_new' | 'enter_current_to_turn_off';

const SecurityView: React.FC<SecurityViewProps> = ({ onBack }) => {
  const settings = FileSystem.getSettings();
  const [flow, setFlow] = useState<SecurityFlow>('main');
  const [tempPin, setTempPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [updateTrigger, setUpdateTrigger] = useState(0); // Para forzar re-render

  const forceUpdate = () => setUpdateTrigger(prev => prev + 1);

  const handlePinComplete = (pin: string) => {
    setErrorMessage(undefined);

    if (flow === 'enter_new') {
      setTempPin(pin);
      setFlow('confirm_new');
    } else if (flow === 'confirm_new') {
      if (pin === tempPin) {
        // Success
        FileSystem.updateSettings({
          security: {
            hasPassword: true,
            passcode: pin
          }
        });
        setFlow('main');
        setTempPin('');
        forceUpdate();
      } else {
        setErrorMessage("Los códigos no coinciden");
        setFlow('enter_new');
        setTempPin('');
      }
    } else if (flow === 'enter_current_to_turn_off') {
      if (pin === settings.security.passcode) {
        FileSystem.updateSettings({
          security: {
            hasPassword: false,
            passcode: null
          }
        });
        setFlow('main');
        forceUpdate();
      } else {
        setErrorMessage("Código incorrecto");
      }
    }
  };

  const handleCancel = () => {
    setFlow('main');
    setTempPin('');
    setErrorMessage(undefined);
  };

  const hasPassword = settings.security.hasPassword;

  return (
    <div className="flex-1 relative flex flex-col pt-4 overflow-hidden h-full">
      {/* Main Settings View */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 custom-scrollbar">
        <div className="mb-4 flex items-center">
          <button onClick={onBack} className="flex items-center text-ios-blue space-x-1">
            <ChevronLeft size={24} />
            <span className="text-[17px]">Settings</span>
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Security</h1>
        </div>

        <SettingSection title="Passcode">
          {hasPassword ? (
            <SettingRow 
              icon={() => <div className="text-[10px] font-bold">***</div>} 
              label="Turn Passcode Off" 
              iconColor="bg-red-500"
              onClick={() => setFlow('enter_current_to_turn_off')}
            />
          ) : (
            <SettingRow 
              icon={() => <div className="text-[10px] font-bold">123</div>} 
              label="Turn Passcode On" 
              iconColor="bg-ios-blue"
              onClick={() => setFlow('enter_new')}
            />
          )}
        </SettingSection>

        <div className="px-2 text-[13px] text-white/40 mt-2">
          A passcode protects your data and allows you to use Face ID or Touch ID.
        </div>
      </div>

      {/* Full Screen Keypad Overlay */}
      <AnimatePresence>
        {flow !== 'main' && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#1c1c1e] flex flex-col shadow-2xl"
          >
            <div className="flex-1 pt-12 pb-8">
              <NumericPad 
                key={flow}
                title={
                  flow === 'enter_new' ? 'Introduce un código nuevo' :
                  flow === 'confirm_new' ? 'Confirma tu nuevo código' :
                  'Introduce tu código actual'
                }
                errorMessage={errorMessage}
                onComplete={handlePinComplete}
                onCancel={handleCancel}
                showCancel={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecurityView;
