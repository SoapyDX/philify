const overlayImageURL = 'https://i.imgur.com/KTKMDm0.png'; //phil

function addOverlay(thumb) {
  let img = thumb.querySelector('img');
  if (img && !img.nextSibling) {
    const overlay = document.createElement('img');
    overlay.src = overlayImageURL;
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';

    thumb.style.position = 'relative';
    thumb.appendChild(overlay);
  }
}

function observeThumbnails() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList.contains('style-scope') && node.classList.contains('ytd-thumbnail')) {
          addOverlay(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.querySelectorAll('.style-scope.ytd-thumbnail').forEach(addOverlay);

observeThumbnails();

window.addEventListener('yt-navigate-finish', () => {
  document.querySelectorAll('.style-scope.ytd-thumbnail').forEach(addOverlay);
});
