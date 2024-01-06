import React, { useEffect, useState, useRef } from "react";
import "./Home_Manager.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAllWorkOrders, getAllWorkOrderComplete } from "../../../services/WorkOrderService";

const Home_Manager = () => {
  const [infoWorkOrder, setInfoWorkOrder] = useState([]);
  const [totalWO, setTotalWO] = useState(0);
  const [totalWOComplete, setTotalWOComplete] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getWorkOrders();
      await getWorkOrderComplete();
    };
    fetchData();
  }, []);

  const getWorkOrderComplete = async () => {
    let response = await getAllWorkOrderComplete();
    let data = response.data;
    if (data) {
      setTotalWOComplete(data.length);
    }
  };

  const getWorkOrders = async () => {
    let response = await getAllWorkOrders();
    let data = response.data;
    if (data) {
      setTotalWO(data.length);
      let new_Data = data.map(({ assign }) => ({ assign }));
      const userCounts = {};
      new_Data.forEach((item) => {
        const user = item.assign;
        if (userCounts[user]) {
          userCounts[user]++;
        } else {
          userCounts[user] = 1;
        }
      });
      const userCountArray = Object.keys(userCounts).map((user) => ({
        user,
        countWO: userCounts[user],
      }));
      setInfoWorkOrder(userCountArray);
    }
  };

  let total = totalWO;
  let totalComplete = totalWOComplete;
  let percentage = parseInt((totalComplete / total) * 100);
  console.log(percentage);
  console.log(total);
  console.log(totalComplete);

  const spanStyle = {
    color: "#446084",
    fontSize: "30px",
    fontWeight: "600",
  };
  const data = infoWorkOrder;
  console.log("data: " + JSON.stringify(data));

  return (
    <div className="progresss-bar">
      <div className="content-display">
        <h3>Work Order Chart</h3>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <div className="chart-display">
        <h3>Work Order Progressbar</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="user" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="countWO"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home_Manager;
