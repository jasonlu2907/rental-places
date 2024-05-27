'use client';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import toast from 'react-hot-toast';
import { Range } from 'react-date-range';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';

import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import ListingReservation from '@/app/components/listings/ListingReservation';

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser };
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((cat) => cat.label === listing.category);
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //create reservation func
  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Reservation created!');
        setDateRange(initialDateRange);

        router.push('/trips');
      })
      .catch((error) => {
        toast.error('Something went wrong.' + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    listing?.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            src={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            {/* Left side: Listing Info */}
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            {/* Right side: Reservation info  */}
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeDate={(value: Range) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
