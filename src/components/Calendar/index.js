import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../../assets/logo1.png";
import { GlobalContext } from "../../context";

import "./index.scss";

export const CalendarHeader = () => {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }
    return (
        <header>
            <img src={logo} alt="calendar" className="logo" />
            <h1>
                Calendário
            </h1>
            <div className="calendar-buttons">
                <button
                    onClick={handleReset}
                    className="border rounded py-2 px-4 mr-5"
                >
                    Hoje
                </button>
                <button onClick={handlePrevMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        Anterior
                    </span>
                </button>
                <button onClick={handleNextMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        Proximo
                    </span>
                </button>
            </div>
            <h2>
                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                    "MMMM YYYY"
                )}
            </h2>
        </header>
    );
}
export default CalendarHeader;