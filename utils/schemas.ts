import { z, ZodSchema } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'ชื่อ ต้องมากกว่า 2 ตัวอักษร' }),
  lastName: z.string().min(2, { message: 'นามสกุล ต้องมากกว่า 2 ตัวอักษร' }),
  userName: z.string().min(2, { message: 'ชื่อผู้ใช้ ต้องมากกว่า 2 ตัวอักษร' }),
});

const validateImage = () => {
  const maxFileSizeMB = 1; // 1MB
  const maxFileSizeByte = maxFileSizeMB * (1024 * 1024); // 1MB
  return z.instanceof(File).refine((file) => file.size <= maxFileSizeByte, {
    message: `ไฟล์ภาพต้องมีขนาดไม่เกิน ${maxFileSizeMB}MB`,
  });
  // .refine(
  //   (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
  //   { message: 'ไฟล์ภาพต้องเป็นประเภท JPEG, PNG หรือ GIF' }
  // );
};
export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'ชื่อสถานที่ ต้องมากกว่า 5 ตัวอักษร' })
    .max(50, { message: 'ชื่อสถานที่ ต้องไม่เกิน 50 ตัวอักษร' }),
  category: z.string(),
  price: z.coerce.number().int().min(0, { message: 'ราคา ต้องมากกว่า 0' }),
  province: z.string(),
  description: z
    .string()
    .min(10, { message: 'คำอธิบาย ต้องมากกว่า 10 ตัวอักษร' })
    .max(500, { message: 'ชื่อสถานที่ ต้องไม่เกิน 500 ตัวอักษร' }),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const ValidateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(', '));
  }
  return result.data;
};
