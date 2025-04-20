import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchTvShowDetails } from "@/services/api";
import { Picker } from "@react-native-picker/picker";
import { icons } from "@/constants/icons";
import {
  isTvShowFavorite,
  switchTvShowSavedStatus,
} from "@/services/localStorage";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

function convertToTvShow(details: TvShowDetails): TvShow {
  return {
    backdrop_path: details.backdrop_path,
    id: details.id,
    name: details.name,
    orginal_name: details.original_name,
    overview: details.overview,
    poster_path: details.poster_path,
    media_type: "tv",
    first_air_date: details.first_air_date,
    vote_average: details.vote_average,
  };
}

const TvShowInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const TvShowDetails = () => {
  const { id } = useLocalSearchParams();

  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(1);
  const [isTvShowSaved, setIsTvShowSaved] = useState<Boolean>(false);

  const {
    data: tvShow,
    loading: tvShowLoading,
    error: tvShowError,
  } = useFetch(() => fetchTvShowDetails(id as string));

  useEffect(() => {
    fetchTvShowDetails(id as string);
    const checkMovieSaved = async () => {
      const isSaved = await isTvShowFavorite(convertToTvShow(tvShow!));
      setIsTvShowSaved(isSaved);
    };
    checkMovieSaved();
  }, []);

  useEffect(() => {
    if (tvShow?.seasons) {
      setNumberOfEpisodes(
        tvShow.seasons[selectedSeason - 1]?.episode_count || 10
      );
    }
    setSelectedEpisode(1);
  }, [selectedSeason, tvShow]);

  function switchSavedState(): void {
    setIsTvShowSaved((prev) => !prev);
    switchTvShowSavedStatus(convertToTvShow(tvShow!));
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`,
        }}
        className="w-full h-[550px]"
        resizeMode="stretch"
      />

      <View className="flex-col items-start justify-center mt-5 px-5">
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-white font-bold text-xl">{tvShow?.name}</Text>
          <TouchableOpacity onPress={() => switchSavedState()}>
            <Image
              source={icons.star}
              style={{ tintColor: isTvShowSaved ? "gold" : "white" }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-x-1 mt-2">
          <Text className="text-light-200 text-sm">
            {tvShow?.first_air_date?.split("-")[0]}
          </Text>

          <Picker
            selectedValue={selectedSeason}
            onValueChange={(itemValue) => setSelectedSeason(itemValue)}
            style={{
              flex: 1,
              height: 50,
              color: "#fff",
              backgroundColor: "#030014",
            }}
            dropdownIconColor="#fff"
          >
            {tvShow?.seasons.map((season, index) => (
              <Picker.Item
                key={index + 1}
                label={`Season : ${index + 1}`}
                value={index + 1}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedEpisode}
            onValueChange={(itemValue) => setSelectedEpisode(itemValue)}
            style={{
              flex: 1,
              height: 50,
              color: "#fff",
              backgroundColor: "#030014",
            }}
            dropdownIconColor="#fff"
          >
            {Array.from({ length: numberOfEpisodes }, (_, i) => (
              <Picker.Item
                key={i + 1}
                label={`Episode : ${i + 1}`}
                value={i + 1}
              />
            ))}
          </Picker>

          <Link
            href={`/tvShows/${id}/${selectedSeason}/${selectedEpisode}`}
            asChild
          >
            <Text className="text-light-200 text-sm">Watch</Text>
          </Link>
        </View>

        <TvShowInfo label="Overview" value={tvShow?.overview} />
        <TvShowInfo
          label="Genres"
          value={tvShow?.genres?.map((g) => g.name).join(" - ") || "N/A"}
        />

        <View className="flex-row items-center gap-x-32 w-full mt-5">
          <TvShowInfo label="Seasons" value={tvShow?.seasons.length || "N/A"} />
          <TvShowInfo label="Episodes" value={tvShow?.number_of_episodes} />
        </View>
      </View>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TvShowDetails;
