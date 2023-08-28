'use client';

import Link from 'next/link';
import React from 'react';

const ClientLink = ({
  className,
  children,
  route,
}: {
  className: string;
  children: React.ReactNode;
  route: string;
}) => {
  return (
    <Link className={className} href={route}>
      {children}
    </Link>
  );
};

export default ClientLink;
