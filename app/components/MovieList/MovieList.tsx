import Image from 'next/image';
import Link from 'next/link';
import './MovieList.css';

interface IProps {
  movies: {
    _id: string;
    title: string;
    posterPath: string;
    slug: string;
  }[];
}

const MovieList = ({ movies }: IProps) => {
  return (
    <div className="movie-list">
      <ul className="movie-list__list">
        {movies?.map((movie) => (
          <li className="movie-list__item" key={movie._id}>
            <Link href={`/movies/${movie.slug}`}>
              <span className="movie-list__img-container img-container">
                <Image
                  className="movie-list__img cover-img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
                  alt="Movie poster"
                  width={400}
                  height={800}
                />
              </span>
              <h2 className="movie-list__title">{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
