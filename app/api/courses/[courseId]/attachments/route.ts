import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { url } = await req.json();
    const { courseId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const userOwner = await db.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!userOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]:post", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
