export interface Mypageuser {
    pk: number;
    email: string;
    nickname: string;
    img_profile: string;
    total_running_time: number;
    interesting_movie_cnt: number;
    still_cut_img: {
        id: number;
        movie: number;
        still_img: string;
    };
}