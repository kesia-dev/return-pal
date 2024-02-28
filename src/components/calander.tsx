import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  subMonths,
  addMonths,
  startOfDay,
  getMonth
} from 'date-fns';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    setSelectedDate(startOfDay(day)); // Normalize the date to ensure time does not affect comparison
    onDateSelect(startOfDay(day));
    console.log(startOfDay(day))
  };

  const renderMonthNavigation = () => (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center " ></div>
      {getMonth(currentMonth) > 0 && (
      <button
        onClick={(e) => { e.preventDefault(); setCurrentMonth(subMonths(currentMonth, 1)) }}
        className="mr-4 p-2 text-2xl text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {'<'}
      </button>
      )}
      <div className="flex-grow text-center">
        <h2 className="font-semibold text-xl inline mx-4">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        </div>
        <div className="flex-grow text-center">
        <h2 className="font-semibold text-xl inline mx-4">
          
          {format(addMonths(currentMonth, 1), 'MMMM yyyy')}
        </h2>
        </div>
      {getMonth(currentMonth) < 11 && (
      <button
        onClick={(e) => { e.preventDefault(); setCurrentMonth(addMonths(currentMonth, 1)) }}
        className="mr-4 p-2 text-2xl text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {'>'}
      </button>
      )}
    </div>
    
  );

  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 text-center text-xs font-medium">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  const renderCells = (month: Date) => {
    const monthStart = startOfMonth(month);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(endOfMonth(monthStart));

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      const dayCopy = day; 
      const isSelected = selectedDate ? isSameDay(dayCopy, selectedDate) : false;

      days.push(
        <div
          key={day.toString()}
          className={`py-2 text-center cursor-pointer relative ${isSameMonth(day, monthStart) ? 'text-gray-700' : 'text-gray-400'} ${isSelected ? 'bg-blue-200 rounded-full' : ''} ${isToday(day) ? 'text-blue-600 font-bold' : ''}`}
          onClick={() => handleDateClick(dayCopy)}
        >
          {format(dayCopy, 'd')}
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <div className='flex  flex-col w-full h-full h-10 shrink rounded-md border-2 border-grey
    text-sm mb-4 flex flex-col bg-white rounded w-[700px] h-[500px] p-10 shadow-lg ' > 
      {renderMonthNavigation()}
      <div className="flex">
        <div className="w-1/2">
          {renderDaysOfWeek()}
          {renderCells(currentMonth)}
        </div>
        <div className="w-px bg-gray-400 mx-2" />
        <div className="w-1/2">
          {renderDaysOfWeek()}
          {renderCells(addMonths(currentMonth, 1))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
