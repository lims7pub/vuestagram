import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
        name: 'Lim',
        age: 20,
        likes: 30,
        likesClick: false,
    }
  },
  mutations: {
    nameChange(state) {
        state.name = 'park'
    },
    ageIncrement(state, data) {
        state.age += data
    },
    likesTo(state) {
        if (state.likesClick == false) {
            state.likes++;
            state.likesClick = true;
        } else {
            state.likes--;
            state.likesClick = false;
        }
    },
  }, // 변경방법 정의
})

export default store