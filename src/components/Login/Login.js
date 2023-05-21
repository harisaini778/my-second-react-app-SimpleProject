import React, { useState,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state,action) => {
  if (action.type === "USER_INPUT") {
    return({
      value: action.value,
      isValid: action.value.includes("@")
    })
  }
  if(action.type="INPUT_BLUR"){
    return {
      value: state.value,
      isValid:state.value.includes("@")
    }
  }
  return {
    value: "",
    isValid:false
    }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,
    {
      value: "",
      isValid: null,
    });
  // useEffect(() => {
  //   console.log("Effect running");
  //   return () => {
  //     console.log("Effect Clean Up");
  //   };
  // },[enteredPassword])

  // useEffect(() => {
  //  const indentifier =  setTimeout(() => { 
  //      console.log("Checking the form validity!"); 
  //      setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length && enteredCollege.trim().length> 6
  //   );
  //    }, 500);
  //   return () => {
  //     //clean up function
  //     console.log("clean up");
  //     clearTimeout(indentifier)
  //   }
  // }, [enteredEmail, enteredPassword,enteredCollege]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_INPUT",value:event.target.value})
    setFormIsValid(
      event.target.value.includes("@")
      && enteredPassword.trim().length > 6
    );
   };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const collegeChangeHandeler = (event) => {
    setEnteredCollege(event.target.value);

  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type:"INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandeler = () => {
    setCollegeIsValid(enteredCollege.trim().length>0)
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword,enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
          <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name </label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandeler}
            onBlur={validateCollegeHandeler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
