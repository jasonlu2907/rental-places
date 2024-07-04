import EmptyList from '../components/EmptyList';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';
import ReservationsClient from './ReservationsClient';

export const metadata = {
  title: 'Reservations',
};

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyList
        title='Unauthorized'
        subtitle='Login to see your reservations'
      />
    );

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0)
    return (
      <EmptyList
        title='No reservations found'
        subtitle='Looks like you have no reservations on your properties.'
      />
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
