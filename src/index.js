import './scss/index.scss';

import './js/scroll_animation';
import './js/anchor_animation';
import './js/input_helper';
import './js/dialog';

function loadStyle(src) {
    var link = document.createElement('link');
    link.href = src;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

window.onload = e => {
    import('./scss/lazy.scss')

    import('swiper/css');
    import('swiper/css/pagination');
    import("swiper").then(src => {
        import('swiper/modules').then(module => {
            new src.Swiper('.swiper', {
                loop: true,

                modules: [module.Pagination],
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'bullets',
                },
            });
        })
    })
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