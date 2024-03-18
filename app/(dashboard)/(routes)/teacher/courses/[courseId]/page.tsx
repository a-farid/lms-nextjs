import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form copy";
import { CategoryForm } from "./_components/category-form";

const courseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) redirect("/");

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
      <div className="grid grid-cols-1  gap-6 mt-6">
        <div className="flex items-center gap-x-2">
          <IconBadge size="sm" icon={LayoutDashboard} />
          <h2>Customize your course</h2>
        </div>
        <TitleForm initialCourse={course} courseId={course.id} />
        <DescriptionForm initialCourse={course} courseId={course.id} />
        <ImageForm initialCourse={course} courseId={course.id} />
        <CategoryForm
          initialCourse={course}
          courseId={course.id}
          options={categories.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
        />
      </div>
    </div>
  );
};

export default courseIdPage;
