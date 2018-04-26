export interface MovieCategory {
    genre: string;
    category: string;
    active: boolean;
}
export interface MovieList {
  count: number;
  next?: string;
  previous?: string;
  results: [
    {
      id: number;
      title_ko: string;
      movie_created_date: string;
      poster_image_m: string;
      rating_avg: string;
      genre: [
        {
          id: number;
          genre: string;
        }
      ];
      tag: number[];
    }
  ];
}
export interface Movie {
  id: number;
  title_ko: string;
  movie_created_date: string;
  poster_image_m: string;
  rating_avg: string;
  genre: [
    {
      id: number;
      genre: string;
    }
  ];
  tag: number[];
}
