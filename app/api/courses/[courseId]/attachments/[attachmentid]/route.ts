import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { IsExist } from "@/lib/utils";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentid: string } }
) {
  try {
    const { attachmentid, courseId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    IsExist(userId);

    const courseOwner = await db.course.findFirst({
      where: { id: courseId, userId },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.delete({
      where: { id: attachmentid, courseId },
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    console.log("[COURSE_ID->ATTACHMENTS_ID]:delete", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
