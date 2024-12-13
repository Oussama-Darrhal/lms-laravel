import { useEffect } from "react";

const useSmoothScroll = (target, duration) => {
    useEffect(() => {
        const smoothScroll = (target, duration) => {
            const targetPosition = document.querySelector(target).offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function ease(t, b, c, d) {
                let ts = (t /= d) * t;
                let tc = ts * t;
                return b + c * (tc + -3 * ts + 3 * t);
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                let timeElapsed = currentTime - startTime;
                let run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        };

        smoothScroll(target, duration);
    }, [target, duration]);
};

export default useSmoothScroll;
