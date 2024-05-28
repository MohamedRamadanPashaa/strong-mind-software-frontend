import UpdatePost from "@/components/Posts/UpdatePost";
import { checkEnvironment } from "@/helpers/checkEnvironment";
import { notFound } from "next/navigation";

const getPost = async (postId) => {
  "use server";

  const res = await fetch(
    `${checkEnvironment()}/api/v1/posts/${postId}/get-post`,
    { cache: "no-store" }
  );
  const { data } = await res.json();
  if (res.status === 404) {
    return undefined;
  }

  return data?.post;
};

export default async function UpdatePostPage({ params }) {
  const { postId } = params;

  const post = await getPost(postId);

  if (!post) notFound();

  return post && <UpdatePost postId={postId} post={post} />;
}
