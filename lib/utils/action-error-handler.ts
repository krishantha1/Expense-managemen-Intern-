import { ActionResponse } from "@/lib/utils/types";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const actionErrorHandler = <T>(error: unknown): ActionResponse<T> => {
  // handle data validation error
  if (error instanceof ZodError)
    return { success: false, error: error.issues[0].message };

  // handle Prisma client known request errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // handle unique constraint errors
    if (error.code === "P2002") {
      return {
        success: false,
        error: `${(error.meta?.target as string)[0] as string} already exists`,
      };
    }

    // handle other Prisma client known request errors
    return { success: false, error: error.message };
  }

  // handle Prisma client validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error(error);

    return { success: false, error: "prisma client validation error" };
  }

  // handle unknown errors
  console.log("Unknown error: ", error);
  return { success: false, error: "" };
};
