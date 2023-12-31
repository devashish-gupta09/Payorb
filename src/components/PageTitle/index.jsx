import Head from "next/head";
import React from "react";

const PageTitle = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageTitle;
