<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" />
    <div class="post-header" v-for="(a, i) in follower" :key="i">
      <div class="profile" :style="`background-image:url(${a.image})`"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>

<script>
import { watch, onMounted, ref, toRefs, computed } from "vue";
import Axios from "axios";
import { useStore } from 'vuex';

export default {
  // json 데이터 axios로 가져오면, json -> object 변환 자동으로 해줌
  name: "MyPage",
  props: {
    one: Number,
  },
  // composition api 시작점 : setup()
  // setup() 안에 데이터 생성/조작, methods, hook 쌉가능
  setup(props, context) {
    //*** Reference Data Types에 대해 알아보자..나중에 */
    // ref함수를 이용하여 작성
    // let follower = ref(0);
    // let follower = ref([ ]);
    let follower = ref([]);


    function doThis() {
        console.log('doThis');
    }
    doThis();
    // vue는 데이터 중심으로 개발
    // 검색조건에 맞는 follower 데이터의 Array만 남겨서 출력하도록 개발
    // 자바스크립트 열띠미 해라~

    let { one } = toRefs(props);
    console.log(one.value);

    let result = computed(()=> { return follower.value.length })
    console.log(result.value); // 어디로 옮겨 쓸지 연구

    let store = useStore();
    console.log(store.state.name); // 여기서는 mapState 못쓸건데,.. 나중에는 될지도
    // console.log(store.commit());

    props;
    context;

    watch(one, ()=>{

    });

    // LifeCycle Hook 쓰는 법 : on~
    onMounted(() => {
      Axios.get("/follower.json").then((a) => {
        // follower = a.data // 안됨
        follower.value = a.data; // .value 써서 사용
      });
    });

    return { follower };
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>