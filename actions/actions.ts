'use server';

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  ValidateWithZod,
} from '@/utils/schemas';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import db from '@/utils/db';
import { redirect } from 'next/navigation';
import { actionFunction } from '@/utils/types';
import { uploadFile } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

const renderError = (error: unknown): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An unknown error occurred!!',
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not login!!');
  }
  if (!user.privateMetadata?.hasProfile) redirect('/profile/create');
  return user;
};

export const createProfileAction: actionFunction = async (
  prevState,
  formData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login!!');

    const rawData = Object.fromEntries(formData.entries());
    const validateField = ValidateWithZod(profileSchema, rawData);
    // console.log('Validated:', validateField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? '',
        profileImage: user.imageUrl ?? '',
        ...validateField,
      },
    });
    const client = await clerkClient();

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: 'Profile created successfully!' };
  } catch (error) {
    // console.error('Validation Error:', error);
    return renderError(error);
  }
  redirect('/');
  return {
    message: `Profile created successfully!`,
  };
};

export const createLandmarkAction: actionFunction = async (
  prevState,
  formData
) => {
  try {
    const user = await getAuthUser();

    // Validate data
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    const validatedFile = ValidateWithZod(imageSchema, { image: file });
    const validateField = ValidateWithZod(landmarkSchema, rawData);

    // Upload Image to supabase
    const fullPath = await uploadFile(validatedFile.image);
    // console.log('File uploaded:', validateField);

    // Insert to db
    await db.landmark.create({
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });

    // console.log('Landmark created:', validateField, fullPath, user.id);
    // return { message: 'Landmark created successfully!' };
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchLandmarks = async ({ search = '', category = '' }) => {
  const landmarks = await db.landmark.findMany({
    where: {
      // category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
      AND: [{ category: category ? { equals: category } : undefined }],
    },
    orderBy: { createdAt: 'desc' },
  });
  return landmarks;
};

export const fetchLandmarkHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
  return landmarks;
};

export const fetchFavouriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favourite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favourite?.id || null;
};

export const toggleFavouriteAction = async (prevState: {
  favouriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favouriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favouriteId) {
      await db.favorite.delete({
        where: { id: favouriteId, profileId: user.id },
      });
    } else {
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: (favouriteId ? 'Removed' : 'Added') + ' favourite success',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavourites = async () => {
  const user = await getAuthUser();
  const favourites = await db.favorite.findMany({
    where: { profileId: user.id },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          price: true,
          province: true,
          category: true,
          lat: true,
          lng: true,
        },
      },
    },
  });
  return favourites.map((favourite) => favourite.landmark);
};
