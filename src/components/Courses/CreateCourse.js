"use client";

import { useEffect, useState } from "react";
import useHttp from "@/hooks/http-hook";
import useForm from "@/hooks/form-hook";
import { useRouter } from "next/navigation";
import ErrorModal from "../ErrorModal/ErrorModal";
import Input from "../FormElement/Input";
import Button from "../FormElement/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../utils/validators";
import { AllDiscipline } from "@/PaginationData/AllDiscipline";
import MultipleSelect from "../SelectDiscipline/MultipleSelect";

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
  level: {
    value: "",
    isValid: false,
  },
  disciplines: {
    value: [],
    isValid: false,
  },
};

const CreateCourse = ({ slug, batch, level }) => {
  const [course, setCourse] = useState({});
  const [loadingCourse, setLoadingCourse] = useState(
    slug && batch && level ? true : false
  );
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(initialState, false);
  const router = useRouter();

  // get competition if mode is edit
  useEffect(() => {
    const getCourse = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/courses/${slug}/${batch}/${level}`
        );

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
            level: {
              value: data.course.level,
              isValid: true,
            },
            disciplines: {
              value: data.course.disciplines,
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

    if (slug && batch && level) getCourse();
  }, [sendRequest, slug, batch, level, setFormData]);

  // update or create competition
  const courseHandler = async () => {
    let url = "";
    let method = "";
    if (slug && batch && level) {
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
          level: formState.inputs.level.value,
          disciplines: formState.inputs.disciplines.value,
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

            <Input
              type="number"
              label="Level"
              id="level"
              validators={[VALIDATOR_MIN(1)]}
              errorText="Please provide the level of the course."
              onInput={inputHandler}
              initialValue={course ? course.level : ""}
              initialValid={slug && batch && level ? true : false}
            />

            <div>
              <MultipleSelect
                options={AllDiscipline}
                onInput={inputHandler}
                id="disciplines"
                label="Choose Disciplines"
                disciplines={formState.inputs.disciplines.value || []}
                className={"custom-select"}
              />

              {formState?.inputs?.disciplines?.value?.length > 0 && (
                <p className={classes["selected-discipline"]}>
                  <span>Selected Discipline:</span>{" "}
                  {formState.inputs.disciplines.value.join(", ")}.
                </p>
              )}
            </div>
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
