"use client"
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
import { TimeSchema } from "@/lib/form_schema";
import { z } from "zod";
import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addTime } from "@/app/_actions";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof TimeSchema>;

interface SubmitTimeFormProps {
  category: Category[];
}

const SubmitTimeForm = ({ category }: SubmitTimeFormProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(TimeSchema),
    defaultValues: {
      activity: "",
      durationH: "",
      durationM: "",
      durationS: "",
    },
  });
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = TimeSchema.parse(data);

    if (!validatedData) {
      console.log("Invalid data");
      return;
    }

    const result = await addTime(validatedData);

    if(result) {
      toast({
        title: "Time added"
      })
    }

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
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
            name="categoryID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Activity</FormLabel>
                <FormControl>
                  <Input placeholder="Activity Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
          <FormField
            control={form.control}
            name="durationH"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Hours</FormLabel>
                <FormControl>
                  <Input placeholder="Hours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationM"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Minutes</FormLabel>
                <FormControl>
                  <Input placeholder="Minutes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationS"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Seconds</FormLabel>
                <FormControl>
                  <Input placeholder="Seconds" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmitTimeForm;
