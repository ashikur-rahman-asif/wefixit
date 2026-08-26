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

    const validationErrors = data.errors || data.data;

    if (status === 422 && validationErrors && typeof validationErrors === "object") {
      if (setError) {
        Object.keys(validationErrors).forEach((key) => {
          setError(key as Path<T>, {
            type: "server",
            message: validationErrors[key][0],
          });
        });
        toast.error("Please check the highlighted fields for errors.");
      } else {
        const firstErrorKey = Object.keys(validationErrors)[0];
        toast.error(validationErrors[firstErrorKey][0] || "Validation failed.");
      }
      return validationErrors;
    }

    if (data.message) {
      toast.error(data.message);
      return;
    }
  }

  toast.error(fallbackMessage);
}
