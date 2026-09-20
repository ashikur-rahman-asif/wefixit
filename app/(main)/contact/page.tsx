import { Metadata } from "next";

import Container from "@/components/container";
import { RequestCall } from "@/components/home/request-call";
import { MailBoxIcon } from "@/components/icons/mailBox-icon";
import { PhoneCallIcon } from "@/components/icons/phoneCall-icon";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ContactForm } from "./_components/contact-form";
import { ContactHero } from "./_components/hero";

export const metadata: Metadata = {
  title: "Contact Us | WeFixIt – Professional Phone Repair",
  description:
    "Get in touch with WeFixIt, your trusted phone repair experts. Reach out to us today for prompt support.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Container className="py-6 lg:py-10">
        <div className="flex flex-col items-center mb-6 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-12">
            Contact Us
          </h2>
          <p className="text-secondary text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-2 text-center max-w-2xl">
            Fill out the form and our team will get back to you as quickly as we
            can.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-lightBrand rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="mb-6 flex items-center justify-center h-20">
              <WhatsAppIcon />
            </div>
            <h3 className="text-xl md:text-2xl text-primary font-semibold mb-3 font-prompt">
              WhatsApp
            </h3>
            <p className="text-secondary text-sm md:text-base font-montserrat leading-relaxed">
              Monday to Friday, from 8:30 to 21:00 and Saturdays form 10:00 to
              18:00.
            </p>
          </div>

          <div className="bg-lightBrand rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="mb-6 flex items-center justify-center h-20">
              <PhoneCallIcon />
            </div>
            <h3 className="text-xl md:text-2xl text-primary font-semibold mb-3 font-prompt">
              +880 151 654 0594
            </h3>
            <p className="text-secondary text-sm md:text-base font-montserrat leading-relaxed">
              Sunday to Thursday, from 10:00 to 21:00 and Friday form 10:00 to
              18:00.
            </p>
          </div>

          <div className="bg-lightBrand rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="mb-6 flex items-center justify-center h-20">
              <MailBoxIcon />
            </div>
            <h3 className="text-xl md:text-2xl text-primary font-semibold mb-3 font-prompt">
              hello@wefixit.com
            </h3>
            <p className="text-secondary text-sm md:text-base font-montserrat leading-relaxed">
              Don&apos;t hesitate to contact us. We&apos;re here to solve your
              doubts.
            </p>
          </div>
        </div>
      </Container>

      <div className="bg-lightBrand py-6 lg:py-10">
        <Container>
          <div className="flex flex-col items-center mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-12 text-center font-prompt">
              Send us a message
            </h2>
            <p className="text-secondary text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-2 text-center max-w-2xl">
              Fill out the form and our team will get back to you as quickly as
              we can.
            </p>
          </div>
          <ContactForm />
        </Container>
      </div>

      <Container className="py-6 lg:py-10">
        <div className="flex flex-col items-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-12 text-center ">
            Find us on Google Maps
          </h2>
          <p className="text-secondary text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-2 text-center max-w-2xl">
            If you have any questions you can report them below with the
            following information, so that it is easy for us to reply to your
            message.
          </p>
        </div>
        <div className="w-full h-100 md:h-125 rounded-3xl overflow-hidden shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=Mirpur%2013,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </Container>

      <RequestCall />
    </>
  );
}
