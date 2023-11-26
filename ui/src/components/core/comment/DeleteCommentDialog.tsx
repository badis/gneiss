import { useMutation } from "@apollo/client";
import { FC, useState } from "react";

import { DELETE_COMMENT } from "@/api/graphql/comment";
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
import { PostRefetchQueries } from "@/api/graphql/post";

interface DeleteCommentDialogProps {
  id: number;
  open: boolean;
  onClose: () => void;
}
export const DeleteCommentDialog: FC<DeleteCommentDialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [PostRefetchQueries.GetPostById],
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await deleteComment({ variables: { id } });
      if (response.data?.delete_comment_by_pk.id) {
        setOpenSnackbar({
          message: "Comment successfully deleted",
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
          <strong>Confirm</strong> comment deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this comment?
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
