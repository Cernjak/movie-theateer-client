'use client';

import { IScreening, ISeat } from '@/app/core/types/Screening';
import './Seats.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/core/context/user.context';
import useFetch from '@/app/core/hooks/useFetch';
import Link from 'next/link';

interface IProps {
  seatsByRow: Record<number, ISeat[]>;
  screening: string;
  screeningData: IScreening;
}

const Seats = ({ seatsByRow, screening, screeningData }: IProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { tickets, getTickets } = useUser();
  const {
    result: buyResults,
    status: buyStatus,
    doFetch: buy,
  } = useFetch({
    url: `screenings/${screening}/tickets/create-session`,
  });

  const handleSeatClick = (id: string) => {
    if (id === selectedSeat) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(id);
    }
  };

  const buyTicket = async () => {
    if (!selectedSeat) return;
    await buy({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seat: selectedSeat,
      }),
    });

    setSelectedSeat(null);
  };

  useEffect(() => {
    if (buyStatus === 'success') {
      window.location.href = buyResults.data.session.url;
    }
    if (buyStatus === 'fail') {
      console.log(buyResults?.message);
    }
  }, [buyStatus, buyResults, router, getTickets]);

  return (
    <div className="seats">
      <div className="seats__container">
        <div className="seats__seats">
          {Object.keys(seatsByRow).map((rowKey) => {
            const seats = seatsByRow[rowKey as any].sort(
              (a, b) => a.number - b.number
            );
            return (
              <div className="seats__row" key={rowKey}>
                {rowKey}
                {seats?.map((seat) => (
                  <button
                    className={`seats__seat${
                      tickets.some(
                        (el: any) =>
                          el.seat._id === seat._id &&
                          el.screening._id === screening
                      )
                        ? ' my'
                        : seat.available
                        ? ' available'
                        : ' not-available'
                    }${selectedSeat === seat._id ? ' selected' : ''}`}
                    key={seat._id}
                    disabled={!seat.available}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <span className="sr-only">
                      row {seat.row} number {seat.number}{' '}
                      {seat.available ? 'available' : 'not available'}
                    </span>
                    {seat.number}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
        <div className="seats__legend">
          <div className="seats__seat available">Available</div>
          <div className="seats__seat selected">Selected</div>
          <div className="seats__seat my">Yours</div>
          <div className="seats__seat not-available">Unavailable</div>
        </div>
      </div>
      {!user?.email ? (
        <Link className="seats__buy btn" href="/login">
          Login to buy
        </Link>
      ) : (
        <button
          className="seats__buy btn"
          onClick={buyTicket}
          disabled={buyStatus === 'loading' || !selectedSeat}
        >
          Buy
        </button>
      )}
      {!message ? null : <div>{message}</div>}
    </div>
  );
};

export default Seats;
