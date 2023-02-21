import { App } from "vue";
import VirtualList from "./VirtualList.vue";

export { VirtualList };

export default {
  install(app: App) {
    app.component("VirtualList", VirtualList);
  },
};
