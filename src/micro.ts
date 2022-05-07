import { registerMicroApps, start } from "qiankun";
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
