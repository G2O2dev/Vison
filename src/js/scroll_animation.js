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