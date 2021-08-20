<template>
    <div>{{ movie.imdbID }}</div>
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