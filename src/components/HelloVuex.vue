<template>
  <div>
      <h1>{{ $store.state.count }}</h1>
  </div>
</template>

<script>
export default {
    props:{
        count:Number
    }
}
</script>

<style>

</style>