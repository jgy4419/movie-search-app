export default{
    install(app){
        app.config.globalProperties.$loadImage = (src) => {
            return new Promise((resolve) => {
                const img = document.createElement('img');
                img.src = src
                img.addEventListener('load', () => {
                // 완료 되도록 처리하고 완료! 신호 보내기
                    resolve()
                })
            })
        }
    }
}