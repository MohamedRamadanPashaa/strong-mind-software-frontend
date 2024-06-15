import CourseItem from "./CourseItem";

import classes from "./CoursesList.module.css";

export default function CoursesList({ courses, session }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Course</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course) => (
          <CourseItem key={course._id} {...course} session={session} />
        ))}
      </tbody>
    </table>
  );
}
