import CourseResult from "@/components/Courses/CourseResultPage";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getCourseResults = async (slug, batch) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/courses/get-student-work/${slug}/${batch}`,
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
  const { slug, batch } = params;
  const { courseResults, course } = await getCourseResults(slug, batch);

  if (!courseResults || !course) notFound();

  return <CourseResult courseResults={courseResults} course={course} />;
}
