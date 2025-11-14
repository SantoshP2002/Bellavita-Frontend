const images = [
  "https://bellavitaorganic.com/cdn/shop/files/1_e3a8356d-1e07-4f9e-b006-463aee598ee0.webp?v=1725617784&width=600",
  "https://bellavitaorganic.com/cdn/shop/files/2_2453e5e3-fecb-46e3-ad9e-00bea4baa4622.webp?v=1725617784&width=600",
  "https://bellavitaorganic.com/cdn/shop/files/3_1_49a17cdc-b7a0-4ae1-a20d-5c3d8eee7bc1.webp?v=1725617816&width=600",
  "https://bellavitaorganic.com/cdn/shop/files/4_68a3c022-75df-4304-8d47-6a1671886316.webp?v=1725617784&width=600",
  "https://bellavitaorganic.com/cdn/shop/files/5_b43e7ec7-8e4b-464f-b5a4-78854aa116d82.webp?v=1725617784&width=600",
];

const ImageStrip = () => {
  return (
    <div className="w-full overflow-x-auto sm:overflow-hidden">
      <div
        className="
          flex sm:grid sm:grid-cols-5
          gap-3 sm:gap-0
          min-w-max sm:min-w-full
        "
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 sm:shrink-0 w-64 sm:w-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStrip;
