import AsyncStorage from "@react-native-async-storage/async-storage";

const MOVIES_KEY = "@movies_list";

const saveMovie = async (newMovie: Movie) => {
  try {
    // Get existing list
    const existing = await AsyncStorage.getItem(MOVIES_KEY);
    const movies = existing ? JSON.parse(existing) : [];

    // Add the new movie
    const updatedMovies = [...movies, newMovie];

    // Save it back
    await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));

    console.log("saving movie :", newMovie.title);
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

const removeMovie = async (movie: Movie) => {
  try {
    // Get existing list
    const existing = await AsyncStorage.getItem(MOVIES_KEY);
    const movies = existing ? JSON.parse(existing) : [];

    const updatedMovies = movies.filter((m: Movie) => m.id != movie.id);

    // Save it back
    await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

export const switchSavedStatus = async (movie: Movie) => {
  try {
    const existing = await AsyncStorage.getItem(MOVIES_KEY);
    const movies = existing ? JSON.parse(existing) : [];

    const isSaved = movies.some((m: Movie) => m.id === movie.id);

    if (isSaved) {
      await removeMovie(movie);
    } else {
      await saveMovie(movie);
    }
  } catch (error) {
    console.error("Error switching movie saved status:", error);
  }
};

export const isMovieFavorite = async (movie: Movie) => {
  try {
    const existing = await AsyncStorage.getItem(MOVIES_KEY);
    const movies = existing ? JSON.parse(existing) : [];

    const isSaved = movies.some((m: Movie) => m.id === movie.id);

    return isSaved;
  } catch (error) {
    console.error("Error checking if a movie is already a favorite:", error);
  }
};

export const loadMovies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Loading error", e);
  }
};
