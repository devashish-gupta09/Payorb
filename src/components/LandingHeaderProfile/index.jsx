import {
  Button,
  Link,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext } from "react";

import { appColors } from "../../../styles/colors";

import { PAGE_PATHS } from "../../constants/paths";
import { getUser } from "../../services/auth";

import { Context } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import ProfileSectionHeader from "../ProfileSectionHeader";

function LandingHeaderProfile({ handleLinkClick }) {
  const [vendor, setVendor] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = styles();

  const user = useContext(Context);

  React.useEffect(() => {
    setLoading(true);
    getUser()
      .then((res) => {
        setLoading(false);
        setVendor(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return null;
  }

  if (vendor) {
    return (
      <>
        <Link href={PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}>
          {matches ? (
            <li className={classes.list}>Profile</li>
          ) : (
            <ProfileSectionHeader
              image={vendor.profileImgUrl}
              name={vendor.name || "User"}
            />
          )}
        </Link>
      </>
    );
  } else {
    return (
      <>
        {/* {matches ? } */}

        {matches ? (
          <li
            onClick={() => {
              handleLinkClick(PAGE_PATHS.SIGNIN);
            }}
            className={classes.list}
          >
            Sign In
          </li>
        ) : (
          <Link href={PAGE_PATHS.SIGNIN}>
            <Button className={classes.buttonSpacing}>Sign In</Button>
          </Link>
        )}

        {matches ? (
          <li
            onClick={() => {
              handleLinkClick(PAGE_PATHS.SIGNUP);
            }}
            className={classes.list}
          >
            Sign Up for Vendor
          </li>
        ) : (
          <Link href={PAGE_PATHS.SIGNUP}>
            <ButtonCapsule
              buttonStyle={classes.btnCapSpacing}
              text="Sign Up For Vendor"
            ></ButtonCapsule>
          </Link>
        )}
      </>
    );
  }
}

const styles = makeStyles((theme) => ({
  btnCapSpacing: {
    padding: "0.5em 2.25em",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  buttonSpacing: {
    padding: "0.5em 2em",
    textTransform: "uppercase",
    marginRight: "0.5em",
  },
  list: {
    listStyleType: "None",
    padding: "1em 0",
    color: appColors.grey,
    letterSpacing: "1px",
  },
}));

export default LandingHeaderProfile;
