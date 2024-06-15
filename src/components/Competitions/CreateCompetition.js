"use client";

import { useEffect, useState } from "react";
import useHttp from "@/hooks/http-hook";
import useForm from "@/hooks/form-hook";
import { useRouter } from "next/navigation";
import ErrorModal from "../ErrorModal/ErrorModal";
import Input from "../FormElement/Input";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../utils/validators";
import Button from "../FormElement/Button";

import classes from "./CreateCompetition.module.css";

const initialState = {
  competitionName: {
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
  regStarts: {
    value: "",
    isValid: false,
  },
  regEnds: {
    value: "",
    isValid: false,
  },
  maxParticipants: {
    value: "",
    isValid: false,
  },
  standard: {
    value: "",
    isValid: false,
  },
  season: {
    value: "",
    isValid: false,
  },
  description: {
    value: "",
    isValid: false,
  },
};

const CreateCompetition = ({ slug, season }) => {
  const [competition, setCompetition] = useState({});
  const [loadingCompetition, setLoadingCompetition] = useState(
    slug && season ? true : false
  );
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(initialState, false);
  const router = useRouter();

  // get competition if mode is edit
  useEffect(() => {
    const getCompetition = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/competitions/${slug}/${season}`
        );

        setCompetition(data.competition);

        setFormData(
          {
            competitionName: {
              value: data.competition.competitionName,
              isValid: true,
            },
            starts: {
              value: data.competition.starts,
              isValid: true,
            },
            ends: {
              value: data.competition.ends,
              isValid: true,
            },
            regStarts: {
              value: data.competition.regStarts,
              isValid: true,
            },
            regEnds: {
              value: data.competition.regEnds,
              isValid: true,
            },
            maxParticipants: {
              value: data.competition.maxParticipants,
              isValid: true,
            },
            standard: {
              value: data.competition.standard,
              isValid: true,
            },
            season: {
              value: data.competition.season,
              isValid: true,
            },
            description: {
              value: data.competition.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
      setLoadingCompetition(false);
    };

    if (slug && season) getCompetition();
  }, [sendRequest, slug, season, setFormData]);

  // update or create competition
  const competitionHandler = async () => {
    let url = "";
    let method = "";
    if (slug && season) {
      url = `/api/v1/competitions/update-competition-info/${competition._id}`;
      method = "PATCH";
    } else {
      url = `/api/v1/competitions`;
      method = "POST";
    }

    try {
      await sendRequest(
        url,
        method,
        JSON.stringify({
          competitionName: formState.inputs.competitionName.value,
          starts: formState.inputs.starts.value,
          ends: formState.inputs.ends.value,
          regStarts: formState.inputs.regStarts.value,
          regEnds: formState.inputs.regEnds.value,
          maxParticipants: formState.inputs.maxParticipants.value,
          standard: formState.inputs.standard.value,
          season: formState.inputs.season.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      router.push("/competitions");
    } catch (error) {
      console.log(error);
    }
  };

  // get initial value of date time in update mode
  const handleDateTime = (dateTime) => {
    const dt = new Date(dateTime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

    return dt.toISOString().slice(0, 16);
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      {!loadingCompetition && (
        <div className={classes["create-competition"]}>
          <div className={classes["create-competition-inputs"]}>
            <Input
              type="text"
              label="Competition Name"
              placeholder="Ex:- SM Challenge"
              id="competitionName"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition name."
              onInput={inputHandler}
              initialValue={competition ? competition.competitionName : ""}
              initialValid={slug && season ? true : false}
            />

            <Input
              type="datetime-local"
              label="Starts"
              id="starts"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition start date."
              onInput={inputHandler}
              initialValue={
                competition.starts ? handleDateTime(competition.starts) : ""
              }
              initialValid={slug && season ? true : false}
            />

            <Input
              type="datetime-local"
              label="Ends"
              id="ends"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition end date."
              onInput={inputHandler}
              initialValue={
                competition.ends ? handleDateTime(competition.ends) : ""
              }
              initialValid={slug && season ? true : false}
            />

            <Input
              type="datetime-local"
              label="Registration Starts"
              id="regStarts"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition registration Start date."
              onInput={inputHandler}
              initialValue={
                competition.regStarts
                  ? handleDateTime(competition.regStarts)
                  : ""
              }
              initialValid={slug && season ? true : false}
            />

            <Input
              type="datetime-local"
              label="Registration Ends"
              id="regEnds"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition registration end date."
              onInput={inputHandler}
              initialValue={
                competition.regEnds ? handleDateTime(competition.regEnds) : ""
              }
              initialValid={slug && season ? true : false}
            />

            <Input
              type="number"
              label="Maximum Participants"
              id="maxParticipants"
              validators={[]}
              onInput={inputHandler}
              initialValue={competition ? competition.maxParticipants : ""}
              initialValid={slug && season ? true : false}
            />

            <Input
              type="text"
              label="Standard"
              id="standard"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition standard."
              onInput={inputHandler}
              initialValue={competition ? competition.standard : ""}
              initialValid={slug && season ? true : false}
            />

            <Input
              type="number"
              label="Season"
              id="season"
              validators={[VALIDATOR_MIN(1)]}
              errorText="Please provide the season of competition."
              onInput={inputHandler}
              initialValue={competition ? competition.season : ""}
              initialValid={slug && season ? true : false}
            />

            <Input
              type="textarea"
              label="Description"
              id="description"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please provide a competition description."
              onInput={inputHandler}
              initialValue={competition ? competition.description : ""}
              initialValid={slug && season ? true : false}
            />
          </div>

          <div className={classes.btn}>
            <Button
              onClick={competitionHandler}
              disabled={isLoading || !formState.isValid}
            >
              {isLoading ? "Loading..." : slug && season ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCompetition;
