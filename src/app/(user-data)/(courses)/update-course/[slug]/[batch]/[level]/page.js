import CreateCourse from "@/components/Courses/CreateCourse";

import classes from "./page.module.css";

export default function UpdateCoursePage({ params }) {
  const { slug, batch, level } = params;

  return (
    <div className={classes["create-course"]}>
      <h3>Update Course</h3>
      <CreateCourse slug={slug} batch={batch} level={level} />
    </div>
  );
}
