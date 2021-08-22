import axios from 'axios'
import _uniqueBy from 'lodash/uniqBy' // 1. lodash Import

export default{
    // trUe를 넣으면 movie.js를 index.js에 modules부분에 명시해서 별개의 부분으로 사용할 수 있다.
    namespaced: true,
    // 취급해야 되는 각각의 데이터(data)들을 의미한다.
    state: () => ({
        movies: [],
        message: 'Search for the movie title!',
        // actions에 searchMovies가 실행이 되면 검색이 시작되면 true로 바뀌게 설정
        loading : false
    }),
    // 계산된 상태(computed)를 만들어 준다.
    getters: {},
    // 데이터의 수정은 모두 여기에서만 이루어진다.
    mutations: {
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
        }
    },
    actions: {
        async searchMovies({state, commit}, payload){ 
            /* 영화의 목록을 가져오는 행위가 끝나지 않았는데 사용자가 enter키를 한번 아니 여러번 눌러서
            searchMovie 부분이 또 동작을 시킬수도 있다. loading에는 true가 되어져 있는 상태이고 그러면 조건에 걸리면서
            return이 실행되면서 함수가 종료되면서 밑에 로직은 동작하지 않게 된다.*/
            // 사용자가 동시에 여러 번 실행하는 것을 방지
            if(state.loading) {
                return 
            }
            /* 위에 내용이 없으면 'Search for the movie title!'가 뜨도록 해놨는데 검색을 하기 시작하면
            메시지 부분이 빈 문자로 아무것도 없는 상태로 시작하게 만들어 주는 것이다. 처음에는 기본 메시지가 뜨게 만들고*/
            commit('updateState',{
                message: '',
                // 검색이 시작되면 검색이 true로 바뀜. 추가적으로 로딩이 완료 되면 다시 false로 바꿔줘야 된다.
                // 아래에 try catch문에 finally로 catch라는 구문에 commit에 변이 메서드를 실행할 것이다.
                loading : true
            })
            // 메시지가 시작이 되면 메시지가 지워지고 검색된 결과가 잘 나올수도 있고 검색 결과에 문제가 발생하면 catch 부분 내용이 채워지도록 만들기
            try{
                const res = await _fetchMovie({
                    ...payload,
                    page : 1
                })
                const { Search, totalResults } = res.data
                // 2. uniqBy 삽입부분
                commit('updateState', {
                    // 이렇게 하면 Search 배열에 imdbID 값이 겹치지 않게 지정할 수 있다.
                    movies: _uniqueBy(Search, 'imdbID')
                })
                console.log(totalResults); // 268
                console.log(typeof totalResults) // string
                // totalResult는 출력해본 결과 문자 데이터였으므로 숫자 데이터 10진법으로 변경시켜줘야 된다.
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10); // total을 올림처리 해줄 것이다.
                // 추가요청!
                if(pageLength > 1){
                    for(let page = 2; page <= pageLength; page += 1){
                        // page라는 변수가 number 에 10을 나눈 값보다 크면 break 시킨다.(종료) page의 초기 값은 2이다.
                        if(page > (payload.number / 10)) break
                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const { Search } = res.data
                        commit('updateState', {
                            movies: [...state.movies, 
                                // 3. 여기 Search 부분도 값이 겹치지 않도록 설정해주자
                            ..._uniqueBy(Search, 'imdbID')]
                        })
                    }
                }
            }catch(message){
                commit('updateState', {
                    // store에 있는 message 부분을 활용해서 우리가 사용하는 모든 컴포넌트에서 에러 메시지를 
                    // 아무 곳에서나 활용해서 출력해줄 수 있다.
                    movie: [], // 에러가 발생되면 화면에 안보이고 메시지를 출력할 수 있도록 만들기.       
                    message
                })
                // 정상적으로 작동이 되든, 문제가 있어서 catch 구문에 오든지 상관 없이 무조건 finally안에 구문이 실행. true를 false로 변경
            } finally{
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}
// movie.js에서만 사용된다는 의미로 _를 붙여주자.
// 실행이 될 때 여러가지 데이터를 받아서 내부에서 처리.
function _fetchMovie(payload){
    const{ title, type, year, page } = payload
    const OMDB_API_KEY = '7035c60c'
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}$page=${page}`
    return new Promise((resolve, reject) => { 
        axios.get(url)
        .then((res) => {
            // 에러나면 에러명 생기도록 하기 
            if(res.data.Error){
                reject(res.data.Error)
            }
            resolve(res)
        })
        .catch((err) => {
            reject(err.message)
        })
    })
}