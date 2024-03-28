"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import {
  File,
  Ghost,
  ImageIcon,
  Loader2,
  Pencil,
  PlusCircle,
  X,
} from "lucide-react";
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
  const [isEdited, setIsEdited] = useState(false);
  const [delitingId, setdelitingId] = useState<string | null>(null);
  const toggleEdit = () => setIsEdited(!isEdited);

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

  const onDelet = async (id: string) => {
    try {
      setdelitingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment has been deleted !!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setdelitingId(null);
    }
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
      {!isEdited && (
        <>
          {initialCourse.attachments.length === 0 && (
            <p className="text-sm text-slate-500 italic mt-2">
              No attachments yet.
            </p>
          )}
          {initialCourse.attachments.length > 0 && (
            <div className="space-y-2">
              {initialCourse.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center w-full p-3 bg-sky-100 rounded-md border text-sky-700"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {delitingId === attachment.id ? (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="ml-auto transition"
                      onClick={() => onDelet(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
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
