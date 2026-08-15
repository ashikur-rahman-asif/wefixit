import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "../icons/arrow-right";
import { RoundedTickIcon } from "../icons/rounded-tick";

export function RequestCall() {
  return (
    <Container className="py-7 md:py-16">
      <div
        className="bg-cover bg-center bg-no-repeat rounded-2xl w-full"
        style={{ backgroundImage: 'url("/call-to-action.png")' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 px-8 py-10 md:px-14 md:py-[52px]">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            <span className="text-sm md:text-base text-white font-medium opacity-80">
              Have a question?
            </span>
            <h2 className="text-3xl md:text-[44px] leading-tight text-white font-bold mt-1 md:mt-2">
              Request A Free Call
            </h2>
            <div className="hidden lg:flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <RoundedTickIcon className="w-[18px] h-[18px] text-white" />
                <p className="text-base text-white font-medium">
                  Request A Free Call
                </p>
              </div>
              <div className="flex items-center gap-2">
                <RoundedTickIcon className="w-[18px] h-[18px] text-white" />
                <p className="text-base text-white font-medium">
                  Request A Free Call
                </p>
              </div>
              <div className="flex items-center gap-2">
                <RoundedTickIcon className="w-[18px] h-[18px] text-white" />
                <p className="text-base text-white font-medium">
                  Request A Free Call
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center min-w-[200px]">
            <Button
              nativeButton={false}
              render={<Link href="tel:+8801516540594" />}
              className="text-brand border-none hover:text-brand bg-white hover:bg-white/90 text-base font-semibold py-3.5 px-10 whitespace-nowrap shadow-sm">
              Book A call
            </Button>
            <Link
              href="/contact"
              className="flex gap-1.5 items-center justify-center duration-150 hover:opacity-80 text-base font-medium text-white">
              Contact us
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
