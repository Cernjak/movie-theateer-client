'use client';

import Image from 'next/image';
import Link from 'next/link';
import './Header.css';
import { usePathname } from 'next/navigation';
import { useUser } from '@/app/core/context/user.context';

const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useUser();

  return (
    <header className="header">
      <div className="wrap">
        <div className="header__container">
          <Link href="/">
            <Image
              src="/assets/logo.webp"
              width={132}
              height={50}
              alt="Černjak movie theater logo"
            />
          </Link>
          {!user?.name ? null : (
            <div className="header__user h4">
              {user?.name}
              {!user.photo ? null : (
                  <Image
                    className='header__user-img'
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/users/${user.photo}`}
                    alt="profile picture"
                    width={50}
                    height={50}
                  />
              )}
            </div>
          )}
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li>
                <Link
                  className={`header__nav-link${
                    pathname === '/tickets' ? ' active' : ''
                  }`}
                  href="/tickets"
                >
                  Tickets
                </Link>
              </li>
              <li>
                <Link
                  className={`header__nav-link${
                    pathname === '/movies' ? ' active' : ''
                  }`}
                  href="/movies"
                >
                  Movies
                </Link>
              </li>
              {user?.email ? null : <li>
                <Link
                  className={`header__nav-link${
                    pathname === '/login' ? ' active' : ''
                  }`}
                  href="/login"
                >
                  Login
                </Link>
              </li>}
              {!user?.email ? null : <li>
                <button
                  className="header__nav-link"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
