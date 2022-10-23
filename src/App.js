import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context"
import { getMonth } from "./Utils";
import Month from "./components/Month";
import CalendarHeader from "./components/Calendar";
import EventModal from "./components/EventModal";
import Sidebar from "./components/SideBar";




function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="principal-container">
        <CalendarHeader />
        <div className="principal-content">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>

  );
}

export default App;
