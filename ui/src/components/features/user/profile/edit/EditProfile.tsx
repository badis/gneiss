import { useLazyQuery, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

import {
  GET_PROFILE_BY_ID,
  TProfile,
  UPDATE_PROFILE,
} from "@/api/graphql/profile";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  DatePicker,
  Divider,
  EnhancedSnackbar,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@/components/presentational";
import { useSession } from "@/hooks/use-session";
import { countries } from "@/utils/constants";
import { PictureUploader } from "./PictureUploader";
import { BannerUploader } from "./BannerUploader";

const validationSchema = Yup.object({});

interface EditProfileProps {}
const EditProfile: FC<EditProfileProps> = () => {
  const [banner, setBanner] = useState<File>();
  const [picture, setPicture] = useState<File>();

  const [profile, setProfile] = useState<Partial<TProfile>>();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    severity: AlertColor;
  } | null>(null);

  const {
    session: { currentUser },
  } = useSession();

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: ["GetProfileById", "GetProfileByUsername"],
  });

  const [fetchProfile, { data: profileData }] = useLazyQuery<{
    profile: TProfile;
  }>(GET_PROFILE_BY_ID);

  useEffect(() => {
    if (currentUser) {
      fetchProfile({
        variables: {
          user_id: currentUser.id,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (profileData && profileData?.profile) {
      setProfile(profileData.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: profile?.firstname ?? "",
      lastname: profile?.lastname ?? "",
      title: profile?.title ?? "",
      about: profile?.about ?? "",
      mobile: profile?.mobile ?? "",
      country: profile?.country ?? "",
      gender: profile?.gender ?? true,
      birthday: profile?.birthday
        ? DateTime.fromFormat(profile.birthday, "yyyy-LL-dd")
        : "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSubmitting(true);

      // TODO: Save profile picture here

      // TODO: Save profile banner here

      const variables: Partial<TProfile> = {
        user_id: currentUser.id,
        firstname: Boolean(values.firstname) ? values.firstname : undefined,
        lastname: Boolean(values.lastname) ? values.lastname : undefined,
        title: Boolean(values.title) ? values.title : undefined,
        about: Boolean(values.about) ? values.about : undefined,
        mobile: Boolean(values.mobile) ? values.mobile : undefined,
        country: Boolean(values.country) ? values.country : undefined,
        gender: Boolean(values.gender) ? values.gender : undefined,
        birthday: Boolean(values.birthday)
          ? (values.birthday as DateTime).toFormat("yyyy-LL-dd")
          : undefined,
      };
      setProfile(variables);
      try {
        const response = await updateProfile({
          variables,
        });
        if (response.data?.updated_profile.user_id) {
          setErrors([]);
          formik.resetForm();
          setSubmitting(false);
          setOpenSnackbar({
            message: "Saved successfully",
            severity: "success",
          });
          return;
        }
      } catch (e) {
        console.error(e);
        setSubmitting(false);
        setOpenSnackbar({
          message: "Error occured: unable to edit profile",
          severity: "error",
        });
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(null);
  };

  const handlePictureChange = (pic: File) => {
    setPicture(pic);
  };

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <Typography variant="h2" sx={{ marginBottom: "20px" }}>
              Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={3} md={2}>
                <PictureUploader
                  picture={picture}
                  onPictureChange={handlePictureChange}
                />
              </Grid>
              <Grid item xs={8} sm={9} md={10}>
                <BannerUploader />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth={true}
                  size="small"
                  label="First name"
                  id="firstname"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth={true}
                  size="small"
                  label="Last name"
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth={true}
                  size="small"
                  label="Title"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  multiline
                  minRows={4}
                  maxRows={8}
                  size="small"
                  label="About"
                  id="about"
                  name="about"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth={true}
                  size="small"
                  label="Mobile"
                  id="mobile"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  fullWidth={true}
                  size="small"
                  label="Country"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                >
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  fullWidth={true}
                  size="small"
                  label="Gender"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  defaultValue={formik.initialValues.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem key="male" value="true">
                    Male
                  </MenuItem>
                  <MenuItem key="female" value="false">
                    Female
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  value={formik.values.birthday}
                  onChange={(value: DateTime) => {
                    if (value && value?.isValid)
                      formik.setFieldValue("birthday", value);
                    else formik.setFieldValue("birthday", null);
                  }}
                  slotProps={{
                    textField: {
                      error: false,
                      fullWidth: true,
                      size: "small",
                      label: "Birthday",
                      id: "birthday",
                      name: "birthday",
                    },
                  }}
                />
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
            <Button variant="contained" type="submit" disabled={submitting}>
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
      <EnhancedSnackbar
        open={Boolean(openSnackbar)}
        message={openSnackbar?.message!}
        severity={openSnackbar?.severity!}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export { EditProfile };
