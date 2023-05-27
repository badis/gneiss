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
import { SIGNUP } from "@/api/graphql/auth";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fontWeights } from "@/theme";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string()
    .required("Comfirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

interface SignupProps {}
export const Signup: FC<SignupProps> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const [, setAccessToken] = useLocalStorage("accessToken");
  const [, setRefreshToken] = useLocalStorage("refreshToken");

  const router = useRouter();
  const [signup] = useMutation(SIGNUP);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ username, email, password }) => {
      setSubmitting(true);

      try {
        const response = await signup({
          variables: { username, email, password },
        });
        if (response.data?.signup.accessToken) {
          setAccessToken(response.data?.signup.accessToken);
          setRefreshToken(response.data?.signup.refreshToken);

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
        if (response.data?.signup.response) {
          setErrors(response.data?.signup.response?.message);
          setSubmitting(false);
          return;
        }
      } catch (e) {
        console.error(e);
        setSubmitting(false);
        setOpenSnackbar({
          message: "Error occured: unable to signup",
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
                  sx={{ marginBottom: "10px", fontWeight: fontWeights.Light }}
                >
                  <strong>Sign</strong> up
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{ margin: "20px 0" }}
                >
                  Sign up now to join the network
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
                      label="Email"
                      id="email"
                      name={"email"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      size="small"
                      label="Comfirm password"
                      id="cpassword"
                      name={"cpassword"}
                      type="password"
                      value={formik.values.cpassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.cpassword &&
                        Boolean(formik.errors.cpassword)
                      }
                      helperText={
                        formik.touched.cpassword && formik.errors.cpassword
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
                    Sign up
                  </Button>

                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ margin: "20px", textAlign: "center" }}
                  >
                    <Box component="span">Already have an account? </Box>
                    <Link href="/auth/signin" underline="none">
                      Sign in
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
