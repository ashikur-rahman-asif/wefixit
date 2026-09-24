import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#F3F4F6] pt-4 md:pt-10 pb-0 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between  md:gap-4 lg:gap-8">
          <div className="w-full md:w-[50%] lg:w-[52%] xl:w-[55%] flex flex-col justify-center pb-0 md:pb-12 lg:pb-20 xl:pb-24 pt-0 md:pt-8 lg:pt-0">
            <h1 className="text-primary text-[38px] sm:text-[44px] md:text-[32px] lg:text-[48px] xl:text-[66px] 2xl:text-[74px] leading-[110%] md:leading-[120%] lg:leading-[115%] font-extrabold tracking-negative font-prompt">
              Your{" "}
              <span className="inline-flex text-white bg-brand px-2 md:px-3 rounded-xl md:rounded-3xl rotate-0 md:-rotate-2">
                50% off
              </span>
              <br />
              Modern, Phone <br />
              Repair Solution
            </h1>
            <p className="text-[15px] sm:text-base md:text-[13px] lg:text-base text-black/80 font-montserrat mt-2 md:mt-4 lg:mt-5 max-w-[90%] md:max-w-full xl:max-w-xl">
              Experience fast, reliable, and expert phone repair services. From broken screens to
              battery replacements, we bring your device back to life in no time.
            </p>
            <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center gap-4 md:gap-3 lg:gap-7 font-prompt mt-5 md:mt-6 lg:mt-10">
              <Link
                href="/repair"
                className="flex items-center gap-2 md:gap-2 lg:gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
              >
                <Image
                  src="/repair.png"
                  width={80}
                  height={80}
                  alt="book-a-repair"
                  priority
                  className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[42px] md:h-[42px] lg:w-16 lg:h-16 shrink-0 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                />
                <p className="text-[13px] sm:text-sm md:text-[12px] lg:text-[18px] xl:text-[24px] font-prompt text-black font-bold leading-tight group-hover:text-brand transition-colors duration-300">
                  Let&apos;s Book <br /> A Repair
                </p>
              </Link>
              <Link
                href="/tracking"
                className="flex items-center gap-2 md:gap-2 lg:gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
              >
                <Image
                  src="/track.png"
                  width={80}
                  height={80}
                  alt="track-your-repair"
                  priority
                  className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[42px] md:h-[42px] lg:w-16 lg:h-16 shrink-0 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                />
                <p className="text-[13px] sm:text-sm md:text-[12px] lg:text-[18px] xl:text-[24px] font-prompt text-black font-bold leading-tight group-hover:text-brand transition-colors duration-300">
                  Track Your <br /> Repair or Order
                </p>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[50%] lg:w-[48%] xl:w-[45%] flex justify-center md:justify-end items-end self-end mt-6 md:mt-0">
            <Image
              src="/hero.png"
              width={546}
              height={800}
              alt="hero"
              className="h-auto w-full max-w-[420px] md:max-w-none lg:max-w-[546px] block align-bottom object-contain select-none"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
