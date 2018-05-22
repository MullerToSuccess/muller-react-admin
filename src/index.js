import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/lib/animate.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; //异步
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { AppContainer } from "react-hot-loader";
import Page from "./Page";

// redux 注入操作
const middleware = [thunk]; //中间件的数组，通过applyMiddleware引用；
//thunk 支持异步action:
const store = createStore(reducer, applyMiddleware(...middleware));
console.log(2222,store.getState()); //现在的state是一个httpData和自己写的mReducer

//在Component外包一层Provider供应store,所有的子组件都可以用store了
const render = Component => {
  // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(Page);

// Webpack Hot Module Replacement API
//模块热更新API:
if (module.hot) {
  // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
  // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
  // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (...args) => {
    // eslint-disable-line no-console
    if (
      args &&
      args.length === 1 &&
      typeof args[0] === "string" &&
      args[0].indexOf("You cannot change <Router routes>;") > -1
    ) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
  module.hot.accept("./Page", () => {
    render(Page);
  });
}
registerServiceWorker();


