import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { handleLogin } from "../../../services/LoginService";

const Login = ({ isLogin }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      let role = localStorage.getItem("role");
      if (role === "Maintenance manager") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isLogin, navigate]);

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      Login();
    }
  };

  const Login = async () => {
    if (!email || !password) {
      toast.error("Please provide email/password");
    } else {
      try {
        let data = await handleLogin(email, password);
        if (data && data.errCode === 3) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.infoUser);
          localStorage.setItem("role", data.roleUser);
          toast.success(data.message);
          let role = data.roleUser;
          if(role === "Maintenance manager")
          {
            navigate("/admin");
          }
          else{
            navigate("/");
          }
        }
        else{
          toast.warning(data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label><b>Email: </b></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => handleInputemail(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><b>Password:</b> </label>
              <div className="show-hidePassword">
                <input
                  type={isShowPassword ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => handleInputPassword(event)}
                  onKeyDown={(event) => handlePressEnter(event)}
                />
                <span
                  onClick={() => {
                    handleShowPassword();
                  }}
                >
                  <i
                    class={
                      isShowPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => Login()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="or-login">If you don't have an account</span>
            </div>
            <div className="col-12 social-login">
              <Button>
                <a href="https://robomain.ca/contact-us/">Contact us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
