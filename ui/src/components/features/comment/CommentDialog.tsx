import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "@/api/graphql/comment";
import { GET_POST_BY_ID, Post } from "@/api/graphql/post";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
} from "@/components/presentational";
import { timeAgoShort } from "@/utils/datetime";
import { useTheme } from "@mui/material";
import { ChevronRightSharpIcon } from "@/components/icons";

const validationSchema = Yup.object({
  comment_message: Yup.string().required("Write something!"),
});

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  post_id: number;
}
export const CommentDialog: FC<CommentDialogProps> = ({
  open,
  onClose,
  post_id,
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: ["GetPostById"],
  });

  const { data } = useQuery<{ post: Post }>(GET_POST_BY_ID, {
    variables: {
      id: post_id,
    },
  });
  const message = data?.post.message ?? data?.post.message ?? "";
  const comments = data?.post.comments ?? [];

  const formik = useFormik({
    initialValues: {
      comment_message: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createComment({
          variables: { post_id, message: values.comment_message },
        });
        if (response.data?.insert_comment_one.id) {
          formik.resetForm();
          setSubmitting(false);
        }
      } catch (e) {
        console.error("Error occured: unable to comment");
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                sx={{
                  minHeight: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid #efefef",
                }}
              >
                {message}
              </Box>
            </Grid>

            <Grid container item xs={4} spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    minHeight: "500px",
                    maxHeight: "500px",
                    overflowY: "auto",
                    display: "flex",
                    alignItems: "top",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  {comments.map((comment, index) => {
                    return (
                      <Box sx={{ marginTop: "20px" }} key={index}>
                        <Box>
                          <Box component="span" sx={{ fontSize: "12px" }}>
                            {/* <strong>Badis Merabet</strong> . */}
                            {" " + timeAgoShort(comment.created_at)}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "12px",
                              color: theme.palette.grey[700],
                            }}
                          >
                            {comment.message}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    maxHeight: "200px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      multiline
                      autoFocus
                      maxRows={6}
                      fullWidth={true}
                      size="small"
                      placeholder="Add a comment ..."
                      id="comment_message"
                      name={"comment_message"}
                      value={formik.values.comment_message}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.comment_message &&
                        Boolean(formik.errors.comment_message)
                      }
                      helperText={
                        formik.touched.comment_message &&
                        formik.errors.comment_message
                      }
                      sx={{
                        "& label": {
                          fontSize: "12px",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontSize: "12px",
                        },
                      }}
                    />
                  </Box>
                  <IconButton
                    sx={{
                      marginLeft: "5px",
                      padding: "5px",
                    }}
                    type="submit"
                    disabled={submitting}
                  >
                    <ChevronRightSharpIcon color="primary" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
