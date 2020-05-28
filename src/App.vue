<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "app"
})
export default class App extends Vue {
  created() {
    console.log("app初始化");
  }
}
</script>
<style lang="scss">
#app {
  font-size: 20px;
  color: #333333;
}
</style>
