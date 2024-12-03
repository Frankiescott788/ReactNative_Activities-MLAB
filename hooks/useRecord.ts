import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { Svg, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import * as filesystem from "expo-file-system";
import { useRouter } from "expo-router";

export default function useRecord() {
  const [isRecording, setIsrecording] = useState<any | null>(null);
  const [audioURI, setAudioURI] = useState("");
  const sound = new Audio.Sound();
  const [duration, setDuration] = useState<string | null>(null);
  const incrementRef = useRef<number>(0);
  const [onOpen, setOpen] = useState<boolean>(false);
  const [audioName, setAudioname] = useState<string>("");

  const router = useRouter();

  const start_recording = async () => {
    setDuration(null);
    try {
      const permision = await Audio.requestPermissionsAsync();
      if (permision.status !== "granted") {
        console.log("denied");
        return;
      }

      console.log("Starting recording...");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync();
      setIsrecording(recording);
    } catch (e) {
      console.log(e);
    }
  };

  const stop_recording = async () => {
    try {
      await isRecording.stopAndUnloadAsync();
      const uri = isRecording.getURI();
      setAudioURI(uri);
      const status = await isRecording.getStatusAsync();
      const minutes = Math.floor(status.durationMillis / 60000);
      const seconds = Math.floor((status.durationMillis % 60000) / 1000);

      setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsrecording(null);
    }
  };

  const playRecording = async () => {
    if (!audioURI) return;
    try {
      await sound.unloadAsync();
      await sound.loadAsync({ uri: audioURI });
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  };

  const get_recordings = async () => {
    try {
      const fileList = await filesystem.readDirectoryAsync(
        `${filesystem.documentDirectory}/recordings/`
      );
      const m4s = fileList.filter((file) => file.endsWith("m4a"));
      console.log(m4s);
    } catch (error) {
      console.log(error);
    }
  };

  const save_recording = async () => {
    try {
      await filesystem.copyAsync({
        from: audioURI,
        to: `${filesystem.documentDirectory}/recordings/${audioName}.m4a`,
      });
      console.log("saved");
      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    start_recording,
    stop_recording,
    save_recording,
    get_recordings,
    playRecording,
    isRecording,
    setOpen,
    onOpen,
    duration,
    audioURI,
    sound,
    audioName,
    setAudioname
  }
}
