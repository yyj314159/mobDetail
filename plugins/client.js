import Vue from 'vue'
import WOWJS from'wowjs'
import {TweenLite} from 'gsap'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
Vue.use(VueAwesomeSwiper)

Vue.prototype.WOWJS = WOWJS;
Vue.prototype.TweenLite = TweenLite;
