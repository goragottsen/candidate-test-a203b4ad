import { Provider } from "react-redux";
import { dashboardStore } from "./store";
import { Dashboard } from "./components/Dashboard";

export const DashboardApp = () => {
  return (
    <Provider store={dashboardStore}>
      <Dashboard />
    </Provider>
  );
};
