import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import WebView from "react-native-webview";

function watch() {
  const { id, episode, season } = useLocalSearchParams();
  const baseURL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
  const url = `${baseURL}/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  if (Platform.OS === "web") {
    return (
      <div className="flex w-full h-full ">
        <iframe
          src={url}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <WebView
      className="flex"
      originWhitelist={["*"]}
      source={{ uri: `${url}` }}
      javaScriptEnabled
      domStorageEnabled
      allowsFullscreenVideo={true}
      onShouldStartLoadWithRequest={(request) => {
        const isSameUrl = request.url === id;
        return isSameUrl;
      }}
      setSupportMultipleWindows={false}
    />
  );
}

export default watch;
