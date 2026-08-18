import Container from "@/components/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "../section-title";

const faqs = [
  {
    question: "How Soon Will My Order Ship?",
    answer:
      "Once your order is placed, we typically process and ship it within 1-2 business days. You will receive a tracking link via email as soon as your package is on its way.",
  },
  {
    question: "Is There Any Warranty Exclusions?",
    answer:
      "Yes, our warranty covers manufacturing defects and the parts we replace during a repair. It does not cover accidental damage, liquid damage, or unauthorized modifications made after the repair.",
  },
  {
    question: "Are There Any Return Exclusions?",
    answer:
      "Certain items, such as final sale products, opened software, and customized devices, cannot be returned. All other eligible items can be returned within 30 days of purchase in their original condition.",
  },
  {
    question: "Will I Be Charged For A Replacement Item?",
    answer:
      "If the replacement is due to a defect covered under our warranty or a mistake on our end, you will not be charged. However, for standard exchanges, price differences or shipping fees may apply.",
  },
  {
    question: "How Can I Track My Orders & Payment?",
    answer:
      "You can easily track your order and view your payment history by logging into your account on our website. We also send automated email updates at every step of the process.",
  },
];

export function FAQ() {
  return (
    <section className="bg-lightBrand">
      <Container className="py-7 md:py-16">
        <SectionTitle
          descriptionClassName="text-primary"
          title="Frequent ask qustions"
          subtitle="faq"
          description="Pellentesque cras adipiscing tempus libero vel nullam mauris tellus. Aliquam ultrices tellus consequat amet, lectus aliquam est in neque."
          align="center"
        />

        <div className="mt-10 md:mt-14 max-w-[840px] mx-auto">
          <Accordion defaultValue={["item-0"]} className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-black/10 px-0">
                <AccordionTrigger className="text-left text-lg md:text-xl font-medium text-primary hover:no-underline py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary text-sm md:text-base leading-relaxed pb-6 text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
