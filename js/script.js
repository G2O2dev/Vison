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

var scrollAnim;
document.querySelectorAll('li[href^="#"], a[href^="#"]').forEach(function(el){
    el.addEventListener("click", function(event) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target != null) {
            event.preventDefault();
            var scrollMaxHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
            var scroll = target.offsetTop;
            clearTimeout(scrollAnim);
            var animTime = 1200;//ms
            var step = (scroll - window.scrollY)/60 / (animTime/1400);
            if(scrollMaxHeight - scroll <= window.innerHeight)
                scroll = scrollMaxHeight - window.innerHeight;
            (function(){
                if(Math.abs(window.scrollY - scroll) <= Math.abs(step)){
                    window.scrollTo( 0, scroll);
                    return;
                }
                window.scrollTo( 0,parseFloat(window.scrollY) + step);
                scrollAnim = setTimeout(arguments.callee,1000/60);
            })();
        }
    });
});

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

if(!navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && window.getComputedStyle(document.querySelector('.work')).overflow != "visible"){
    var s;
    s = document.createElement('script');
    s.src = "js/SmoothScroll.js";
    document.head.appendChild(s);
}