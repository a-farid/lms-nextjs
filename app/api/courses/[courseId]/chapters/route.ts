import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title } = await req.json();
    const { courseId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!title) return new NextResponse("Unauthorized", { status: 401 });

    const userOwner = await db.course.findFirst({
      where: { id: courseId, userId },
    });

    if (!userOwner) return new NextResponse("Unauthorized", { status: 401 });

    const lastChapter = await db.chapter.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });
    const position = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position,
      },
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.log("[COURSE_ID_CHAPTER]:post", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
