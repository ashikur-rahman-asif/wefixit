import { isAxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export function handleFormError<T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>,
  fallbackMessage: string = "An unexpected error occurred. Please try again."
) {
  if (isAxiosError(error) && error.response) {
    const { status, data } = error.response;

    if (status === 422 && data.errors) {
      if (setError) {
        Object.keys(data.errors).forEach((key) => {
          setError(key as Path<T>, {
            type: "server",
            message: data.errors[key][0],
          });
        });
      }
      toast.error(data.message || "Please check the form for errors.");
      return data.errors;
    }

    if (data.message) {
      toast.error(data.message);
      return;
    }
  }

  toast.error(fallbackMessage);
}
