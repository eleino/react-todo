import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="not-found">
      <NavLink to="/" className="back-link">
        Back to Dashboard
      </NavLink>

      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
