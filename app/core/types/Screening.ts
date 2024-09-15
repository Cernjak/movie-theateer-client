export interface IScreening {
  _id: string;
  date: string;
  type: string;
  ticketPrice: number;
  movie?: {
    _id: string;
    title: string;
    posterPath: string;
    slug: string;
  };
  hall?: {
    _id: string;
    title: string;
  };
  seats?: ISeat[];
}

export interface ISeat {
  _id: string;
  row: number;
  number: number;
  available: boolean;
}
