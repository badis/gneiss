import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  EnhancedSnackbar,
  Grid,
  Link,
  TextField,
  Typography,
} from "@/components/presentational";
import { SIGNIN } from "@/api/graphql/auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

interface SigninProps {}
export const Signin: FC<SigninProps> = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);
  const [, setAccessToken] = useLocalStorage("accessToken");
  const [, setRefreshToken] = useLocalStorage("refreshToken");

  const [signin] = useMutation(SIGNIN);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ username, password }) => {
      setSubmitting(true);
      try {
        const response = await signin({
          variables: { username, password },
        });
        if (response.data?.signin.accessToken) {
          setAccessToken(response.data?.signin.accessToken);
          setRefreshToken(response.data?.signin.refreshToken);
          setErrors([]);
          formik.resetForm();
          setSubmitting(false);
          setOpenSnackbar({
            message: "Signed up successfully. redirecting ...",
            severity: "success",
          });

          router.push("/");
          return;
        }
        if (response.data?.signin.response) {
          setErrors(response.data?.signin.response?.message);
          setSubmitting(false);
          return;
        }
      } catch (e) {
        console.error(e);
        setSubmitting(false);
        setOpenSnackbar({
          message: "Error occured: unable to signin",
          severity: "error",
        });
      }
    },
  });

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} minHeight={"100vh"} alignItems="center">
          <Grid item xs={0} md={3} lg={4} />
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ marginBottom: "10px" }}
                >
                  <strong>Sign</strong> in
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{ margin: "20px 0" }}
                >
                  Sign in now to join the network
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      size="small"
                      label="Username"
                      id="username"
                      name={"username"}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      size="small"
                      label="Password"
                      id="password"
                      name={"password"}
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    ></TextField>
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: "15px" }}>
                  {errors.map((error, index) => {
                    return (
                      <Alert key={index} severity="error">
                        {error}
                      </Alert>
                    );
                  })}
                </Box>
                <Divider />
              </CardContent>
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={submitting}
                  >
                    Sign in
                  </Button>

                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginTop: "20px", textAlign: "center" }}
                  >
                    <Box component="span">Don&#39;t have an account? </Box>
                    <Link href="/auth/signup" underline="none">
                      Sign up
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ margin: "20px", textAlign: "center" }}
                  >
                    <Link href="/auth/request-password" underline="none">
                      Forget your password?
                    </Link>
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
      <EnhancedSnackbar
        open={Boolean(openSnackbar)}
        message={openSnackbar?.message!}
        severity={openSnackbar?.severity!}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};
