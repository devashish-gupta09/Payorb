import { Box, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import useCollapse from "react-collapsed";

import { styles } from "./styles";

function FaqBlocks({ ques, ans }) {
  const classes = styles();

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <Box className={classes.faqBlock}>
      <Box
        className={
          isExpanded ? classes.faqBlockExpanded : classes.faqBlockCollapsed
        }
      >
        <Box className={classes.faqBlockHeading} {...getToggleProps()}>
          {isExpanded ? <RemoveIcon /> : <AddIcon />}
          <Box className={classes.faqQuesTextBox}>
            <Typography variant="body1" className={classes.faqQuesText}>
              {ques}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.faqBlockAns} {...getCollapseProps()}>
        <Typography variant="body2" className={classes.faqAnsText}>
          {ans}
        </Typography>
      </Box>

      {/* <div className="header" {...getToggleProps()}>
        {isExpanded ? "Collapse" : "Expand"}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          Now you can see the hidden content. <br />
          <br />
          Click again to hide...
        </div>
      </div> */}
    </Box>
  );
}

export default FaqBlocks;
