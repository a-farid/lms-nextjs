"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  imageUrl: z.string().min(1, "Image is required"),
});
type formType = z.infer<typeof formSchema>;

interface ImageFormProps {
  initialCourse: Course;
  courseId: string;
}
// ==================== JSX ==========================
export const ImageForm = ({ initialCourse, courseId }: ImageFormProps) => {
  const router = useRouter();
  const onSubmit = async (values: formType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course image updated");
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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium w-full">
        Course image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdited && "Cancel"}
          {!isEdited && !initialCourse.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEdited && initialCourse.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEdited &&
        (!initialCourse.imageUrl ? (
          <div className="flex justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-400 m-auto" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Course image"
              fill
              className="image-cover rounded-md"
              src={initialCourse.imageUrl}
            />
          </div>
        ))}
      {isEdited && (
        <FileUpload
          endpoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      )}
    </div>
  );
};
