import { FormControl, Grid, TextField, Typography } from "@material-ui/core";
import { styles } from "./styles";

function SignUpForm() {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Typography
        style={{
          letterSpacing: "2px",
          paddingBottom: "0.5em",
          color: "#828282",
        }}
      >
        SIGN UP
      </Typography>
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
      </FormControl>
    </Grid>
  );
}

export default SignUpForm;
