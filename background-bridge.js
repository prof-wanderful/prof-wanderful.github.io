/*
 * Pointer bridge for the interactive star background.
 *
 * The background iframe intentionally has pointer-events: none so it never
 * blocks links, buttons, text, cards, or other page content. The parent page
 * listens for pointer movement everywhere and forwards the viewport
 * coordinates to background.html with postMessage().
 */
(function () {
  'use strict';

  const FRAME_SELECTOR = [
    'iframe.background-frame',
    'iframe[src="background.html"]',
    'iframe[src$="/background.html"]'
  ].join(',');

  let backgroundFrame = null;

  function configureFrame(frame) {
    if (!frame) return null;

    frame.classList.add('background-frame');
    frame.style.pointerEvents = 'none';
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('tabindex', '-1');

    backgroundFrame = frame;
    return frame;
  }

  function findBackgroundFrame() {
    if (backgroundFrame && document.contains(backgroundFrame)) {
      return backgroundFrame;
    }

    return configureFrame(document.querySelector(FRAME_SELECTOR));
  }

  function sendPointer(x, y) {
    const frame = findBackgroundFrame();

    if (!frame || !frame.contentWindow) return;

    frame.contentWindow.postMessage({
      type: 'starfield-pointer',
      x: x,
      y: y
    }, '*');
  }

  // Capture phase means the movement is observed even over normal page boxes,
  // links, Bootstrap components, etc.
  window.addEventListener('pointermove', function (event) {
    sendPointer(event.clientX, event.clientY);
  }, { capture: true, passive: true });

  // Basic touch support as well.
  window.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches.length) {
      sendPointer(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { capture: true, passive: true });

  function scanForFrame() {
    findBackgroundFrame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanForFrame, { once: true });
  } else {
    scanForFrame();
  }

  // travel.html creates the iframe after page load, so observe for dynamically
  // inserted background frames too.
  const observer = new MutationObserver(scanForFrame);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
