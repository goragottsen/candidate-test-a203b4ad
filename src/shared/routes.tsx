import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Dashboard } from "../dashboard/components/Dashboard";
import toast from "react-hot-toast";

// Toast ID to prevent duplicates
const NOT_IMPLEMENTED_TOAST_ID = "not-implemented-toast";

// A component to show for non-implemented routes
export const NotImplemented = () => {
  // Use a ref to track if we've shown the toast already
  const toastShown = useRef(false);

  useEffect(() => {
    // Only show toast if not shown already
    if (!toastShown.current) {
      // Using a specific ID prevents duplicate toasts
      toast.error("Not implemented", { id: NOT_IMPLEMENTED_TOAST_ID });
      toastShown.current = true;
    }

    // Ensure toast is shown when this component unmounts and remounts
    // This handles the case when route changes in multiple router instances
    const timer = setTimeout(() => {
      toastShown.current = false; // Reset for next navigation
    }, 100);

    // Reset the ref on unmount and clear timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Redirect to dashboard
  return <Navigate to="/" replace />;
};

// Define the routes configuration
export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/jobs",
    element: <NotImplemented />,
  },
  {
    path: "/contracts",
    element: <NotImplemented />,
  },
  {
    path: "/timesheets",
    element: <NotImplemented />,
  },
  {
    path: "/invoices",
    element: <NotImplemented />,
  },
  {
    path: "/payments",
    element: <NotImplemented />,
  },
  {
    path: "*",
    element: <NotImplemented />,
  },
];
