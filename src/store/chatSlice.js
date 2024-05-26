import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  onlineUsers: [],
  activeChat: null,
  activeFriend: null,
  chatMessages: [],
  messageLoading: false,
  messageToSocket: null,
  messageFromSocket: null,
  unreadToMessageSocket: null,
  displayFromSocket: null,
  countMessages: 0,
  deletedMsgToSocket: null,
  deletedMsgFromSocket: null,
};

const authSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      state.activeFriend = action.payload.members.find(
        (m) => m._id === action.payload.friendId
      );
    },

    setActiveFriend: (state, action) => {
      state.activeFriend = {
        ...state.activeFriend,
        onlineTo: action.payload.onlineTo,
      };
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    sortChatAfterMessage: (state, action) => {
      const desiredObject = state.chats.find((el) => el._id === action.payload);
      if (desiredObject) {
        const arrayWithoutDesiredObj = state.chats.filter(
          (el) => el._id !== action.payload
        );

        state.chats = [desiredObject, ...arrayWithoutDesiredObj];
      }
    },

    increaseUnreadMessage: (state, action) => {
      const index = state.chats.findIndex((obj) => obj._id === action.payload);

      if (index !== -1) {
        state.chats[index].unreadCount += 1;
      }
    },

    resetUnreadMessage: (state, action) => {
      const index = state.chats.findIndex((obj) => obj._id === action.payload);

      if (index !== -1) {
        state.chats[index].unreadCount = 0;
      }
    },

    setUnreadMessage: (state, action) => {
      const index = state.chats.findIndex(
        (obj) => obj._id === action.payload.chat
      );

      if (index !== -1) {
        state.chats[index].unreadCount = action.payload.unreadCount;
      }
    },

    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },

    addMessageToChatMessages: (state, action) => {
      const messages = [...state.chatMessages, action.payload];
      state.chatMessages = messages;
    },

    setMessageLoading: (state, action) => {
      state.messageLoading = action.payload;
    },

    setMessageToSocket: (state, action) => {
      state.messageToSocket = action.payload;
    },

    setMessageFromSocket: (state, action) => {
      state.messageFromSocket = action.payload;
    },

    setUnreadToMessageSocket: (state, action) => {
      state.unreadToMessageSocket = action.payload;
    },

    setCountMessages: (state, action) => {
      state.countMessages = action.payload;
    },

    setDisplayFromSocket: (state, action) => {
      state.displayFromSocket = action.payload;
      state.chatMessages = state.chatMessages.map((obj) =>
        !obj.displayedAt || !obj.read
          ? {
              ...obj,
              displayedAt: action.payload.displayedAt,
              read: true,
            }
          : { ...obj }
      );
    },

    setDelivered: (state) => {
      state.chatMessages = state.chatMessages.map((obj) =>
        !obj.delivered
          ? {
              ...obj,
              delivered: true,
            }
          : { ...obj }
      );
    },

    setDeletedMsgToSocket: (state, action) => {
      state.deletedMsgToSocket = action.payload;
    },

    setDeletedMsgFromSocket: (state, action) => {
      state.deletedMsgFromSocket = action.payload;
    },
  },
});

export const {
  setActiveChat,
  setActiveFriend,
  setChats,
  setOnlineUsers,
  sortChatAfterMessage,
  increaseUnreadMessage,
  resetUnreadMessage,
  setUnreadMessage,
  setChatMessages,
  setMessageLoading,
  addMessageToChatMessages,
  setMessageToSocket,
  setMessageFromSocket,
  setUnreadToMessageSocket,
  setCountMessages,
  setDisplayFromSocket,
  setDelivered,
  setDeletedMsgToSocket,
  setDeletedMsgFromSocket,
} = authSlice.actions;

export default authSlice.reducer;
