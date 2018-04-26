export interface BoxofficeMovie {
  count: number,
  next: string,
  previous: string,
  results: [
    {
      id: number,
      title_ko: string,
      ticketing_rate: string,
      rating_avg: string,
      poster_image_m: string,
      poster_image_box_x3: string,
      members: [
        {
          type: string,
          member: number,
          name: string,
          real_name: string
        }
      ],
      d_day: string,
      audience: number,
      film_rate: string,
      running_time: number,
      genre: [
        {
          id: number,
          genre: string
        }
      ],
      user_pk: number,
      username: string,
      img_profile: string,
      comment: string,
      want_count: number
    },
    {
      id: number,
      title_ko: string,
      ticketing_rate: string,
      rating_avg: string,
      poster_image: string,
      members: [
        {
          type: string,
          member: number,
          name: string,
          real_name: string,
        }
      ],
      d_day: string,
      audience: number,
      film_rate: string,
      running_time: number
      genre: [
        {
          id: number,
          genre: string
        }
      ],
      user_pk: number,
      username: string,
      img_profile: string,
      comment: string,
      want_count: number
    }
  ]
}
