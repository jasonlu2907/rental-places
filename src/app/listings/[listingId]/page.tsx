import EmptyList from '@/app/components/EmptyList';
import ListingClient from './ListingClient';

import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservation';

interface IListing {
  listingId?: string;
}
// this is a server component
export const metadata = {
  title: 'Listings',
};

const ListingPage = async ({ params }: { params: IListing }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyList />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
