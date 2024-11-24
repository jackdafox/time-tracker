import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SubmitTimeForm from "../form/SubmitTimeForm";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";

interface SubmitDialogProps {
  category: Category[];
}

const SubmitDialog = ({ category }: SubmitDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Submit Time</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Time</DialogTitle>
        </DialogHeader>
        <SubmitTimeForm category={category}/>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitDialog;
