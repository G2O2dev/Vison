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
    if(isUpdateScrollWork == 0){
        isUpdateScrollWork = 1;
        await updateScroll();
        isUpdateScrollWork = 0;
    }
}

window.addEventListener("scroll", updateScrollManager);
updateScroll();

window.onscroll = function() {myFunction()};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-bar").style.height = scrolled + "%";
}

function updatePlaceholder(){
    var msg = document.getElementById("msg-txt");
    if(msg.textContent == ""){
        msg.classList.remove("hide-after");
    }
    else{
        msg.classList.add("hide-after");
    }
}
function redirectFocus(){
    document.getElementById("msg-txt").focus();
}

function getEl(Id){
    return document.getElementsByClassName(Id)[0];
}

var modalBg = getEl("modal-bg");
var modals = getEl("modals");
var animation = 0;

function openModal(modalName){
    if(animation) return;
    animation = 1;

    var modal = getEl(modalName);
    document.body.style.overflow = 'hidden';

    modalBg.classList.add("modal-bg-open");
    modals.classList.add("show-modals");
    modal.classList.add("modal-work--show");
    modal.classList.add("ds-block");

    setTimeout(function (){
        modal.classList.add('visible');
        animation = 0;
    }, 1500)
}
function hideModal(){
    if(event.target !== event.currentTarget) return;
    if(animation) return;
    animation = 1;

    var modal;
    var allModal = document.getElementsByClassName('modal-work');
    for (let i =0; i < allModal.length; i++){
        if (allModal[i].classList.contains('modal-work--show'))
            modal = allModal[i];
    }

    modal.classList.remove("modal-work--show");
    modal.style.animation = 'none';
    modal.offsetHeight;
    modal.classList.add("modal-work--hide");

    modal.classList.add('hide-modal');
    modal.classList.remove('show-modal');

    setTimeout(function (){
        modal.classList.remove('visible');
        modalBg.classList.add("modal-bg-hide");
    }, 1500)

    setTimeout(function () {
        modalBg.classList.remove("modal-bg-open");
        modalBg.classList.remove("modal-bg-hide");

        modals.classList.remove("show-modals");

        modal.classList.remove("hide-modal");
        modal.classList.remove("modal-work--hide");
        modal.classList.remove("ds-block");
        document.body.style.overflow = 'visible';
        animation = 0;
        },3000);
}

function loadScript(path){
    var s = document.createElement('script');
    s.src = path;
    document.head.appendChild(s);
}

if(!navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && window.getComputedStyle(document.querySelector('.work')).overflow != "visible"){
    loadScript("js/SmoothScroll.js");
}


