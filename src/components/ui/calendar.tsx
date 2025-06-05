import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full text-white",
        caption_label: "text-sm font-medium text-white",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white border-[#23263a]"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-slate-400 rounded-md w-8 font-normal text-[0.8rem] bg-[#181c2f]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-cyan-600 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 text-white bg-[#181c2f] border border-transparent hover:border-cyan-400 hover:text-cyan-400 hover:bg-[#23263a] border-[#23263a]"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-cyan-600 aria-selected:text-white",
        day_range_end:
          "day-range-end aria-selected:bg-cyan-600 aria-selected:text-white",
        day_selected:
          "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white focus:bg-cyan-700 focus:text-white",
        day_today: "bg-[#23263a] text-cyan-300",
        day_outside:
          "day-outside text-slate-500 aria-selected:text-slate-500",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-cyan-800 aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
