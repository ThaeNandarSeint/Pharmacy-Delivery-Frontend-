import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
import Sidebar from "../../components/main/Sidebar";
import Topbar from "../../components/main/Topbar";
import { userRoute } from "../../utils/APIRoutes";

const AdminPage = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      return navigate("/login");
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${userRoute}/me`, {
          headers: {
            Authorization: accessToken,
          },
        });

        const { roleType } = data.payload;

        if (
          roleType !== "Superadmin" &&
          roleType !== "Admin" &&
          roleType !== "Supervisor" &&
          roleType !== "Operator"
        ) {
          setRole(null);
        } else {
          setRole(roleType);
          setIsAuthorized(true);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  let render;

  if (!isLoading) {
    if (!error) {
      if (isAuthorized) {
        render = (
          <div className="app">
            <Sidebar />
            <div className="content">
              <Topbar />
              <Outlet context={[role, setRole]} />
            </div>
          </div>
        );
      } else {
        render = <div>You are not authorized</div>;
      }
    } else {
      return navigate("/login");
    }
  }

  return isLoading ? <div>Loading</div> : render;
};

export default AdminPage;
