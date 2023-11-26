import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";

import { INSERT_COMMENT } from "@/api/graphql/comment";
import { ChevronRightSharpIcon } from "@/components/icons";
import { Box, IconButton, TextField } from "@/components/presentational";
import { PostRefetchQueries } from "@/api/graphql/post";

const validationSchema = Yup.object({
  comment_message: Yup.string().required("Write something!"),
});

interface CreateCommentProps {
  post_id: number;
}
export const CreateComment: FC<CreateCommentProps> = ({ post_id }) => {
  const [submitting, setSubmitting] = useState(false);

  const [createComment] = useMutation(INSERT_COMMENT, {
    refetchQueries: [PostRefetchQueries.GetPostById],
  });

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
    <form onSubmit={formik.handleSubmit}>
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
              formik.touched.comment_message && formik.errors.comment_message
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
    </form>
  );
};
