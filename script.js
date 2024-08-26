import { Drag as DragAndDropTactile } from "./drag-and-drop/drag-and-drop-tactile.js";

function drop(msj) {
  console.log(`drop ${msj}`);
}

document.addEventListener("DOMContentLoaded", function () {
  const all = document.querySelector("*");
  const stylesAll = getComputedStyle(all);

  // Draggable
  const draggableElement = document.getElementById("draggable");
  const draggableTop = parseInt(stylesAll.getPropertyValue("--draggable-top"));
  const draggableLeft = parseInt(
    stylesAll.getPropertyValue("--draggable-left")
  );

  // DropZone
  const dropzone = document.getElementById("dropzone");

  // Container
  const dragContainerElement = document.getElementById("container");
  const dragContainerTop = parseInt(
    stylesAll.getPropertyValue("--container-top")
  );
  const dragContainerLeft = parseInt(
    stylesAll.getPropertyValue("--container-left")
  );

  const draggable = {
    elm: draggableElement,
    top: draggableTop,
    left: draggableLeft,
  };

  const dragContainer = {
    elm: dragContainerElement,
    top: dragContainerTop,
    left: dragContainerLeft,
  };

  DragAndDropTactile(draggable, dropzone, dragContainer, { fn: drop, params: ["Yo soy un parametro"] });
});
