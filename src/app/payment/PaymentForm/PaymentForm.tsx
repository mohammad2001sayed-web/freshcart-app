"use client";

import AppButton from "@/components/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@base-ui/react";
import { Controller, useForm } from "react-hook-form";
import { PaymentDataType } from "../Payment.interface";
import {
  handleCreateCashOrder,
  handleCreateOnlineOrder,
} from "../Payment.action";

export default function PaymentForm({ id }: { id: string }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
    mode: "all",
  });

async function createCash(data: PaymentDataType) {
  const response = await handleCreateCashOrder(data, id);

  console.log(response);
}
async function createOnline(data: PaymentDataType) {
  const response = await handleCreateOnlineOrder(data, id);
    if (response?.status === "success" && response?.session?.url) {
    window.location.href = response.session.url;
  }

  console.log(response);
}
  return (
    <div className="w-1/2 mx-auto">
      <form className="flex flex-col gap-5 mt-6">
        {/* Address */}
        <Controller
          name="details"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Address here"
                autoComplete="off"
                type="text"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>City</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="City here"
                autoComplete="off"
                type="text"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Postal Code */}
        <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Postal Code here"
                autoComplete="off"
                type="text"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Phone here"
                autoComplete="off"
                type="tel"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-2">
          <AppButton type="button"
            onClick={handleSubmit(createCash)}
            className="grow bg-blue-500 hover:bg-blue-500/40"
          >
            Create cash order
          </AppButton>
          <AppButton type="button"
            onClick={handleSubmit(createOnline)}
            className="grow bg-yellow-300 hover:bg-yellow-300/40"
          >
            Create online order
          </AppButton>
        </div>
      </form>
    </div>
  );
}
