import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdCheckBox } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

import image1 from "../assets/images/image-1.webp";
import image2 from "../assets/images/image-2.webp";
import image3 from "../assets/images/image-3.webp";
import image4 from "../assets/images/image-4.webp";
import image5 from "../assets/images/image-5.webp";
import image6 from "../assets/images/image-6.webp";
import image7 from "../assets/images/image-7.webp";
import image8 from "../assets/images/image-8.webp";
import image9 from "../assets/images/image-9.webp";
import image10 from "../assets/images/image-10.jpeg";
import image11 from "../assets/images/image-11.jpeg";
import DraggableImage from "./DraggableImage";

const Gallery = () => {
    const initialImages = [
        { id: 1, src: image1 },
        { id: 2, src: image2 },
        { id: 3, src: image3 },
        { id: 4, src: image4 },
        { id: 5, src: image5 },
        { id: 6, src: image6 },
        { id: 7, src: image7 },
        { id: 8, src: image8 },
        { id: 9, src: image9 },
        { id: 10, src: image10 },
        { id: 11, src: image11 },
    ];

    const [images, setImages] = useState(initialImages);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageClick = (image) => {

        const index = selectedImages.indexOf(image);
        if (index === -1) {
            setSelectedImages([...selectedImages, image]);
        } else {
            const updatedSelectedImages = [...selectedImages];
            updatedSelectedImages.splice(index, 1);
            setSelectedImages(updatedSelectedImages);
        }
    };

    const handleDeleteSelected = () => {
        const updatedImages = images.filter((image) => !selectedImages.includes(image));
        setImages(updatedImages);
        setSelectedImages([]);
    };

    const handleReorder = (dragIndex, dropIndex) => {
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(dropIndex, 0, draggedImage);
        setImages(updatedImages);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4 space-y-4 w-3/4 mx-auto">
                <div className={`flex items-center justify-between ${selectedImages.length > 0 ? '' : 'invisible'}`}>
                    <div className={`flex items-center gap-1`}>
                        <MdCheckBox className="text-blue-500 text-lg"></MdCheckBox>
                        <p className="text-lg font-semibold"> {selectedImages.length} <span>{selectedImages.length > 1 && selectedImages != 0 ? "Flies" : "File"}</span> Selected</p>
                    </div>
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        <p>Delete <span>{selectedImages.length > 1 && selectedImages != 0 ? "Flies" : "File"}</span></p>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <DraggableImage
                            key={image.id}
                            image={image}
                            index={index}
                            handleImageClick={handleImageClick}
                            selectedImages={selectedImages}
                            handleReorder={handleReorder}
                        />
                    ))}

                    <div className="h-full w-full border-dashed border-2 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <FaRegImage className="text-3xl text-gray-500"></FaRegImage>
                            <p className="text-gray-500">Add Images</p>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};



export default Gallery;
