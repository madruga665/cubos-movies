import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border-custom flex items-center justify-center p-6 w-full">
      <p className="font-roboto font-normal text-footer-text text-base text-center leading-[20px]">
        <span className="font-montserrat leading-normal">
          2025 © Todos os direitos reservados a{' '}
        </span>
        <span className="font-montserrat font-semibold leading-normal text-brand-text">
          Cubos Movies
        </span>
      </p>
    </footer>
  );
}
