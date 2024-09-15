'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const Ticket = ({ ticket }: any) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current) return;
    QRCode.toCanvas(qrRef.current, ticket._id, {
      width: 180,
      height: 180,
    });
  }, [qrRef.current, ticket]);

  return (
    <Link
      href={`/screenings/${ticket.screening._id}`}
      className="tickets__ticket"
      key={ticket._id}
    >
      <div className="tickets__img-container img-container">
        <Image
          className="tickets__img cover-img"
          src={`https://image.tmdb.org/t/p/w500/${ticket.screening.movie.posterPath}`}
          alt={ticket.screening.movie.title}
          width={400}
          height={800}
        />
      </div>
      <div className="ticket__content">
        <h2 className="h4">{ticket.screening.movie.title}</h2>
        <div>{ticket.screening.hall.title}</div>
        <div>
          {new Date(ticket.screening.date).toLocaleTimeString('en-US', {
            timeZone: 'Europe/Berlin',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div>Seat:</div>
        <div>Row: {ticket.seat.row}</div>
        <div>Number: {ticket.seat.number}</div>
      </div>
      <canvas ref={qrRef} />
    </Link>
  );
};

export default Ticket;
