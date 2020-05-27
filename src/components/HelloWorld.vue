<template>
  <div class="hello">
    <h1>———————————————HelloWorld组件 父组件———————————————————————————</h1>
    <h1>{{ $store.state.count }}</h1>
    <h1>{{ $store.state.student }}</h1>
    <button @click="add">+</button>
    <button @click="update">-</button>

    <h1>—————————————————getters———————————————————————————</h1>
    <h1>{{ $store.getters.addNumber  }}</h1>
    <h1>{{ $store.getters.num20 }}</h1>

    <h1>—————————————————HelloVuex组件 子组件———————————————————————————</h1>
    <hello-vuex :count="count"/>
  </div>
</template>

<script>
import HelloVuex from './HelloVuex'
export default {
  name: 'HelloWorld',
  components:{
    HelloVuex
  },
  data () {
    return {
      count:0
    }
  },
  // computed:{
  //   num20(){
  //     return this.$store.state.student.filter(s=>s.age>20)
  //   }
  // },
  methods:{
    add(){
      this.$store.commit('addNum')
    },
    update(){
      this.$store.commit('updateNum')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
