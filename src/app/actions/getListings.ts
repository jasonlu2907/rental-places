import prisma from '@/app/libs/prismadb';

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const SafeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return SafeListing;
  } catch (err: any) {
    throw new Error(err);
  }
}
