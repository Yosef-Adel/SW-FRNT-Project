import React from "react";
import classes from "./auth.module.css"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import logo from '../../assets/brand/Eventbrite_Logo.png'

const LoginPage = () =>{
    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().min(3).email('Please enter a valid email address').required('Please enter a valid email address'),
        password: Yup.string().required("Password is required")

    })

    const onSubmit = (data, { resetForm }) => {
        console.log(data)
    }


    return(
        <div className={classes.main}>
            <div className={classes.info}>
                <div className={classes.form}>
                    <div className={classes.logoContainer}>
                        <img src={logo} alt="Envie Logo"/>
                    </div>
                    <h1>Log in</h1>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form >
                            <div className={classes.boxContainer}>
                                <div className={classes.fieldContainer}>
                                    <label className={classes.label}> Email address</label>
                                    <Field className={classes.field} name='email' autoComplete="off" />
                                </div>
                                <ErrorMessage name='email' component="span" />
                            </div>
                            <div className={classes.boxContainer}>
                                <div className={classes.fieldContainer}>
                                    <label className={classes.label}> Password</label>
                                    <Field className={classes.field} name='password' type='password' autoComplete="off"/>
                                </div>
                                <ErrorMessage name='password' component="span" />
                            </div>

                            <div className={classes.btn}>
                                <button type='submit' className={classes.btn}>Log in</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className={classes.image}></div>
        </div>
    )
}

export default LoginPage