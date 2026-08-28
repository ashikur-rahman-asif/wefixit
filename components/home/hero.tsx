import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#F3F4F6] pt-4 md:pt-10 pb-0 md:pb-10 lg:pb-0 overflow-hidden">
      <Container>
        <div className="grid gap-0 md:gap-8 md:grid-cols-2 items-end md:items-center lg:items-end justify-between">
          <div className="pb-0 lg:pb-20">
            <h1 className="text-primary text-[38px] sm:text-[44px] leading-[110%] md:leading-[120%] font-extrabold lg:text-[74px] lg:leading-[125%] tracking-negative font-prompt">
              Your{" "}
              <span className="inline-flex text-white bg-brand px-3 rounded-2xl md:rounded-3xl rotate-0 md:-rotate-2">
                50% off
              </span>
              <br />
              Modern, Phone <br />
              Repair Solution
            </h1>
            <p className="text-[15px] sm:text-base text-black/80 font-montserrat mt-2 md:mt-5 max-w-120">
              Experience fast, reliable, and expert phone repair services. From
              broken screens to battery replacements, we bring your device back
              to life in no time.
            </p>
            <div className="flex items-center gap-4 md:gap-7 font-prompt mt-3 md:mt-12">
              <Link
                href="/repair"
                className="flex items-center gap-2 md:gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl">
                <Image
                  src="/repair.png"
                  width={80}
                  height={80}
                  alt="book-a-repair"
                  priority
                  className="w-[52px] h-auto sm:w-[60px] md:w-16 lg:w-20 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                />
                <p className="text-[13px] sm:text-sm md:text-xl lg:text-[27px] font-prompt text-black font-bold leading-tight lg:leading-8 group-hover:text-brand transition-colors duration-300">
                  Let&apos;s Book <br /> A Repair
                </p>
              </Link>
              <Link
                href="/track-repair"
                className="flex items-center gap-2 md:gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl">
                <Image
                  src="/track.png"
                  width={80}
                  height={58}
                  alt="track-your-repair"
                  priority
                  className="w-[52px] h-auto sm:w-[60px] md:w-16 lg:w-20 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                  style={{ width: "auto" }}
                />
                <p className="text-[13px] sm:text-sm md:text-xl lg:text-[27px] font-prompt text-black font-bold leading-tight lg:leading-8 group-hover:text-brand transition-colors duration-300">
                  Track Your <br /> Repair
                </p>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-full">
            <Image
              src="/hero.png"
              width={546}
              height={800}
              alt="hero"
              className="h-auto w-[380px] sm:w-[420px] md:w-full lg:w-[640px] xl:w-[720px] max-w-none md:max-w-full lg:max-w-none block align-bottom select-none"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
