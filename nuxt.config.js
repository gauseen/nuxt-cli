module.exports = {
	/*
	** Headers of the page
	*/
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
	// vue 插件
	plugins: [
		// { src: '~plugins/axios.js', ssr: true },
        { src: '~plugins/iview.js', ssr: true }
	],
	// 全局引入的css
	css: [
        'iview/dist/styles/iview.css'
    ],
	// router config
	router: {
		base: '/'	// 设置应用的根url
	},
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	// 环境变量
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},
	/*
	** Build configuration
	*/
	build: {
		// remove axios repeat package, only package once
		vendor: ['axios', '~/plugins/iview'],

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
