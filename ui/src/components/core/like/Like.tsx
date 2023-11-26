import { INSERT_LIKE, DELETE_LIKE } from "@/api/graphql/like";
import {
  PostInterface,
  PostOriginEnum,
  PostRefetchQueries,
} from "@/api/graphql/post";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { useMutation } from "@apollo/client";
import { FC } from "react";

interface LikeProps {
  post: PostInterface;
  like_id?: number;
  liked: boolean;
}
export const Like: FC<LikeProps> = ({ post, like_id, liked }) => {
  const refetchQueries = [];
  switch (post.origin) {
    case PostOriginEnum.Profile:
      refetchQueries.push(PostRefetchQueries.GetPostsByUserWithoutSpaces);
      break;
    case PostOriginEnum.Wall:
      refetchQueries.push(PostRefetchQueries.GetAllPosts);
      break;
    case PostOriginEnum.Space:
      refetchQueries.push(PostRefetchQueries.GetPostsBySpace);
      break;
    default:
      console.error("Unknown post origin");
      break;
  }

  const [createLike] = useMutation(INSERT_LIKE, {
    refetchQueries,
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries,
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
