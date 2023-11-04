import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const DraggableImage = ({ image, index, handleImageClick, selectedImages, handleReorder }) => {
    const [hovered, setHovered] = useState(false);

    const [, ref] = useDrag({
        type: "IMAGE",
        item: { index },
    });

    const [, drop] = useDrop({
        accept: "IMAGE",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                handleReorder(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const handleItemHover = () => {
        setHovered(true);
    };

    const handleItemLeave = () => {
        setHovered(false);
    };

    return (
        <div
            ref={(node) => {
                ref(drop(node));
            }}
            className={`bg-white border rounded shadow p-2 cursor-pointer hover:transform hover:scale-90 transition-transform duration-500 ${selectedImages.includes(image) ? "border-blue-500" : ""} ${index === 0 ? "col-span-2 row-span-2" : ""} relative`}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
        >
            <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="w-full h-auto"
            />

            {hovered || selectedImages.includes(image) ? (
                <div>
                    {selectedImages.includes(image) ? (
                        <MdCheckBox
                            className="absolute top-2 left-3 text-blue-500 text-lg"
                            onClick={() => handleImageClick(image)}
                        />
                    ) : (
                        <MdCheckBoxOutlineBlank
                            className="absolute top-2 left-3 text-blue-500 text-lg"
                            onClick={() => handleImageClick(image)}
                        />
                    )}
                </div>
            ) : null}

            <div
                className="h-full w-full hover:bg-black absolute top-0 left-0 opacity-30"
                onClick={() => handleImageClick(image)}
            />
        </div>
    );
};

export default DraggableImage;
