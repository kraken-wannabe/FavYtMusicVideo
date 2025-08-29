// Wait until the HTML is fully loaded before running any code.
// This makes sure the elements we want to use actually exist.
document.addEventListener('DOMContentLoaded', () => {
  // Find the small yellow "dot" that should move.
  // If the HTML doesn't have <div id="dot">, stop and show a warning.
  const dot = document.getElementById('dot');
  if (!dot) return console.warn('No #dot element found.');
  
  // The "track" the dot moves inside is the dot's parent element.
  const wrap = dot.parentElement;

  // --- Simple animation settings/values ---
  let x = 0;     // current horizontal position of the dot (in pixels)
  let speed = 2; // how fast it moves each frame (try 1–4 to see the difference)
  let max = 0;   // the far right edge the dot is allowed to travel to

  // Work out how far the dot can move.
  // max = (track width) - (dot width)
  // Also keep x inside the allowed range (0..max), useful after window resizes.
  function measure() {
    max = Math.max(0, wrap.clientWidth - dot.clientWidth);
    x = Math.max(0, Math.min(x, max));
  }

  // This function runs over and over, ~60 times per second.
  // It moves the dot and bounces it off the edges.
  function animate() {
    x += speed;                 // move the dot
    if (x >= max || x <= 0) {   // if we hit an edge...
      speed *= -1;              // ...reverse direction (bounce)
    }
    // Actually move the dot on screen using a CSS transform.
    dot.style.transform = `translateX(${x}px)`;

    // Ask the browser to call animate() again on the next frame.
    requestAnimationFrame(animate);
  }

  // Do the first measurement (in case the page size matters).
  measure();

  // If the window is resized, recalculate how far the dot can travel.
  window.addEventListener('resize', measure);

  // Start the animation loop.
  requestAnimationFrame(animate);
});
