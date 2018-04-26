export interface UserActionResponse {
  id: number;
  user_want_movie: boolean;
  user_watched_movie: boolean;
  rating: string;
  comment: string;
  modified_date: string;
  created_date: string;
  user: number;
  movie: number;
}
