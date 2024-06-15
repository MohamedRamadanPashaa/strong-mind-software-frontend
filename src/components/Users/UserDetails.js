"use client";

import useHttp from "@/hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Input from "../FormElement/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../utils/validators";
import ImageUpload from "../UIElements/ImageUpload";
import Button from "../FormElement/Button";
import Expire from "../UIElements/Expire";
import useForm from "@/hooks/form-hook";
import { useState } from "react";
import CheckboxInput from "../ShareDiscipline/CheckboxInput";
import SelectElement from "../UIElements/SelectElement";

import classes from "./UserDetails.module.css";

export default function UserDetails({ user }) {
  const initialState = {
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
    verified: {
      value: user.verified,
      isValid: true,
    },
    role: {
      value: user.role,
      isValid: true,
    },
  };

  const [role, setRole] = useState(user.role);
  const { error, clearError, sendRequest, isLoading } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(initialState, true);
  const [updatedUser, setUpdatedUser] = useState({});

  const submitChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("birthday", formState.inputs.birthday.value);
      formData.append("photo", formState.inputs.photo.value);
      formData.append("verified", formState.inputs.verified.value);
      formData.append("role", role);

      const data = await sendRequest(
        `/api/v1/users/update-user-by-admin/${user._id}`,
        "PATCH",
        formData
      );

      setUpdatedUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUpdatedUser = () => setUpdatedUser({});

  const handleVerified = () => {
    inputHandler("verified", !formState.inputs.verified.value, true);
  };

  return (
    <div className={classes["user-details"]}>
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

        <div className={classes.role}>
          <SelectElement
            optionsArray={["user", "assistant", "coach", "admin"]}
            onChange={(e) => setRole(e.target.value)}
            value={role}
            label={"User Role"}
          />
        </div>

        <CheckboxInput
          id="verified"
          label="Verified"
          onChangeHandler={handleVerified}
          checked={formState.inputs.verified.value}
          className={classes.checkbox}
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
    </div>
  );
}
