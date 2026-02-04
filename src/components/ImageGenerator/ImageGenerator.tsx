import default_image from "../assets/messi.jpg"
import bg_image from "../assets/bg.jpg"
import { FaSearch } from "react-icons/fa";


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

                    <div className="relative">
                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Describe your image..."
                            className=" w-full rounded-md bg-black/30 border border-white/20 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-400"

                        />
                        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ImageGenerator
