import { IScreening, ISeat } from '@/app/core/types/Screening';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import './Screening.css';
import { toCurrencyString } from '@/app/core/helpers';
import Seats from '@/app/components/Seats/Seats';
import Link from 'next/link';

interface IProps {
  params: {
    id: string;
  };
}

const Screening = async ({ params }: IProps) => {
  const data = await fetch(
    `${process.env.API_URL}/api/v1/screenings/${params.id}`,
    {
      cache: 'no-cache',
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  if (!data.data) return notFound();

  const screening: IScreening = data.data.screening[0];
  const seatsByRow: Record<number, ISeat[]> =
    screening.seats?.reduce((acc: Record<number, ISeat[]>, el: ISeat) => {
      if (!acc[el.row]) {
        acc[el.row] = [];
      }

      acc[el.row].push(el);
      return acc;
    }, {}) || {};

  return (
    <section className="screening">
      <div className="wrap">
        <div className="screening-container">
          <Image
            className="screening__img"
            src={`https://image.tmdb.org/t/p/w500/${screening.movie?.posterPath}`}
            alt=""
            width={267}
            height={400}
          />
          <div className="screening__content h4">
            <Link className='btn' href={`/movies/${screening.movie?.slug}`}>Back to movie</Link>
            <h1 className="h1">{screening.movie?.title}</h1>
            <div>Hall: {screening.hall?.title}</div>
            <div className="tag">{screening.type}</div>
            <div>
              {new Date(screening.date).toLocaleTimeString('en-US', {
                timeZone: 'Europe/Berlin',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div>{toCurrencyString(screening.ticketPrice)}</div>
            <Seats
              seatsByRow={seatsByRow}
              screening={screening._id}
              screeningData={data.data.screening[0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screening;
