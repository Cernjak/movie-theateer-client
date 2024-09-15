'use client';

import { useUser } from '../core/context/user.context';
import './Tickets.css';
import Ticket from '../components/Ticket/Ticket';
import { useEffect } from 'react';

const Tickets = () => {
  const { tickets, getTickets } = useUser();

  useEffect(() => {
    getTickets()
  }, [getTickets]);

  return (
    <section className="tickets">
      <div className="wrap">
        <h1 className="h1">Tickets</h1>
        <div className="tickets__container">
          {!tickets.length ? <div>You have no tickets</div> : tickets.map((ticket: any) => (
            <Ticket ticket={ticket} key={ticket._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tickets;
