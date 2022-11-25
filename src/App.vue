<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Regist</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <p>{{ name }} {{ age }}</p>
  <p>{{ myName }} {{ myAge }}</p>
  <button @click="nameChange">이름변경2</button>
  <button @click="ageIncrement(1)">나이증가2</button>

  <h4>야야야 {{ $store.state.name }} {{ $store.state.age }}</h4>
  <button @click="$store.commit('nameChange')">이름변경</button>
  <button @click="$store.commit('ageIncrement', 1)">나이증가</button>
  <!-- store.js에 $store.commit('함수', 데이터)로 변경 부탁 -->

  <!-- <button @click="$store.state.name = 'Park'">버튼</button> -->
  <!-- vuex 데이터 컴포넌트 내 직접수정 금지 -->

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button>

  <Container @write="myPost = $event" :myFilter="myFilter" :image="image" :articleCont="article" :step="step" />
  
  <!-- <p>{{ now2 }} {{ counter }}</p>
  <p>{{ now() }} {{ counter }}</p>
  <button @click="counter++">함수실행</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- <div class="tab">
    <div v-if="step == 0">내용0</div>
    <div v-if="step == 1">내용1</div>
    <div v-if="step == 2">내용2</div>
    <button @click="step = 0">버튼0</button>
    <button @click="step = 1">버튼1</button>
    <button @click="step = 2">버튼2</button>
  </div> -->

</template>

<script>
import Container from "./components/Container"
import Postdata from "./assets/postdata.js"
import Axios from "axios"
import {mapState, mapMutations} from 'vuex'

export default {
  name: "App",
  components: {
    Container: Container,
  },
  data() {
    return {
      step: 3,
      article: Postdata,
      moreview: 0,
      image: '',
      myPost: '',
      myFilter: '',
      counter: 0,
    };
  },
  mounted() {
    this.emitter.on('applyFilter', (filterName)=> {
      this.myFilter = filterName;
      console.log(this.myFilter);
    }); //emit수신
  },

  computed: {
    // now2() {
    //   return new Date()
    // }, //현재시간 출력함수 (처음 한번만 실행)

    // computed 함수는 return을 반드시 사용
    // name() {
    //   return this.$store.state.name
    // },
    // age() {
    //   return this.$store.state.age
    // },
    // 위의 문법 줄이고 싶으면 vuex의 mapState 사용
    ...mapState([ 'name', 'age', 'likes' ]),
    // 오브젝트 자료도 쌉가능
    ...mapState({ myName: 'name', myAge: 'age' }),
  },

  methods: {
    ...mapMutations([ 'setMore', 'nameChange', 'ageIncrement', 'likesTo' ]),

    // now() {
    //   return new Date()
    // }, //현재시간 출력함수 (사용할때마다 실행)
    more() {
      Axios.post("URL", { name: "kim" })
        .then((success) => {
          console.log(success);
        }) // ajax 요청 성공시
        .catch((error) => {
          console.log(error);
        }); // ajax 요청 실패시

      Axios.get(
        `https://codingapple1.github.io/vue/more${this.moreview}.json`
      ).then((result) => {
        console.log(result.data, this.article);
        this.article.push(result.data);
        this.moreview++;
      });
    },
    upload(ev) {
      let file = ev.target.files;
      console.log(file[0].type);
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.image = url;
      this.step = 1;
    },
    publish() {
      const myArticle =  {
        name: "Lim Sang O",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.image,
        likes: 9876,
        date: "May 15",
        liked: false,
        content: this.myPost,
        filter: this.myFilter,
      }
      this.article.unshift(myArticle);
      this.step = 0;
    }
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
