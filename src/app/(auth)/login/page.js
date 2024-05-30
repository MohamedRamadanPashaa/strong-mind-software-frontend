"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import useHttp from "@/hooks/http-hook";
import useForm from "@/hooks/form-hook";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import { signIn, useSession } from "next-auth/react";
import Input from "@/components/FormElement/Input";
import Button from "@/components/FormElement/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "@/components/utils/validators";

import classes from "./page.module.css";
import Loading from "@/components/UIElements/Loading";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const changeMode = () => {
    if (!loginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          passwordConfirm: undefined,
          birthday: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          birthday: {
            value: "",
            isValid: false,
          },
          passwordConfirm: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setLoginMode((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginMode) {
      setLoadingLogin(true);
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        });

        if (!result.ok) {
          throw new Error(result.error || "Something went wrong.");
        }

        if (!result.error) {
          redirect("/");
        }
      } catch (error) {
        setErrorLogin(error.message);
      }

      setLoadingLogin(false);
    } else {
      try {
        const data = await sendRequest(
          "/api/users",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            passwordConfirm: formState.inputs.passwordConfirm.value,
            birthday: formState.inputs.birthday.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setSuccessMsg(data.message);
      } catch (error) {}
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

      <ErrorModal error={errorLogin} onCancel={() => setErrorLogin("")} />

      <form onSubmit={submitHandler} className={classes.form}>
        <h3>
          {loginMode
            ? "Login to your account"
            : successMsg
            ? "Email Sent"
            : "Create new account"}
        </h3>

        {successMsg && <p className={classes.success}>{successMsg}</p>}

        {!successMsg && (
          <>
            {!loginMode && (
              <Input
                type="text"
                label="Your Name"
                placeholder="Ex:- John Max"
                id="name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please provide your name."
                onInput={inputHandler}
              />
            )}
            <Input
              type="email"
              label="E-Mail"
              placeholder="Ex:- example@gmail.com"
              id="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please provide a valid email."
              onInput={inputHandler}
            />
            <Input
              type="password"
              label="Password"
              placeholder="********"
              id="password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="The password must be at least 8 characters long."
              onInput={inputHandler}
            />
            {!loginMode && (
              <Input
                type="password"
                label="Password Confirm"
                placeholder="********"
                id="passwordConfirm"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="The passwords are not the same."
                onInput={inputHandler}
              />
            )}
            {!loginMode && (
              <Input
                type="date"
                label="Birthday"
                id="birthday"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please provide your birthday."
                onInput={inputHandler}
              />
            )}

            <div className={classes.buttons}>
              <Button
                type="submit"
                disabled={!formState.isValid || isLoading || loadingLogin}
              >
                {isLoading || loadingLogin
                  ? "Loading..."
                  : loginMode
                  ? "Log In"
                  : "Sign Up"}
              </Button>

              <Button type="button" outline="true" onClick={changeMode}>
                {loginMode ? "Create new account" : "login to your account"}
              </Button>
            </div>
          </>
        )}
        {loginMode && (
          <p className={classes.forgot}>
            Forgot Your Password?{" "}
            <Link href="/forgot-password">Reset Password</Link>
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
