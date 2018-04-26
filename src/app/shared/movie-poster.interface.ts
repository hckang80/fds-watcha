export interface MoviePoster {
    count: number;
    next: string;
    previous: string;
    results: [
                {
                    id: number;
                    title_ko: string;
                    title_en: string;
                    rating_avg: number;
                    nation: string;
                    poster_image: string;
                    genre: [
                        {
                            id: number;
                            genre: string;
                        }
                    ],
                    running_time: number;
                    login_user_checked: {
                        id: number;
                        user_want_movie: boolean;
                        user_watched_movie: boolean;
                        rating: number;
                        comment: string;
                        user: number;
                        movie: number;
                    }
                }
            ];
    }
