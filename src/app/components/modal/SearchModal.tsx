'use client';
import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { formatISO } from 'date-fns';
import queryString from 'query-string';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import CountrySelect, { CountrySelectValue } from '../input/CountrySelect';
import Heading from '../Heading';
import Calendar from '../input/Calendar';
import Counter from '../input/Counter';

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      // console.log('Params: ', params);
      currentQuery = queryString.parse(params.toString());
      // console.log('Param but in string: ', currentQuery);
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLable = useMemo(() => {
    if (step === STEPS.INFO) return 'Search';

    return 'Next';
  }, [step]);

  const secondaryActionLable = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect place for you and family'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='What is your start date?' />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place' />
        <Counter
          title='Guests'
          subtitle='How many guests are there?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='What about bathrooms?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLable}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLable}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
