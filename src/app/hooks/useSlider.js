import { useState } from "react";

export function useSlider(data) {
  const [sliderIndex, setSliderIndex] = useState(0);

  const prev = () => {
    setSliderIndex((prevState) =>
      prevState > 0 ? prevState - 1 : data.length - 1
    );
  };

  const next = () => {
    setSliderIndex((prevState) =>
      prevState < data.length - 1 ? prevState + 1 : 0
    );
  };

  return { sliderIndex, prev, next };
}
