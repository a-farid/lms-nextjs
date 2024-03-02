"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

interface TitleFormProps {
  initialCourse: {
    title: string;
  };
  courseId: string;
}
// ==================== JSX ==========================
const TitleForm = ({ initialCourse, courseId }: TitleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialCourse.title,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const [isEdited, setIsEdited] = useState(false);
  const toggleEdit = () => {
    setIsEdited(!isEdited);
  };
  return (
    <div className="bg-slate-100 border border-md mt-6 p-4 w-[300px]">
      <div className="flex items-center justify-between font-medium w-full">
        Course title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdited ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit title
            </>
          )}
        </Button>
      </div>
      {isEdited ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>

          <Input defaultValue={initialCourse.title} />
        </Form>
      ) : (
        <>{initialCourse.title}</>
      )}
      {isEdited && <Button className="mt-4">Save</Button>}
    </div>
  );
};
export default TitleForm;
