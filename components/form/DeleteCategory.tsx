import { Category } from "@prisma/client";
import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import { Button } from "../ui/button";
import { deleteCategory } from "@/app/_actions";
import { toast } from "@/hooks/use-toast";

const DeleteCategory = ({ category }: { category: Category[] }) => {
  async function handleDelete(id: string) {
    const result = await deleteCategory(id);
    if (result) {
      toast({
        title: "Category deleted",
        description: result.data?.name,
      });
    }  
  }
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {category.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(cat.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeleteCategory;
