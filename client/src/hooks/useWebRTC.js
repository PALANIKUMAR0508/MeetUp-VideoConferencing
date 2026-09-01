import React, { useCallback, useRef, useState } from "react";
import { dummyRemoteParticipants } from "../assets/asset";

const useWebRTC = (_roomId, user, onMeetingEnded, _enbled = true) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteUser, setRemoteUser] = useState(dummyRemoteParticipants);
  const [audioEnbled, setAudioEnabled] = useState(true);
  const [videoEnbled, setVideoEnbled] = useState(null);

  const localStreamRef = useRef(null);

  //Initialize local camera stream if available in browser

  const initialLocalStream = useCallback(async () => {
    try {
      if (navigator?.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          localStreamRef.current = stream;
          setLocalStream(stream);

          return stream;
        } catch (_error) {
          console.log("Mock WebRTC: Running in camera preview fallback mode");
        }
      }

      return null;
    } catch (error) {
      console.error("Error initializing local stream:", error);
      return null;
    }
  }, [initialLocalStream]);

  useEffect(() => {
    initialLocalStream();
    return () => {
      if (localStream.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  });

  //Toggle local mic
  const toggleAudio = () => {
    const newState = !audioEnbled;
    setAudioEnabled(newState);
    if (localStreamRef.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = newState;
    }
    toast(newState ? "Microphone turned on" : "Microphone muted", {
      icon: newState ? "🎙️" : "🔇",
    });
  };

  //Toggle local camera

  const toggleVideo = () => {
    const newState = !videoEnbled;
    setVideoEnbled(newState);
    if (localStreamRef.current) {
      const videoTrack = localStream.current.getvideoTracks()[0];
      if (videoTrack) videoTrack.enabled = newState;
    }
    toast(newState ? "Camera turned on" : "Camera turned off", {
      icon: newState ? "📹" : "📷",
    });
  };

  //End meeting for everyone
  const endMeeting = useCallback(() => {
    if (onMeetingEnded) {
      onMeetingEnded("Meeting ended");
    }
  }, [onMeetingEnded]);

  return (
    localStream,
    remoteUser,
    audioEnbled,
    videoEnbled,
    toggleAudio,
    toggleVideo,
    endMeeting
  );
};

export default useWebRTC;
