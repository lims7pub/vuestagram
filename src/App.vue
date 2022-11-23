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

  <Container @write="myPost = $event" :myFilter="myFilter" :image="image" :articleCont="article" :step="step" />

  <!-- <button @click="more">더보기</button> -->

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
import Container from "./components/Container";
import Postdata from "./assets/postdata.js";
import Axios from "axios";

export default {
  name: "App",
  components: {
    Container: Container,
  },
  data() {
    return {
      step: 0,
      article: Postdata,
      moreview: 0,
      image: '',
      myPost: '',
      myFilter: '',
    };
  },
  mounted() {
    this.emitter.on('applyFilter', (filterName)=> {

      this.myFilter = filterName;
      console.log(this.myFilter);
    });
  },
  methods: {
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
