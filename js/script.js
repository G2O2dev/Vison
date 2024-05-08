var reveals = document.querySelectorAll(".scrollAnim");

async function updateScroll() {

    for (var i = 0; i < reveals.length; i++) {
        var elementTop = reveals[i].getBoundingClientRect().top;

        if ((elementTop < window.innerHeight) && !(reveals[i].classList.contains("active"))) {
            reveals[i].classList.add("active");
            await new Promise(r => setTimeout(r, 150));
        }
    }
}

var isUpdateScrollWork = 0;

async function updateScrollManager() {
    if (isUpdateScrollWork == 0) {
        isUpdateScrollWork = 1;
        await updateScroll();
        isUpdateScrollWork = 0;
    }
}

window.addEventListener("scroll", updateScrollManager);
updateScroll();


function updatePlaceholder() {
    var msg = document.getElementById("msg-txt");
    if (msg.textContent == "") {
        msg.classList.remove("hide-after");
    } else {
        msg.classList.add("hide-after");
    }
}

function redirectFocus() {
    document.getElementById("msg-txt").focus();
}

function openDialog(dialog) {
    dialog.style.willChange = "opacity, transform";
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    function outsideClickListener(event) {
        if (event.target === dialog) {
            closeDialog(dialog);
        }
    }
    setTimeout(() => {
        document.addEventListener("click", outsideClickListener);
        document.addEventListener("close", () => document.removeEventListener("click", outsideClickListener), { once: true });
    }, 100)
}

function closeDialog(dialog) {
    dialog.classList.add("work-dialog_closing");
    document.body.style.removeProperty("overflow");
    setTimeout(() => {
        dialog.classList.remove("work-dialog_closing");
        dialog.close();
        dialog.style.removeProperty("will-change");
    }, 400);
}

function loadScript(src) {
    var s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
}

function loadStyle(src) {
    var link = document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

if (window.getComputedStyle(document.querySelector('.work')).overflow != "visible") {
    window.onscroll = function () {
        updateBar()
    };

    function updateBar() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-bar").style.height = scrolled + "%";
    }


    if (!navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        loadScript("js/SmoothScroll.js");
    }
}

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


if (window.HTMLDialogElement === undefined) {
    const dialogs = document.querySelectorAll("dialog")

    dialogs.forEach(async (dialog) => {
        const {default: polyfill} = await import("https://esm.run/dialog-polyfill")
        polyfill.registerDialog(dialog)
    })
}

// Lazy css loading
window.addEventListener('load', () => {
    loadStyle("styles/lazy.css");
    loadStyle("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css");
});
