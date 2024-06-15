"use client";

import { useEffect, useState } from "react";
import useHttp from "@/hooks/http-hook";
import useForm from "@/hooks/form-hook";
import { useRouter } from "next/navigation";
import ErrorModal from "../ErrorModal/ErrorModal";
import Input from "../FormElement/Input";
import Button from "../FormElement/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../utils/validators";

import classes from "./CreateCourse.module.css";

const initialState = {
  courseName: {
    value: "",
    isValid: false,
  },
  starts: {
    value: "",
    isValid: false,
  },
  ends: {
    value: "",
    isValid: false,
  },
  batch: {
    value: "",
    isValid: false,
  },
};

const CreateCourse = ({ slug, batch }) => {
  const [course, setCourse] = useState({});
  const [loadingCourse, setLoadingCourse] = useState(
    slug && batch ? true : false
  );
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(initialState, false);
  const router = useRouter();

  // get competition if mode is edit
  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await sendRequest(`/api/v1/courses/${slug}/${batch}`);

        setCourse(data.course);

        setFormData(
          {
            courseName: {
              value: data.course.courseName,
              isValid: true,
            },
            starts: {
              value: data.course.starts,
              isValid: true,
            },
            ends: {
              value: data.course.ends,
              isValid: true,
            },
            batch: {
              value: data.course.batch,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
      setLoadingCourse(false);
    };

    if (slug && batch) getCourse();
  }, [sendRequest, slug, batch, setFormData]);

  // update or create competition
  const courseHandler = async () => {
    let url = "";
    let method = "";
    if (slug && batch) {
      url = `/api/v1/courses/update-course-info/${course._id}`;
      method = "PATCH";
    } else {
      url = `/api/v1/courses`;
      method = "POST";
    }

    try {
      await sendRequest(
        url,
        method,
        JSON.stringify({
          courseName: formState.inputs.courseName.value,
          starts: formState.inputs.starts.value,
          ends: formState.inputs.ends.value,
          batch: formState.inputs.batch.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      router.push("/my-courses");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      {!loadingCourse && (
        <div className={classes["create-course"]}>
          <div className={classes["create-course-inputs"]}>
            <Input
              type="text"
              label="Course Name"
              id="courseName"
              placeholder="Ex:- Strong Mind"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a course name."
              onInput={inputHandler}
              initialValue={course.courseName || ""}
              initialValid={slug && batch ? true : false}
            />

            <Input
              type="date"
              label="Starts"
              id="starts"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a course start date."
              onInput={inputHandler}
              initialValue={course?.starts?.split("T")[0] || ""}
              initialValid={slug && batch ? true : false}
            />

            <Input
              type="date"
              label="Ends"
              id="ends"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a course end date."
              onInput={inputHandler}
              initialValue={course?.ends?.split("T")[0] || ""}
              initialValid={slug && batch ? true : false}
            />

            <Input
              type="number"
              label="Batch"
              id="batch"
              validators={[VALIDATOR_MIN(1)]}
              errorText="Please provide the batch of course."
              onInput={inputHandler}
              initialValue={course ? course.batch : ""}
              initialValid={slug && batch ? true : false}
            />
          </div>

          <div className={classes.btn}>
            <Button
              onClick={courseHandler}
              disabled={isLoading || !formState.isValid}
            >
              {isLoading ? "Loading..." : slug && batch ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCourse;
