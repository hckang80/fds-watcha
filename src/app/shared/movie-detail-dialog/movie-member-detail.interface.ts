export interface MovieMemberDetail {
    id: number;
    name: string;
    real_name: string;
    img_profile: string;
    img_profile_x3: string;
    by_director_movie_list: [
        {
            id: number;
            title_ko: string;
            poster_image_s: string;
            login_user_checked: {
                id: number;
                user_want_movie: string;
                user_watched_movie: string;
                rating: string;
                comment: string;
                user: string;
                movie: string;
            }
        }

    ];
    by_main_actor_movie_list: [
        {
            id: number;
            img_profile: string;
            img_profile_x3: string;
            name: string;
            real_name: string;
            // login_user_checked: {
            //     id: number;
            //     user_want_movie: string;
            //     user_watched_movie: string;
            //     rating: string;
            //     comment: string;
            //     user: string;
            //     movie: string;
            // }
        }
    ];

}


