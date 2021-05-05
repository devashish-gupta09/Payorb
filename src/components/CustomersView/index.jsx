import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { PAGE_PATHS } from "../../constants/paths";
import CustomerEvents from "../CustomerEvents";
import CustomerViewHeader from "../CustomerViewHeader";
import EventBooking from "../EventBooking";
import DashboardContainer from "../VendorDashboardContainer";

function CustomersView() {
  const router = useRouter();

  const getComponent = () => {
    if (router.asPath.includes(PAGE_PATHS.CUSTOMER_EVENTS_REGISTER)) {
      if (router.query.event) {
        return <EventBooking eventLink={router.query.event}></EventBooking>;
      }
    } else if (router.asPath.includes(PAGE_PATHS.CUSTOMER_EVENTS)) {
      return <CustomerEvents />;
    }
    return null;
  };

  return (
    <Grid>
      <CustomerViewHeader />
      <DashboardContainer>{getComponent()}</DashboardContainer>
    </Grid>
  );
}

export default CustomersView;
