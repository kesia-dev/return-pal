import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  getMonth
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());


  const renderMonthNavigation = () => (
    <div className="flex justify-between items-center p-4 ">
      <div className="flex items-center " >
        {getMonth(currentMonth) > 0 && (
          <button onClick={(e) => { e.preventDefault(); setCurrentMonth(subMonths(currentMonth, 1)) }}
            className="mr-4 p-2 text-2xl text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {'<'}
          </button>
        )}
        <h2 className="font-semibold text-xl mx-4 ">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="flex items-center ">
        <h2 className="font-semibold text-xl mx-4 item-center">
          {format(addMonths(currentMonth, 1), 'MMMM yyyy')}
        </h2>
        {getMonth(currentMonth) < 11 && (
          <button onClick={(e) => { e.preventDefault(); setCurrentMonth(addMonths(currentMonth, 1)) }}
            className="mr-4 p-2 text-2xl text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {'>'}
          </button>
        )}
      </div>
    </div>
  );


  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 text-center text-xs font-normal">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );


  const renderCells = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            key={day.toString()}
            className={`py-1 text-center relative ${isSameMonth(day, monthStart) ? 'text-gray-700' : 'text-gray-400'} ${isToday(day) ? 'text-blue-600 font-bold' : ''}`}
            style={isToday(day) ? { padding: '0.25rem' } : {}}
          >
            <span className={isToday(day) ? 'absolute inset-0 m-auto w-6 h-6 rounded-full border border-blue-600' : ''}></span>
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return <div className="flex flex-col">{rows}</div>;
  };

  return (
    <div className='flex  flex-col w-full h-full h-10 shrink rounded-md border-2 border-black
     text-sm mb-4 flex flex-col bg-white rounded w-[700px] h-[500px] p-10 shadow-lg ' >

      {renderMonthNavigation()}
      <div className="flex divide-x divide-gray-400">
        <div className="w-1/2">
          {renderDaysOfWeek()}
          {renderCells(currentMonth)}
        </div>
        <div className="w-1/2">
          {renderDaysOfWeek()}
          {renderCells(addMonths(currentMonth, 1))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

