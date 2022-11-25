import { createStore } from 'vuex'
import Axios from 'axios'

const store = createStore({
  state() {
    return {
      name: 'Lim',
      age: 20,
      likes: 30,
      likesClick: false,
      more: {},
    }
  },
  // state 데이터 변경은 mutatines 에서
  mutations: {
    setMore(state, data) {
      state.more = data
    }, 
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
  },
  // Ajax는 actions 에서
  actions: {
    getData(context) {
      Axios.get('https://codingapple1.github.io/vue/more0.json').then((result) => {
        console.log(result.data);
        context.commit('setMore', result.data);
      })
    }
  },
})

export default store