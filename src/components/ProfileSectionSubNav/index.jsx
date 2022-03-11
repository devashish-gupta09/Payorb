export const ProfileSectionSubNav = () => {
  return (
    <List style={{ overflow: "hidden", color: "#929292", padding: "0" }}>
      <ListItem
        style={{
          display: "inline-block",
          width: "fit-content",
          padding: "1em 1.5em",
          borderBottom: "3.5px solid #008EFF",
          fontWeight: "bold",
          color: "#008EFF",
        }}
      >
        Profile
      </ListItem>
      <ListItem
        style={{
          display: "inline-block",
          width: "fit-content",
          padding: "1em 1.5em",
        }}
      >
        Reviews
      </ListItem>
      <ListItem
        style={{
          display: "inline-block",
          width: "fit-content",
          padding: "1em 1.5em",
        }}
      >
        Payments
      </ListItem>
      <ListItem
        style={{
          display: "inline-block",
          width: "fit-content",
          padding: "1em 1.5em",
        }}
      >
        Events
      </ListItem>
    </List>
  );
};
