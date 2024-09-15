import { Suspense } from 'react';
import BuyTicket from '../components/BuyTicket/BuyTicket';

const Processing = () => {
  return (
    <Suspense>
      <BuyTicket />
    </Suspense>
  );
};

export default Processing;
