import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { Svg, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Home(): React.JSX.Element {
  const [isRecording, setIsrecording] = useState<any | null>(null);
  const [audioURI, setAudioURI] = useState("");
  const sound = new Audio.Sound()

  const start_recording = async () => {
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
      console.log(uri);
    } catch (error) {
      console.log(error);
    }
    setIsrecording(null);
  };

  const playRecording = async () => {
    if (!audioURI) return;
    try {
      await sound.unloadAsync()
      await sound.loadAsync({ uri: audioURI });
      await sound.playAsync();
      
    } catch (err) {
      console.error('Failed to play recording', err);
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      className={"flex-1"}
    >
      <View className="h-screen">
        <Text className="text-center text-white text-2xl py-4">Recorder</Text>
        { isRecording && <Text className="pt-[4rem] text-center">Recording...</Text>}
        <View style={{ paddingInline: 53 * 3, paddingTop: 15 * 5 }}>
          <TouchableOpacity
            className={`flex-row justify-center rounded-full look border border-gray-200  ${
              isRecording ? "border-solid" : "border-dashed"
            } `}
            style={{
              paddingInline: 15,
              paddingBlock: 40,
            }}
            onPress={start_recording}
          >
            <Svg
              viewBox="0 0 24 24"
              width={48}
              height={48}
              color={"#9b9b9b"}
              fill={"none"}
            >
              <Path
                d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <Path
                d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-[5rem]">
          <TouchableOpacity onPress={playRecording}>
            <Svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              color="#9b9b9b"
            >
              <Path
                opacity="0.4"
                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z"
                fill="#9b9b9b"
              ></Path>
              <Path
                d="M9.95576 15.3862C9.5 15.0791 9.5 14.3195 9.5 12.8002V11.1998C9.5 9.6805 9.5 8.92086 9.95576 8.61382C10.4115 8.30678 11.0348 8.6465 12.2815 9.32594L13.7497 10.1262C15.2499 10.9438 16 11.3526 16 12C16 12.6474 15.2499 13.0562 13.7497 13.8738L12.2815 14.6741C11.0348 15.3535 10.4115 15.6932 9.95576 15.3862Z"
                fill="#9b9b9b"
              ></Path>
            </Svg>
            <Text className="text-center text-white text-sm">Play</Text>
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center gap-3"
          style={{ marginTop: 40 }}
        >
          <TouchableOpacity className="mt-5">
            <View>
              <Svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                className="injected-svg"
                data-src="https://cdn.hugeicons.com/icons/cancel-circle-bulk-rounded.svg"
                role="img"
                color="#9b9b9b"
              >
                <Path
                  opacity="0.4"
                  d="M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z"
                  fill="#9b9b9b"
                ></Path>
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7071 8.29292C16.0976 8.68345 16.0976 9.31662 15.7071 9.70713L13.4141 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3165 15.7071 15.7071C15.3166 16.0976 14.6835 16.0976 14.2929 15.7071L11.9998 13.4142L9.70708 15.7067C9.31655 16.0972 8.68338 16.0972 8.29287 15.7067C7.90236 15.3162 7.90238 14.683 8.29292 14.2925L10.5855 12L8.29292 9.70752C7.90238 9.31701 7.90236 8.68385 8.29287 8.29331C8.68338 7.90277 9.31655 7.90275 9.70708 8.29326L11.9998 10.5858L14.2929 8.29287C14.6835 7.90236 15.3166 7.90238 15.7071 8.29292Z"
                  fill="#9b9b9b"
                ></Path>
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${isRecording ? "bg-white" : "opacity-25 border border-dashed border-gray-50" } rounded-full h-[5rem] w-[5rem] flex-row justify-center pt-5`}
            onPress={stop_recording}
            disabled={isRecording ? false : true}
          >
            <View className="h-10 w-10 bg-red-400 rounded-sm"></View>
          </TouchableOpacity>
          <TouchableOpacity className="mt-5">
            <View>
              <Svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                color="#9b9b9b"
              >
                <Path
                  opacity="0.4"
                  d="M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z"
                  fill="#9b9b9b"
                ></Path>
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7372 9.67573C17.1103 9.26861 17.0828 8.63604 16.6757 8.26285C16.2686 7.88966 15.636 7.91716 15.2628 8.32428L10.4686 13.5544L8.70711 11.7929C8.31658 11.4024 7.68342 11.4024 7.29289 11.7929C6.90237 12.1834 6.90237 12.8166 7.29289 13.2071L9.79289 15.7071C9.98576 15.9 10.249 16.0057 10.5217 15.9998C10.7944 15.9938 11.0528 15.8768 11.2372 15.6757L16.7372 9.67573Z"
                  fill="#9b9b9b"
                ></Path>
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
