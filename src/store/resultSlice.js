import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  score: 0,
  mistakes: 0,
  totalNumOfQuestion: 100,
  memorizationTime: 0,
  recallTime: 0,
  myCompetitions: [],
  competitionId: "",
  disciplineId: "",
  matches: [],
  currentMatch: {},
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setTimer: (state, action) => {
      state.time = action.payload;
    },
    setMistakes: (state, action) => {
      state.mistakes = action.payload;
    },
    setMemorizationTime: (state, action) => {
      state.memorizationTime = action.payload;
    },
    setRecallTime: (state, action) => {
      state.recallTime = action.payload;
    },
    setMyCompetitions: (state, action) => {
      state.myCompetitions = action.payload;
    },
    setCompetitionId: (state, action) => {
      state.competitionId = action.payload;
    },
    setDisciplineId: (state, action) => {
      state.disciplineId = action.payload;
    },
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setCurrentMatch: (state, action) => {
      state.currentMatch = action.payload;
    },
  },
});

export const {
  setScore,
  setTimer,
  setMistakes,
  setMemorizationTime,
  setMyCompetitions,
  setCompetitionId,
  setRecallTime,
  setDisciplineId,
  setMatches,
  setCurrentMatch,
} = resultSlice.actions;

export default resultSlice.reducer;
