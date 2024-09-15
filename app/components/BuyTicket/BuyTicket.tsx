'use client';

import useFetch from '@/app/core/hooks/useFetch';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const BuyTicket = () => {
  const searchParams = useSearchParams();
  const { result, status, doFetch } = useFetch({
    url: `screenings/${searchParams.get('screeningId')}/tickets/buy`,
  });

  useEffect(() => {
    doFetch({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionToken: searchParams.get('sessionToken'),
      }),
    });
  }, [doFetch, searchParams]);

  useEffect(() => {
    if (status === 'success') {
      redirect('/tickets');
    }
    if (status === 'fail') {
      console.log(result?.message);
    }
  }, [result?.message, status]);
  return (
    <section>
      <div className="wrap">Buying ticket...</div>
    </section>
  );
};

export default BuyTicket;
