import { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { checkIfTokenIsValid } from "../../helper";

function LoginForm() {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();

  useEffect(() => {
    if (checkIfTokenIsValid() === true) {
      nav("/");
    }
  }, [nav]);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const openNotification = (description) => {
    api.error({
      message: `Something went wrong!`,
      description: description,
    });
  };

  function handleUserLogin(e) {
    e.preventDefault();

    // fetch("https://fakestoreapi.com/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(userData),
    // });

    axios
      .post("https://fakestoreapi.com/auth/login", userData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        nav("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          openNotification("Please insert correct username or password ");
        } else {
          openNotification("Somewith went wrong, please try again!");
        }
      });
  }

  const isValid = userData.password.length > 4 && userData.username.length > 3;

  return (
    <form className="login-form">
      {contextHolder}

      <div>
        <label htmlFor="username-input">Username</label>
        <input
          required
          onChange={(event) => {
            const value = event.target.value;
            setUserData({ ...userData, username: value });
          }}
          type="text"
          id="username-input"
        />
      </div>
      <div>
        <label htmlFor="password-input">Password</label>
        <input
          required
          onChange={(event) => {
            const value = event.target.value;
            setUserData({ ...userData, password: value });
          }}
          type="password"
          id="password-input"
        />
      </div>
      <button type="submit" onClick={handleUserLogin} className={isValid ? " login-button" : " login-button disabled"}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
