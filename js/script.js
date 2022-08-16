let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

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

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

if(!navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && window.getComputedStyle(document.querySelector('.work')).overflow != "visible"){
    var s;
    s = document.createElement('script');
    s.src = "js/SmoothScroll.js";
    document.head.appendChild(s);
}