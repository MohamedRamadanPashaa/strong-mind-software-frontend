import AddStudentFormItem from "./AddStudentFormItem";

import classes from "./AddStudentForm.module.css";

export default function AddStudentForm({
  users,
  courseId,
  students,
  setStudents,
}) {
  return (
    <div className={classes["founded-users"]}>
      {users.map((user) => (
        <AddStudentFormItem
          key={user._id}
          {...user}
          courseId={courseId}
          students={students}
          setStudents={setStudents}
        />
      ))}
    </div>
  );
}
