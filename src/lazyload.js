// Lazy Load Elements with custom attribute [EXAMPLE= <img src="" data-src="url_to_image.png" data-lazy='1'></img>]
// Make sure to add the ['data-lazy='1'] attribute to your images, iframes & videos, maybe even audio tags as well

add2Onload(() => {

  let lazyElems = [].slice.call(document.querySelectorAll("[data-lazy='1']"));

      if ("IntersectionObserver" in window) {

          let elemObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting && entry.target.src.length == 0) {
                      entry.target.src = entry.target.dataset.src;
                      elemObserver.unobserve(entry.target);
                  }
              });
          });

          lazyElems.forEach((elem) => {
              elemObserver.observe(elem);
          });

      // if IntersectionObserver not available, load normally

      } else {

          for (let i = 0; i < lazyElems.length; i++) {
              if (lazyElems[i].getAttribute('data-src')) {
                  lazyElems[i].setAttribute('src', lazyElems[i].getAttribute('data-src'));
              }
          }
      }

});
