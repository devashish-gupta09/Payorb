import { Link, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useContext } from "react";

import { appColors } from "../../../styles/colors";

import { PAGE_PATHS } from "../../constants/paths";
import { getUser } from "../../services/auth";
import { buildVendorDashboardUrl } from "../../utils/url";

import { Context } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import ProfileSectionHeader from "../ProfileSectionHeader";

function SignUpHeaderProfile({ handleLinkClick }) {
  const [vendor, setVendor] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = styles();

  const userContext = useContext(Context);

  React.useEffect(() => {
    if (
      userContext.user &&
      userContext.user.uid &&
      userContext.userState !== "UNAUTHENTICATED"
    ) {
      setLoading(true);
      getUser({ vendorId: userContext.user.uid })
        .then((res) => {
          setLoading(false);
          setVendor(res.data.vendor);
        })
        .catch((err) => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userContext]);

  if (loading && userContext.userState !== "UNAUTHENTICATED") {
    return (
      <>
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
            <ButtonCapsule
              buttonStyle={classes.btnCapSpacing}
              text="Sign In"
            ></ButtonCapsule>
          </Link>
        )}
      </>
    );
  }

  if (vendor && vendor.userUID) {
    return (
      <>
        {matches ? (
          <Link
            href={buildVendorDashboardUrl(vendor.username || vendor.userUID)}
          >
            <li className={classes.list}>Profile</li>
          </Link>
        ) : (
          <ProfileSectionHeader
            image={vendor.profileImgUrl}
            name={vendor.name || "User"}
          />
        )}
      </>
    );
  } else {
    return (
      <>
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
            <ButtonCapsule
              buttonStyle={classes.btnCapSpacing}
              text="Sign In"
            ></ButtonCapsule>
          </Link>
        )}
      </>
    );
  }
}

const styles = makeStyles((theme) => ({
  btnCapSpacing: {
    padding: "0.75em 1.5em",
    fontWeight: "600",
    background:
      "background: linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    fontSize: "0.8em",
  },
  buttonSpacing: {
    padding: "0.75em 1.25em",
    marginRight: "1em",
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    boxShadow: "none",
    fontSize: "0.8em",
  },
  list: {
    listStyleType: "None",
    padding: "1em 0",
    color: appColors.grey,
    letterSpacing: "1px",
  },
}));

export default SignUpHeaderProfile;
