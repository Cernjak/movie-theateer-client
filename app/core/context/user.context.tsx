'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useFetch from '../hooks/useFetch';

const UserContext = createContext<{
  user: any;
  login: ({}: { email: string; password: string }) => void;
  logout: () => void;
  getTickets: () => void;
  tickets: any[];
}>({
  user: null,
  login: () => {},
  logout: () => {},
  getTickets: () => {},
  tickets: [],
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  let tokenStr;
  if (typeof window !== 'undefined') {
    tokenStr = window.localStorage.getItem('token');
  } else {
    tokenStr = '';
  }
  const [token, setToken] = useState(tokenStr);
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const { result, status, doFetch } = useFetch({ url: 'users/login' });
  const {
    result: logoutResult,
    status: logoutStatus,
    doFetch: logoutFetch,
  } = useFetch({ url: 'users/logout' });
  const {
    result: me,
    status: meStatus,
    doFetch: fetchMe,
  } = useFetch({ url: 'users/me' });
  const {
    result: ticketsResults,
    status: ticketsStatus,
    doFetch: fetchTickets,
  } = useFetch({ url: 'tickets/my-tickets' });

  const getTickets = useCallback(() => {
    fetchTickets({
      method: 'GET',
    });
  }, [fetchTickets]);

  useEffect(() => {
    if (!token) return;
    getUser();
    getTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setUser(result?.data.user);
      const token = result?.token || '';
      window.localStorage.setItem('token', token);
      setToken(token);
      getTickets();
      location.assign('/movies');
    }
    if (status === 'fail') {
      console.log(result?.message);
    }
  }, [status, result, getTickets]);

  useEffect(() => {
    if (!logoutResult) return;
    if (logoutStatus === 'success') {
      setUser(null);
      setToken(null);
      window.localStorage.removeItem('token');
      location.assign('/login');
    } else {
      console.log(logoutResult?.message);
    }
  }, [logoutResult, logoutStatus]);

  useEffect(() => {
    if (ticketsStatus === 'success') {
      setTickets(
        ticketsResults.data.tickets.sort(
          (a: any, b: any) => new Date(b.screening.date).valueOf() - new Date(a.screening.date).valueOf()
        )
      );
    }
    if (ticketsStatus === 'fail') {
      console.log(ticketsResults?.message);
    }
  }, [ticketsStatus, ticketsResults]);

  useEffect(() => {
    if (meStatus === 'success') {
      setUser(me?.data.doc);
    }
    if (meStatus === 'fail') {
      console.log(me?.message);
    }
  }, [meStatus, me]);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      doFetch({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    },
    [doFetch]
  );

  const logout = useCallback(() => {
    logoutFetch({
      method: 'GET',
    });
  }, [logoutFetch]);

  const getUser = () => {
    fetchMe({
      method: 'GET',
    });
  };

  const data = useMemo(() => {
    return {
      user,
      login,
      logout,
      tickets,
      getTickets,
    };
  }, [user, login, logout, tickets, getTickets]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
