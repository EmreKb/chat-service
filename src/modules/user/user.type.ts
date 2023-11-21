import type { User as UserType } from '@prisma/client';

export type UserResponse = { id: string | number };

export type User = Omit<UserType, 'createdAt' | 'updatedAt'>;
