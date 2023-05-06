import { CREATE_POST } from "@/api/graphql/post";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
} from "@/components/presentational";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  message: Yup.string().required("Write something!"),
});

interface PostCreateFormProps {}
const PostCreateForm: FC<PostCreateFormProps> = () => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
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
          <Button label="Submit" type="submit"></Button>
        </CardActions>
      </Card>
    </form>
  );
};

export { PostCreateForm };
