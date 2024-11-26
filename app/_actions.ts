"use server";
import { CategorySchema, TimeSchema } from "@/lib/form_schema";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getProviders } from "next-auth/react";

type Inputs = z.infer<typeof TimeSchema>;

export const addTime = async (formData: Inputs) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: formData.categoryID },
    });

    if (category) {
      const time = await prisma.time.create({
        data: {
          activity: formData.activity,
          duration: calculateDuration(
            parseInt(formData.durationH),
            parseInt(formData.durationM),
            parseInt(formData.durationS)
          ),
          category: {
            connect: {
              id: formData.categoryID,
            },
          },
        },
      });

      revalidatePath("/");

      return { success: true, data: time };
    }

    return { success: false, error: "Failed to create major" };
  } catch {
    return { success: false, error: "Failed to create major" };
  }
};

export const addCategory = async (formData: z.infer<typeof CategorySchema>) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null; // or return a placeholder if needed
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return { success: false, error: "User email not found" };
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    console.log(userEmail);

    if (user) {
      const category = await prisma.category.create({
        data: {
          name: formData.name,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      revalidatePath("/");

      return { success: true, data: category };
    }

    return { success: false, error: "Failed to create category" };
  } catch {
    return { success: false, error: "Failed to try" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await prisma.category.delete({
      where: { id: id },
    });

    revalidatePath("/");

    return { success: true, data: category };
  } catch {
    return { success: false, error: "Failed to delete category" };
  }
};

export const deleteTime = async (id: string) => {
  try {
    const time = await prisma.time.delete({
      where: { id: id },
    });

    revalidatePath("/");

    return { success: true, data: time };
  } catch {
    return { success: false, error: "Failed to delete time" };
  }
}

export const getProviderGoogle = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return {redirect: { destination: '/', permanent: false }};
  }

  const providers = await getProviders();

  return providers;
}

export const getSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session;
}

const calculateDuration = (
  durationH: number,
  durationM: number,
  durationS: number
) => {
  return durationH * 3600 + durationM * 60 + durationS;
};
