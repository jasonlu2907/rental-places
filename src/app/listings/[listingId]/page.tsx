import EmptyList from '@/app/components/EmptyList';
import ListingClient from './ListingClient';

import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IListing {
  listingId?: string;
}
// this is a server component

const ListingPage = async ({ params }: { params: IListing }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyList />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
