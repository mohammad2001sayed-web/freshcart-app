"use client";

import AppButton from "@/components/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@base-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RigesterDataType } from "./register.interface";
import { sendUserDataRegister } from "./register.services";
import { useRouter } from "next/navigation";
import { registerSchema } from "./register.zod";

export default function RegisterForm() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  async function onSubmit(data: RigesterDataType) {
    try {
      await sendUserDataRegister(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
        <p className="text-sm text-slate-500 mt-1">
          Welcome to our store! Please fill in your details below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-slate-700 capitalize">
                Full Name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                autoComplete="off"
                type="text"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${
                  fieldState.invalid
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {fieldState.invalid && (
                <span className="text-xs text-red-500 mt-0.5">
                  <FieldError errors={[fieldState.error]} />
                </span>
              )}
            </Field>
          )}
        />

        {/* Email Address */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-slate-700 capitalize">
                Email Address
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                autoComplete="off"
                type="email"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${
                  fieldState.invalid
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {fieldState.invalid && (
                <span className="text-xs text-red-500 mt-0.5">
                  <FieldError errors={[fieldState.error]} />
                </span>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-slate-700 capitalize">
                Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="off"
                type="password"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${
                  fieldState.invalid
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {fieldState.invalid && (
                <span className="text-xs text-red-500 mt-0.5">
                  <FieldError errors={[fieldState.error]} />
                </span>
              )}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-slate-700 capitalize">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="off"
                type="password"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${
                  fieldState.invalid
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {fieldState.invalid && (
                <span className="text-xs text-red-500 mt-0.5">
                  <FieldError errors={[fieldState.error]} />
                </span>
              )}
            </Field>
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-slate-700 capitalize">
                Phone Number
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="01012345678"
                autoComplete="off"
                type="tel"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all outline-none ${
                  fieldState.invalid
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              {fieldState.invalid && (
                <span className="text-xs text-red-500 mt-0.5">
                  <FieldError errors={[fieldState.error]} />
                </span>
              )}
            </Field>
          )}
        />

        {/* Submit Button */}
        <AppButton
          type="submit"
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all active:scale-[0.99] text-center cursor-pointer"
        >
          Sign Up
        </AppButton>
      </form>
    </div>
  );
}