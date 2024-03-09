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
  description: z.string().min(1, "Description is required"),
});
type formType = z.infer<typeof formSchema>;

interface DescriptionFormProps {
  initialCourse: {
    description: string;
  };
  courseId: string;
}
// ==================== JSX ==========================
const DescriptionForm = ({ initialCourse, courseId }: DescriptionFormProps) => {
  const router = useRouter();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialCourse.description,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: formType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course title updated");
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
  return (
    <div className="bg-slate-100 border border-md mt-6 p-4 w-[300px]">
      <div className="flex items-center justify-between font-medium w-full">
        Course description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdited ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit description
            </>
          )}
        </Button>
      </div>
      {isEdited ? (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Web Development"
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
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <>{initialCourse.description}</>
      )}
    </div>
  );
};
export default DescriptionForm;
