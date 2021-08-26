<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute/>
      <img 
      :src="image" 
      :alt="name"/>
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components:{
    Loader
  },
  data(){
    return{
      // 이미지를 불러오기 전에는 true 값인데 이미지가 불러와지면 false 값으로 변경시켜준다.
      imageLoding: true
    }
  },
  computed: {
    image(){
      return this.$store.state.about.image
    },
    name(){
      return this.$store.state.about.name
    },
    email(){
      return this.$store.state.about.email
    },
    phone(){
      return this.$store.state.about.phone
    }
  },
  // 화면에 연결이 된 다음에 init이 실행되도록 하기.
  // 라이프사이클에서는 비동기를 사용하면 안된다. (mounted 같은 것.)
  mounted(){
    this.init()
  },
  methods:{
    async init(){ 
      // image를 넣어줘야 img가 로딩되기를 기다리고 나서 다음 작업을 처리할 수 있다.
      await this.$loadImage(this.image)
      this.imageLoding = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

  .about{
    text-align:center;

    .photo{
      width: 250px;
      height: 250px;
      margin: 40px auto 20px;
      padding : 30px;
      border: 10px solid $gray-300;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      position: relative;
      img{
        width: 100%;
        border-radius: 50%;
      }
    }
    .name{
      font-size: 40px;
      font-family: "Oswald", sans-serif;
      margin-bottom: 20px;
    }
  }
</style>