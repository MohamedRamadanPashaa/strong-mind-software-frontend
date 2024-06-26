import CoursePage from "@/components/Courses/CoursePage";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getCourse = async (slug, batch, level) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/courses/${slug}/${batch}/${level}`,
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
  const { slug, batch, level } = params;
  const course = await getCourse(slug, batch, level);

  if (!course) notFound();

  return <CoursePage course={course} />;
}
