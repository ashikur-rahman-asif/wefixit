import Container from "@/components/container";
import { ArrowRightIcon } from "../icons/arrow-right";
import { ClockIcon } from "../icons/clock-icon";
import { DeliveryBoyIcon } from "../icons/deliveryBoy-icon";
import { DeliveryCarIcon } from "../icons/deliveryCar-icon";
import { HouseIcon } from "../icons/house-icon";
import { SectionTitle } from "../section-title";

const services = [
  {
    icon: HouseIcon,
    iconBg: "#EFF4FF",
    title: "Drop off at our store location",
    description:
      "You bring the damaged device to our store location for repair",
  },
  {
    icon: ClockIcon,
    iconBg: "#FFEEEF",
    title: "On-Site repair in 30 min",
    description:
      "Our certified technician comes to your location to fix the damaged device",
  },
  {
    icon: DeliveryCarIcon,
    iconBg: "#E0FCED",
    title: "Expedited pick up and delivery",
    description:
      "We offer an express pickup and delivery service if you are in a hurry.",
  },
  {
    icon: DeliveryBoyIcon,
    iconBg: "#FFCD5F",
    title: "Standard pickup and deliver service",
    description: "Choose the day and time that works for you",
  },
];

export function Services() {
  return (
    <section className="bg-lightBrand py-7 md:py-16">
      <Container>
        <SectionTitle
          descriptionClassName="text-primary"
          subtitle="Services"
          title="Step into the Light with Our Services"
          description="Our Eco-Friendly Approach to Phone Care Choose the title that best aligns with your overall brand voice and resonates"
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-10">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-[14px] py-5 md:px-6 px-5 flex flex-col">
                <div
                  className="rounded-full p-4 inline-flex self-start"
                  style={{ backgroundColor: service.iconBg }}>
                  <Icon className="size-8" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl lg:text-2xl font-medium text-titleBlack mt-4 mb-3 md:mt-6">
                    {service.title}
                  </h4>
                  <p className="text-titleBlack text-sm">{service.description}</p>
                </div>
                <div className="text-white bg-brand rounded-full p-4 mt-6 inline-flex self-start">
                  <ArrowRightIcon className="size-5" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
