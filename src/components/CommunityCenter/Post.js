import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

import useHttp from "../../hooks/http-hook";
import { setAllPosts } from "../../store/postSlice";
import PublisherDetails from "./PublisherDetails";
import ThreeDotsMenu from "./ThreeDotsMenu";
import Loading from "../UIElements/Loading";
import ErrorModal from "../ErrorModal/ErrorModal";
import Expire from "../UIElements/Expire";
import CommentSection from "./CommentSection";
import SeeMore from "./SeeMore";
import { useRouter } from "next/navigation";
import Image from "next/image";

import classes from "./Post.module.css";

const Post = ({
  photo,
  creator,
  subject,
  likes,
  createdAt,
  _id,
  commentsCount,
  onePostDetails,
  onePost,
  posts,
}) => {
  const [deletedMessage, setDeletedMessage] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const router = useRouter();
  const nodeRef = useRef(null);

  const deletePost = async (postId) => {
    try {
      const data = await sendRequest(
        `/api/v1/posts/${postId}/delete`,
        "DELETE"
      );

      setDeletedMessage(data);
      posts = posts.filter((post) => post._id !== postId);
      dispatch(setAllPosts(posts));

      if (onePostDetails) {
        setTimeout(() => {
          router.push("/community");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className={classes.post + " " + classes.center}>
        <Loading />
      </div>
    );
  }

  if (deletedMessage) {
    return (
      <div className={classes.post + " " + classes.center}>
        <Expire delay={2500} onCancel={() => setDeletedMessage(null)}>
          <p style={{ fontSize: "1rem" }}>{deletedMessage.message}</p>
        </Expire>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.post}>
        <PublisherDetails
          img={creator.photo}
          name={creator.name}
          createdAt={createdAt}
          userId={creator._id}
          postId={_id}
          nodeRef={nodeRef}
        >
          <ThreeDotsMenu
            creator={creator}
            postId={_id}
            deletePost={deletePost}
            nodeRef={nodeRef}
          />
        </PublisherDetails>

        {subject && (
          <SeeMore content={subject} maxLength={onePost ? 10000 : 80} />
        )}

        {photo?.secure_url && (
          <div className={classes.photo}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              priority
              src={photo.secure_url}
              alt={subject}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        <CommentSection
          likes={likes}
          postId={_id}
          numberOfComments={commentsCount}
          onePostDetails={onePostDetails}
          posts={posts}
        />
      </div>
    </>
  );
};

export default Post;
