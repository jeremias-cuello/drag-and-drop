document.addEventListener("DOMContentLoaded", function () {
  const draggable = document.getElementById("draggable");
  const dropzone = document.getElementById("dropzone");
  const dragContainer = document.querySelector(".container");

  let flagOutsideLimits = false;
  let offsetX, offsetY;

  /**
   * @param {DOMRect} box1
   * @param {DOMRect} box2
   * @returns true si box1 esta dentro de box2. false de lo contrario
   */
  const insideBox = function (box1, box2) {
    return (
      box1.left >= box2.left &&
      box1.top >= box2.top &&
      box1.right <= box2.right &&
      box1.bottom <= box2.bottom
    );
  };

  const draggableTouchStart = function (e) {
    const touch = e.targetTouches[0];
    const rect = draggable.getBoundingClientRect();

    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    draggable.textContent = e.targetTouches.length + " puntos tactiles.";
    draggable.classList.add("dragging");

    if (flagOutsideLimits) {
      draggable.addEventListener("touchmove", draggableTouchMove, {
        passive: false,
      });
      flagOutsideLimits = false;
    }
  };

  const draggableTouchMove = function (e) {
    const touch = e.targetTouches[0];
    const posX = touch.clientX - offsetX;
    const posY = touch.clientY - offsetY;
    const draggableRect = draggable.getBoundingClientRect();
    const dragContainerRect = dragContainer.getBoundingClientRect();

    draggable.classList.add("dragging");
    if (insideBox(draggableRect, dragContainerRect)) {
      draggable.style.left = posX + "px";
      draggable.style.top = posY + "px";
    } else {
      draggable.style.left = 20 + "px";
      draggable.style.top = 20 + "px";
      draggable.removeEventListener("touchmove", draggableTouchMove);
      flagOutsideLimits = true;
    }

    e.preventDefault();
  };

  draggable.addEventListener("touchstart", draggableTouchStart, {
    passive: false,
  });
  draggable.addEventListener("touchmove", draggableTouchMove, {
    passive: false,
  });
  draggable.addEventListener(
    "touchend",
    function () {
      const dropzoneRect = dropzone.getBoundingClientRect();
      const draggableRect = draggable.getBoundingClientRect();

      if (insideBox(draggableRect, dropzoneRect)) {
        draggable.removeEventListener("touchstart", draggableTouchStart);
        draggable.removeEventListener("touchmove", draggableTouchMove);
        console.log("drop");
      }
    },
    { passive: false }
  );
});
