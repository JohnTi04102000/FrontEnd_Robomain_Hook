import React, { useState, useEffect } from "react";
import "./Notification.scss";
import { FaBell } from "react-icons/fa";
// import { getWorkOrderExpire } from "../../service/WorkOrderService";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const NotificationIcon = () => {
  const [newNotifications, setNewNotifications] = useState(0);
  const [open, setOpen] = useState('none');
  const [click, setClick] = useState(false);
  const [lits_WO, setLits_WO] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    //getAllNotification();
  }, []);

//   const getAllNotification = async () => {
//     let id = localStorage.getItem('id');
//     try {
//       let lits_WO = await getWorkOrderExpire(id);
//       setNewNotifications(lits_WO.data.length);
//       setLits_WO(lits_WO.data);
//     } catch (e) {
//       console.error(e);
//     }
//   };

  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} -${month} - ${year}`;
  };

  const handleClick = () => {
    const clickState = !click;
    if (clickState) {
      setClick(!click);
      setOpen('block');
    } else {
      setClick(!click);
      setOpen('none');
    }
  };

  const handlePickDate = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="notification">
      <FaBell onClick={handleClick} />
      {newNotifications > 0 && (
        <span className="notification-count">{newNotifications}</span>
      )}
      <div className="notification-content" style={{ display: open }}>
        <h4>Work Order near expired</h4>
        <ul>
          {lits_WO.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              onClick={() => handlePickDate(item.completeDate)}
            >
              {item.id} / {formatDateToInputValue(item.completeDate)}
            </li>
          ))}
        </ul>
        <Calendar onChange={handlePickDate} value={selectedDate} />
      </div>
    </div>
  );
};

export default NotificationIcon;
