import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movies/[id]/details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movies/[id]/watch"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tvShows/[id]/details"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tvShows/[id]/[season]/[episode]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
