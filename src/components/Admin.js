import { useLocation } from "react-router-dom";
const Admin = ({ handleLogout }) => {
  const {
    state: { username },
  } = useLocation();

  return (
    <>
      <h1>Welcome Back {username}</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
};

export default Admin;
