import Image from 'next/image';
import { notFound } from 'next/navigation';
import './Movie.css';
import { IMovie } from '@/app/core/types/Movie';
import ScreeningList from '@/app/components/ScreeningList/ScreeningList';

interface IProps {
  params: {
    slug: string;
  };
}

const Movie = async ({ params }: IProps) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${params.slug}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  if (!data.data) return notFound();

  const movie: IMovie = data.data.doc;

  return (
    <section className="movie">
      <div className="wrap">
        <div className="movie__container">
          <Image
            className="movie__img"
            src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
            alt=""
            width={267}
            height={400}
          />
          <Image
            className="movie__backdrop cover-img"
            src={`https://image.tmdb.org/t/p/w500/${movie.backdropPath}`}
            alt=""
            width={2000}
            height={1124}
          />
          <div className="movie__content">
            <h1 className="h1">{movie.title}</h1>
            <p>{movie.overview}</p>
            <div>{new Date(movie.releaseDate).toLocaleDateString()}</div>
            <ScreeningList movie={movie._id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movie;
