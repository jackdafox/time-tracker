import { Category, Time } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import DisplayTimeTable from "./DisplayTimeTable";
import TotalTimeTable from "./TotalTimeTable";

interface SortTimeTableProps {
  category: (Category & {
    time: Time[];
  })[];
}

const SortTimeTable = ({ category }: SortTimeTableProps) => {
  // Function to group times by date
  const groupTimesByDate = (categories: SortTimeTableProps["category"]) => {
    const groups = new Map<string, (Category & { time: Time[] })[]>();

    categories.forEach((cat) => {
      cat.time.forEach((time) => {
        const date = new Date(time.createdAt);
        const dateKey = date.toISOString().split("T")[0]; // Get YYYY-MM-DD

        if (!groups.has(dateKey)) {
          groups.set(
            dateKey,
            category.map((c) => ({
              ...c,
              time: [],
            }))
          );
        }

        // Find the matching category in the grouped data and add the time
        const groupedCategories = groups.get(dateKey);
        const matchingCategory = groupedCategories?.find(
          (c) => c.id === cat.id
        );
        if (matchingCategory) {
          matchingCategory.time.push(time);
        }
      });
    });

    // Convert to array and sort by date (most recent first)
    return Array.from(groups.entries()).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime()
    );
  };

  const groupedData = groupTimesByDate(category);

  return (
    <>
      {groupedData.map(([dateKey, categoriesForDay]) => (
        <Accordion type="single" collapsible className="mb-4" key={dateKey}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {new Date(dateKey).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </AccordionTrigger>
            <AccordionContent className="p-2">
              <h1 className="text-[2rem] font-semibold tracking-tighter leading-[0.75] my-5">Time Spent</h1>
              <DisplayTimeTable category={categoriesForDay} />
              <h1 className="text-[2rem] font-semibold tracking-tighter leading-[0.75] my-5">Total Time</h1>
              <TotalTimeTable category={categoriesForDay} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default SortTimeTable;
