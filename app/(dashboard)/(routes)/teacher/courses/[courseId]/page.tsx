import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const courseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) redirect("/");
  // if (course?.userId != userId) redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((f) => Boolean(f)).length;

  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-y-2  flex-col">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complet all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-center gap-x-2">
          <h2>Customize your course</h2>
        </div>
      </div>
    </div>
  );
};

export default courseIdPage;