import Button from "../FormElement/Button";
import classes from "./CourseResultPage.module.css";
import UsersResultsList from "./UsersResultsList";

export default function CourseResult({ courseResults, course }) {
  return (
    <div className={classes["overview"]}>
      <h3>
        {course.courseName} {course.batch}
      </h3>

      {courseResults?.length > 0 && (
        <UsersResultsList courseResults={courseResults} course={course} />
      )}

      <div className={classes.btn}>
        <Button to={`/my-courses/${course.slug}/${course.batch}/overview`}>
          Back to Overview
        </Button>
      </div>
    </div>
  );
}
