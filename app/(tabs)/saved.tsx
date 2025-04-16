import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { loadMovies } from "@/services/localStorage";
import MovieCard from "@/components/MovieCard";

const Saved: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const func = async () => {
      const loadedMovies = await loadMovies();
      setMovies(loadedMovies);
    };

    func();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    const loadedMovies = await loadMovies();
    setMovies(loadedMovies);
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-primary p-4">
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
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
            You can save film from the details page
          </Text>
        }
      />
    </View>
  );
};

export default Saved;
