import { Store, Search,ShoppingCart} from "lucide-react";
import Link from "next/link";
const ROUTES = [
  {
    url: "/female",
    name: "Female",
  },
  {
    url: "/male",
    name: "Male",
  },
  {
    url: "/kids",
    name: "Kids",
  },
  {
    url: "/all-product",
    name: "All Product",
  },
];
export default function Navbar() {
  return (
    <div className="container mx-auto flex justify-between items-center py-6">
      <div className="flex items-center space-x-2">
        <Store /> <span className="font-bold">Dino Market</span>
      </div>
      <div>
        {ROUTES.map((item) => (
          <Link href={item.url} className="px-4">
            {item.name}
          </Link>
        ))}
      </div>
      <div className="relative">
        <Search size={14} className="absolute top-1 left-1 mt-[2px] text-gray-400" />
        <input
          type="text"
          placeholder="What you are looking for"
          className="px-5 border rounded-lg border-gray-300 text-sm focus:border-none active:border-none"
        />
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center flex relative">
        <span className="absolute top-0 right-0 bg-orange-700 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">0</span>
        <ShoppingCart size={20} className="" />
      </div>
    </div>
  );
}
