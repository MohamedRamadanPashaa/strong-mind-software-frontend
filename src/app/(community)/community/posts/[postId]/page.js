import OnePostDetails from "@/components/OnePostDetails/OnePostDetails";

export default function OnePostPage({ params }) {
  const { postId } = params;

  return <OnePostDetails postId={postId} />;
}
