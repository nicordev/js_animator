/**
 * Object containing methods to animate DOM elements
 *
 * @type {{rotate: animator.rotate, moveY: animator.moveY, moveX: animator.moveX}}
 */
var animator = {

    /**
     * Rotate a DOM element using CSS property transform and the deg unit
     *
     * @param element
     * @param maxAngle
     * @param step
     */
    rotate: function (element, maxAngle = 360, step = 1, startingAngle = 0) {

        var angle = startingAngle;

        nextFrame();

        function nextFrame() {

            element.style.transform = "rotate(" + angle + "deg)";
            angle += step;

            // Safety in case of infinite rotation
            if (animationProperties.state.angle >= Number.MAX_SAFE_INTEGER) {
                animationProperties.state.angle = 30;
            } else if (animationProperties.state.angle <= Number.MIN_SAFE_INTEGER) {
                animationProperties.state.angle = -30;
            }

            if (
                maxAngle >= 0 && angle <= maxAngle ||
                maxAngle < 0 && angle >= maxAngle
            ) {
                requestAnimationFrame(nextFrame);
            }
        }
    },

    /**
     * Move a DOM element horizontally by setting a relative position
     *
     * @param element
     * @param distance
     * @param step
     */
    moveX: function (element, distance = 0, step = 1) {

        var x = 0;

        element.style.position = "relative";

        correctStep();

        nextFrame();

        /**
         * Make changes for the next animation frame
         */
        function nextFrame() {

            x += step;

            element.style.left = x + "px";

            if (distance >= 0) {
                if (x > distance) {
                    element.style.left = distance + "px";
                }

                if (
                    x < distance
                ) {
                    requestAnimationFrame(nextFrame);
                }

            } else {
                if (x < distance) {
                    element.style.left = distance + "px";
                }

                if (x > distance) {
                    requestAnimationFrame(nextFrame);
                }
            }
        }

        /**
         * Correct the step sign to avoid infinite move
         */
        function correctStep() {

            if (distance >= 0) {
                step = Math.abs(step);
            } else {
                step = -(Math.abs(step));
            }
        }
    },

    /**
     * Move a DOM element vertically by setting a relative position
     *
     * @param element
     * @param distance
     * @param step
     */
    moveY: function (element, distance = 0, step = 1) {

        var y = 0;

        element.style.position = "relative";

        correctStep();

        nextFrame();

        /**
         * Make changes for the next animation frame
         */
        function nextFrame() {

            y += step;

            element.style.top = y + "px";

            if (distance >= 0) {
                if (y > distance) {
                    element.style.top = distance + "px";
                }

                if (
                    y < distance
                ) {
                    requestAnimationFrame(nextFrame);
                }

            } else {
                if (y < distance) {
                    element.style.top = distance + "px";
                }

                if (y > distance) {
                    requestAnimationFrame(nextFrame);
                }
            }
        }

        /**
         * Correct the step sign to avoid infinite move
         */
        function correctStep() {

            if (distance >= 0) {
                step = Math.abs(step);
            } else {
                step = -(Math.abs(step));
            }
        }
    }
};