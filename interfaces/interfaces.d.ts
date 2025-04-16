interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

interface TvShow {
  backdrop_path: string;
  id: number;
  name: string;
  orginal_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  first_air_date: string;
  vote_average: number;
}

interface TvShowDetails {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  poster_path: string;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
}
