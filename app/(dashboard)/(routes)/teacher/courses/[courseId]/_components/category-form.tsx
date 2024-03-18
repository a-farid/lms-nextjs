"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface CategoryFormProps {
  initialCourse: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
});
type formType = z.infer<typeof formSchema>;

// ==================== Function JSX ==========================
export const CategoryForm = ({
  initialCourse,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialCourse?.categoryId || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: formType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const [isEdited, setIsEdited] = useState(false);
  const toggleEdit = () => {
    setIsEdited(!isEdited);
  };
  const selectedOption = options.find(
    (o) => o.value === initialCourse.categoryId
  );
  // ==================== Return JSX ==========================
  return (
    <div className="bg-slate-100 border border-md mt-6 p-4 w-[300px]">
      <div className="flex items-center justify-between font-medium w-full">
        Course category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdited ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEdited && (
        <div
          className={cn(!initialCourse.categoryId && "text-slate-500 italic")}
        >
          {selectedOption?.label || "No catogory selected"}
        </div>
      )}
      {isEdited && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox {...field} options={options} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              className="mt-4"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
