import React from "react";
import "./Swiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  SettingOutlined,
  MobileOutlined,
  DashboardOutlined,
  ToolOutlined,
  EditOutlined,
} from "@ant-design/icons";
import WorkOrder from "../../../assets/image/WO.png";
import Asset from "../../../assets/image/Asset.png";
import Inventory from "../../../assets/image/Inventory.png";
import Analytic from "../../../assets/image/Analytic.png";
import Mobile from "../../../assets/image/Mobile.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = () => {
  return (
    <>
      <div className="swiper-container">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {/* WorkOrder */}
          <SwiperSlide>
            <div className="WO-container">
              <div className="WO-header">
                <SettingOutlined />
                <h4>WORK ORDER MANAGEMENT</h4>
              </div>
              <div className="WO-body">
                <div className="WO-content">
                  <h3>Stop struggling with paper work orders</h3>
                  <p>
                    Easily create, complete, and optimize work orders and work
                    requests while keeping your records in one place.
                    Automatically analyze your work orders with the work order
                    insights report.
                  </p>
                </div>
                <div className="WO-image">
                  <img src={WorkOrder} alt="WorkOrder" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Assets */}
          <SwiperSlide>
            <div className="WO-container">
              <div className="WO-header">
                <DashboardOutlined />
                <h4>ASSET MANAGEMENT</h4>
              </div>
              <div className="WO-body">
                <div className="WO-content">
                  <h3>Managing your assets shouldn't be guesswork</h3>
                  <p>
                    Observe, track, and optimize asset performance in a few
                    clicks.
                  </p>
                </div>
                <div className="WO-image">
                  <img src={Asset} alt="WorkOrder" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Inventory */}
          <SwiperSlide>
            <div className="WO-container">
              <div className="WO-header">
                <ToolOutlined />
                <h4> INVENTORY MANAGEMENT</h4>
              </div>
              <div className="WO-body">
                <div className="WO-content">
                  <h3>Take full control of your storeroom</h3>
                  <p>
                    Get the right parts, at the right time, for the right price.
                  </p>
                </div>
                <div className="WO-image">
                  <img src={Inventory} alt="WorkOrder" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Analytics */}
          <SwiperSlide>
            <div className="WO-container">
              <div className="WO-header">
                <EditOutlined />
                <h4> ANALYTICS AND REPORTING</h4>
              </div>
              <div className="WO-body">
                <div className="WO-content">
                  <h3>
                    One tool to see, sort, and act on all your maintenance data
                  </h3>
                  <p>
                    Visualize and filter your data in hundreds of ways to
                    quickly spot how to boost uptime, reduce waste, and more
                  </p>
                </div>
                <div className="WO-image-analytic">
                  <img src={Analytic} alt="WorkOrder" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Mobile Maintenance */}
          <SwiperSlide>
            <div className="WO-container">
              <div className="WO-header">
                <MobileOutlined />
                <h4>MOBILE MAINTENANCE</h4>
              </div>
              <div className="WO-body">
                <div className="WO-content">
                  <h3>
                    Everything you need to get the job done in the palm of your
                    hand
                  </h3>
                  <p>
                    Manage maintenance from anywhere, at any time, even without
                    an internet connection.
                  </p>
                </div>
                <div className="WO-image">
                  <img src={Mobile} alt="WorkOrder" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default SwiperComponent;
