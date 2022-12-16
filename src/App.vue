<template>
  <div id="app">
    <div class="title">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Hello world',
    };
  },
}
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  color: red;
}
</style>