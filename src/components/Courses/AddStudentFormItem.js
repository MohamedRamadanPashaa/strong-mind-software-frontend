import useHttp from "@/hooks/http-hook";
import Button from "../FormElement/Button";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function AddStudentFormItem({
  name,
  _id,
  courseId,
  students,
  setStudents,
}) {
  const { isLoading, sendRequest, error, clearError } = useHttp();

  const addUserToCourseHandler = async (userId) => {
    try {
      const { data } = await sendRequest(
        `/api/v1/courses/add-student-to-course/${courseId}/${userId}`,
        "PATCH"
      );

      setStudents(data.course.students);
    } catch (error) {
      console.log(error);
    }
  };

  const userExistInStudents = students.find((s) => s._id === _id);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div>
        <h4>{name}</h4>
        <Button
          onClick={() => {
            addUserToCourseHandler(_id);
          }}
          disabled={isLoading || userExistInStudents}
        >
          {isLoading ? "Adding..." : userExistInStudents ? "Added" : "Add"}
        </Button>
      </div>
    </>
  );
}
