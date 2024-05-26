import { useEffect, useState } from "react";
import { getKFollowers } from "../../helpers/getKFollowers";

import classes from "./PostActivityDetails.module.css";

const PostActivityDetails = ({ likes, numberOfComments, shares }) => {
  const [noOfComments, setNoOfComments] = useState(numberOfComments);

  useEffect(() => {
    setNoOfComments(numberOfComments);
  }, [numberOfComments]);

  return (
    <div className={classes.details}>
      {likes > 0 && (
        <div>
          {getKFollowers(likes)} like{likes > 1 && "s"}
        </div>
      )}
      {numberOfComments > 0 && (
        <div>
          {getKFollowers(noOfComments)} comment{numberOfComments > 1 && "s"}
        </div>
      )}
      {shares && <div>50k share</div>}
    </div>
  );
};

export default PostActivityDetails;
