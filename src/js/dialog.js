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

window.openDialog = openDialog;
window.closeDialog = closeDialog;