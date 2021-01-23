const processImageLazyLoading = () => {
  let lazyImageObserver = new IntersectionObserver(
    function (entries, self) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.getAttribute("data-src");
          lazyImage.srcset = lazyImage.getAttribute("data-srcset");
          lazyImage.classList.remove("lazy");
          self.unobserve(lazyImage);
        }
      });
    },
    {
      threshold: 0.1, // load image when 100% of image in the view port
    }
  );

  const lazyImages = document.querySelectorAll("[data-src]") || [];
  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
};

export const runLazyLoadingProcess = () => {
  setTimeout(() => {
    processImageLazyLoading();
  }, 100);
};
