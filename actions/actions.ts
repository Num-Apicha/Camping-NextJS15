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
    console.log('Validated:', validateField);

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

export const fetchLandmarks = async () =>
  //Search
  {
    const landmarks = await db.landmark.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return landmarks;
  };
