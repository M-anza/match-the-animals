import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";

const renderApp = (store) => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default renderApp;
