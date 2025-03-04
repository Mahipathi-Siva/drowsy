// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const Calender = () => {
//   const [date, sestDate] = useState(new Date());
//   const onChange = (date) => {
//     sestDate(date);

//     console.log(date);
//   };

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       .Calender{
//       width : 500px
//       }
//       `;
//     document.head.appendChild(style);
//   }, []);

//   return (
//     <div className="Calender">
//       <Calendar onChange={onChange} value={date} />
//     </div>
//   );
// };

// export default Calender;

// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const Calender = () => {
//   const [date, setDate] = useState(new Date());

//   const onChange = (date) => {
//     setDate(date);
//     console.log(date);
//   };

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       .calendar-container {
//         max-width:100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         padding: 20px;
//         background: white;
//         border-radius: 10px;
//         box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//       }

//       .react-calendar {
//         border: none !important;
//       }

//       .react-calendar__tile--active {
//         background: #37b24d !important;
//         color: white !important;
//         border-radius: 5px;
//       }

//       .react-calendar__tile {
//         text-decoration: none !important;
//       }

//       .react-calendar__tile:hover {
//         background: #d3f9d8;
//         border-radius: 5px;
//       }

//       /* Styling for the current date */
//       .react-calendar__tile--now {
//         background: #ced4da !important;
//         border-radius: 5px;
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   return (
//     <div className="calendar-container">
//       <Calendar onChange={onChange} value={date} />
//     </div>
//   );
// };

// export default Calender;

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    console.log(date);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .calendar-container {
        background: linear-gradient(to bottom, #f5f5f5, #d3d3d3);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 90%;
        padding: 20px 30px 20px 30px;
        border-radius: 10px;
      }

      .react-calendar {
        background: linear-gradient(to bottom, #f5f5f5, #d3d3d3);
        width: 100% !important;
        height: 100% !important;
        max-width: 100%;
        border: none !important;
      }

      .react-calendar__tile--active {
        background: #37b24d !important;
        color: #000 !important;
        border-radius: 5px;
      }

      .react-calendar__tile {
        text-decoration: none !important;
      }

      .react-calendar__tile:hover {
        background: #37b24d  !important;
        color : #000;
        border-radius: 5px;
      }

      /* Styling for the current date */
      .react-calendar__tile--now {
        // background: #37b24d !important;
        background : none;
        border-radius: 5px;
      }

      .react-calendar__month-view__days__day--weekend {
        color:#000;
      }

    /* Remove dots under weekdays */
      .react-calendar__month-view__weekdays {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 14px;
        list-style: none !important;
        padding: 0;
      }

      .react-calendar__tile react-calendar__tile--now{
        color : #000;
      }

      abbr {
        text-decoration : none;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="calendar-container">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default Calender;
