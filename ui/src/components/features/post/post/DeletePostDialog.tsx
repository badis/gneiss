import { DELETE_POST } from "@/api/graphql/post";
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
import { useMutation } from "@apollo/client";
import { FC, useState } from "react";

interface DeletePostDialogProps {
  id: number;
  open: boolean;
  onClose: () => void;
}
export const DeletePostDialog: FC<DeletePostDialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: ["GetPosts"],
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await deletePost({ variables: { id } });
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
