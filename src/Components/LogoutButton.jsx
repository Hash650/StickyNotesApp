import { Link } from "react-router-dom";

const LogoutButton = ({ logout }) => {
  return (
    <div className="logout-btn-container">
      <Link className="logout-btn" onClick={logout}>
        Log out
      </Link>
    </div>
  );
};

export default LogoutButton;
