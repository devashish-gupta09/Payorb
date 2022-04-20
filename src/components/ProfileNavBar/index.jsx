import { makeStyles, Tabs, Tab, Grid } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import useMobileDetect from "use-mobile-detect-hook";

import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";

function ProfileNavBar({ vendor = true }) {
  const classes = styles();
  const detectMobile = useMobileDetect();
  const router = useRouter();

  const { verifiedDetails, loading } = useFetchVendorVerifiedDetails();

  const isActive = () => {
    const section = router.asPath.split("#")[1];
    console.log(section);
    if (section === "review-profile-page") classes.active;
    return "";
  };

  return (
    <Tabs
      className={isActive()}
      variant={detectMobile.isMobile() ? "fullWidth" : "standard"}
    >
      <Tab label="Gallery" href="#gallery"></Tab>
      <Tab label="Reviews" href="#review"></Tab>
      {vendor && !loading ? (
        <Tab
          label={
            <Grid container alignItems="center">
              {verifiedDetails?.find((vd) => vd.name === "paymentDetails")
                ?.status !== "COMPLETE" && (
                <InfoOutlined
                  style={{ paddingRight: "0.25em", color: "red" }}
                />
              )}
              Payment
            </Grid>
          }
          href="#payment"
        ></Tab>
      ) : (
        <Tab label="Events" href="#events"></Tab>
      )}
      {/* {!vendor ? <Tab label="Events" href="#events"></Tab> : null} */}
    </Tabs>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    color: "#929292",
    padding: 0,
    "& > li": {
      display: "inline-block",
      width: "fit-content",
      padding: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  active: {
    borderBottom: "2px solid #008EFF",
    fontWeight: "500",
    color: "#008EFF",
  },
}));

export { ProfileNavBar };
