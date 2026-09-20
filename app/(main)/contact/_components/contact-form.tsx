"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Input } from "@/components/form-elements/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/features/contact/hooks/use-contact";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const submitMutation = useSubmitContact();

  const onSubmit = async (data: ContactFormValues) => {
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            placeholder="Your Name"
            required
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Your Email"
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone"
            type="tel"
            placeholder="Your Phone Number"
            required
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input
            label="Subject"
            placeholder="Subject"
            required
            {...register("subject")}
            error={errors.subject?.message}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-900 block mb-1">
            Message <span className="text-red-500 ml-1">*</span>
          </label>
          <Textarea
            placeholder="Your Message"
            {...register("message")}
            error={errors.message?.message}
          />
        </div>
        <div className="pt-2 text-center md:text-left">
          <Button
            type="submit"
            variant="brand"
            size="lg"
            className="w-full md:w-auto font-prompt"
            disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
