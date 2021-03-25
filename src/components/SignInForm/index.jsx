import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ButtonCapsule from "../ButtonCapsule";
import { styles } from "./styles";

function SigninForm() {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Typography className={classes.sectionTitle}>SIGN IN</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Welcome back
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
        <Typography align="right" className={classes.forgotPassword}>
          Forgot Password ?
        </Typography>
        <Button className={classes.signinButton}>Sign In</Button>
        <Typography align="center" className={classes.orText}>
          OR
        </Typography>

        <Button className={classes.socialMediaButtons}>Connect with google</Button>

        <Button className={classes.socialMediaButtons}>Sign in with Facebook</Button>
        <Typography align="center" className={classes.signupMessage}>Dont’s have an account? Sign Up</Typography>
      </FormControl>
    </Grid>
  );
}

export default SigninForm;
