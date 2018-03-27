<template lang="pug">
section
	button.button--grey(
		href="/demo"
		type="button"
	) 发送请求
	<mt-header fixed title="固定在顶部"></mt-header>
	div.container__box 全局样式测试
	div.rem_test rem web 自适应检测
	button(v-on:click="messageBox") alert
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
	asyncData (context) {
		return { value: [20, 50] }
	},
	methods: {
		messageBox () {
			MessageBox('提示', '操作成功')
		},
	},
}
</script>

<style lang="stylus">
@import '~assets/stylus/demo'
.container__box
	line-height 30px
	background-color $color-main
	color $color-test
	text-align center
.rem_test
	font-size 2.7rem
</style>
