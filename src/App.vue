<template>
  <div>
    <span v-if="title">{{ title }}</span>
    <button>{{ buttonText }}</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {
    title: {
      required: false,
      type: String
    },
    buttonText: {
      required: false,
      type: String,
      default: "Checkout mit buxale"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
