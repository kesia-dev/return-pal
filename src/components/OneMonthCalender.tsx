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

const OneMonthCalendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    console.log(day, '  here is selected date');

    setSelectedDate(startOfDay(day)); // Normalize the date to ensure time does not affect comparison
    onDateSelect(startOfDay(day));
    console.log(startOfDay(day))
  };

  const renderMonthNavigation = () => (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center " ></div>

      <div className="flex-grow text-center">
        <h2 className="font-semibold text-xl inline mx-4">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>

     
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
          className={`py-2 px-2 text-center cursor-pointer relative ${isSameMonth(day, monthStart) ? 'text-gray-700' : 'text-gray-400'} ${isSelected ? 'bg-[#E8FAB2] !text-black rounded-full' : ''}`}
          onClick={() => handleDateClick(dayCopy)}
        >
          {format(dayCopy, 'd')}
        </div> as never
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <div style={{ borderRadius: "20px" }} className='flex  flex-col w-full h-auto shrink rounded-md border-2 border-white
    text-sm mb-4 flex flex-col bg-white w-[750px] h-[500px] p-10 shadow-lg ' >
      {renderMonthNavigation()}
      <div className="flex justify-center">
        <div>
          {renderDaysOfWeek()}
          {renderCells(currentMonth)}
        </div>
        
      </div>
    </div>
  );
};

export default OneMonthCalendar;