import { FC } from "react";
import { useQuery } from "@apollo/client";
import { useTheme } from "@mui/material";
import { GET_POST_BY_ID, TPost } from "@/api/graphql/post";
import { CommentMenu, CreateComment } from "@/components/features/comment";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@/components/presentational";
import { timeAgoShort } from "@/utils/datetime";

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

  const { data } = useQuery<{ post: TPost }>(GET_POST_BY_ID, {
    variables: {
      id: post_id,
    },
  });
  const message = data?.post.message ?? data?.post.message ?? "";
  const comments = data?.post.comments ?? [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <DialogContent>
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
              <Box
                sx={{
                  paddingRight: "20px",
                }}
              >
                {message}
              </Box>
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
                  const { firstname, lastname } = comment.user.profiles[0];
                  const fullname = firstname + " " + lastname;

                  return (
                    <Box sx={{ marginTop: "20px" }} key={index}>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              color={theme.palette.grey[900]}
                            >
                              {fullname}
                            </Typography>

                            <Box
                              component="span"
                              sx={{ fontSize: "12px", paddingLeft: "5px" }}
                            >
                              {/* <strong>Badis Merabet</strong> . */}
                              {" . " + timeAgoShort(comment.created_at)}
                            </Box>
                          </Box>

                          <CommentMenu comment={comment} />
                        </Box>
                        <Box
                          sx={{
                            fontSize: "12px",
                            color: theme.palette.grey[700],
                            paddingRight: "15px",
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
              <CreateComment post_id={post_id} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
