import Container from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { cn } from "@/lib/utils";
import { BookOnlineIcon } from "../icons/book-online-icon";
import { GetItBackIcon } from "../icons/getItback-icon";
import { PickUpIcon } from "../icons/pickup-icon";
import { RepairedIcon } from "../icons/repaired-icon";

const steps = [
  {
    icon: BookOnlineIcon,
    title: "Book it online",
    description:
      "Sign-up or create an account to get hassle free services next to your door step.",
    color: "bg-[#0072de]",
  },
  {
    icon: PickUpIcon,
    title: "Send or Pick up",
    description:
      "Choose to drop off your device, ship it to us, or request a convenient doorstep pickup.",
    color: "bg-[#ff782c]",
  },
  {
    icon: RepairedIcon,
    title: "We repair it",
    description:
      "Our certified technicians quickly diagnose and repair your device using premium parts.",
    color: "bg-[#8247f5]",
  },
  {
    icon: GetItBackIcon,
    title: "Get it back",
    description:
      "Receive your fully tested, repaired device back with a warranty for your peace of mind.",
    color: "bg-[#ff4757]",
  },
];

export function HowWeWork() {
  return (
    <section className="py-7 md:py-16  bg-brand/1">
      <Container>
        <SectionTitle
          subtitle="How We Work"
          title="Step into the Light with Our Working Process"
          description={`Our Eco-Friendly Approach to Phone Care Choose the title that best aligns with your overall brand voice and resonates`}
          align="center"
        />
        <div className="mt-7 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-[14px] bg-lightBrand px-4 pt-8 pb-5 flex flex-col items-center text-center">
                <div
                  className={cn(
                    "absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center size-10 rounded-full text-white font-bold text-lg",
                    step.color,
                  )}>
                  {index + 1}
                </div>
                <Icon className="size-16" />
                <h3 className="text-xl md:text-2xl font-medium text-primary mt-3">
                  {step.title}
                </h3>
                <p className="text-secondary mt-1">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
