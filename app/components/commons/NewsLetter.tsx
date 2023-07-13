export default function NewsLater() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-10 relative">
      <div className="absolute top-0 flex justify-center items-center w-screen text-8xl font-bold opacity-10 -z-0">
        <h1>Newsletter</h1>
      </div>
      <h1 className="text-3xl font-bold">Subscribe Our News Letter</h1>
      <p className="text-sm">
        Get the latest infomation and promo offers directly
      </p>
      <div className="flex gap-2">
        <input
          className="border border-black text-sm px-5"
          placeholder="input email address"
        />
        <button className="bg-black text-white px-6 py-1 text-sm">
          Get Started
        </button>
      </div>
    </div>
  );
}
