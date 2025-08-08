import { Modal, Avatar } from "antd";
import { PhoneFilled, VideoCameraFilled, AudioOutlined, UserOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VideoCallModalProps {
  contactName: string;
  avatar?: string;
  visible: boolean;
  onClose: () => void;
}

export const VideoCallModal = ({
  contactName,
  avatar,
  visible,
  onClose,
}: VideoCallModalProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      width={800}
      className="[&_.ant-modal-content]:p-0 [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden"
      bodyStyle={{
        padding: 0,
        margin: 0,
      }}
    >
      <div className="relative bg-black h-[70vh]">
        {/* Remote video feed */}
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          {isVideoOff ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-800">
              <Avatar
                size={140}
                src={avatar}
                icon={<UserOutlined />}
                className="border-4 border-white/30"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Local video preview */}
        {isCallActive && !isVideoOff && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-28 right-6 w-32 h-48 bg-black rounded-lg overflow-hidden border-2 border-white/20 shadow-lg"
          >
            <video
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}

        {/* Call info overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
          <div className="text-white">
            <h2 className="text-xl font-semibold">{contactName}</h2>
            <p className="text-sm text-white/80">
              {isCallActive ? formatTime(callTime) : "Video call"}
            </p>
          </div>
          <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
            <EllipsisOutlined className="text-white text-lg" />
          </button>
        </div>

        {/* Call controls */}
        <motion.div 
          className="absolute bottom-6 left-0 right-0"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center space-x-6">
            {!isCallActive ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center 
                    shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all"
                  onClick={handleCall}
                >
                  <VideoCameraFilled className="text-white text-2xl" />
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    className={`h-12 w-12 rounded-full flex items-center justify-center 
                      ${isMuted ? 'bg-red-500/20' : 'bg-white/10'} hover:bg-white/20 transition-all`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <AudioOutlined className={`text-xl ${isMuted ? 'text-red-500' : 'text-white'}`} />
                  </button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    className={`h-12 w-12 rounded-full flex items-center justify-center 
                      ${isVideoOff ? 'bg-red-500/20' : 'bg-white/10'} hover:bg-white/20 transition-all`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    <VideoCameraFilled className={`text-xl ${isVideoOff ? 'text-red-500' : 'text-white'}`} />
                  </button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <div className="absolute -inset-2 bg-red-500/30 rounded-full animate-pulse"></div>
                  <button
                    className="h-14 w-14 rounded-full bg-red-500 flex items-center justify-center 
                      shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all relative z-10"
                    onClick={handleEndCall}
                  >
                    <PhoneFilled className="text-white text-2xl rotate-135" />
                  </button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button
                    className={`h-12 w-12 rounded-full flex items-center justify-center 
                      ${isSpeaker ? 'bg-blue-500/20' : 'bg-white/10'} hover:bg-white/20 transition-all`}
                    onClick={() => setIsSpeaker(!isSpeaker)}
                  >
                    <UserOutlined className={`text-xl ${isSpeaker ? 'text-blue-400' : 'text-white'}`} />
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};