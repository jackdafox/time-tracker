import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import DeleteCategory from "../form/DeleteCategory";
import { Category } from "@prisma/client";

const DeleteDialog = ({ category }: { category: Category[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete a category</DialogTitle>
        </DialogHeader>
        <DeleteCategory category={category} />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
