import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Category, Time } from "@prisma/client";

interface DisplayTimeTableProps {
  category: (Category & {
    time: Time[];
  })[];
}

const DisplayTimeTable = ({ category }: DisplayTimeTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Time Spent</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((cat) =>
            cat.time.map((time) => (
              <TableRow key={time.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{time.activity}</TableCell>
                <TableCell>{calculateDuration(time.duration)}</TableCell>
                <TableCell className="text-right">
                  {new Date(time.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

function calculateDuration(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export default DisplayTimeTable;
