import React,{useState} from "react";
import classes from "./auth.module.css"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import logo from '../../assets/brand/envie.svg'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import images from '../../assets/data/loginPhotos'
import { Link } from "react-router-dom";
import { TailSpin } from  'react-loader-spinner'

const SignupPage = () =>{
    const [cont, setContinue] = useState(false);
    const [loader, setLoader] = useState(false)
    const [randImg, setrandImg]=useState(Math.floor(Math.random()*3))

    const contFn=()=>{

        console.log(initialValues.email)

        setLoader(true)
        setTimeout(() => {
          setLoader(false);
          setContinue(true)
        }, 800);
    }

    const initialValues = {
        email: '',
        confirmemail:'',
        firstName:'',
        lastName:'',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().min(3).email('Invalid email address').required(" Email field is required"),
        // confirmemail: Yup.string().when("email", {
        //     is: val => (val && val.length > 0 ? true : false),
        //     then: Yup.string().oneOf(
        //         [Yup.ref("email")],
        //         "Both email need to be the same"
        //     )
        // }),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        password: Yup.string().min(8).required("Field required"),


    })

    const onSubmit = (data, { resetForm }) => {
        console.log(data)
    }


    return(
        <div className={classes.main}>
            <div className={classes.info}>
                <div className={classes.form}>
                    <Link to="/">
                        <div className={classes.logoContainer}>
                            <img src={logo} alt="Envie Logo"/>
                        </div>
                    </Link>
                    <h1>Create an account</h1>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form >
                            <div className={classes.boxContainer}>
                                <div className={classes.fieldContainer}>
                                    <label className={classes.label}> Email address </label>
                                    <Field className={classes.field} id="email" name='email' autoComplete="off"  disabled={cont}/>
                                </div>
                                <ErrorMessage name='email' component="span" />
                            </div>
                            {!cont?
                                <div className={classes.btn}>
                                    <button className={classes.btn} onClick={contFn}>
                                    {loader?
                                        <TailSpin
                                            height="25"
                                            width="20"
                                            color="#ffffffff"
                                            ariaLabel="tail-spin-loading"
                                            radius="2"
                                            wrapperStyle={{}}
                                            wrapperClass={classes.loader}
                                            visible={true}
                                            />:
                                        <>Continue</>}
                                    </button>
                                </div>
                            :
                            <>
                            <div className={classes.boxContainer}>
                                <div className={classes.fieldContainer}>
                                    <label className={classes.label}> Confirm email</label>
                                    <Field className={classes.field} name='confirmemail' placeholder='Confirm Email' autoComplete="off"/>
                                </div>
                                <ErrorMessage name='confirmemail' component="span" />
                            </div>
                            <div className={classes.name}>
                                <div className={classes.boxContainer}>
                                    <div className={classes.fieldContainer}>
                                        <label className={classes.label}> First Name</label>
                                        <Field className={classes.field} name='firstName' placeholder='First Name' autoComplete="off" />
                                    </div>
                                    <ErrorMessage name='firstName' component="span" />
                                </div>
                                <div className={classes.boxContainer}>
                                    <div className={classes.fieldContainer}>
                                        <label className={classes.label}> Last Name</label>
                                        <Field className={classes.field} name='lastName' placeholder='Last Name' autoComplete="off" />
                                    </div>
                                    <ErrorMessage name='lastName' component="span" />
                                </div>
                            </div>
                            <div className={classes.boxContainer}>
                                <div className={classes.fieldContainer}>
                                    <label className={classes.label}> Password</label>
                                    <Field className={classes.field} name='password' type='password' placeholder='Password' autoComplete="off"/>
                                </div>
                                <ErrorMessage name='password' component="span" />
                            </div>
                            <div className={classes.linearLine}></div>
                            <span className={classes.mssg}> Your password must be at least 8 characters </span>
                            <div className={classes.btn} style={{margin:'2rem auto'}}>
                                <button type='submit'>Create account</button>
                            </div></>}
                        </Form>
                    </Formik>
                    <div className={classes.splitfield}>
                        <hr  className={classes.hr_split}/>
                        <div className={classes.splittext}>or</div> 
                    </div>
                    <div className={classes.btn1}>
                        <button className={classes.btn1}>Email me a login link</button>
                    </div>
                     <div className={classes.btn1}>
                        <button  className={classes.btn1}>Sign in with Google</button>
                    </div>
                    <Link to="/login">
                        <p className={classes.link}>
                            Login
                        </p>
                    </Link>
                </div>

            </div>
            <div className={classes.image} style={{backgroundImage:`url(${images[randImg]})`}}></div>
        </div>
    )
}

export default SignupPage