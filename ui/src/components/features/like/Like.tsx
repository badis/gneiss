import { CREATE_LIKE, DELETE_LIKE } from "@/api/graphql/like";
import { TPost } from "@/api/graphql/post";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { useMutation } from "@apollo/client";
import { FC } from "react";

interface LikeProps {
  post: TPost;
  like_id?: number;
  liked: boolean;
}
export const Like: FC<LikeProps> = ({ post, like_id, liked }) => {
  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: [
      post.origin === "profile" ? "GetPostsByUser" : "GetAllPosts",
    ],
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: [
      post.origin === "profile" ? "GetPostsByUser" : "GetAllPosts",
    ],
  });

  const handleToggleLike = async () => {
    if (liked) {
      try {
        await deleteLike({ variables: { id: like_id } });
      } catch (e) {
        console.error("Error occured: not able to unlike");
      }
    } else {
      try {
        await createLike({ variables: { post_id: post.id } });
      } catch (e) {
        console.error("Error occured: not able to like");
      }
    }
  };

  return (
    <IconButton onClick={handleToggleLike}>
      {liked ? (
        <FavoriteIcon fontSize="small" color="primary" />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
};
