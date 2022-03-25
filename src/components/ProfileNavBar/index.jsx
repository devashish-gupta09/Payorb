import { makeStyles, Tabs, Tab } from "@material-ui/core";
import { useRouter } from "next/router";
import useMobileDetect from "use-mobile-detect-hook";

function ProfileNavBar({ vendor = true }) {
  const classes = styles();
  const detectMobile = useMobileDetect();
  const router = useRouter();

  console.log(router.asPath);

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
      <Tab label="Payments" href="#payment"></Tab>
      {!vendor ? <Tab label="Events" href="#events"></Tab> : null}
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
