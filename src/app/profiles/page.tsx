import EmptyList from '../components/EmptyList';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import ProfilesClient from './ProfilesClient';

export const metadata = {
  title: 'Profile',
  description: 'My Profile',
};

const ProfilesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyList title='Unauthorized' subtitle='Please log in' />;

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0)
    return (
      <EmptyList
        title='No profile found'
        subtitle='Looks like you have no properties.'
      />
    );

  return <ProfilesClient listings={listings} currentUser={currentUser} />;
};

export default ProfilesPage;
