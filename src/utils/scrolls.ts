// utils/disableScroll.js
export function disableScrollOnNumberInputs() {
  document.addEventListener(
    "wheel",
    (event) => {
      if ((document.activeElement as HTMLInputElement)?.type === "number") {
        event.preventDefault();
      }
    },
    { passive: false } // Passive listeners cannot prevent default
  );
}

// Scroll to top utility function
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// Instant scroll to top (no animation)
export function scrollToTopInstant() {
  window.scrollTo(0, 0);
}
