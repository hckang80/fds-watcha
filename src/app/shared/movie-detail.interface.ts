export interface MovieDetail {
  id: number,
  title_ko: string,
  title_en: string,
  d_day: string,
  film_rate: string,
  running_time: number,
  intro: string,
  nation: string,
  ticketing_rate: string,
  audience: number,
  rating_avg: string,
  movie_eval_info: {
    rating_cnt: number,
    want_movie_cnt: number,
    comment_cnt: number
  },
  movie_rating_data: {
    3.5: number,
    3.0: number,
    4.0: number,
    5.0: number
  },
  poster_image_m: string,
  poster_image_my_x3: string,
  still_cuts: [
    {
      id: number,
      movie: number,
      still_img: string,
      still_img_x3: string
    }
  ],
  genre: [
    {
      id: number,
      genre: string
    }
  ],
  tag: [
    {
      id: number,
      tag: string
    }
  ],
  trailer_youtube: [
    {
      title: string,
      url_thumbnail: string,
      get_trailer_url: string
    }
  ],
  movie_member_list: [
    {
      movie: number,
      member: {
        id: number,
        name: string,
        img_profile: string
      },
      type: string,
      role_name: string
    }
  ],
  movie_checking_data: [
    {
      id: number,
      user_want_movie: string,
      user_watched_movie: string,
      rating: string,
      comment: string,
      modified_date: string,
      user: {
        pk: number,
        email: string,
        nickname: string,
        img_profile: string
      },
      movie: number
    }
  ]
}
