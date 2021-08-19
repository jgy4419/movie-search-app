<!-- 3. Header부분이니까 가장 위에 지정한다.-->
<template>
  <Header/>
  <RouterView />
</template>

<script>
// 1. Header부분을 연결
import Header from '~/components/Header'
export default {
  components: {
    // 2. 가져온 Header을 지정해준다.
    Header
  }
}
</script>

<style lang = "scss">
@import "~/scss/main";
</style>