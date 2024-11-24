import { Category, Time } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TotalTimeTableProps {
  category: (Category & {
    time: Time[];
  })[];
}

const TotalTimeTable = ({ category }: TotalTimeTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Total Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {category.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.name}</TableCell>
            <TableCell>
              {totalTime(
                cat.time.reduce((acc, time) => acc + time.duration, 0)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function totalTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export default TotalTimeTable;
