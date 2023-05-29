import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { CREATE_POST } from "@/api/graphql/post";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
} from "@/components/presentational";

const validationSchema = Yup.object({
  message: Yup.string().required("Write something!"),
});

interface PostCreateFormProps {
  origin: "profile" | "wall";
}
const PostCreateForm: FC<PostCreateFormProps> = ({ origin }) => {
  const [submitting, setSubmitting] = useState(false);

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [origin === "profile" ? "GetPostsByUser" : "GetAllPosts"],
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      const response = await createPost({
        variables: { message: values.message },
      });
      if (response.data?.insert_post_one.id) {
        formik.resetForm();
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <TextField
            multiline
            maxRows={8}
            fullWidth={true}
            label="What's up?"
            size={"small"}
            id="message"
            name={"message"}
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          ></TextField>
          <Divider />
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit" disabled={submitting}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export { PostCreateForm };
