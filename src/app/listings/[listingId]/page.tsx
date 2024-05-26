import EmptyList from '@/app/components/EmptyList';
import ListingClient from './ListingClient';

import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservation from '@/app/actions/getReservation';

interface IListing {
  listingId?: string;
}
// this is a server component

const ListingPage = async ({ params }: { params: IListing }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservation(params);

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
