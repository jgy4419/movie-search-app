<template>
    <div class="container">
        <!-- 3. keyup.enter로 input에 enter키를 눌렀을 때 apply를 실행하도록 하기. -->
        <input 
            v-model="title"
            class="form-control"
            type="text"
            placeholder="Search for Movies, Series & more" 
            @keyup.enter="apply"/>   
        <div class="selects">
            <select
                v-for="filter in filters"
                v-model="$data[filter.name]"
                :key="filter.name"
                class="form-select">
                <option 
                v-if="filter.name === 'year'" 
                value="">
                    All Years
                </option>
                <option
                    v-for="item in filter.items"
                    :key="item">
                    {{ item }}
                </option>
            </select>
        </div>
        <!-- 2. 버튼 만들어주기 -->
        <button class="btn btn-primary" 
        @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
// 1. axios를 import 하기
import axios from 'axios'
export default {
    data(){
        return{
            title: '',
            type: 'movie',
            number: 10,
            year: '',
            filters: [
                {
                    name: 'type',
                    items: ['movie', 'serise', 'episode']
                },
                {
                    name: 'number',
                    items: [10, 20, 30]
                },
                {
                    name:'year',
                    items: (() => {
                        const years = []
                        const thisYear = new Date().getFullYear()
                        for(let i = thisYear; i >= 1985; i -= 1){
                            years.push(i)
                        }
                        return years
                    })()
                }
            ]
        }
    },
    methods: {
        async apply(){
            const OMDB_API_KEY = '7035c60c'
            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}$page=1`)

            console.log(res)

        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        > * {
            margin-right: 10px;
            font-size: 15px;
            &:last-child{
                margin-right: 0;
            }
        }
        .selects{
            display: flex;
            select {
                width: 120px;
                margin-right: 10px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
        // 4. 스타일 지정.
        .btn{
            width: 120px;
            height: 50px;
            font-weight: 700;
            flex-shrink: 0;
        }
    }
</style>