<template>
<!-- 이미지를 데이터 형식으로 출력할 것이니 : 넣어주기
    영화의 배경은 url안에 포스터를 출력을 해줄 것이다.-->
    <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage : `url(${movie.Poster})`}"
    class="movie">
    <Loader
        v-if="imageLoading"
        :size="1.5"
        absolute />
        <div class="info">
            <div class="year">
                {{ movie.Year }}
            </div>
            <div class="title">
                {{ movie.Title }}
            </div>
        </div>
    </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'
export default {
    components:{
        Loader
    },
    props: {
        movie: {
            type: Object,
            default: () => ({})
            // 화살표 함수가 어려우면 일반 함수로 사용해도 됨.default: function(){ return{} }
        }
    },
    data(){
        return{
            // 이미지가 로딩되고 있습니다 자체가 true로 시작하는 것이다. 로딩이 끝나면 false로 바꿔줄 것이다.
            imageLoading: true
        }
    },    
    // movieItem이라는 컴포넌트가 연결이 된 직후에 init()이라는 메서드가 동작할 수 있다.
    // create는 컴포넌트가 생성된 직후에 동작하기 때문에 실제로는 html구조가 연결된 상태가 아니다. 그래서 html과 연결된 직후를 의미하기 위해서 mounted 사용.
    mounted(){
        this.init()
    },
    methods: {
        // 초기화
        async init(){   
            const poster = this.movie.Poster
            if(!poster || poster === 'N/A'){
                this.imageLoding = false
            }else{
                // 위에서 동작하다가 이미지 로드가 완료가 되면 
                await this.$loadImage(this.movie.Poster)
                // imageLoading가 false가 되면서 더 이상 애니메이션 처리를 하지 않도록 만들어준다.
                this.imageLoading = false 

            }
        }
    }
}
</script>

<style lang="scss" scoped>
// $gray-400이라는 색상 변수를 사용하기 위해서 import 해준다.
@import "~/scss/main";
.movie{
    // $width는 하나의 변수 168px은 $width의 값이다.
    $width: 168px;
    width: $width;
    height: $width * 3 / 2; // width의 특정 수치에 2분의 3만큼의 결정해서 세로의 크기를 지정해준다.
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &:hover:after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 6px solid $primary;
    }
    .info{
        background-color: rgba($black, .3);
        width: 100%;
        padding: 14px;
        font-size: 14px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
        backdrop-filter: blur(10px);
        .year{
            color: $primary;
        }
        .title{
            color: $white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>