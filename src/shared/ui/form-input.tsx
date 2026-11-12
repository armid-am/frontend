"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Input } from "@ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  classNameInput?: string;
}

export const FormInput: React.FC<Props> = (props) => {
  const { className, label, classNameInput, children, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className={cn("", className)}>
      {label && <span className="font-bold text-base">{label}</span>}
      <span className="flex items-center gap-2 relative">
        <span className="absolute left-2">{children}</span>
        <Input
          className={cn(
            "py-5! px-10! pr-2! text-base border-b! rounded-none border-black/50! focus-visible:border-b-black! leading-6 placeholder:font-normal",
            classNameInput,
          )}
          {...rest}
          {...register(rest.name || "")}
        />
      </span>
      {errors[rest.name || ""] && (
        <span className="text-primary text-[14px]">
          {errors[rest.name || ""]?.message as string}
        </span>
      )}
    </label>
  );
};
