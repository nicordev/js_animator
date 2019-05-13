/**
 * Object containing methods to animate DOM elements
 *
 * @type {{rotate: animator.rotate, moveVertically: animator.moveVertically, moveHorizontally: animator.moveHorizontally}}
 */
var animator = {

    animations: [],
    lastId: 0,

    getAnimation: function (id) {

        return animator.animations.find((animation) => {
            if (animation.id === id) {
                return animation;
            }
        });
    },

    /**
     * Create a new animation object
     * 
     * @param {string} type 
     * @param {DOM Element} element 
     * @param {Object} parameters 
     * @param {Object} state 
     */
    newAnimation: function (type, element, parameters, state) {

        let animation = {
            id: ++animator.lastId,
            type: type,
            element: element,
            parameters: parameters,
            state: state
        }
        animation.state.active = true;
        animation.stop = function () {
            animation.state.active = false;
        };
        animator.animations.push(animation);

        return animation;
    },

    /**
     * Rotate a DOM element using CSS property transform and the deg unit
     *
     * @param element
     * @param maxAngle
     * @param step
     */
    rotate: function (element, maxAngle = 360, step = 1, startingAngle = 0) {

        var animation = animator.newAnimation(
            "rotate",
            element,
            {
                maxAngle: maxAngle,
                step: step
            },
            {
                angle: startingAngle
            }
        );

        animation.resume = function () {
            animation.state.active = true;
            nextFrame();
        };

        nextFrame();

        function nextFrame() {

            element.style.transform = "rotate(" + animation.state.angle + "deg)";
            animation.state.angle += animation.parameters.step;

            if (animation.state.angle >= Number.MAX_SAFE_INTEGER) {
                animation.state.angle = 30;
            } else if (animation.state.angle <= Number.MIN_SAFE_INTEGER) {
                animation.state.angle = -30;
            }

            if (
                animation.state.active && (
                    maxAngle >= 0 && animation.state.angle <= maxAngle ||
                    maxAngle < 0 && animation.state.angle >= maxAngle
                )
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
    moveHorizontally: function (element, distance = 0, step = 1) {

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
    moveVertically: function (element, distance = 0, step = 1) {

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