import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";

import {
  PostInterface,
  PostOriginEnum,
  PostRefetchQueries,
  UPDATE_POST,
} from "@/api/graphql/post";
import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  EnhancedSnackbar,
  TextField,
} from "@/components/presentational";

const validationSchema = Yup.object({
  message: Yup.string().required("Write something!"),
});

interface EditPostDialogProps {
  post: PostInterface;
  open: boolean;
  onClose: () => void;
}
export const EditPostDialog: FC<EditPostDialogProps> = ({
  post,
  open,
  onClose,
}) => {
  const [updating, setUpdating] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

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

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries,
  });
  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const formik = useFormik({
    initialValues: {
      message: post.message,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setUpdating(true);
      try {
        const response = await updatePost({
          variables: { id: post.id, message: values.message },
        });
        if (response.data?.update_post_by_pk.id) {
          setOpenSnackbar({
            message: "Post successfully updated",
            severity: "success",
          });
          setUpdating(false);
          onClose();
        }
      } catch (e) {
        setOpenSnackbar({
          message: "Error occured",
          severity: "error",
        });
        setUpdating(false);
        onClose();
      }
    },
  });

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <strong>Edit</strong> post
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              autoFocus
              minRows={4}
              maxRows={8}
              fullWidth={true}
              placeholder="Edit your post ... "
              size={"small"}
              id="message"
              name={"message"}
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
            <DialogActions>
              <Button color="default" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={updating}
              >
                Save
              </Button>
            </DialogActions>
          </form>
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
