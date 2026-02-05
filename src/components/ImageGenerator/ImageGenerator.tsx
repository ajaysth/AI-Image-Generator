import default_image from "../assets/messi.jpg"
import bg_image from "../assets/bg.jpg"
import { RiAiGenerate } from "react-icons/ri";
import { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";


const ImageGenerator = () => {

    const [image_url, setImage_url] = useState<string>("/");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const imageGenerator = async () => {
        if (!inputRef.current?.value.trim()) return;

        const prompt = inputRef.current.value;

        try {
            setLoading(true);
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            // FIX IS HERE: Parse as JSON, not Blob
            const data = await response.json();

            if (data.image) {
                // data.image is already "data:image/png;base64,..."
                setImage_url(data.image);
            } else {
                console.error("No image data in response:", data);
            }

        } catch (err) {
            console.error("Image generation failed:", err);
            alert("Failed to generate image. Try again!");
        } finally {
            setLoading(false);
        }
    };

    // for downloading the images that is generated
    const downloadImage = () => {
        if (image_url === "/" || image_url === default_image) return;

        const link = document.createElement("a");
        link.href = image_url;
        link.download = `generated-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg_image})` }}
            ></div>

            {/* Dark overlay*/}
            <div className="absolute inset-0 bg-black/50"></div>


            <div className="relative z-10 w-[90%] max-w-125">

                <div className="flex flex-col gap-6 border border-white/20 bg-white/10 backdrop-blur-xl p-5 rounded-xl shadow-xl">

                    {/* Header */}
                    <div className="text-3xl font-bold flex justify-center">
                        <span className="mr-2 bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                            Image
                        </span>
                        <span className="bg-linear-to-r from-cyan-500 to-indigo-400 bg-clip-text text-transparent">
                            Generator
                        </span>
                    </div>

                    {/* Image */}
                    {/* Image Container */}
                    <div className="relative group overflow-hidden rounded-md">
                        <img
                            className="w-full object-cover min-h-62.5"
                            src={image_url === "/" ? default_image : image_url}
                            alt="Generated content"
                        />

                        {/* Download Button - Shows on Hover */}
                        {image_url !== "/" && !loading && (
                            <button
                                onClick={downloadImage}
                                className="absolute top-3 right-3 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full 
                       transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm 
                       cursor-pointer border border-white/20"
                                title="Download Image"
                            >
                                <FiDownload size={22} />
                            </button>
                        )}
                    </div>

                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Describe your image..."
                            ref={inputRef}
                            className="w-full h-12 rounded-full bg-black/30 border border-white/20 text-white pl-4 pr-32 outline-none focus:ring-2 focus:ring-cyan-400"
                        />

                        <button onClick={() => { imageGenerator() }} className="absolute right-1 top-1/2 -translate-y-1/2 h-10 px-4 flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition">
                            Generate
                            <RiAiGenerate className="text-lg" />
                        </button>
                    </div>


                </div>
                {/* Loading overlay */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl z-20">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageGenerator
