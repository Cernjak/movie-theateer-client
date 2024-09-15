import Image from 'next/image';
import Link from 'next/link';
import MovieList from '../components/MovieList/MovieList';
import { Suspense } from 'react';

const Movies = async () => {
  const data = await fetch(`${process.env.API_URL}/api/v1/movies`)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  return (
    <section>
      <div className="wrap">
        <h1 className="h1">Movies</h1>
        <Suspense fallback="Loading...">
          <MovieList movies={data?.data.doc} />
        </Suspense>
      </div>
    </section>
  );
};

export default Movies;
