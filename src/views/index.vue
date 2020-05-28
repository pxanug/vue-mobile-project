<template>
  <div class="index">
    <el-container>
      <el-header>首页</el-header>
      <el-main>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item,index) in list_banner" :key="index">
            <img :src="item.image" alt />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { Container, Header, Main, Carousel, CarouselItem } from "element-ui";
@Component({
  name: "index",
  [Container.name]: Container,
  [Header.name]: Header,
  [Main.name]: Main,
  [Carousel.name]: Carousel,
  [CarouselItem.name]: CarouselItem
})
export default class Index extends Vue {
  @Action("productList") productList;
  @Action("bannerList") bannerList;
  list_pro: any = [];
  list_banner: any = [];
  created() {
    this.productList().then(res => {
      this.list_pro = res.productList;
      console.log(res);
    });
    this.bannerList().then(res => {
      this.list_banner = res.bannerList;
      console.log(res);
    });
  }
}
</script>
<style lang="scss">
.el-header {
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
