import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { images } from "@/constants/images";

const TabIcon = ({
  focused,
  iconName,
  title,
}: {
  focused: boolean;
  iconName: keyof typeof MaterialIcons.glyphMap;
  title: string;
}) => {
  if (focused)
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <MaterialIcons name={iconName} size={20} color="#151312" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  else
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <MaterialIcons name={iconName} size={20} color="#A8B5DB" />
      </View>
    );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          title: "Tv",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="live-tv" title="Tv" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="search" title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="bookmark" title="Saved" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
