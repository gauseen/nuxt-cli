import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { storage, getDictionary } from '~/utils/common.js'

Vue.use(VueI18n)

export default ({ app }) => {
	console.log('i18n ... ... plugins')
	// Set i18n instance on app
	// This way we can use it in middleware and pages asyncData/fetch
	const defaultLocale = storage.get('i18n') || 'cn'
	console.log('lang: ', typeof defaultLocale)
	window.i18n = new VueI18n({
		locale: defaultLocale,
		fallbackLocale: 'cn',
		messages: {
			[defaultLocale]: getDictionary(defaultLocale),
		},
	})
	app.i18n = window.i18n
	app.i18n.path = (link) => {
		if (app.i18n.locale === app.i18n.fallbackLocale) {
			return `/${link}`
		}
		return `/${app.i18n.locale}/${link}`
	}
}