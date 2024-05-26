// check online users
export const checkOnlineStatusHandler = (chat, onlineUsers, user) => {
  let friend;
  const members = chat?.members;
  if (chat && onlineUsers) {
    if (members[0]._id === members[1]._id) {
      friend = members[0];
    } else {
      friend = members.filter((member) => member._id !== user.id)[0];
    }

    const onlineUser = onlineUsers.find(
      (onlineUser) => onlineUser.userId === friend._id
    );

    return onlineUser ? true : false;
  }
};
