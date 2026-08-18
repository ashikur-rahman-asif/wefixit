import Container from "@/components/container";
import Image from "next/image";
import { SectionTitle } from "../section-title";

const data = [
  {
    id: 3,
    title: "Apple",
    icon: "/brands/apple.jpg",
  },
  {
    id: 2,
    title: "Samsung",
    icon: "/brands/samsung.jpg",
  },
  {
    id: 9,
    title: "One-Plus",
    icon: "/brands/oneplus.jpg",
  },
  {
    id: 5,
    title: "Huawei",
    icon: "/brands/huawei.jpg",
  },
  {
    id: 8,
    title: "Google",
    icon: "/brands/google.jpg",
  },
  {
    id: 6,
    title: "Lg",
    icon: "/brands/lg.jpg",
  },
  {
    id: 1,
    title: "Oppo",
    icon: "/brands/oppo.jpg",
  },
  {
    id: 7,
    title: "Xiaomi",
    icon: "/brands/xiaomi.jpg",
  },
  {
    id: 4,
    title: "Sony",
    icon: "/brands/sony.jpg",
  },
];

export function Brands() {
  return (
    <section className="bg-white py-7 md:py-16">
      <Container className="text-center">
        <SectionTitle
          descriptionClassName="text-primary"
          title="Brands We Repair"
          description="Our Eco-Friendly Approach to Phone Care Choose the title that best aligns with your overall brand voice and resonates"
          align="center"
        />
        <div className="max-w-[900px] mx-auto flex flex-wrap gap-8 items-center justify-center md:mt-10 mt-6">
          {data.map((brand) => (
            <Image
              key={brand.id}
              src={brand.icon}
              alt={brand.title}
              width={160}
              height={64}
              className="h-16 w-auto shadow-lg shadow-gray-200 border border-gray-100/50 rounded-lg"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
