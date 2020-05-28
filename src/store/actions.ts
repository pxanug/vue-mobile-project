import { ActionTree } from "vuex";
import { AxiosResponse } from "axios/index.d";
import { apiList } from "@/api/index";
import { PostData } from "@/utils/https";
const actions: ActionTree<any, any> = {
  productList({ state, commit }, payload) {
    return PostData(apiList.productList, payload);
  },
  bannerList({ state, commit }, payload) {
    return PostData(apiList.bannerList, payload);
  }
};
export default actions;
