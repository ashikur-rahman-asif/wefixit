import Link from "next/link";
import Container from "./Container";
import { FacebookIcon } from "./icons/facebook-icon";
import { InstagramIcon } from "./icons/instagram";
import Logo from "./icons/logo";
import { TwitterIcon } from "./icons/twitter-icon";

const PRODUCT_LINKS = [
  { label: "Our Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Our Shop", href: "/shop" },
  { label: "Features", href: "/features" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Partners", href: "/partners" },
];

export function Footer() {
  return (
    <footer
      className="bg-cover bg-center bg-no-repeat bg-[#1c222f]"
      style={{ backgroundImage: 'url("/footer-bg.png")' }}>
      <Container className="md:py-16 py-7">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Logo & Info */}
          <div className="lg:col-span-4 space-y-7 pr-4">
            <div className="w-40 text-white">
              <Logo className="w-full h-auto text-white" />
            </div>
            <p className="text-[#EAEAEA] text-base leading-relaxed max-w-[320px]">
              We are a trusted device repair center dedicated to bringing your
              gadgets back to life. With expert technicians and quick turnaround
              times, we ensure your devices work perfectly again.
            </p>
            <div className="flex gap-5 pt-2">
              <Link
                href="#"
                className="text-white hover:opacity-80 transition-opacity">
                <InstagramIcon className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:opacity-80 transition-opacity grayscale brightness-200">
                <TwitterIcon className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:opacity-80 transition-opacity grayscale brightness-200">
                <FacebookIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid gap-8 grid-cols-2 md:grid-cols-3">
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-4">
                {PRODUCT_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-[#D3D3D3] text-base font-medium hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                {COMPANY_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-[#D3D3D3] text-base font-medium hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white text-lg font-semibold mb-6">
                Contact us
              </h4>
              <ul className="space-y-4 mb-8">
                <li>
                  <Link
                    href="mailto:yourinfo@gmail.com"
                    className="text-[#D3D3D3] text-base font-medium hover:text-white transition-colors">
                    yourinfo@gmail.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+5511122233344"
                    className="text-[#D3D3D3] text-base font-medium hover:text-white transition-colors">
                    +55 111 222 333 44
                  </Link>
                </li>
              </ul>

              <h4 className="text-white text-lg font-semibold mb-4">
                Work schedule
              </h4>
              <p className="text-[#D3D3D3] text-base font-medium">
                Mon-Fri: 10 AM - 7 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="border-t border-white/15 mt-16 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#D3D3D3] text-[15px] font-medium">
            &copy; {new Date().getFullYear()} Wefixit - All Rights Reserved
          </p>
          <div className="flex items-center gap-2.5 cursor-pointer text-white text-[15px] font-medium hover:opacity-80 transition-opacity">
            <svg
              width="24"
              height="18"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-sm overflow-hidden">
              <rect width="20" height="15" fill="#F0F0F0" />
              <path
                d="M0 1.5H20V3H0V1.5ZM0 4.5H20V6H0V4.5ZM0 7.5H20V9H0V7.5ZM0 10.5H20V12H0V10.5ZM0 13.5H20V15H0V13.5Z"
                fill="#D80027"
              />
              <rect width="10" height="8" fill="#0052B4" />
              <circle cx="2" cy="2" r="0.5" fill="white" />
              <circle cx="5" cy="2" r="0.5" fill="white" />
              <circle cx="8" cy="2" r="0.5" fill="white" />
              <circle cx="3.5" cy="4" r="0.5" fill="white" />
              <circle cx="6.5" cy="4" r="0.5" fill="white" />
              <circle cx="2" cy="6" r="0.5" fill="white" />
              <circle cx="5" cy="6" r="0.5" fill="white" />
              <circle cx="8" cy="6" r="0.5" fill="white" />
            </svg>
            English
            <svg
              width="12"
              height="7"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#D3D3D3]">
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Container>
    </footer>
  );
}
