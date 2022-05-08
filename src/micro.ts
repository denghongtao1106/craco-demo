import {
  registerMicroApps,
  start,
  initGlobalState,
  MicroAppStateActions,
} from "qiankun";
import { eventEmitter } from "./utils/emitter";
const getActiveRule = (hash: any) => (location: any) =>
  location.hash.startsWith(hash);

registerMicroApps([
  {
    name: "children-app",
    entry: "//localhost:3000",
    // 子应用挂载的结点
    container: "#container",
    // 子应用加载的路由
    activeRule: getActiveRule("#/start/react"),
  },
]);

start();

// 初始化 state
export const qiankunGlobalAction: MicroAppStateActions = initGlobalState({
  projectId: "799",
  name: "",
});

qiankunGlobalAction.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  eventEmitter.emit("qiankunStateChange", state, prev);
});
// setTimeout(() => {
//   actions.setGlobalState({ projectId: "1006" });
// }, 3000);
// qiankunGlobalAction.offGlobalStateChange();
