"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CategorySchema } from "@/lib/form_schema";
import { z } from "zod";
import { addCategory } from "@/app/_actions";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof CategorySchema>;

const NewCategory = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = CategorySchema.parse(data);

    if (!validatedData) {
      console.log("Invalid data");
      return;
    }

    const result = await addCategory(validatedData);

    if (result) {
      toast({
        title: "Category added",
        description: result.data?.name,
      });
    }

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCategory;
