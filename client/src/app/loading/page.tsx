import Image from "next/image";
import ClockLoader from "react-spinners/ClockLoader";
export default function Loading() {
  return (
    <>
      {" "}
      <div className="w-full h-full fixed top-0 left-0 bg-slate-300 opacity-80 z-10"></div>
      <div className="flex justify-center mb-40">
        <div className="flex flex-col z-20 items-center bg-white text-slate-700 p-3 w-[50%] rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <h1 className="font-bold text-2xl mt-3"> Loading...</h1>
            <ClockLoader color="#2a342f" size={50} speedMultiplier={2} />
          </div>
          <Image
            src={
              "/pngtree-woman-meditating-clipart-woman-sitting-in-landscape-meditating-cartoon-illustration-vector-png-image_6868454.png"
            }
            alt={"loading Image"}
            className="object-contain"
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  );
}
