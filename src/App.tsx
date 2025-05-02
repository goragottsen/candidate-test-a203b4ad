import { NavigationApp } from "./navigation/NavigationApp";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./shared/routes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full min-h-screen">
        <div className="w-[250px] bg-white border-r border-gray-200 shadow-sm">
          <NavigationApp />
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
