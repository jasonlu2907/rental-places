import EmptyList from '../components/EmptyList';
import getCurrentUser from '../actions/getCurrentUser';
import getFavorites from '../actions/getFavorites';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites();

  if (favorites.length === 0)
    return (
      <EmptyList
        title='No favorites found'
        subtitle='Looks like you have not liked any listings.'
      />
    );

  return <FavoritesClient favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
