import EmptyList from '../components/EmptyList';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';
import TripsClient from './TripsClient';

export const metadata = {
  title: 'Trips',
  description: 'My Trips',
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyList title='Unauthorized' subtitle='Please log in' />;

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0)
    return (
      <EmptyList
        title='No trips found'
        subtitle='Looks like you have not booked any place before.'
      />
    );

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
