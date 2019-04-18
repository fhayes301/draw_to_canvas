import $ from 'jquery';
import Component from '@ember/component';

var mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0
}

var element = null;

export default Component.extend({

  mouseDown(e) {
    // got rid of using canvas and made my own div.
    var canvas = document.getElementById('myCanvas');

    if (element !== null) {
      // reset & remove the polygon from the screen when they click out
      element = null;
      canvas.style.cursor = "default";
      var element_to_remove = document.querySelector('.my_polygon');
      element_to_remove.parentNode.removeChild(element_to_remove);
    } else {
      // when user clicks, save mouse position and create element
      this._getMousePosition(e)
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      element = document.createElement('div');
      element.className = 'my_polygon'
      element.style.left = mouse.x + 'px';
      element.style.top = mouse.y + 'px';
      canvas.appendChild(element)

      canvas.style.cursor = "crosshair";
    }
  },

  mouseMove: function(e) {
    if (element == null) return;
    this._getMousePosition(e)
    // set element position and size by tracking mouse movements - negative values taken into account.
    element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
    element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
    element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
    element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
  },

  _getMousePosition(e) {
    // get mouse position based on the mousemove/mousedown events x + y values.. this was a guessing game as there are multiple x,y values given in an event. I read something about it being a browser thing compatibility thing.
    mouse.x = e.pageX + window.pageXOffset;
    mouse.y = e.pageY + window.pageYOffset;
  },

});
