import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import { replacePost } from "../../store/postSlice";
import ErrorModal from "../ErrorModal/ErrorModal";
import Loading from "../UIElements/Loading";
import { useSession } from "next-auth/react";

import classes from "./ThreeDotsMenu.module.css";

const ThreeDotsMenu = ({ comment, comments, setComments }) => {
  const { data: auth } = useSession();

  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { _id, user } = comment;
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const deleteCommentHandler = async () => {
    try {
      const { data } = await sendRequest(`/api/v1/comments/${_id}`, "DELETE");

      let newComments = [...comments];
      newComments = newComments.filter((comment) => comment._id !== _id);
      setComments(newComments);

      if (posts?.length > 0) {
        const postIndex = posts.findIndex((post) => post._id === comment.post);
        dispatch(replacePost({ postIndex, newPost: data.newPost }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.menu} style={{ backgroundColor: "#fff" }}>
        {!isLoading ? (
          <ul>
            {(auth.user.id === user._id || auth.user.role === "admin") && (
              <li onClick={deleteCommentHandler}>Delete Comment</li>
            )}
            {(auth.user.id === user._id || auth.user.role === "admin") && (
              <li>Edit Comment</li>
            )}
            <li>Report</li>
          </ul>
        ) : (
          <div className="loading-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default ThreeDotsMenu;
