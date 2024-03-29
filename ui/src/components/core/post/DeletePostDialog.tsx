import { useMutation } from "@apollo/client";
import { FC, useState } from "react";

import {
  DELETE_POST,
  PostInterface,
  PostRefetchQueries,
} from "@/api/graphql/post";
import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  EnhancedSnackbar,
} from "@/components/presentational";

interface DeletePostDialogProps {
  post: PostInterface;
  open: boolean;
  onClose: () => void;
}
export const DeletePostDialog: FC<DeletePostDialogProps> = ({
  post,
  open,
  onClose,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [
      PostRefetchQueries.GetAllPosts,
      PostRefetchQueries.GetPostsBySpace,
      PostRefetchQueries.GetPostsByUserWithoutSpaces,
    ],
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await deletePost({ variables: { id: post.id } });
      if (response.data?.delete_post_by_pk.id) {
        setOpenSnackbar({
          message: "Post successfully deleted",
          severity: "success",
        });
        setDeleting(false);
        onClose();
      }
    } catch (e) {
      setOpenSnackbar({
        message: "Error occured",
        severity: "error",
      });
      setDeleting(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <strong>Confirm</strong> post deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this post?
          </DialogContentText>
          <DialogActions>
            <Button color="default" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleting}
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <EnhancedSnackbar
        open={Boolean(openSnackbar)}
        message={openSnackbar?.message!}
        severity={openSnackbar?.severity!}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};
