import React from "react";

const VideoGrid = ({
  localStream,
  localUser,
  remoteUser,
  audioEnabled,
  videoEnabled,
}) => {
  const totalParticipants = 1 + remoteUser.length;

  //Determine grid columns dynamically
  const getGridClass = () => {
    if (totalParticipants === 1) return "grid-cols-1 max-w-4xl";
    if (totalParticipants === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl";
    if (totalParticipants <= 4) return "grid-cols-1 md:grid-cols-2 max-w-4xl";
    if (totalParticipants <= 6)
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl";
  };
  return (
    <div className="flex-1 w-full items-center justify-center p-4 overflow-y-auto">
      <div
        className={`w-full grid gap-4 ${getGridClass()} aspect-video max-h-[calc(100vh-140px)] transition-all duration-300`}
      >
        {/* Local User Tile */}
      </div>
    </div>
  );
};

export default VideoGrid;
