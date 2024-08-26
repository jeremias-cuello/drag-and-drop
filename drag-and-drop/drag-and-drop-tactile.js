/**
 * @param {object} draggable Object to drag
 * @param {HTMLElement} dropZone
 * @param {object} dragContainer Container object to dragElement and dropZone
 * @param {Object} functionDrop Function drop
 */
function DragAndDropTactile(draggable, dropZone, dragContainer, { fn, params }) {
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

  /**
   * @param {HTMLElement} elm
   * @param {number} x
   * @param {number} y
   */
  const move = function (elm, x, y) {
    elm.style.left = x;
    elm.style.top = y;
  };

  /**
   * Function Event
   */
  const draggableTouchStart = function (e) {
    const touch = e.targetTouches[0];
    const rect = draggable.elm.getBoundingClientRect();

    offsetX = touch.clientX - rect.left + dragContainer.left;
    offsetY = touch.clientY - rect.top + dragContainer.top;

    if (flagOutsideLimits) {
      draggable.elm.addEventListener("touchmove", draggableTouchMove, {
        passive: false,
      });
      flagOutsideLimits = false;
    }
  };

  /**
   * Function Event
   */
  const draggableTouchMove = function (e) {
    const touch = e.targetTouches[0];
    const posX = touch.clientX - offsetX;
    const posY = touch.clientY - offsetY;
    const draggableRect = draggable.elm.getBoundingClientRect();
    const dragContainerRect = dragContainer.elm.getBoundingClientRect();

    if (insideBox(draggableRect, dragContainerRect)) {
      move(draggable.elm, `${posX}px`, `${posY}px`);
    } else {
      // llevando el elemento drageable a su posicion inicial
      move(draggable.elm, `${draggable.left}px`, `${draggable.top}px`);
      draggable.elm.removeEventListener("touchmove", draggableTouchMove);
      flagOutsideLimits = true;
    }

    e.preventDefault();
  };

  const draggableTouchEnd = function () {
    const dropzoneRect = dropZone.getBoundingClientRect();
    const draggableRect = draggable.elm.getBoundingClientRect();

    if (insideBox(draggableRect, dropzoneRect)) {
      draggable.elm.removeEventListener("touchstart", draggableTouchStart);
      draggable.elm.removeEventListener("touchmove", draggableTouchMove);
      draggable.elm.removeEventListener("touchend", draggableTouchEnd);
      fn(...params);
    }
  };

  draggable.elm.addEventListener("touchstart", draggableTouchStart, {
    passive: false,
  });
  draggable.elm.addEventListener("touchmove", draggableTouchMove, {
    passive: false,
  });
  draggable.elm.addEventListener("touchend", draggableTouchEnd, {
    passive: false,
  });
}

export { DragAndDropTactile as Drag };
