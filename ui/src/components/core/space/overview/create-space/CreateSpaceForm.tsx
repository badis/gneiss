import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import * as Yup from "yup";

import { INSERT_SPACE, SpaceRefetchQueries } from "@/api/graphql/space";
import { Button, Grid, TextField, Typography } from "@/components/presentational";

const validationSchema = Yup.object({
    space_name: Yup.string().required("Space should have a name"),
});

interface CreateSpaceProps {
    onClose: () => void;
}
export const CreateSpaceForm: FC<CreateSpaceProps> = ({ onClose }) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const [createSpace] = useMutation(INSERT_SPACE, {
        refetchQueries: [SpaceRefetchQueries.GetAllSpaces],
    });

    const formik = useFormik({
        initialValues: {
            space_name: "",
            space_description: "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createSpace({
                    variables: { name: values.space_name, description: values.space_description },
                });
                if (response.data?.insert_space_one.id) {
                    router.push("/spaces/" + response.data?.insert_space_one.id);
                    onClose();
                }
            } catch (e) {
                console.error("Error occured: unable to space");
            }
            setSubmitting(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid direction="column" container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h4" sx={{ fontSize: "20px", fontWeight: "normal", marginBottom: "10px" }}>
                        <strong>Create</strong> space
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth={true}
                        size="small"
                        label="Name"
                        id="space_name"
                        name="space_name"
                        value={formik.values.space_name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.space_name && Boolean(formik.errors.space_name)
                        }
                        helperText={
                            formik.touched.space_name && formik.errors.space_name
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline={true}
                        fullWidth={true}
                        size="small"
                        label="Description"
                        id="space_description"
                        name="space_description"
                        minRows={4}
                        maxRows={8}
                        value={formik.values.space_description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.space_description && Boolean(formik.errors.space_description)
                        }
                        helperText={
                            formik.touched.space_description && formik.errors.space_description
                        }
                    />
                </Grid>
                <Grid item container direction="row-reverse" spacing={1} xs={12} >
                    <Grid item>
                        <Button variant="contained" type="submit" disabled={submitting}>
                            Create
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="default" onClick={onClose}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};
