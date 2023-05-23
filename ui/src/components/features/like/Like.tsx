import { CREATE_LIKE, DELETE_LIKE } from "@/api/graphql/like";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { useMutation } from "@apollo/client";
import { FC } from "react";

interface LikeProps {
  post_id: number;
  like_id?: number;
  liked: boolean;
}
export const Like: FC<LikeProps> = ({ post_id, like_id, liked }) => {
  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: ["GetPosts"],
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: ["GetPosts"],
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
        await createLike({ variables: { post_id } });
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
