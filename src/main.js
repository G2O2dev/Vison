// import './scss/index.scss';

import './js/scroll_animation';
import './js/anchor_animation';
import './js/input_helper';
import './js/dialog';


window.onload = () => {
    import('./scss/lazy.scss');
    import('./js/swiper');
}

if (window.getComputedStyle(document.querySelector('.work')).overflow !== 'visible') {
    if (!navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        import('./js/smooth_scroll')
    }

    // Custom scroll-bar
    window.onscroll = function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-bar').style.height = scrolled + '%';
    };
}