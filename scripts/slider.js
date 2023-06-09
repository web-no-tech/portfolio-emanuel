const autoSwitch = (slider) => {
  let timeout;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

const slider = new KeenSlider(
  "#keen-slider-container",
  {
    loop: true,

    breakpoints: {
      "(min-width: 250px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 680px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 920px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },

    slides: {
      perView: 3,
      spacing: 15,
    },
  },
  [(slider) => autoSwitch(slider)]
);
