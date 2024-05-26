import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkOnlineStatusHandler } from "../../helpers/checkOnlineStatus";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import ViewMore from "../FormElement/ViewMore";
import People from "./People";
import SectionHeader from "./SectionHeader";
import ContentEnter from "../UIElements/ContentEnter";
import { useSession } from "next-auth/react";

import classes from "./PeopleYouMayKnow.module.css";

let countNonFollow = 0;
let peopleYouMayKnow = [];
let followings = [];
let followers = [];

const PeopleYouMayKnow = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [nonFollowLimit, setNonFollowLimit] = useState(3);
  const { data } = useSession();
  const user = data?.user;
  const { chats, onlineUsers } = useSelector((state) => state.chat);

  // useEffect(() => {
  //   if (user) {
  //     followings = user.followings.filter(
  //       ({ _id: id1 }) => !user.followers.some(({ _id: id2 }) => id1 === id2)
  //     );
  //     followers = user.followers.filter(
  //       ({ _id: id1 }) => !user.followings.some(({ _id: id2 }) => id1 === id2)
  //     );
  //   }
  // }, [user]);

  useEffect(() => {
    const peopleYouMayKnowHandler = async () => {
      try {
        const { data } = await sendRequest(
          `/api/v1/users/non-follow?nonFollowLimit=${nonFollowLimit}`
        );

        peopleYouMayKnow = data.nonFollow;
        countNonFollow = data.countNonFollow;
        followers = data.followers;
        followings = data.followings;
      } catch (error) {
        console.log(error);
      }
    };

    peopleYouMayKnowHandler();
  }, [sendRequest, nonFollowLimit]);

  const morePeopleYouMayKnowHandler = () => {
    setNonFollowLimit((prev) => prev + 5);
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <>
        {/* People you may know */}
        {peopleYouMayKnow.length > 0 && (
          <div className={classes.follow}>
            <SectionHeader>People You May Know</SectionHeader>
            {peopleYouMayKnow.length === 0 && !isLoading && (
              <p className={classes["no-users"]}>
                You followed all community users.
              </p>
            )}

            {peopleYouMayKnow.map((follower) => (
              <People key={follower._id} friend={follower} />
            ))}

            <ContentEnter show={peopleYouMayKnow.length < countNonFollow}>
              <ViewMore onClick={morePeopleYouMayKnowHandler}>
                {isLoading && nonFollowLimit !== 3
                  ? "Loading..."
                  : "See More..."}
              </ViewMore>
            </ContentEnter>
          </div>
        )}

        {/* Followers */}
        {followers.length !== 0 && (
          <div className={classes.follow}>
            <SectionHeader>Followers</SectionHeader>
            {followers.map((follower) => (
              <People key={follower._id} friend={follower} />
            ))}
          </div>
        )}

        {/* Followings */}
        {followings.length !== 0 && (
          <div className={classes.follow}>
            <SectionHeader>Followings</SectionHeader>
            {followings.map((follower) => (
              <People key={follower._id} friend={follower} />
            ))}
          </div>
        )}

        {/* Friends */}
        {chats.length !== 0 && (
          <div className={classes.follow}>
            <SectionHeader>Friends</SectionHeader>
            {chats.map((chat) => {
              let follower;
              const members = chat?.members;
              if (members && members[0]._id === members[1]._id) {
                follower = members[0];
              } else {
                follower = members.filter(
                  (member) => member._id !== user.id
                )[0];
              }

              // check online status
              const onlineStatus = checkOnlineStatusHandler(
                chat,
                onlineUsers,
                user
              );

              return (
                <People
                  key={chat._id}
                  friend={follower}
                  chat={chat}
                  onlineStatus={onlineStatus}
                  unreadCount={chat.unreadCount}
                />
              );
            })}
          </div>
        )}
      </>
    </>
  );
};

export default PeopleYouMayKnow;
