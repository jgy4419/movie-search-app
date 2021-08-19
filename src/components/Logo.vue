<template>
    <RouterLink 
        to="/" 
        class="logo">
        <span>OMDbAPI</span>.COM
    </RouterLink>
</template>
<style lang="scss" scoped>
/* import로 가져온 main.scss는 bootstrap을 상속을 해놨기 때문에 
색 지정도 #000의 16진수가 아닌 $black 이런식으로 지정해도 된다. */
@import "~/scss/main";
    .logo{
        font-family: "Oswald", sans-serif;
        font-size: 20px;
        color: $black;
        text-decoration: none;
        /* logo에 hover을 했을 때 기본적인 색은 검정색 내부의 span은 노란색으로 표시된다. */
        &:hover{
            color: $black;
        }
        span{
            // $primary는 역추적을 해보면 노란색을 지칭한다.
            color: $primary;
        }
    }
</style>