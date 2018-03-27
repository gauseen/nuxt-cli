<template lang="pug">
	section
		button(
			@click="fetchDataPost"
		) 发送 post 请求
		button(
			@click="fetchDataGet"
		) 发送 get 请求
		button(
			@click="setLanguage"
		) 设置语言 i18n
		div {{ $t('i18n') }}
</template>

<script>
import { storage, setLanguage } from '~/utils/common.js'

export default {
	head: {
		title: 'test page',
	},
	methods: {
		fetchDataPost () {
			const params = {
				phone: 17621203210,
			}
			this.$post(`toFindSmsCode.do`, params)
			.then((res) => {
				console.log('post res: ', res)
			})
			.catch((err) => console.log('post err', err))
		},
		fetchDataGet () {
			this.$get(`crm/memberAccount/findMemberAccountInfo.do`)
			.then((res) => {
				console.log('get res: ', res)
			})
			.catch(err => {
				console.log('get err: ', err)
			})
		},
		setLanguage () {
			let newLang = storage.get('i18n') === 'cn' ? 'en' : 'cn'
			setLanguage(newLang)
		},
	},
}
</script>

<style lang="stylus" scoped>
	button
		display block
		height 30px
		width 15em
</style>

