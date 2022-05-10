import React, { useImperativeHandle, useState } from "react";

const MyApp = React.forwardRef((props, ref: any) => {
  const [msg, setMsg] = useState("hello world");
  useImperativeHandle(ref, () => ({
    sayHello: () => {
      console.log(msg);
    },
  }));
  return <div>hello</div>;
});
export default MyApp;
