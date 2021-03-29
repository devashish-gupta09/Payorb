import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import { styles } from "./styles";

function SignUpForm() {
  const classes = styles();

  // const handleSignUp = async () => {
  //   const user = await signUp({
  //     name: "Abhijeet",
  //     username: "test",
  //     password: "Ussword@2741",
  //     email: "abhijeetrastogi1997@gmail.com",
  //     phoneNumber: "+918968969078",
  //   });

  //   console.log(user);
  // };

  return (
    <Grid className={classes.container}>
      <Typography className={classes.sectionTitle}>SIGN UP</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Get Started
      </Typography>
      <FormControl className={classes.formContainer}>
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="OTP"
          variant="outlined"
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="Location"
          variant="outlined"
        />
        <Button className={classes.signupButton} onClick={handleSignUp}>
          Sign Up
        </Button>
        <Typography align="center" className={classes.orText}>
          OR
        </Typography>

        <Button className={classes.socialMediaButtons}>
          Connect with google
        </Button>

        <Button className={classes.socialMediaButtons}>
          Sign in with Facebook
        </Button>
        <Typography align="center" className={classes.signupMessage}>
          Dont’s have an account? Sign Up
        </Typography>
      </FormControl>
    </Grid>
  );
}

export default SignUpForm;
