import { Store, Twitter, FacebookIcon, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-2 lg:grid-cols-5 grid-flow-row container mx-auto py-10">
        <div className="col-span-2 flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Store /> <span className="font-bold">Dino Market</span>
          </div>
          <p className="text-sm">
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-[#F1F1F1] w-8 h-8 rounded-lg flex items-center justify-center">
              <FacebookIcon />
            </span>
            <span className="bg-[#F1F1F1] w-8 h-8 rounded-lg flex items-center justify-center">
              <Twitter />
            </span>
            <span className="bg-[#F1F1F1] w-8 h-8 rounded-lg flex items-center justify-center">
              <Linkedin />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-gray-600">
          <p className="text-lg font-bold">Company</p>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Terms of Use</Link>
          <Link href={"#"}>Privacy Policy </Link>
          <Link href={"#"}>How it Works </Link>
          <Link href={"#"}>Contact Us </Link>
        </div>
        <div className="flex flex-col gap-3 text-gray-600">
          <p className="text-lg font-bold">Support</p>

          <Link href={"#"}>Support Carrer</Link>
          <Link href={"#"}>24h Service</Link>
          <Link href={"#"}>Quick Chat</Link>
        </div>
        <div className="flex flex-col gap-3 text-gray-600">
          <p className="text-lg font-bold ">Contact</p>
          <Link href={"#"}>Whatsapp</Link>
          <Link href={"#"}>Support 24h</Link>
        </div>
      </div>
      <div className="col-span-4 border-t flex justify-between items-center text-sm py-2 p-3 lg:px-28">
        <div>Copyright &copy; 2023 Dine Market</div>
        <div className="flex gap-1">
          <p>Design by : </p>
          <span className="font-bold">Mohsin Ali</span>
        </div>
        <div className="flex gap-1">
          <p>Code by</p>
          <a
            href="https://github.com/MohsinAliSoomro"
            target="_blank"
            className="text-blue-400 font-bold"
          >
            Mohsin Ali
          </a>
        </div>
      </div>
    </footer>
  );
}
