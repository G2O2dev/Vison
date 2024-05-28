document.getElementById("msg-txt").oninput = (ev) => {
    if (ev.target.textContent === "") {
        ev.target.classList.remove("hide-after");
    } else {
        ev.target.classList.add("hide-after");
    }
}