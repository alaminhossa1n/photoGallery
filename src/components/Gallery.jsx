import { useState } from "react";
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

    const handleReorder = (dragIndex, dropIndex) => {
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(dropIndex, 0, draggedImage);
        setImages(updatedImages);
    };

    const handleDeleteSelected = () => {
        const updatedImages = images.filter(
            (image) => !selectedImages.includes(image)
        );
        setImages(updatedImages);
        setSelectedImages([]);
    };

    return (
        <div className="p-4 space-y-4 w-1/2 mx-auto">
            <button
                onClick={handleDeleteSelected}
                className="bg-red-500 text-white p-2 rounded"
            >
                Delete Selected
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`bg-white border rounded shadow p-2 cursor-pointer transition-transform hover:transform hover:scale-95 ${selectedImages.includes(image) ? "border-blue-500" : ""} ${index === 0 ? "col-span-2 row-span-2" : ""}`}
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
            handleReorder(dragIndex, index);
          }}
        >
          <img
            src={image.src}
            alt={`Image ${image.id}`}
            className="w-full h-auto"
            onClick={() => handleImageClick(image)}
          />
        </div>
      ))}
    </div>

        </div>
    );
};

export default Gallery;
