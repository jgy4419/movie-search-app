export default{
    namespaced: true,
    // state는 하나의 데이터이고, 하나의 함수로 만들어주면 된다.
    // 함수로 만들어주는 이유는 객체 데이터는 배열 데이터와 동일하게 하나의 참조형 데이터이고, 데이터의 불변성을 유지하려면
    // 우리가 함수로 만들어서 반환을 해줘야 그때그때 state라는 속성에서 사용되는 데이터가 고유해질 수 있다.
    state: () => {
        // Return 키워드로 객체를 내보내서 객체 데이터 안에서 실제로 사용할 데이터들을 정의해주면 된다.
        return{
            name: 'JGY',
            email: 'jgy_98@naver.com',
            phone: '+82-10-2037-4553',
            image: 'https://user-images.githubusercontent.com/76980526/130902459-68954418-5235-472a-baf8-53c634ff042d.jpeg'
        }
        // 이렇게 만든 컴포넌트를 about이라는 컴포넌트에 가져와서 사용할 수 있다.
    } 
}