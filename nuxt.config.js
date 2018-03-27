var resolve = require('path').resolve

module.exports = {
	/*
	** Headers of the page
	*/
	mode: 'spa',
	head: {
		title: 'This is page title',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },	// 响应式
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },	// 全屏app
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },	// 状态栏显示样式
			{ name: 'format-detection', content: 'telephone=no' },	// 禁止ios phone call
			{ hid: 'description', name: 'description', content: 'Nuxt.js project' }
		],
		link: [
			{ rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	// loading bar style 
	loading: { color: '#3B8070' },
	// 环境变量
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},
	// 引入全局 css
	css: [
		{ src: '~assets/stylus/reset.styl', lang: 'stylus' },
	],
	// router config
	router: {
		base: '/dist/',	// 设置应用的根url(和 nginx location 模块相对应)
		// middleware: 'i18n',
	},
	
	// vue 插件
	plugins: [
		// { src: '~plugins/axios.js', ssr: false },
		// { src: '~plugins/rem', ssr: false },
		{ src: '~plugins/mint', ssr: false },
		{ src: '~plugins/i18n', ssr: false },
		{ src: '~plugins/fetch', ssr: false },
	],
	modules: [
		// 全局 stylus css 变量引入
		['nuxt-stylus-resources-loader', {
			resources: resolve(__dirname, './assets/stylus/variables.styl'),
		}],
		// 代理，解决跨域
		'@gauseen/nuxt-proxy',
	],
	proxyTable: {
		'/mdm2': { target: 'http://sit.behuntergatherer.com', ws: false }
	},

	/*
	** Build configuration
	*/
	build: {
		// remove axios repeat package, only package once
		vendor: ['axios', '~/plugins/mint'],
		// css 单独打包
		extractCSS: {
			allChunks: true,
		},
		/*
		** Run ESLint on save
		*/
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}
