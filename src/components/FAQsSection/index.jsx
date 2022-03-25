import { Box, Container, Typography } from "@material-ui/core";
import React from "react";

import FaqBlocks from "../FaqBlocks";

import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#00D4FF",
      height: "0.25em",
      width: "4em",
    }}
  />
);

function FaqsSection({ content }) {
  const classes = styles();

  return (
    <Box className={classes.bg}>
      <Container className={classes.container} container>
        <Typography variant="h2" className={classes.heading} align="center">
          {content.title}
        </Typography>
        <ColoredLine />
        <Box className={classes.box}>
          <Box className={classes.img}>
            <img src={content.image} alt="faq-image" />
          </Box>
          <Box className={classes.faq}>
            {content.faqs.map((faq, index) => {
              return <FaqBlocks key={index} ques={faq.ques} ans={faq.ans} />;
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default FaqsSection;
