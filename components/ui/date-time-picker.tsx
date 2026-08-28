import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MORNING_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
];

const AFTERNOON_SLOTS = [
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

interface DateTimePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function DateTimePicker({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: DateTimePickerProps) {

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const canGoPrev =
    currentMonth.getFullYear() > today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() > today.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();


  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
    }
    return null;
  });

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isPastDate = (d: Date) => {
    const dateCopy = new Date(d);
    dateCopy.setHours(0, 0, 0, 0);
    return dateCopy.getTime() < today.getTime();
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-8 bg-transparent">

      <div className="bg-lightBrand rounded-[14px] p-8 md:p-10 border border-transparent">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevMonth}
            disabled={!canGoPrev}
            className={cn(
              "p-1 rounded-full transition",
              canGoPrev ? "hover:bg-slate-200/50 cursor-pointer" : "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="size-5 text-slate-400" />
          </button>
          <h2 className="text-[17px] md:text-xl font-medium text-primary">
            {monthName} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-slate-200/50 rounded-full transition"
          >
            <ChevronRight className="size-5 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-[10px] md:text-xs font-bold text-primary tracking-wider mb-2"
            >
              {day}
            </div>
          ))}

          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />;
            }

            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            const isPast = isPastDate(date);

            return (
              <div key={date.toISOString()} className="flex justify-center">
                <button
                  onClick={() => !isPast && onSelectDate(date)}
                  disabled={isPast}
                  className={cn(
                    "flex items-center justify-center size-9 md:size-[42px] rounded-full text-[15px] md:text-base transition-colors",
                    isSelected
                      ? "bg-brand text-white font-medium cursor-pointer"
                      : isPast
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-slate-600 hover:bg-slate-200/50 cursor-pointer",
                    !isSelected && isToday && "border border-brand text-brand font-medium"
                  )}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>


      <div className="bg-lightBrand rounded-[14px] p-8 md:p-10 border border-transparent">
        <div className="mb-10">
          <h3 className="text-lg md:text-[20px] font-bold text-primary mb-6">Morning</h3>
          <div className="flex flex-wrap gap-4">
            {MORNING_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={cn(
                  "px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-medium transition-colors cursor-pointer",
                  selectedTime === time
                    ? "bg-brand text-white"
                    : "bg-[#e9eef6] text-slate-500 hover:bg-[#dfe5f0]"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg md:text-[20px] font-bold text-primary mb-6">Afternoon</h3>
          <div className="flex flex-wrap gap-4">
            {AFTERNOON_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={cn(
                  "px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-medium transition-colors cursor-pointer",
                  selectedTime === time
                    ? "bg-brand text-white"
                    : "bg-[#e9eef6] text-slate-500 hover:bg-[#dfe5f0]"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
