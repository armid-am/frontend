"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Textarea } from "@ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  classNameTextArea?: string;
}

export const FormTextArea: React.FC<Props> = (props) => {
  const { className, label, classNameTextArea, children, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className={cn("", className)}>
      {label && <span className="font-bold text-base">{label}</span>}
      <span className="flex gap-2 relative h-full">
        <span className="absolute left-2 top-2">{children}</span>
        <Textarea
          className={cn(
            "py-2 text-[14px] border-b border-b-black/50 focus-visible:border-b-black rounded-none leading-6",
            classNameTextArea,
          )}
          {...rest}
          {...register(rest.name || "")}
        />
      </span>
      {errors[rest.name || ""] && (
        <span className="text-primary text-[14px] block">
          {errors[rest.name || ""]?.message as string}
        </span>
      )}
    </label>
  );
};
