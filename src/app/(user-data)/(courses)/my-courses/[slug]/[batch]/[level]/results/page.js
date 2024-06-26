import CourseResult from "@/components/Courses/CourseResultPage";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getCourseResults = async (slug, batch, level) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/courses/get-student-work/${slug}/${batch}/${level}`,
    {
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  if (res.status === 404) {
    return undefined;
  }

  return { course: data.course, courseResults: data.results };
};

export default async function CourseResultsPage({ params }) {
  const { slug, batch, level } = params;
  const data = await getCourseResults(slug, batch, level);
  if (!data) notFound();

  const { courseResults, course } = data;

  return <CourseResult courseResults={courseResults} course={course} />;
}
