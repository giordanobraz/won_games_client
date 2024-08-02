'use client';

import {
  IconMenu3,
  IconSearch,
  IconShoppingCart,
  IconX,
} from '@tabler/icons-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { tv } from 'tailwind-variants';
import { Button } from '../Button';
import { Logo } from '../Logo';

const menu = tv({
  slots: {
    menuStyles:
      'absolute inset-0 z-40 flex h-screen flex-1 flex-col items-center justify-center gap-16 overflow-hidden bg-white transition-opacity duration-300',
    linkStyles:
      'after-border-secondary relative w-max text-center text-xl font-bold text-black after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:border-b-2 after:border-primary after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full',
    menuAnimaionDesktopStyles:
      'hidden items-center gap-4 transition-all duration-300 md:flex [&>a]:text-lg [&>a]:font-medium [&>a]:text-white',
    menuAnimaionMobileStyles:
      'flex flex-col items-center justify-between gap-4 transition-all duration-300',
    menuAnimaionLoginStyles:
      'flex w-full flex-col items-center gap-4 px-12 transition-all duration-300',
  },

  variants: {
    isOpen: {
      true: {
        menuStyles: 'opacity-100 pointer-events-auto',
        menuAnimaionDesktopStyles: 'translate-y-0',
        menuAnimaionMobileStyles: 'translate-y-0',
        menuAnimaionLoginStyles: 'translate-y-0',
      },
      false: {
        menuStyles: 'opacity-0 pointer-events-none',
        menuAnimaionDesktopStyles: 'translate-y-10 md:translate-y-0',
        menuAnimaionMobileStyles: 'translate-y-10 md:translate-y-0',
        menuAnimaionLoginStyles: 'translate-y-10 md:translate-y-0',
      },
    },
  },

  defaultVariants: {
    isOpen: false,
  },
});

export type MenuProps = {
  username?: string;
};

export const Menu: FC<MenuProps> = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);

  // styles
  const {
    menuStyles,
    linkStyles,
    menuAnimaionDesktopStyles,
    menuAnimaionMobileStyles,
    menuAnimaionLoginStyles,
  } = menu({ isOpen });

  return (
    <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-14 transition-all">
      {/* menu mobile */}
      <IconMenu3
        className="cursor-pointer text-white md:hidden"
        aria-label="open menu"
        onClick={() => setIsOpen(true)}
      />
      {/* logo */}
      <Logo
        hideOnMobile
        className="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
      />
      {/* nav links desktop */}
      <div className={menuAnimaionDesktopStyles()}>
        <Link href="/" className={linkStyles()}>
          Home
        </Link>
        <Link href="/store" className={linkStyles()}>
          Store
        </Link>
      </div>
      {/* search, cart and sign in */}
      <div className="ml-auto flex items-center gap-4">
        <IconSearch className="cursor-pointer text-white" aria-label="search" />
        <IconShoppingCart
          className="cursor-pointer text-white"
          aria-label="open shopping cart"
        />
        {!username && <Button className="hidden md:block">Sign in</Button>}
      </div>
      {/* menu mobile */}
      <nav aria-hidden={!isOpen} className={menuStyles()}>
        <IconX
          aria-label="close menu"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 m-4 cursor-pointer"
        />
        {/* nav links mobile */}
        <div className={menuAnimaionMobileStyles()}>
          <Link href="/" className={linkStyles()}>
            Home
          </Link>
          <Link href="/" className={linkStyles()}>
            Store
          </Link>

          {!!username && (
            <>
              <Link href="/" className={linkStyles()}>
                My account
              </Link>

              <Link href="/" className={linkStyles()}>
                Wishlist
              </Link>
            </>
          )}
        </div>
        {/* login or sign up */}
        {!username && (
          <div className={menuAnimaionLoginStyles()}>
            <Button size="lg" className="w-full">
              Log in now
            </Button>

            <span className="relative my-2 block bg-white px-0.5 text-xs">
              or
              <div className="border-1 absolute left-1/2 top-1/2 -z-10 h-0.5 w-10 -translate-x-1/2 bg-black"></div>
            </span>

            <Link
              href="/signup"
              className="border-b-2 border-primary text-sm text-primary hover:border-primary/80 hover:text-primary/80"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
