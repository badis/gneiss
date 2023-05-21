import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
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
import { RESET_PASSWORD } from "@/api/graphql/auth";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string()
    .required("Comfirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

interface ResetPasswordProps {}
export const ResetPassword: FC<ResetPasswordProps> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const router = useRouter();
  const [resetPassword] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    if (router.isReady) {
      const params = router.query;
      if (params && params?.token) {
        setToken(params?.token as string);
      } else {
        setErrors(["Token is required"]);
      }
    }
  }, [router.isReady, router.query]);

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ password }) => {
      setSubmitting(true);

      try {
        const response = await resetPassword({
          variables: { token, password },
        });
        if (response.data?.resetPassword.response) {
          const { statusCode, message } = response.data?.resetPassword.response;

          switch (statusCode) {
            case 200:
              setErrors([]);
              formik.resetForm();
              setSubmitting(false);
              setOpenSnackbar({
                message: "Password reset successfully. redirecting ...",
                severity: "success",
              });
              router.push("/");
              break;
            case 400:
              setErrors(message);
              setSubmitting(false);
              break;
            case 500:
              break;
            default:
              break;
          }
        }
      } catch (e) {
        console.error(e);
        setSubmitting(false);
        setOpenSnackbar({
          message: "Error occured: unable to reset password",
          severity: "error",
        });
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

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
                  sx={{ marginBottom: "30px" }}
                >
                  <strong>Reset</strong> password
                </Typography>

                <Grid container spacing={2}>
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
                    Reset
                  </Button>

                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ margin: "20px", textAlign: "center" }}
                  >
                    <Box component="span">Go back to </Box>
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
