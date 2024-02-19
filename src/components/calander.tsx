import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, startOfMonth, endOfMonth, endOfWeek, addDays } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 2))}
          className="p-2"
        >
          Prev
        </button>
        <div>
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
          <span> - </span>
          <span>{format(addMonths(currentMonth, 1), 'MMMM yyyy')}</span>
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 2))}
          className="p-2"
        >
          Next
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const dateFormat = "iii";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="w-1/14 text-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  const renderCells = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div className="w-1/14 text-center p-2" key={day.toString()}>
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-col">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDaysOfWeek()}
      <div className="flex">
        {renderCells(currentMonth)}
        {renderCells(addMonths(currentMonth, 1))}
      </div>
    </div>
  );
};

export default Calendar;
