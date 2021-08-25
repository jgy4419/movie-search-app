<template>
    <div class="container">
        <!--loading이라는 데이터가 true인 경우에는 template 안에가 출력이 되고, 그렇지 않으면 movie-details가 출력이 되도록 만들어야되는데
        사용해야 될 요소는 v-if이고, v-if는 두 개의 요소에 동시에 사용할 수 없기 때문에 이 부분을 template요소로 묶어서 v-if 추가-->
        <template v-if="Loading">
            <div class="skeletons">
            <div class="skeleton poster"></div>
            <div class="specs">
                    <div class="skeleton title"></div>
                    <div class="skeleton spec"></div>
                    <div class="skeleton plot"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                </div>
            </div>
            <Loader
                :size ="3"
                :z-index=9
                fixed/>
        </template>
        <!-- 포스터 부분도 출력하지 않았고, 타이틀, 몇가지 레이블, 줄거리 부분만 간단하게 출력해줬다. -->
        <div v-else 
        class="movie-details">
                        <!-- 포스터를 requestDiffSizeImage함수를 사용해서 그 poster를 인수로 만들어 준다.
                        사이즈 부분의 기본 값은 700으로 지정했으니 2번째 인수에 700을 넣어줄 필요는 없다.-->
            <div 
                :style="{backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)}}`}"
                class="poster">
                <Loader
                v-if="imageLoading"
                absolute/>
            </div>
            <div class="specs">
                    <div class="title">
                        {{ theMovie.Title }}
                    </div>
                    <div class="labels">
                        <!-- 출시년도, 상영시간, 국가를 표시 -->
                        <span>{{ theMovie.Released }}</span>
                        <span>{{ theMovie.Runtime }}</span>
                        <span>{{ theMovie.Contry }}</span>
                    </div>
                    <!-- plot은 영화의 간단한 줄거리 -->
                    <div class="plot">
                        {{ theMovie.Plot }}
                    </div>
                    <div class="ratings">
                        <!-- 실제 데이터 보고나서 해당하는 내용을 체크할 것이기 때문에 잠깐 넘어가기.-->
                        <h3>Ratings</h3> 
                        <div class="rating-wrap">
                            <div 
                            v-for="{Source:name, Value: score} in theMovie.Ratings" 
                            :key="name"
                            :title="name"
                            class="rating">
                            <img
                             :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                             :alt="mame" />
                             <span>{{ score }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Actors</h3>
                        {{ theMovie.Actors}}
                    </div>
                    <div>
                        <h3>Director</h3>
                        {{ theMovie.Director }}
                    </div>
                    <div>
                        <h3>Genre</h3>
                        {{ theMovie.Genre }}
                    </div>
                </div>
        </div>
        <!--HTML에서는 z-index를 zIndex로 사용하면 안된다.-->
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
            imageLoading: true
        }
    },
   computed:{
        theMovie(){
            return this.$store.state.movie.theMovie
        },
        loading(){
            return this.$store.state.movie.loading
        }
    },
    // movie라는 컴포넌트가 실행이 되면 안에있는 내용 실행.
    created(){
        console.log(this.$route)
        this.$store.dispatch('movie/searchMovieWithId', {
            // movie/tt... 이렇게 주소가 들어왔을 때 이 id가 index.js에 :변수 로 만들었기 때문에 실제로 id값에 적용이 된다.
            id: this.$route.params.id
        })
    },
    methods:{
        // 기본적인 포스터의 크기는 700으로 바꾸서 사용할 것이다. 상황에 따라서 700이 아닌 다른 값도 이용해서 이미지의 사이즈를 변경헐 수 있도록 하기.
        requestDiffSizeImage(url, size = 700){
            // url 부분이 값이 없거나 또는 해당사항이 없는 경우 기본적인 로직을 처리하지 않고 바로 로딩 애니메이션이 종료 되도록 설정.
            if(!url || url === 'N/A'){
                // 로딩 애니메이션을 종료하고
                this.imageLoading = false
                // 빈 문자열 반환(이미지에 아무것도 표시하지 않도록.)
                return ''
            }
            // SX300을 SX700으로 바꿔서 변경을 요청하는 것이다.
            const src = url.replace('SX300', `SX${size}`)
            this.$loadImage(src)
            // async await를 사용하면 로딩이 끝나고 나서야 src라는 주소가 반환되는 문제가 생기므로 .then()을 사용해주자.
            .then(() => {
                this.imageLoading = false
            })
            // 이렇게 작성하면 src가 작성되는 순서에 상관없이 동작을 할 것이다.
            return src
        }   
    }
}
</script> 
<style lang="scss" scoped>
@import "~/scss/main";
    .container{
        padding-top: 40px; 
    }
    .skeletons{
        display: flex;
        .poster{
            // 포스터는 크기가 유지돼야 되니까 감소너비를 사용하지 않겠다고 명시.
            flex-shrink: 0;
            width: 500px;
            height: 500px * 3 / 2;
            margin-right: 70px;
        }
        .specs{
            // 증가너비를 최대한 많은 너비를 사용하도록 flex-grow: 1;을 적용
            flex-grow: 1;
        }
        // poster도 skeleton이라는 클래스를 가지고 있기 때문에 안에다가 넣지 않았다.
        .skeleton{
            border-radius: 10px;
            background-color: $gray-200;
            &.title{
                width: 80%;
                height: 70px;
            }
            &.spec{
                width: 60%;
                height: 30px;
                margin-top: 20px;
            }   
            &.plot{
                width: 100%;
                height: 250px;
                margin-top: 20px;
            }
            &.etc{
                width: 50%;
                height: 50px;
                margin-top: 20px;
            }
        }
    }
    .movie-details{
        display: flex;
        color: $gray-600;
        // 감소너비를 사용하지 않는다.
        .poster{
            flex-shrink: 0;
            width: 500px;
            height: 500px * 3 / 2;
            position: relative;
            margin-right: 70px;
            border-radius: 10px;
            background-color: $gray-200;
            background-size: cover;
            background-position: center;
        }
        // 증가너비 사용
        .specs{
            flex-grow: 1;
            .title{
                color: $black;
                font-family: 'Oswald', 'sans-serif';
                font-size: 70px;
                line-height: 1;
                margin-bottom: 30px;
            }
            .labels{
                color: $primary;
                // span 태그가 총 3개가 있는데 전부 다 가상요소 after을 통해서 오른쪽 부분에 가운데 점 표시를 해주는데 
                // 마지막 가상요소에는 display:none; 으로 화면에서 안보이게 만들어주는 것이다.
                span{
                    &::after{
                        content: "\00b7";
                        margin: 0 6px;
                    }
                    &:last-child:after{
                        display: none;
                    }
                }
            }
            .plot{
                margin-top: 20px;
            }
            .ratings{
                .rating-wrap{
                    display: flex;
                    .rating{
                        display: flex;
                        align-content: center;
                        margin-right: 32px;
                        img{
                            height: 30px;
                            flex-shrink: 0;
                            margin-right: 6px;
                        }
                    }
                }
            }
            h3{
                margin: 24px 0 6px;
                color: $black;
                font-family: 'Oswald', 'sans-serif';
                font-size: 20px;
            }
        }
    }
</style>