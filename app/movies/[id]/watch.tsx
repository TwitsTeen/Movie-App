import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";

function Watch() {
  const { id } = useLocalSearchParams();
  const baseURL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
  if (Platform.OS === "web") {
    return (
      <div className="flex w-full h-full ">
        <iframe
          src={`${baseURL}/movie?tmdb=${id}`}
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
      source={{ uri: `${baseURL}/movie?tmdb=${id}` }}
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

export default Watch;
