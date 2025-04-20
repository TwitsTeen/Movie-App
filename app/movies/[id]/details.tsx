import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import {
  isMovieFavorite,
  switchMovieSavedStatus,
} from "@/services/localStorage";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
function convertMovieDetailsToMovie(details: MovieDetails): Movie {
  return {
    id: details.id,
    title: details.title,
    adult: details.adult,
    backdrop_path: details.backdrop_path || "",
    genre_ids: details.genres.map((genre) => genre.id),
    original_language: details.original_language,
    original_title: details.original_title,
    overview: details.overview || "",
    popularity: details.popularity,
    poster_path: details.poster_path || "",
    release_date: details.release_date,
    video: details.video,
    vote_average: details.vote_average,
    vote_count: details.vote_count,
  };
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie>();
  const [isMovieSaved, setIsMovieSaved] = useState<Boolean>();

  const { id } = useLocalSearchParams();
  const { data: movieDetail, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  useEffect(() => {
    if (movieDetail) {
      setMovie(convertMovieDetailsToMovie(movieDetail!));
    }
  }, [movieDetail]);

  useEffect(() => {
    const checkMovieSaved = async () => {
      if (movie) {
        const saved = await isMovieFavorite(movie);
        setIsMovieSaved(saved);
      }
    };

    checkMovieSaved();
  }, [movie]);

  const router = useRouter();

  function switchSavedState() {
    switchMovieSavedStatus(movie!);
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <TouchableOpacity onPress={() => router.push(`/movies/${id}/watch`)}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-white font-bold text-xl">
              {movieDetail?.title}
            </Text>
            <TouchableOpacity onPress={() => switchSavedState()}>
              <Image
                source={icons.star}
                style={{ tintColor: isMovieSaved ? "gold" : "white" }}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movieDetail?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {movieDetail?.runtime}m
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movieDetail?.vote_average ?? 0)} /10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movieDetail?.vote_count} votes)
            </Text>
          </View>
        </View>

        <MovieInfo label="Overview" value={movieDetail?.overview} />
        <MovieInfo
          label="Genres"
          value={movieDetail?.genres?.map((g) => g.name).join(" - ") || "N/A"}
        />
        <View className="flex flex-row justify-between w-1/2">
          <MovieInfo
            label="Budget"
            value={`$${(movieDetail?.budget ?? 0) / 1_000_000} million`}
          />
          <MovieInfo
            label="Revenue"
            value={`$${Math.round(
              (movieDetail?.revenue ?? 0) / 1_000_000
            )} million`}
          />
        </View>
        <MovieInfo
          label="Production Companies"
          value={
            movieDetail?.production_companies.map((c) => c.name).join(" - ") ||
            "N/A"
          }
        />

        <TouchableOpacity
          className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor={"#fff"}
          ></Image>
          <Text className="text-white font-semibold text-base">Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
