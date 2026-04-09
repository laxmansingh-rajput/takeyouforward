import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { bgImages, calendarThemes } from './data/themes';
import { getDatesArray } from './controller/getDateArray';

function App() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [Select, setSelect] = useState([]);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [notesText, setnotesText] = useState(["", "", "", "", "", "", ""]);
  const [lastUpdated, setlastUpdated] = useState(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOnFirstDay = new Date(year, month, 1).getDay();
  const dates = getDatesArray(dayOnFirstDay, daysInMonth);

  const handelDateSelect = (day) => {
    if (!day) return;

    let temp = [...Select];
    if (temp.length === 1 && day === temp[0]) {
      temp = [];
    } else if (temp.length < 2) {
      temp.push(day);
    } else {
      temp = [day];
    }

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
        if (parts[parts.length - 1] === " ") {
          arr[lastUpdated] = "";
        }
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
    <Layout>
      <div
        className="h-[650px] w-[800px] rounded-md"
        style={{
          backgroundColor: calendarThemes[month].colors.background,
          boxShadow: `0 10px 20px ${calendarThemes[month].colors.border}`
        }}
      >
        <div className='h-1/2 w-full relative'>
          <div
            className='h-full w-full relative'
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 30% 100%, 0 90%)" }}
          >
            <div className='w-full flex items-center justify-evenly absolute top-2'>
              {months.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full cursor-pointer z-50 ${index === month ? "scale-150" : ""}`}
                  style={{ backgroundColor: calendarThemes[month].colors.accent }}
                  onClick={() => setMonth(index)}
                />
              ))}
            </div>

            <img
              src={bgImages[month]}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          </div>

          <div className='absolute bottom-0 right-0 w-6/10 h-4/10 flex items-end justify-end p-3'>
            <div
              className='flex items-end justify-end gap-3'
              style={{ color: calendarThemes[month].colors.heading }}
            >
              <div className='text-2xl font-bold'>{year}</div>
              <div className='text-5xl font-extrabold'>{months[month]}</div>
            </div>
          </div>
        </div>

        <div className='h-1/2 w-full flex items-center justify-between gap-3 p-3'>
          <div
            className='h-[300px] w-[300px] flex flex-col items-center justify-center font-semibold rounded-2xl text-xl gap-2 relative px-2'
            style={{
              color: calendarThemes[month].colors.bodyText,
              background: calendarThemes[month].colors.subtleFill
            }}
          >
            <div className='w-full absolute top-0 left-0 pt-2 flex items-center justify-center'>
              Notes
            </div>

            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                value={notesText[index]}
                onChange={(e) => handelText(index, e)}
                className='w-full border-b h-8 text-md bg-transparent outline-none p-0'
              />
            ))}
          </div>

          <div
            className='h-[300px] w-[450px] flex flex-col items-center justify-center font-semibold rounded-2xl text-xl gap-2'
            style={{
              color: calendarThemes[month].colors.bodyText,
              background: calendarThemes[month].colors.subtleFill
            }}
          >
            <div className='w-full flex items-center justify-center gap-5'>
              {days.map((day, index) => (
                <div
                  key={index}
                  className='h-8 w-8 flex items-center justify-center'
                  style={{
                    color: index === 0
                      ? calendarThemes[month].colors.holiday
                      : calendarThemes[month].colors.bodyText
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {dates.map((week, weekIndex) => (
              <div key={weekIndex} className="w-full flex items-center justify-center gap-5">
                {week.map((day, dayIndex) => {
                  const isSunday = dayIndex === 0;

                  const isSelected =
                    (Select.length === 1 && Select[0] === day) ||
                    (Select.length === 2 && day >= Select[0] && day <= Select[1]);

                  return (
                    <div
                      key={dayIndex}
                      className='h-8 w-8 flex items-center justify-center cursor-pointer rounded-md'
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
                      onClick={() => handelDateSelect(day)}
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
    </Layout>
  );
}

export default App;