"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";

export const FormSubmit = ({
  children,
  ...props
}: Omit<ButtonProps, "type">): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending}>
      {children}
    </Button>
  );
};
