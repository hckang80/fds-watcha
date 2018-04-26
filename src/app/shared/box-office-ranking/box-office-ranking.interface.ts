export interface BoxofficeRanking {
    count: number;
    next?: string;
    previous?: string;
    results: [
        {
            id: number,
            title_ko: string,
            ticketing_rate: number,
            rating_avg: number
        }
      ];
}
