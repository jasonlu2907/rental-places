import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) NextResponse.error();

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string')
    throw new Error('Invalid ReservationId!');

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          // if is the user who made the reservation
          userId: currentUser?.id,
        },
        {
          // if is the owner of the listing
          listing: {
            userId: currentUser?.id,
          },
        },
      ],
    },
  });

  return NextResponse.json(reservation);
}
