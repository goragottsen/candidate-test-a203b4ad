import { Provider } from "react-redux";
import { navStore } from "./store";
import { Navigation } from "./components/Navigation";

export const NavigationApp = () => {
  return (
    <Provider store={navStore}>
      <Navigation />
    </Provider>
  );
};
