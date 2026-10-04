import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: zod
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: zod
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, contain uppercase, lowercase, number, and special character",
      ),

    rePassword: zod.string().min(1, "Please confirm your password"),

    phone: zod
      .string()
      .min(1, "Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // 👈 بيحدد إن الخطأ يظهر عند حقل rePassword
  });

// 🔹 تصدير الـ Type للـ Form
export type RegisterSchemaType = zod.infer<typeof registerSchema>;