import * as types from "@/store/types";
import { MutationTree } from "vuex";
const mutations: MutationTree<any> = {
  [types.SET_MSG](state, msg) {
    state.msg = msg;
  }
};
export default mutations;
