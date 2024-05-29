"use client";

import ErrorModal from "@/components/ErrorModal/ErrorModal";
import Button from "@/components/FormElement/Button";
import Input from "@/components/FormElement/Input";
import Expire from "@/components/UIElements/Expire";
import ImageUpload from "@/components/UIElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "@/components/utils/validators";
import useForm from "@/hooks/form-hook";
import useHttp from "@/hooks/http-hook";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../UIElements/Loading";

const initialState = {
  name: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  birthday: {
    value: "",
    isValid: false,
  },
  photo: {
    value: null,
    isValid: false,
  },
};

export default function MyAccount() {
  const [formState, inputHandler, setFormData] = useForm(initialState, false);
  const { data, update, status } = useSession();
  const user = data?.user;

  const [updatedUser, setUpdatedUser] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    if (user) {
      setFormData(
        {
          name: {
            value: user.name,
            isValid: true,
          },
          email: {
            value: user.email,
            isValid: true,
          },
          birthday: {
            value: user.birthday,
            isValid: true,
          },
          photo: {
            value: user.photo,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, user]);

  const submitChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("birthday", formState.inputs.birthday.value);
      formData.append("photo", formState.inputs.photo.value);

      const data = await sendRequest(`/api/v1/users`, "PATCH", formData);

      const { name, birthday, photo } = data.data;
      await update({ name, birthday, photo });

      setUpdatedUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUpdatedUser = () => setUpdatedUser({});

  if (status === "loading" && !data?.user) {
    return <Loading center />;
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <form onSubmit={submitChangeHandler}>
        <h3>Change Account Info</h3>

        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Ex:- John Aka"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please provide your name."
          initialValue={user?.name}
          initialValid={true}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Ex:- JohenEkbal@gmail.com"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText="Please provide your email."
          initialValue={user?.email}
          initialValid={true}
          readOnly
        />

        <Input
          id="birthday"
          label="Birthday"
          type="Date"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please provide your name."
          initialValue={user?.birthday ? user?.birthday.split("T")[0] : ""}
          initialValid={true}
        />

        <ImageUpload
          id="photo"
          onInput={inputHandler}
          errorText="Please provide an Image"
          photo={user?.photo?.secure_url}
        />

        <Button disabled={!formState.isValid || isLoading} danger={true}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>

        {updatedUser.status === "success" && (
          <Expire onCancel={clearUpdatedUser} delay={4000}>
            {updatedUser.message}
          </Expire>
        )}
      </form>

      <hr />
    </>
  );
}
