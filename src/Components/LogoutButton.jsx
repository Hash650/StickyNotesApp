import { Link } from "react-router-dom";

const LogoutButton = ({ logout }) => {
  return (
    <div className="logout-btn-container" onClick={logout}>
      <Link className="logout-btn">Log out</Link>
    </div>
  );
};

export default LogoutButton;
