import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';

import Container from './components/Container';
import EmptyList from './components/EmptyList';
import ListingCard from './components/listings/ListingCard';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  // console.log(listings);

  if (listings.length === 0) {
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
};

export default Home;
