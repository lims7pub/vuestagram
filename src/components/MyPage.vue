<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" />
    <div class="post-header">
      <div class="profile" style="background-image: url()"></div>
      <span class="profile-name">{{ follower }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Axios from 'axios';

export default {
    // json 데이터 axios로 가져오면, json -> object 변환 자동으로 해줌
    name: 'MyPage',
    // composition api 시작점 : setup()
    // setup() 안에 데이터 생성/조작, methods, hook 쌉가능
    setup() {
        //*** Reference Data Types에 대해 알아보자..나중에 */
        // ref함수를 이용하여 작성
        // let follower = ref(0);
        // let follower = ref([ ]);
        let follower = ref([]);

        // LifeCycle Hook 쓰는 법 : on~
        onMounted(() => {
            Axios.get('/follower.json').then((a) => {
                // follower = a.data // 안됨
                follower.value = a.data // .value 써서 사용
            })
        })

        return { follower }

    },
    data() {
        return {
            
        }
    },
};
</script>

<style>
</style>