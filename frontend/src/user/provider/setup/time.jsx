import React, { useState, useEffect } from "react";

export default function Time({ Controller, setValue, control, time, days }) {
  const [color, setColor] = useState("24 Hours");

  const Time = ["24 Hours", "Add Time"];
  const addTime = ["start", "end"];

  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      <div className="  text-slate-800  flex flex-col gap-2 p-5">
        <span className="">Available Time</span>
      
            <div>
              <Controller
                name="time"
                control={control}
                defaultValue={{
                  start: "10:00",
                  end: "17:00",
                }}
                render={({ field }) => {
                  return (
                      <div className="grid gap-10 grid-cols-2 ">
                        <input
                          type="time"
                          className="p-2  border-2 border-slate-300  rounded-lg "
                          onChange={(e) => {
                            const { value } = e.target;
                            setValue("time.start", value);
                            
                          }}
                          defaultValue={ time && time?.start || "10:00"}
                        />

                        <input
                          type="time"
                          className="p-2 border-2 border-slate-300  rounded-lg "
                          onChange={(e) => {
                            const { value } = e.target;
                            setValue("time.end", value);
                          }}
                          defaultValue={time && time?.end || "17:00"}
                        />
                      </div>
                  );
                }}
              />
            </div>
   
      </div>

      <div className=" flex flex-col text-slate-800 p-5  ">
        <span className=" ">Available Days</span>
        <div>
          <Controller
            name="days"
            control={control}
            defaultValue={days ? days : []}
             render={({ field }) => {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id="all"
                      checked={
                        weeks.length === field.value.length ? true : false
                      }
                      onChange={(e) => {
                        weeks.length === field.value.length
                          ? setValue("days", [])
                          : setValue(
                              "days",
                              weeks.map((day) => day)
                            );
                      }}
                      className="borde-2 border-slate-300 rounded-lg"
                    />

                    <label htmlFor="all">All</label>
                  </div>

                  <ul className="grid lg:grid-cols-5 xl:grid-cols-7 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 auto-rows-auto ">
                    {weeks.map((day) => (
                      <li key={day}>
                        <div className="flex gap-2  ">
                          <input
                            type="checkbox"
                            id={day}
                            value={day}
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              setValue(
                                "days",
                                field.value.includes(value)
                                  ? field.value.filter((item) => item !== value)
                                  : [...field.value, value]
                              );
                            }}
                            checked={field.value.includes(day)}
                          />
                          <label htmlFor={day}>{day}</label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
