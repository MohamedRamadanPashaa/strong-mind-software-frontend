"use client";

import { useState } from "react";
import Participants from "../Competitions/Participants";
import AddStudent from "./AddStudent";
import AddStudentForm from "./AddStudentForm";
import useHttp from "@/hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";

import classes from "./CoursePage.module.css";

export default function CoursePage({ course }) {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState(course.students);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const removeStudentFromCourse = async (id) => {
    try {
      const { data } = await sendRequest(
        `/api/v1/courses/delete-student/${course._id}/${id}`,
        "DELETE"
      );

      setStudents(data.course.students);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes["overview"]}>
        <h3>
          {course.courseName} {course.batch}
        </h3>

        <AddStudent setUsers={setUsers} />

        {users.length > 0 && (
          <AddStudentForm
            users={users}
            courseId={course._id}
            students={students}
            setStudents={setStudents}
          />
        )}

        {students.length === 0 && <p>You Did not add Students Yet.</p>}

        {students.length > 0 && (
          <Participants
            title="Students"
            participants={students}
            onRemoveParticipant={removeStudentFromCourse}
            isLoading={isLoading}
          />
        )}

        <div className={classes.btn}>
          <Button to={`/my-courses/${course.slug}/${course.batch}/results`}>
            View Students Results
          </Button>
        </div>
      </div>
    </>
  );
}
