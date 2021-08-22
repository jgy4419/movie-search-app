<template>
<!-- 이미지를 데이터 형식으로 출력할 것이니 : 넣어주기
    영화의 배경은 url안에 포스터를 출력을 해줄 것이다.-->
    <div 
    :style="{backgroundImage : `url(${movie.Poster})`}"
    class="movie">
        <div class="info">
            <div class="year">
                {{ movie.Year }}
            </div>
            <div class="title">
                {{ movie.Title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            default: () => ({})
            // 화살표 함수가 어려우면 일반 함수로 사용해도 됨.default: function(){ return{} }
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