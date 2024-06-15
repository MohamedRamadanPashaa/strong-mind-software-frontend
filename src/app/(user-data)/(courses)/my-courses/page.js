import { checkEnvironment } from "@/helpers/checkEnvironment";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CoursesList from "@/components/Courses/CoursesList";

const getCourses = async () => {
  const session = await getServerSession(options);
  const res = await fetch(
    `${checkEnvironment()}/api/v1/courses/${session.user.id}`,
    {
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  if (res.status === 404) notFound();

  return { courses: data.courses, session };
};

export default async function MyCoursesPage() {
  const { courses, session } = await getCourses();

  return (
    <div className={classes["my-courses"]}>
      <h3>My Courses</h3>

      {courses.length === 0 && <p>You haven&#39;t create any courses yet.</p>}

      {courses.length > 0 && (
        <CoursesList courses={courses} session={session} />
      )}
    </div>
  );
}
