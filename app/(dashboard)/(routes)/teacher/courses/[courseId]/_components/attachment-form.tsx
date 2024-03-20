"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  url: z.string().min(1),
});
type formType = z.infer<typeof formSchema>;

interface AttachmentFormProps {
  initialCourse: Course & { attachments: Attachment[] };
  courseId: string;
}
// ==================== JSX ==========================
export const AttachmentForm = ({
  initialCourse,
  courseId,
}: AttachmentFormProps) => {
  const router = useRouter();
  const onSubmit = async (values: formType) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment added successfully.");
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
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdited && "Cancel"}
          {!isEdited && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEdited && initialCourse.attachments.length === 0 && (
        <p className="text-sm text-slate-500 italic mt-2">
          No attachments yet.
        </p>
      )}

      {isEdited && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students may need to compleet the course.
          </div>
        </div>
      )}
    </div>
  );
};
