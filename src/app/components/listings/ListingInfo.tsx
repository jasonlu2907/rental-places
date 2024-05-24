'use client';

import useCountries from '@/app/hooks/useCountries';
import dynamic from 'next/dynamic';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  bathroomCount,
  roomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div className=''>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div className=''>{guestCount} guests</div>
          <div className=''>{roomCount} rooms</div>
          <div className=''>{bathroomCount} rooms</div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />

      <div className='text-lg font-light text-neutral-600'>{description}</div>
      <hr />

      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;
