import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { updateUser } from "../../store/authSlice";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import { useSession } from "next-auth/react";

const FollowButton = ({ friend: currentUser, getActiveChat }) => {
  const { data } = useSession();
  const user = data?.user;
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [follower, setFollower] = useState(currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setFollower(currentUser);
  }, [currentUser]);

  const [follow, setFollow] = useState(
    !follower?.followers?.includes(user.id) &&
      !follower?.followings?.includes(user.id)
  );
  const [followBack, setFollowBack] = useState(
    !follower?.followers?.includes(user.id) &&
      follower?.followings?.includes(user.id)
  );
  const [unFollow, setUnFollow] = useState(
    follower?.followers?.includes(user.id) &&
      !follower?.followings?.includes(user.id)
  );
  const [friend, setFriend] = useState(
    follower?.followers?.includes(user.id) &&
      follower?.followings?.includes(user.id)
  );

  const [outline, setOutline] = useState(followBack || unFollow);

  useEffect(() => {
    setFollow(
      !follower?.followers?.includes(user.id) &&
        !follower?.followings?.includes(user.id)
    );

    setFollowBack(
      !follower?.followers?.includes(user.id) &&
        follower?.followings?.includes(user.id)
    );

    setUnFollow(
      follower?.followers?.includes(user.id) &&
        !follower?.followings?.includes(user.id)
    );

    setFriend(
      follower?.followers?.includes(user.id) &&
        follower?.followings?.includes(user.id)
    );
  }, [follower, user]);

  useEffect(() => {
    setOutline(followBack || unFollow);
  }, [followBack, unFollow]);

  const followingHandler = async () => {
    try {
      const { data } = await sendRequest(
        `/api/v1/users/following/${follower._id}`,
        "PATCH"
      );

      // update follower and me in follower array
      setFollower(data.friend);
      dispatch(updateUser({ user: data.user._doc }));
    } catch (error) {
      console.log(error);
    }
  };

  // Create chat when follow back a specific user
  const createChatHandler = async () => {
    try {
      await sendRequest(`/api/v1/chats/${follower._id}`, "POST");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div>
        <Button
          outline={outline}
          disabled={isLoading}
          onClick={() => {
            if (friend) {
              getActiveChat();
              return;
            }

            followingHandler();
            if (followBack) createChatHandler();
          }}
        >
          {isLoading
            ? "Loading..."
            : follow
            ? "Follow"
            : unFollow
            ? "Un Follow"
            : followBack
            ? "Follow Back"
            : friend
            ? "Message"
            : ""}
        </Button>
      </div>
    </>
  );
};

export default FollowButton;
