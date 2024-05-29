import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { SafeListing, SafeUser } from '@/app/types';

interface IParams {
  listingId: string;
  // currentId?: SafeUser | null;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId!');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id, //only the owner of the property can delete the listing
    },
  });

  return NextResponse.json(listing);
}
