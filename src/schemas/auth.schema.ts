import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    })
    .min(3)
    .max(50),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8)
    .max(120),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1)
    .max(20),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    })
    .min(3)
    .max(50),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8)
    .max(120),
});
