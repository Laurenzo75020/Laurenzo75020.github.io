(() => {
  const protectedSelector = 'img, picture, video, canvas';
  const style = document.createElement('style');
  style.textContent = `${protectedSelector} {
    -webkit-user-drag: none !important;
    -webkit-user-select: none !important;
    user-select: none !important;
    -webkit-touch-callout: none !important;
  }`;
  document.head.appendChild(style);

  const protect = (node) => {
    if (node.matches?.('img, video')) node.draggable = false;
    node.querySelectorAll?.('img, video').forEach((media) => {
      media.draggable = false;
    });
  };
  protect(document);
  new MutationObserver((records) => records.forEach((record) =>
    record.addedNodes.forEach((node) => node.nodeType === 1 && protect(node))
  )).observe(document.documentElement, { childList: true, subtree: true });

  const targetsMedia = (event) => event.target.closest?.(protectedSelector);
  document.addEventListener('contextmenu', (event) => {
    if (targetsMedia(event)) event.preventDefault();
  });
  document.addEventListener('dragstart', (event) => {
    if (targetsMedia(event)) event.preventDefault();
  });
})();
