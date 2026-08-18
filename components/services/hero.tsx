import Container from "@/components/container";
import Image from "next/image";

export function ServicesHero() {
  return (
    <div className="relative bg-primary">
      <Image
        width={1440}
        height={502}
        src="/hero-bg-pattern-lg.webp"
        quality={100}
        alt="hero-bg-pattern"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />
      <Container>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px] pt-16 md:pt-0">
          <div className="flex flex-col items-center">
            <div className="mb-4 md:mb-6">
              <div className="bg-white inline-flex rounded-full font-medium text-brand text-lg md:text-2xl px-6 md:px-10 py-1 md:py-1.5 font-prompt">
                Services
              </div>
            </div>
            <div className="text-white text-center font-prompt px-2 sm:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-[40px] font-bold mb-3 md:mb-5 leading-tight">
                Professional Repair Solutions
              </h1>
              <p className="max-w-[75ch] mx-auto text-sm sm:text-base md:text-[17px] font-montserrat text-gray-200">
                Explore our comprehensive range of expert repair services designed to address all your phone and electronic device needs
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
