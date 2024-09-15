export interface IMovie {
  _id: string;
  title: string;
  duration: number;
  posterPath: string;
  backdropPath: string;
  overview: string;
  popularity: number;
  releaseDate: string;
  ratingsAverage: number;
  ratingsCount: number;
  createdAt: string;
  slug: string;
  genreIds: number[];
}