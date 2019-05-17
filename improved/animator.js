/**
 * Object containing methods to animate DOM elements
 *
 * @type {{rotate: animator.rotate, moveY: animator.moveY, moveX: animator.moveX}}
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
            state: state,
            nextFrame: null
        };
        animation.state.active = true;
        animation.stop = function () {
            animation.state.active = false;
        };
        animation.resume = function () {
            animation.state.active = true;
            animation.nextFrame();
        };
        animator.animations.push(animation);

        return animation;
    },

    // Animations

    stopAll: function () {

        for (let animation of animator.animations) {
            animation.stop();
        }
    },

    resumeAll: function () {

        for (let animation of animator.animations) {
            animation.resume();
        }
    },

    /**
     * Rotate a DOM element using CSS property transform and the deg unit
     *
     * @param element
     * @param maxAngle
     * @param step
     * @param startingAngle
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

        animation.nextFrame = () => {

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
                requestAnimationFrame(animation.nextFrame);
            }
        };

        animation.nextFrame();
    },

    /**
     * Rotate an element clockwise forever
     * 
     * @param {DOM Element} element 
     * @param {int} step 
     */
    rotateClockwise: function (element, step = 1) {

        animator.rotate(element, -1, Math.abs(step));
    },

    /**
     * Rotate an element counterclockwise forever
     *
     * @param {DOM Element} element
     * @param {int} step
     */
    rotateCounterClockwise: function (element, step = 1) {

        animator.rotate(element, 1, -(Math.abs(step)));
    },

    /**
     * Move a DOM element horizontally by setting a relative position
     *
     * @param element
     * @param distance
     * @param step
     */
    moveX: function (element, distance = 0, step = 1, startingX = 0) {

        var animation = animator.newAnimation(
            "move_x",
            element,
            {
                distance: distance,
                step: step
            },
            {
                x: startingX
            }
        );

        element.style.position = "relative";

        animation.nextFrame = () => {

            animation.state.x += animation.parameters.step;

            element.style.left = animation.state.x + "px";

            if (animation.parameters.distance >= 0) {
                if (animation.state.x > animation.parameters.distance) {
                    element.style.left = animation.parameters.distance + "px";
                }

                if (animation.state.active && animation.state.x < animation.parameters.distance) {
                    requestAnimationFrame(animation.nextFrame);
                }

            } else {
                if (animation.state.x < animation.parameters.distance) {
                    element.style.left = animation.parameters.distance + "px";
                }

                if (animation.state.active && animation.state.x > animation.parameters.distance) {
                    requestAnimationFrame(animation.nextFrame);
                }
            }
        };

        animation.nextFrame();
    },

    /**
     * Move a DOM element vertically by setting a relative position
     *
     * @param element
     * @param distance
     * @param step
     * @param startingY
     */
    moveY: function (element, distance = 0, step = 1, startingY = 0) {

        var animation = animator.newAnimation(
            "move_y",
            element,
            {
                distance: distance,
                step: step
            },
            {
                y: startingY
            }
        );

        element.style.position = "relative";

        animation.nextFrame = () => {

            animation.state.y += step;

            element.style.top = animation.state.y + "px";

            if (animation.parameters.distance >= 0) {
                if (animation.state.y > animation.parameters.distance) {
                    element.style.top = animation.parameters.distance + "px";
                }

                if (animation.state.active && animation.state.y < animation.parameters.distance) {
                    requestAnimationFrame(animation.nextFrame);
                }

            } else {
                if (animation.state.y < animation.parameters.distance) {
                    element.style.top = animation.parameters.distance + "px";
                }

                if (animation.state.active && animation.state.y > animation.parameters.distance) {
                    requestAnimationFrame(animation.nextFrame);
                }
            }
        };

        animation.nextFrame();
    }
};