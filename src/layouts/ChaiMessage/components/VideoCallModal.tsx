import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSpeechRecognition } from "~/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "~/hooks/useSpeechSynthesis";
import { api } from "~/trpc/react";
import { createNoise2D } from "simplex-noise";
import { Mic, Phone, Volume } from "lucide-react";

type VideoCallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Particle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
};

const NUM_PARTICLES = 100;

export const VideoCallModal = ({ isOpen, onClose }: VideoCallModalProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const {
    transcript,
    interimTranscript,
    isListening: isSpeechListening,
    startListening,
    stopListening,
  } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();
  const lastTranscriptRef = useRef("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const animationControls = useAnimation();
  const noise2D = useRef(createNoise2D());
  const transcriptBoxRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = api.chat.sendMessage.useMutation();

  const handleSendMessage = useCallback(
    async (message: string) => {
      setIsListening(false);
      stopListening();

      const response = await sendMessageMutation.mutateAsync({
        chatId: "current-chat-id", // Replace with actual chat ID
        content: message,
      });

      if (response.followMessageId) {
        const aiResponse = await waitForAIResponse(response.followMessageId);
        if (aiResponse) {
          setIsSpeaking(true);
          await speak(aiResponse);
          setIsSpeaking(false);
        }
      }

      if (isOpen) {
        setIsListening(true);
        startListening();
      }
    },
    [isOpen, sendMessageMutation, startListening, stopListening, speak],
  );

  const initializeParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 320,
      angle: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.1,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    }));
  }, []);

  const updateAndDrawParticles = useCallback((ctx: CanvasRenderingContext2D, amplitude: number) => {
    const time = Date.now() / 1000;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Create a clipping path for the circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 2, 0, Math.PI * 2);
    ctx.clip();

    particlesRef.current.forEach((particle) => {
      // Increase noise intensity based on amplitude
      const noiseIntensity = amplitude * 2; // Amplify the effect of voice
      const noiseX = noise2D.current(particle.noiseOffsetX, time * 0.5) * noiseIntensity;
      const noiseY = noise2D.current(particle.noiseOffsetY, time * 0.5) * noiseIntensity;

      // Increase particle speed based on amplitude
      const speedMultiplier = 1 + amplitude * 2; // Particles move faster with voice

      // Update particle position
      particle.x += Math.cos(particle.angle) * particle.speed * speedMultiplier + noiseX;
      particle.y += Math.sin(particle.angle) * particle.speed * speedMultiplier + noiseY;

      // Wrap particles around the canvas
      particle.x = (particle.x + ctx.canvas.width) % ctx.canvas.width;
      particle.y = (particle.y + ctx.canvas.height) % ctx.canvas.height;

      // Update noise offsets
      particle.noiseOffsetX += 0.01;
      particle.noiseOffsetY += 0.01;

      // Calculate distance from center
      const dx = particle.x - ctx.canvas.width / 2;
      const dy = particle.y - ctx.canvas.height / 2;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = ctx.canvas.width / 2;

      // Only draw particles within the circle
      if (distanceFromCenter <= maxRadius) {
        // Increase particle size based on amplitude
        const particleSize = 1 + amplitude * 2; // Particles grow with voice

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + amplitude * 0.7})`;
        ctx.fill();
      }
    });

    // Restore the canvas context
    ctx.restore();
  }, []);

  const updateVisualizer = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    const amplitude = Math.max(0.1, average / 128); // Ensure a minimum amplitude of 0.1

    updateAndDrawParticles(ctx, amplitude);

    // Update the glowing circle
    void animationControls.start({
      scale: 1 + amplitude * 0.3,
      opacity: 0.8 + amplitude * 0.2,
      transition: { duration: 0.1 },
    });

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  }, [updateAndDrawParticles, animationControls]);

  const setupAudioAnalyser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      initializeParticles();
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    } catch (error) {
      console.error("Error setting up audio analyser:", error);
    }
  }, [updateVisualizer, initializeParticles]);

  const cleanupAudioAnalyser = useCallback(() => {
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const waitForAIResponse = async (messageId: string): Promise<string | null> => {
    // Implement logic to wait for AI response
    // This could involve polling or using a websocket connection
    // For now, we'll use a dummy implementation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "This is a dummy AI response.";
  };

  useEffect(() => {
    if (isOpen && !isSpeaking) {
      setIsListening(true);
      startListening();
      void setupAudioAnalyser();
    } else {
      cleanupAudioAnalyser();
    }
    return cleanupAudioAnalyser;
  }, [isOpen, isSpeaking, setupAudioAnalyser, startListening, cleanupAudioAnalyser]);

  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      void handleSendMessage(transcript);
    }
  }, [handleSendMessage, transcript]);

  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    const allWords = (transcript + " " + interimTranscript).trim().split(" ");
    setDisplayedWords(allWords);
  }, [transcript, interimTranscript]);

  useEffect(() => {
    if (transcriptBoxRef.current) {
      transcriptBoxRef.current.scrollLeft = transcriptBoxRef.current.scrollWidth;
      transcriptBoxRef.current.scrollTop = transcriptBoxRef.current.scrollHeight;
    }
  }, [displayedWords]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main circle */}
            <div className="relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-lg">
              <canvas ref={canvasRef} width={320} height={320} className="absolute inset-0" />
              <motion.div
                className="z-10 flex flex-col items-center justify-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isSpeechListening ? (
                  <>
                    <Mic className="animate-pulse text-4xl text-white" />
                    <span className="text-xl font-semibold tracking-wide text-white">Listening...</span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <Volume className="animate-pulse text-4xl text-white" />
                    <span className="text-xl font-semibold tracking-wide text-white">Speaking...</span>
                  </>
                ) : (
                  <>
                    <Phone className="text-4xl text-white" />
                    <span className="text-xl font-semibold tracking-wide text-white">Call Active</span>
                  </>
                )}
              </motion.div>
            </div>

            {/* Redesigned Transcript box */}
            <motion.div
              className="mt-6 w-96 overflow-hidden rounded-2xl bg-white bg-opacity-10 shadow-lg backdrop-blur-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="px-4 py-3 text-xs uppercase tracking-wide text-gray-400">Transcript</div>
              <div ref={transcriptBoxRef} className="scrollbar-hide max-h-24 overflow-y-auto px-4 pb-3">
                <div className="flex flex-wrap">
                  <AnimatePresence mode="popLayout">
                    {displayedWords.map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        className="mb-2 mr-2 inline-block rounded-full bg-opacity-20 text-sm text-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
