import { IScreening } from '@/app/core/types/Screening';
import Link from 'next/link';
import './ScreeningList.css';

interface IProps {
  movie: string;
}

const ScreeningList = async ({ movie }: IProps) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${movie}/screenings`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  const screeningsPerDay: {
    _id: string;
    screenings: IScreening[];
  }[] = data?.data?.screenings;

  if (!screeningsPerDay.length) return <h2 className="h4">No screenings</h2>;

  return (
    <div className="screening-list">
      <h2 className="h4">Screenings:</h2>
      {screeningsPerDay
        ?.sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime())
        .map((day) => (
          <div className='screening-list__day' key={day._id}>
            <div className='screening-list__day-title'>{day._id}:</div>
            <ul className="screening-list__list">
              {day.screenings.map((screening) => (
                <li className="screening-list__item" key={screening._id}>
                  <Link className="btn" href={`/screenings/${screening._id}`}>
                    {new Date(screening.date).toLocaleTimeString('en-US', {
                      timeZone: 'Europe/Berlin',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    <span className="tag">
                      {screening.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default ScreeningList;
