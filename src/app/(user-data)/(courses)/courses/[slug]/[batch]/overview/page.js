import CoursePage from "@/components/Courses/CoursePage";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getCourse = async (slug, batch) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/courses/${slug}/${batch}`,
    {
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  if (res.status === 404) {
    return undefined;
  }

  return data.course;
};

export default async function OverviewPage({ params }) {
  const { slug, batch } = params;
  const course = await getCourse(slug, batch);

  if (!course) notFound();

  return <CoursePage course={course} />;
}
