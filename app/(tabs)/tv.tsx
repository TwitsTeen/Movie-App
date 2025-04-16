import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchTvShows } from "@/services/api";
import useFetch from "@/services/useFetch";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import TvShowCard from "@/components/TvShowCard";

const Tv: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: tvShows,
    loading: tvShowsLoading,
    error: tvShowsError,
    refetch: loadTvShows,
  } = useFetch(() => fetchTvShows({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadTvShows();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {tvShowsLoading ? (
          <ActivityIndicator
            size="large"
            color="0000ff"
            className="mt-10 self-center"
          />
        ) : tvShowsError ? (
          <Text>Error: {tvShowsError?.message}</Text>
        ) : (
          <View className="flex-1 mt-6">
            <SearchBar
              placeholder="Search for a tv show"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            ></SearchBar>
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Tv Shows
              </Text>
              <FlatList
                data={tvShows}
                renderItem={({ item }) => <TvShowCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 bg-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Tv;
