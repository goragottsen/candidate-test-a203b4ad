import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";

// Helper function to dispatch navigation events
const dispatchNavEvent = (path: string) => {
  // Create a custom event that can be listened to by other micro-frontends
  const event = new CustomEvent("navigation-change", {
    detail: { path },
  });
  window.dispatchEvent(event);
};

export const Navigation = () => {
  // Handle link clicks to broadcast navigation changes
  const handleLinkClick = (path: string) => () => {
    // Dispatch the event without preventing default behavior
    dispatchNavEvent(path);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-red-400!">FreelancerHub</h2>
      </div>

      <nav className="flex-1 py-4">
        <ul>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors bg-blue-50 border-l-3 border-blue-500">
            <Link
              to="/"
              onClick={handleLinkClick("/")}
              className="block text-blue-500 font-medium"
            >
              Dashboard
            </Link>
          </li>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors hover:bg-gray-100">
            <Link
              to="/jobs"
              onClick={handleLinkClick("/jobs")}
              className="block text-gray-800"
            >
              Find Jobs
            </Link>
          </li>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors hover:bg-gray-100">
            <Link
              to="/contracts"
              onClick={handleLinkClick("/contracts")}
              className="block text-gray-800"
            >
              Contracts
            </Link>
          </li>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors hover:bg-gray-100">
            <Link
              to="/timesheets"
              onClick={handleLinkClick("/timesheets")}
              className="block text-gray-800"
            >
              Timesheets
            </Link>
          </li>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors hover:bg-gray-100">
            <Link
              to="/invoices"
              onClick={handleLinkClick("/invoices")}
              className="block text-gray-800"
            >
              Invoices
            </Link>
          </li>
          <li className="py-2 px-6 my-1 cursor-pointer transition-colors hover:bg-gray-100">
            <Link
              to="/payments"
              onClick={handleLinkClick("/payments")}
              className="block text-gray-800"
            >
              Payments
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <UserAvatar />
      </div>
    </div>
  );
};
