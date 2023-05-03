import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
} from "@/components/presentational";
import { FC } from "react";

interface PostCreateFormProps {}
const PostCreateForm: FC<PostCreateFormProps> = () => {
  return (
    <Card>
      <CardContent>
        <TextField label="What's up?" size={"small"} multiline></TextField>
        <Divider />
      </CardContent>
      <CardActions>
        <Button label="Submit"></Button>
      </CardActions>
    </Card>
  );
};

export { PostCreateForm };
