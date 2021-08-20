<template>
  <Header/>
  <!--RouterView는 모든 페이지에 적용시킬 것을 정리해서 지정해준다.-->
  <RouterView />
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang = "scss">
@import "~/scss/main";
</style>