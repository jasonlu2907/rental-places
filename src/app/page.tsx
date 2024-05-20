import { use, useEffect, useState } from 'react';
import getListings from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';

import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyList from './components/EmptyList';
import ListingCard from './components/listings/ListingCard';

export default function Home() {
  const currentUser = use(getCurrentUser());
  const listings = use(getListings());
  // console.log(listings);

  if (!listings) {
    return (
      <div className=''>
        <EmptyList showReset />
      </div>
    );
  }

  return (
    // <ClientOnly>
    <Container>
      <div className='pt-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
    // </ClientOnly>
  );
}
