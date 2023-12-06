import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";

import {
  SpaceInterface,
  SpaceRefetchQueries,
  UPDATE_SPACE,
} from "@/api/graphql/space";
import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  EnhancedSnackbar,
  Grid,
  TextField,
} from "@/components/presentational";

const validationSchema = Yup.object({
  space_name: Yup.string().required("Write something!"),
});

interface EditSpaceDialogProps {
  space: SpaceInterface;
  open: boolean;
  onClose: () => void;
}
export const EditSpaceDialog: FC<EditSpaceDialogProps> = ({
  space,
  open,
  onClose,
}) => {
  const [updating, setUpdating] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);



  const [updateSpace] = useMutation(UPDATE_SPACE, {
    refetchQueries: [SpaceRefetchQueries.GetAllSpaces],
  });
  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const formik = useFormik({
    initialValues: {
      space_name: space.name,
      space_description: space.description,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setUpdating(true);
      try {
        const response = await updateSpace({
          variables: { id: space.id, name: values.space_name, description: values.space_description },
        });
        if (response.data?.update_space_by_pk.id) {
          setOpenSnackbar({
            message: "Space successfully updated",
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
          <strong>Edit</strong> space
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid direction="column" container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth={true}
                  size="small"
                  id="name"
                  name="space_name"
                  value={formik.values.space_name}
                  onChange={formik.handleChange}
                  error={formik.touched.space_name && Boolean(formik.errors.space_name)}
                  helperText={formik.touched.space_name && formik.errors.space_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline={true}
                  fullWidth={true}
                  minRows={4}
                  maxRows={8}
                  size="small"
                  label="Description"
                  id="space_description"
                  name="space_description"
                  value={formik.values.space_description}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
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
