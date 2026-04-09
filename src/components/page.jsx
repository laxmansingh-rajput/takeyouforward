import React, { useState, useEffect } from 'react';
import { bgImages, calendarThemes } from '../data/themes';
import { getDatesArray } from '../controller/getDateArray';

const Page = ({ today, month, setMonth, year, onPrev, onNext }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [Select, setSelect] = useState([]);
  const [notesText, setnotesText] = useState(["", "", "", "", "", "", ""]);
  const [lastUpdated, setlastUpdated] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOnFirstDay = new Date(year, month, 1).getDay();
  const dates = getDatesArray(dayOnFirstDay, daysInMonth);

  const handelDateSelect = (day) => {
    if (!day) return;
    let temp = [...Select];
    if (temp.length === 1 && day === temp[0]) temp = [];
    else if (temp.length < 2) temp.push(day);
    else temp = [day];
    temp.sort((a, b) => a - b);
    setSelect(temp);
  };

  const handelText = (index, e) => {
    let arr = [...notesText];
    arr[index] = e.target.value;
    setnotesText(arr);
  };

  useEffect(() => {
    if (Select.length === 2) {
      let arr = [...notesText];
      if (lastUpdated !== null) {
        const parts = arr[lastUpdated].split(":");
        if (parts[parts.length - 1] === " ") arr[lastUpdated] = "";
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
          arr[i] = `${Select[0]}-${Select[1]}: `;
          setlastUpdated(i);
          break;
        }
      }
      setnotesText(arr);
    }
  }, [Select]);

  return (
    <div className="w-full flex items-center justify-center px-3 sm:px-6 py-6">
      <div
        className="w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden relative"
        style={{
          backgroundColor: calendarThemes[month].colors.background,
          boxShadow: `0 20px 40px ${calendarThemes[month].colors.border}`
        }}
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-6">
          <div className="w-4 h-4 bg-gray-300 rounded-full shadow-inner" />
          <div className="w-4 h-4 bg-gray-300 rounded-full shadow-inner" />
        </div>

        <div className="w-full h-48 sm:h-64 md:h-72 relative">
          <div
            className="w-full h-full"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 65%, 30% 100%, 0 90%)" }}
          >
            <img
              src={bgImages[month]}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="absolute top-3 left-0 w-full flex items-center justify-between px-4 sm:px-6">
            <button
              onClick={onPrev}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-white/70 backdrop-blur text-sm"
            >
              ⬅
            </button>

            <div className="flex gap-1 sm:gap-2">
              {months.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setMonth(index)}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full cursor-pointer ${
                    index === month ? "scale-150" : ""
                  }`}
                  style={{ backgroundColor: calendarThemes[month].colors.accent }}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-white/70 backdrop-blur text-sm"
            >
              ➡
            </button>
          </div>

          <div className="absolute bottom-3 right-4 sm:right-6 text-right">
            <div
              className="text-lg sm:text-2xl font-bold"
              style={{ color: calendarThemes[month].colors.heading }}
            >
              {year}
            </div>
            <div
              className="text-3xl sm:text-5xl font-extrabold leading-none"
              style={{ color: calendarThemes[month].colors.heading }}
            >
              {months[month]}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 p-3 sm:p-5">
          <div
            className="w-full md:w-1/3 flex flex-col gap-2 rounded-xl p-3 text-sm sm:text-base"
            style={{
              color: calendarThemes[month].colors.bodyText,
              background: calendarThemes[month].colors.subtleFill
            }}
          >
            <div className="text-center font-semibold">Notes</div>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                value={notesText[index]}
                onChange={(e) => handelText(index, e)}
                className="w-full border-b h-8 bg-transparent outline-none"
              />
            ))}
          </div>

          <div
            className="w-full md:w-2/3 flex flex-col gap-2 rounded-xl p-3 text-sm sm:text-base"
            style={{
              color: calendarThemes[month].colors.bodyText,
              background: calendarThemes[month].colors.subtleFill
            }}
          >
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((day, index) => (
                <div
                  key={index}
                  className="py-1"
                  style={{
                    color:
                      index === 0
                        ? calendarThemes[month].colors.holiday
                        : calendarThemes[month].colors.bodyText
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {dates.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1 text-center rounded-full">
                {week.map((day, dayIndex) => {
                  const isSunday = dayIndex === 0;
                  const isSelected =
                    (Select.length === 1 && Select[0] === day) ||
                    (Select.length === 2 && day >= Select[0] && day <= Select[1]);

                  return (
                    <div
                      key={dayIndex}
                      onClick={() => handelDateSelect(day)}
                      className="py-2 rounded cursor-pointer"
                      style={{
                        color: isSelected
                          ? calendarThemes[month].colors.selectedText
                          : isSunday
                          ? calendarThemes[month].colors.holiday
                          : calendarThemes[month].colors.bodyText,
                        background: isSelected
                          ? calendarThemes[month].colors.accent
                          : "transparent",
                        opacity: day ? 1 : 0.3
                      }}
                    >
                      {day || ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;