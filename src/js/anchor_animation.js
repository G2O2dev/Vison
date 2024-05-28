function scrollIt(destination, duration = 1600, callback) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }

    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const t = Math.min(1, ((now - startTime) / duration));
        const timeFunction = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    el.addEventListener("click", function () {
        scrollIt(document.querySelector(this.getAttribute('href')));
    });
});
document.querySelectorAll('div[href]').forEach(function (el) {
    el.addEventListener('click', function () {
        window.open(el.getAttribute('href'), '_blank');
    });
});