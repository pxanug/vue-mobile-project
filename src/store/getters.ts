import * as types from "@/store/types";
import { GetterTree } from "vuex";
const getters: GetterTree<any, any> = {
  [types.GET_MSG](state) {
    return state.msg;
  }
};
export default getters;
