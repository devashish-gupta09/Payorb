import { Grid } from "@material-ui/core";
import Link from "next/link";
export default function ServerError() {
  return (
    <Grid
      style={{
        backgroundColor: "#BDF5F2",
        margin: "0",
        padding: "0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: "0", padding: "0" }}>Internal server error</h1>
        <h3 style={{ color: "blue" }}>
          <Link href="/">Go to Home</Link>
        </h3>
      </div>
    </Grid>
  );
}
