import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewCategory from "../form/NewCategory";
import { Button } from "../ui/button";

const CategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <NewCategory />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
