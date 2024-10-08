import { VideoIcon } from "lucide-react";
import { useState } from "react";
import { VideoCallModal } from "./VideoCallModal";
import { ChaiColors } from "../types";

type VideoCallButtonProps = {
  onVideoCallStart?: () => void;
  onVideoCallEnd?: () => void;
  chatId: string;
};

export const VideoCallButton = ({ onVideoCallStart, onVideoCallEnd, chatId }: VideoCallButtonProps) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const handleVideoCallClick = () => {
    setIsCallModalOpen(true);
    onVideoCallStart?.();
  };

  return (
    <>
      <button onClick={handleVideoCallClick}>
        <VideoIcon className="size-7" style={{ color: ChaiColors.LINK }} />
      </button>
      <VideoCallModal
        isOpen={isCallModalOpen}
        onClose={() => {
          setIsCallModalOpen(false);
          onVideoCallEnd?.();
        }}
        chatId={chatId}
      />
    </>
  );
};
