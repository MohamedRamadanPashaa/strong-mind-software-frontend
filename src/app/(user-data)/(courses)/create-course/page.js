import CreateCourse from "@/components/Courses/CreateCourse";

import classes from "./page.module.css";

export default function CreateCoursePage() {
  return (
    <div className={classes["create-course"]}>
      <h3>Create Course</h3>
      <CreateCourse />
    </div>
  );
}
