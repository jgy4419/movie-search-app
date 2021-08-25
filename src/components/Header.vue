<template>
    <header>
        <!-- 2. Logo 부분은 navigation의 앞부분에 출력 되도록 하기위해 먼저 출력해준다. -->
        <Logo />
        <div class="nav nav-pills">
            <div v-for="nav in navigations"
            :key="nav.name"
            class="nav-item">
                <RouterLink
                :to="nav.href"
                active-class="active"
                :class="{active: isMatch(nav.path)}"
                class="nav-link">
                    {{ nav.name }}
                </RouterLink>
            </div>
        </div>  
    </header>    
</template>
<script>
// 1. Logo라는 컴포넌트를 가져와야 된다.
import Logo from '~/components/Logo'
export default {
    components: {
        Logo
    },
    data(){
        return{
            navigations: [
                {
                    name: 'Search',
                    href: '/'
                },
                {
                    name: 'Movie',
                    href: '/movie/tt4520988',
                    path: /^\/movie/ // /movie로 시작하는 경로인 경우에 일치하겠다는 정규표현식.
                },
                {
                    name: 'About',
                    href: '/about'
                }
            ]
        }
    },
    methods: {
        isMatch(path){
            if(!path) return false
            console.log(this.$route)
            return path.test(this.$route.fullPath)
        }   
    }
}
</script>
<style lang="scss" scoped>
    /* 높이(위 아래) 70px, 수평 정렬, 왼쪽, 오른쪽 40px 여백 지정이 된다. */
    header{
        height: 70px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        /* logo가 header 안에 있는 경우에만 적용이 된다. 
        나중에 footer 부분에는 적용하지 않을 것이기 때문에 이렇게 작성*/
        .logo{
            margin-right: 40px;
        }
    }
</style>