# animator.js

A javascript object to animate DOM elements.

The improved version stores created animations into an array inside the `animator` object to help you access them more easily.

The basic version is more straight forward so you can see more easily how the animations are done. 

I made it to learn the basic use of `requestAnimationFrame()` to animate DOM elements.

[Documentation about requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)

## How to use it

Just add the `animator.js` file to your website to have access to the animator object.
Some examples are in the `test.html` files located with the `animator.js` files.

Quick example:
```
animator.rotate(document.getElementById("my-awesome-div"), 80); // Will rotate the element with the id "my-awesome-div" by +80 degrees, +1 degree at each frame
```