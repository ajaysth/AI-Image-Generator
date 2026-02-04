import default_image from "../assets/messi.jpg"
import bg_image from "../assets/bg.jpg"
import { RiAiGenerate } from "react-icons/ri";


const ImageGenerator = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg_image})` }}
            ></div>

            {/* Dark overlay (VERY IMPORTANT) */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Glass Card */}
            <div className="relative z-10 w-[90%] max-w-[500px]">

                <div className="flex flex-col gap-6 border border-white/20 bg-white/10 backdrop-blur-xl p-5 rounded-xl shadow-xl">

                    {/* Header */}
                    <div className="text-3xl font-bold flex justify-center">
                        <span className="mr-2 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                            Image
                        </span>
                        <span className="bg-gradient-to-r from-cyan-500 to-indigo-400 bg-clip-text text-transparent">
                            Generator
                        </span>
                    </div>

                    {/* Image */}
                    <img
                        className="rounded-md w-full object-cover"
                        src={default_image}
                        alt=""
                    />

                    <div className="relative w-full">
  <input
    type="text"
    placeholder="Describe your image..."
    className="w-full h-12 rounded-full bg-black/30 border border-white/20 text-white pl-4 pr-32 outline-none focus:ring-2 focus:ring-cyan-400"
  />

  <button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 px-4 flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition">
    Generate
    <RiAiGenerate className="text-lg" />
  </button>
</div>


                </div>
            </div>
        </div>
    )
}

export default ImageGenerator
