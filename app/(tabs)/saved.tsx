import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { loadMovies, loadTvShows } from "@/services/localStorage";
import MovieCard from "@/components/MovieCard";
import TvShowCard from "@/components/TvShowCard";

const Saved: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const loadedMovies = await loadMovies();
    setMovies(loadedMovies);
    const loadedTvShows = await loadTvShows();
    setTvShows(loadedTvShows);
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-primary p-4">
      <FlatList
        data={[...movies, ...tvShows]}
        renderItem={({ item }) =>
          "title" in item ? <MovieCard {...item} /> : <TvShowCard {...item} />
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 bg-32"
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <Text className="text-white font-bold text-lg">
            You can save film or TV shows from the details page
          </Text>
        }
      />
    </View>
  );
};

export default Saved;
