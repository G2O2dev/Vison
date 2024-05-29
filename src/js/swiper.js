import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

new Swiper('.swiper', {
    loop: true,

    modules: [Pagination],
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },
});