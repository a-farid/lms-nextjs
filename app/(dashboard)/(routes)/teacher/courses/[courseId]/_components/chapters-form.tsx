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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
});
type formType = z.infer<typeof formSchema>;

interface ChaptersFormProps {
  initialCourse: Course & { chapters: Chapter[] };
  courseId: string;
}
// ==================== JSX ==========================
export const ChaptersForm = ({
  initialCourse,
  courseId,
}: ChaptersFormProps) => {
  const router = useRouter();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: formType) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium w-full">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </>
          )}
        </Button>
      </div>
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialCourse.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialCourse.chapters.length && " No Chapters"}
          {/* TODO: Add chapter list */}
        </div>
      )}
      {!isCreating && (
        <p className={cn("text-xs text-muted-foreground mt-4")}>
          Drag and drop to reorder chapters
        </p>
      )}
      {isCreating && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Introduction to the course"
                      {...field}
                    />
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
              Create
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
