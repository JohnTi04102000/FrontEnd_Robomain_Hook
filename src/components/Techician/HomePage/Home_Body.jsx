import React, { useEffect } from "react";
import image1 from "../../../assets/image/feature.jpg";
import image2 from "../../../assets/image/ar.jpg";
import image3 from "../../../assets/image/laptop.png";
import Footer from "../../../components/Techician/HomePage/Footer";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import SwiperComponent from "./Swiper";
import {
  BookOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "./Home_Body.scss";

const Home_Body = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const spanStyle = {
    color: "#446084",
    fontSize: "30px",
    fontWeight: "700",
  };

  const navigate = useNavigate();

  const isLogin = localStorage.getItem("id");
  if (!isLogin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="home-body-container">
      <div className="home-body-content">
        <div className="title-body">
          <p>
            Augmented reality (AR) application for industrial maintenance and
            repair
          </p>
          <div className="title-image">
            <Image width={500} src={image3} />
          </div>
        </div>
        <div className="content-body">
          <div className="body-feature">
            <h3>
              <span style={spanStyle}>The provision</span> of maintenance and
              servicing maintenance of machinery in industrial parks and
              industries
            </h3>
            <h3>
              <span style={spanStyle}>Support</span> experts and engineers to
              work more scientifically and effectively
            </h3>
            <h3>
              <span style={spanStyle}>Monitor</span> and{" "}
              <span style={spanStyle}>Early detection</span> of machinery and
              equipment at risk of damage easily and quickly
            </h3>
          </div>

          <div className="content-body-details">
            <button className="detail" onClick={scrollToTop}>
              View detail
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button className="introduce" onClick={scrollToTop}>
              <i className="fa-solid fa-video"></i> Video introduces us
            </button>
          </div>
          <div className="content-body-feature">
            <div className="feature-section">
              <div className="feature-content">
                <span className="feature-hot">Key features</span>
                <p>
                  Robomain is equipment maintenance management software helps
                  businesses digitalize and comprehensively manage activities
                  related to the use and maintenance of current equipment of the
                  Equipment Maintenance Management Department with operations
                  departments. Use equipment, warehouse departments, accounting,
                  etc. on the same online software system to minimize the risk
                  of unexpected equipment failure and reduce troubleshooting and
                  equipment repair time. thereby ensuring stable production and
                  business activities, saving maintenance and repair costs, ...
                </p>
              </div>
              <div className="image">
                <img src={image1} alt="Feature" />
              </div>
            </div>
            <div className="feature-section-double">
              <div className="feature-content">
                <img src={image2} alt="AR" />
              </div>
              <div className="image">
                <h4>
                  <BookOutlined /> Centrally manage all equipment assets and all
                  information on equipment records, maintenance, repair,
                  operations, contractors, ...
                </h4>
                <p>
                  <LoginOutlined /> Comprehensive digitization of equipment
                  maintenance business processes:
                  <ul>
                    <li>
                      <i class="fa-regular fa-circle-right"></i> Preventive
                      maintenance (Regular maintenance, Periodic maintenance
                      planning);{" "}
                    </li>
                    <li>
                      <i class="fa-regular fa-circle-right"></i> Corrective
                      maintenance (Check equipment, Send request for maintenance
                      problems,...);
                    </li>
                    <li>
                      <i class="fa-regular fa-circle-right"></i> Maintenance
                      work (assign work, report results, discuss and evaluate
                      results)
                    </li>
                  </ul>
                </p>
                <p>
                  <MenuUnfoldOutlined /> Digitize operations related to
                  maintenance work:
                  <ul>
                    <li>
                      <i class="fa-regular fa-circle-check"></i> Management of
                      maintenance spare parts warehouse
                    </li>
                    <li>
                      <i class="fa-regular fa-circle-check"></i> Management of
                      procurement of maintenance materials
                    </li>
                    <li>
                      <i class="fa-regular fa-circle-check"></i> Management of
                      maintenance budget
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
          <div>
            <SwiperComponent />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Body;
