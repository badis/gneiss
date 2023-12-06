import { useMutation } from "@apollo/client";
import { FC, useState } from "react";

import {
  DELETE_SPACE,
  SpaceInterface,
  SpaceRefetchQueries,
} from "@/api/graphql/space";
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

interface DeleteSpaceDialogProps {
  space: SpaceInterface;
  open: boolean;
  onClose: () => void;
}
export const DeleteSpaceDialog: FC<DeleteSpaceDialogProps> = ({
  space,
  open,
  onClose,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const [deleteSpace] = useMutation(DELETE_SPACE, {
    refetchQueries: [
      SpaceRefetchQueries.GetAllSpaces,
    ],
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await deleteSpace({ variables: { id: space.id } });
      if (response.data?.delete_space_by_pk.id) {
        setOpenSnackbar({
          message: "Space successfully deleted",
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
          <strong>Confirm</strong> space deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this space?
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
