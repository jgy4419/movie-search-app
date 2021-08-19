# 8/18일, 8/19일 작업
### 사용되는 언어, 프레임워크는 크게 Vue.js, Bootstrap, scss 등을 사용합니다. 영화검색 API는 OMDB API를 사용했습니다.
### 1. Header 부분 작업, Headline text작업, Search 부분을 구현했습니다.
![image](https://user-images.githubusercontent.com/76980526/130034217-6b39d546-0100-4f01-bb89-766be63d3373.png)
### 2. 각각 option 부분은 처음에는 movie, serise, episode를 선택할 수 있게 했고, 두번째 부분은 한번에 검색 될 영화의 개수를 지정, 세번째는 2021~1985년까지 년도를 선택할 수 있도록 작업했다. 년도는 계속 바뀌므로 new Date().getFullYear()를 사용해서 년도가 바뀌면 자동으로 갱신되도록 구현하였습니다.. 
### 3. axios의 get 방식을 이용해서 예를들면 frozen(겨울왕국)을 검색하면 실제로 포스터가 출력되지는 않지만, 데이터가 전달 되도록 했습니다..
![image](https://user-images.githubusercontent.com/76980526/130035756-5b17a88e-9511-4007-bf9e-db5c1f631209.png)