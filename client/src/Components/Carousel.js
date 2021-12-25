import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

function Carousel({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    let newSlide = currentSlide === data.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const prevSlide = () => {
    let newSlide = currentSlide === 0 ? data.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="lg:hidden grid grid-cols-1 md:mx-24 overflow-hidden relative">
      <AiOutlineLeft
        onClick={prevSlide}
        className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
      />

      <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
        {data.map((content, index) => {
          return (
            <div
              key={index}
              className={
                index === currentSlide
                  ? "block first-letter border-2 rounded m-10 border-white p-4 py-8 md:py-10"
                  : "hidden"
              }
            >
              {content}
            </div>
          );
        })}
      </Swipe>

      <AiOutlineRight
        onClick={nextSlide}
        className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
      />

      <div className="absolute w-full flex justify-center bottom-0">
        {data.map((content, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                changeSlide(index);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
