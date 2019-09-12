const webpack = require('webpack');
export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        meta: [
            {charset: 'utf-8'},
            {name: '360-site-verification', content: 'e2eb7859c3b584a1ba57a41b54f6cd19'},
            {name: 'renderer', content: 'webkit'},
            { name: 'viewport', content: 'width=1260px,user-scalable=no' },
        ],
        link: [{rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico'}],
        script: []
    },
    /*
     ** Global CSS
     */
    css: [
        '~assets/css/base.less',
        'animate.css',
        'swiper/dist/css/swiper.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {src: '~/plugins/main', ssr: true},
        {src: '~/plugins/scroll', ssr: false},
        {src: "~/plugins/client.js", ssr: false},
        {src: '~/plugins/baiduStatistics.js', ssr: false},
        {src: '~/plugins/360Statistics.js', ssr: false},
        {src: '~/plugins/baiduDetection.js', ssr: false},
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/proxy'
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        proxy: true
    },
    proxy: {
        '/manage-api/': 'http://192.168.0.140:8083',
        '/user/': 'http://192.168.0.180:8083',
        '/member_web/': 'http://192.168.0.193:8093',
        '/helpMessage/': 'http://192.168.0.192:8083',
        '/cart/': 'http://192.168.0.184:8095',
        '/shop_web/': 'http://192.168.0.193:8093',
        '/product_gateway/': 'http://192.168.0.184:7081',
        '/service/': 'http://192.168.0.186:8093',
        '/video_web/': 'http://192.168.0.187:8091',
        '/audio_web/': 'http://192.168.0.185:8091',
        '/dictionary/': 'http://192.168.0.180:8083',
        '/blog_api/': 'http://192.168.0.191:8093',
        '/blog_web/': 'http://192.168.0.191:8091',
        '/news_web/': 'http://192.168.0.190:8091',
        '/manage-api/pay/': 'http://192.168.0.148:8083',
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            /*if (ctx.isDev && ctx.isClient) {
              config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
              })
            }*/
        },
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ]
    }
}
