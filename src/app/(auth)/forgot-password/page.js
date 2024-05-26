"use client";

import ErrorModal from "@/components/ErrorModal/ErrorModal";
import Button from "@/components/FormElement/Button";
import useForm from "@/hooks/form-hook";
import useHttp from "@/hooks/http-hook";
import { useState } from "react";

import classes from "./page.module.css";
import Input from "@/components/FormElement/Input";
import { VALIDATOR_EMAIL } from "@/components/utils/validators";
import { useSession } from "next-auth/react";
import Loading from "@/components/UIElements/Loading";
import { redirect } from "next/navigation";

export default function ForgotPasswordPage() {
  const [successMsg, setSuccessMsg] = useState("");

  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const submitEmailHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        "/api/v1/users/forgot-password",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setSuccessMsg(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { status } = useSession();

  if (status === "loading") {
    return <Loading center />;
  }

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <form onSubmit={submitEmailHandler} className={classes.form}>
        {!successMsg ? (
          <>
            <h3>Add your email to verify</h3>
            <Input
              type="email"
              id="email"
              label="Your Email"
              errorText="Please provide a valid email."
              onInput={inputHandler}
              validators={[VALIDATOR_EMAIL()]}
            />
            <Button disabled={!formState.isValid || isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </>
        ) : (
          <p className={classes.success}>{successMsg}</p>
        )}
      </form>
    </>
  );
}
