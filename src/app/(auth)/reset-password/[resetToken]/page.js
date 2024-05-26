"use client";

import ErrorModal from "@/components/ErrorModal/ErrorModal";
import Button from "@/components/FormElement/Button";
import Input from "@/components/FormElement/Input";
import Expire from "@/components/UIElements/Expire";
import { VALIDATOR_MINLENGTH } from "@/components/utils/validators";
import useForm from "@/hooks/form-hook";
import useHttp from "@/hooks/http-hook";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/UIElements/Loading";
import { redirect } from "next/navigation";

import classes from "./page.module.css";

const initialState = {
  passwordNew: {
    value: "",
    isValid: false,
  },
  passwordNewConfirm: {
    value: "",
    isValid: false,
  },
};

export default function ResetPasswordPage({ params }) {
  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(initialState, false);
  const [successMsg, setSuccessMsg] = useState({});
  const { isLoading, sendRequest, error, clearError } = useHttp();
  const resetToken = params.resetToken;

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        `/api/v1/users/reset-password/${resetToken}`,
        "PATCH",
        JSON.stringify({
          password: formState.inputs.passwordNew.value,
          passwordConfirm: formState.inputs.passwordNewConfirm.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setSuccessMsg(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearSuccessMsg = () => setSuccessMsg({});

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
      <form onSubmit={changePasswordHandler} className={classes.form}>
        {successMsg.status === "success" ? (
          <>
            <Expire onCancel={clearSuccessMsg} delay={10000000}>
              {successMsg.message}
            </Expire>
            <Button
              className={classes.loginAfterResetBtn}
              outline="true"
              to="/login"
            >
              Login Now
            </Button>
          </>
        ) : (
          <>
            <h3>Reset your password</h3>

            <Input
              id="passwordNew"
              label="New Password"
              type="password"
              placeholder="*******"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText="Password Should be at least 8 characters"
            />

            <Input
              id="passwordNewConfirm"
              label="Confirm New Password"
              type="password"
              placeholder="*******"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText="Password Confirm Should be at least 8 characters"
            />

            <Button disabled={!formState.isValid || isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </>
        )}
      </form>
    </>
  );
}
