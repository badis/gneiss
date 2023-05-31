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
import { REQUEST_PASSWORD, RequestPasswordOutput } from "@/api/graphql/auth";
import { useRouter } from "next/router";
import { fontWeights } from "@/theme";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid").required("Email is required"),
});

interface RequestPasswordProps {}

export const RequestPassword: FC<RequestPasswordProps> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);
  const router = useRouter();

  const [requestPassword] = useMutation(REQUEST_PASSWORD);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email }) => {
      setSubmitting(true);
      try {
        const res = await requestPassword({
          variables: { email },
        });

        setSubmitting(false);
        if (res.data?.requestPassword.response) {
          const { response } = res.data
            ?.requestPassword as RequestPasswordOutput;
          switch (response.statusCode) {
            case 200:
              setOpenSnackbar({
                message:
                  "We've sent you an email containing a link that will allow you to reset your password",
                severity: "success",
              });
              formik.resetForm();
              setTimeout(() => {
                router.push("/auth/signin");
              }, 7000);
              break;
            case 500:
              setOpenSnackbar({
                message:
                  "Error occured: We're unable to send you an email to reset your password at the moment.",
                severity: "error",
              });
              break;
            default:
              if (response.error) setErrors(response.message);
              break;
          }
        }
      } catch (e) {
        console.error(e);
        setSubmitting(false);
        setOpenSnackbar({
          message: "Error occured: unable to request new password",
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
                  <strong>Password</strong> recovery
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{ margin: "20px 0" }}
                >
                  Enter your email and we&#39;ll send you a link to get back
                  into your account.
                </Typography>

                <Grid container spacing={2}>
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
                    Send
                  </Button>

                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginTop: "20px", textAlign: "center" }}
                  >
                    <Link href="/auth/signup" underline="none">
                      Create new account
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ margin: "20px", textAlign: "center" }}
                  >
                    <Link href="/auth/signin" underline="none">
                      Back to sign in
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
        duration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};
