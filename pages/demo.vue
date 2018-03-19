<template lang="pug">
section.container
    button(type="button").button--grey(
        href="/demo"
    ) 发送请求
    Slider(v-model="value" range)

</template>

<script>
import axios from 'axios'

export default {
    asyncData (context) {
        return { value: [20, 50] }
    }
    // async asyncData () {
    //     let { data } = await axios.get(`https://my-api/posts/1`)
    //     return { title: data.title }
    // }
}
</script>

<style lang="stylus">
@import '~assets/stylus/demo'
</style>
