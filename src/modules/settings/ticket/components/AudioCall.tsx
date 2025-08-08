import { Modal, Avatar } from "antd";
import { PhoneFilled, AudioOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioCallModalProps {
  contactName: string;
  avatar?: string;
  visible: boolean;
  onClose: () => void;
}

export const AudioCallModal = ({
  contactName,
  avatar,
  visible,
  onClose,
}: AudioCallModalProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callTime, setCallTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    } else {
      setCallTime(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={400}
      className="[&_.ant-modal-content]:p-0 [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden"
      bodyStyle={{
        padding: 0,
        margin: 0,
      }}
    >
      <div className="bg-gradient-to-b from-indigo-900 to-purple-800 text-white h-full">
        <motion.div 
          className="p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
          >
            <Avatar
              size={140}
              src={avatar}
              icon={<UserOutlined />}
              style={{
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </motion.div>
          
          <h2 className="text-3xl font-bold tracking-tight">{contactName}</h2>
          <p className="text-lg mt-2 text-white/80">
            {isCallActive ? "In call" : "Audio call"}
          </p>
          
          {isCallActive && (
            <motion.p 
              className="text-2xl mt-3 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatTime(callTime)}
            </motion.p>
          )}
        </motion.div>

        {/* Call controls */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg p-8 rounded-t-3xl border-t border-white/10"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <AnimatePresence mode="wait">
            {!isCallActive ? (
              <motion.div
                key="call-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="h-20 w-20 flex items-center justify-center 
                      bg-gradient-to-r from-green-400 to-green-600 
                      shadow-lg shadow-green-500/30 rounded-full
                      transition-all duration-200"
                    onClick={handleCall}
                  >
                    <PhoneFilled className="text-white text-2xl" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="call-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center space-x-8"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    className={`h-16 w-16 flex items-center justify-center 
                      ${isMuted ? 'bg-white/10' : 'bg-white/20'} 
                      rounded-full transition-all duration-200`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <AudioOutlined className={`text-2xl ${isMuted ? 'text-white/50' : 'text-white'}`} />
                  </button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <div className="absolute -inset-2 bg-red-500/30 rounded-full animate-pulse"></div>
                  <button
                    className="h-20 w-20 flex items-center justify-center 
                      bg-gradient-to-r from-red-500 to-red-600 
                      shadow-lg shadow-red-500/30 rounded-full
                      relative z-10 transition-all duration-200"
                    onClick={handleEndCall}
                  >
                    <PhoneFilled className="text-white text-2xl rotate-135" />
                  </button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    className={`h-16 w-16 flex items-center justify-center 
                      ${isSpeaker ? 'bg-white/10' : 'bg-white/20'} 
                      rounded-full transition-all duration-200`}
                    onClick={() => setIsSpeaker(!isSpeaker)}
                  >
                    <UserOutlined className={`text-2xl ${isSpeaker ? 'text-white/50' : 'text-white'}`} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Modal>
  );
};