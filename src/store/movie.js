import axios from 'axios'
import _uniqueBy from 'lodash/uniqBy' // 1. lodash Import

export default{
    // trUe를 넣으면 movie.js를 index.js에 modules부분에 명시해서 별개의 부분으로 사용할 수 있다.
    namespaced: true,
    // 취급해야 되는 각각의 데이터(data)들을 의미한다.
    state: () => ({
        movies: []

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
            const {title, type, number, year} = payload
            const OMDB_API_KEY = '7035c60c'

            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}$page=1`)
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
                    if(page > (number / 10)) break
                    const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}$page={page}`)
                    const { Search } = res.data
                    commit('updateState', {
                        movies: [...state.movies, 
                            // 3. 여기 Search 부분도 값이 겹치지 않도록 설정해주자
                        ..._uniqueBy(Search, 'imdbID')]
                    })
                }
            }
        }
    }
}