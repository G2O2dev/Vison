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
    modals.classList.add("dp-grid");
    modal.classList.add("modal-work--show");
    modal.classList.add("dp-block");

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

        modals.classList.remove("dp-grid");

        modal.classList.remove("hide-modal");
        modal.classList.remove("modal-work--hide");
        modal.classList.remove("dp-block");
        document.body.style.overflow = 'visible';
        animation = 0;
        },3000);
}
document.addEventListener('backbutton', () =>{
    var modal;
    var allModal = document.getElementsByClassName('modal-work');
    for (let i =0; i < allModal.length; i++){
        if (allModal[i].classList.contains('modal-work--show'))
            modal = allModal[i];
    }
    if(modal != null){
        hideModal();
    }
});

function loadScript(src){
    var s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
}
function loadStyle(src){
    var cssFa = document.createElement('link');
    cssFa.href = src;
    cssFa.rel = 'stylesheet';
    cssFa.type = 'text/styles';
    document.getElementsByTagName('head')[0].appendChild(cssFa);
}

if(window.getComputedStyle(document.querySelector('.work')).overflow != "visible"){
    window.onscroll = function() {updateBar()};

    function updateBar() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-bar").style.height = scrolled + "%";
    }


    if(!navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
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
document.querySelectorAll('a[href^="#"]').forEach(function(el){
    el.addEventListener("click", function() {
        scrollIt(document.querySelector(this.getAttribute('href')));
    });
});

document.querySelectorAll('div[href]').forEach(function (el){
    el.addEventListener('click', function (){
        window.open(el.getAttribute('href'), '_blank');
    });
});


