import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {Field, Form, Formik} from "formik";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import {TextField} from "formik-material-ui";
import AuthenticationService from "../Services/AuthenticationService";
import {ModalContext} from "../App";

const tooShortError = value => "Doit avoir au moins " + value.min + " caractères";
const tooLongError = value => "Doit avoir au plus " + value.max + " caractères";
const requiredFieldMsg = "Ce champs est requis";

export default function RegisterStudent(props) {
    const {open} = useContext(ModalContext);
    const validationSchema = yup.object()
        .shape({
            firstName: yup.string().trim().min(2, tooShortError).required(requiredFieldMsg),
            address: yup.string().trim().min(10, tooShortError).required(requiredFieldMsg),
            lastName: yup.string().trim().min(2, tooShortError).max(30, tooLongError).required(requiredFieldMsg),
            studentId: yup.string().trim().min(7, tooShortError).max(7, tooLongError).required(requiredFieldMsg),
            phoneNumber: yup.string().trim().min(10, tooShortError).required(requiredFieldMsg),
            username: yup.string().trim().min(5, tooShortError).max(30, tooLongError).required(requiredFieldMsg),
            email: yup.string().trim().email("L'email n'a pas un format valide").required(requiredFieldMsg),
            password: yup.string().trim().min(8, tooShortError).required(requiredFieldMsg),
            passwordConfirm: yup.string()
                .oneOf([yup.ref('password'), null], "Les mots de passes doivent êtres identiques").required(requiredFieldMsg),
        })
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
        studentId: "",
        phoneNumber: "",
        address: "",
    }

    return <Formik
        onSubmit={async (values, {setFieldError}) =>
            AuthenticationService.registerUser("/students", values, setFieldError, open, props.history)
        }

        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={initialValues}
    >
        {({isSubmitting}) => <Form className={props.classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="firstName"
                        id="firstName"
                        variant="outlined"
                        label="Prénom"
                        required
                        fullWidth
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="lastName"
                        id="lastName"
                        variant="outlined"
                        label="Nom de famille"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        component={TextField}
                        name="address"
                        id="address"
                        variant="outlined"
                        label="Addresse"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="studentId"
                        id="studentId"
                        variant="outlined"
                        label="Numéro d'étudiant"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="phoneNumber"
                        id="phoneNumber"
                        variant="outlined"
                        label="Numéro de téléphone"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="username"
                        id="username"
                        variant="outlined"
                        label="Nom d'utilisateur"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="email"
                        id="email"
                        variant="outlined"
                        label="Addresse courriel"
                        type={"email"}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="password"
                        id="password"
                        variant="outlined"
                        label="Mot de passe"
                        type={"password"}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextField}
                        name="passwordConfirm"
                        id="passwordConfirm"
                        variant="outlined"
                        label="Confirmez"
                        type={"password"}
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <br/>
            {isSubmitting && <LinearProgress/>}
            <Button
                type={"submit"}
                fullWidth
                variant="contained"
                color="primary"
                size={"large"}
                className={props.classes.submit}
                disabled={isSubmitting}
            >
                S'enregistrer
            </Button>
        </Form>}
    </Formik>;
}
