import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function PolicyUserAgreement() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography variant={"h4"}>Marketplace Vendor Agreement</Typography>
      {/* Data and revision */}
      <Grid className={classes.dateAndRevision}>
        <Typography>Agreement Date and Version: 15.05.2021</Typography>
        <Typography>Date of Revision:</Typography>
      </Grid>

      <Grid>
        <Typography paragraph>
          {`
THIS PAYORB MARKETPLACE VENDOR AGREEMENT (“AGREEMENT”) IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (HEREINAFTER “YOU” OR “YOUR”) AND VANICKEL (HEREINAFTER “PAYORB”) GOVERNING YOUR USE OF WWW.PAYORB.IN AS A VENDOR FOR LISTING YOUR ADD-ONS, EXTENSIONS AND INTEGRATIONS (HEREINAFTER “APPLICATIONS”).
`}
        </Typography>
      </Grid>
      <Grid>
        <span className={classes.listTitle}>1. Payorb Marketplace </span>
        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              {`Payorb as a platform lets vendors (‘Seller’) post their services on its Platform for purchase by the users of Payorb (“Customers”).  All terms defined in the Terms and Conditions available at www.payorb.in/policies.`}
            </span>
          </li>
          <li>
            <span className="c0">
              For such listing, as mentioned above, the Platform charges the
              Seller a Platform Service Fee of 6% plus applicable taxes
              (excluding the payment gateway fee) which is to be borne by the
              Seller on completion of the order.
            </span>
          </li>
        </ol>
        {/* Registration Section  */}
        <span className={classes.listTitle}>
          2. Listing your Services in Payorb Marketplace{" "}
        </span>{" "}
        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              {`Approval Process: Your Application will be subjected to approval process established by Payorb prior to being listed on Payorb. You will be required to address and fix any and all issues identified by Payorb during the approval process within a reasonable timeframe prescribed by Payorb. Upon successful completion of the review and approval process, the submitted Applications will be listed on Payorb Marketplace. You understand that Payorb reserves the right to change the review standards and processes in its sole discretion.`}
            </span>
          </li>
          <li>
            <span className="c0">
              Delivery of Services: The delivery of the services shall be as
              discussed and promised to the End User and shall be the sole
              responsibility of the Seller and Payorb shall have no role in the
              delivery of the services. You agree to deliver / host the services
              or event for which the booking has been taken through the Platform
              on the agreed to date, time, mode, terms and details.
            </span>
          </li>
          <li>
            <span className="c0">
              Financial Terms: If you choose to provide your Service for a fee
              through the Platform, you may have Payorb collect the fee for the
              services so provided on your behalf which shall be reimbursed to
              you. All settlements shall be done at the end of each day subject
              to a maximum delay of 3 working days. Such settlements shall be
              made subsequent to adjustment of the platform usage fee as
              mentioned in clause 1 of this Agreement and the payment gateway
              charges (on actuals).
            </span>
          </li>
          <li>
            <span className="c0">
              Compliance: The terms and conditions of this Agreement will
              control in the event of any direct conflict with the terms and
              conditions mentioned herein.
            </span>
          </li>
        </ol>
        {/* The User's Content */}
        <Typography paragraph className={classes.listTitle}>
          3. Your support obligations
        </Typography>
        <Typography paragraph>
          You agree to use commercially reasonable efforts to provide chat,
          email and/or telephone support to Customers with respect to their use
          of Services. You acknowledge that you are solely responsible for
          providing adequate support to Customers and Payorb is in no way
          responsible for providing support. You shall provide to Payorb a
          current email address to which Payorb may direct inquiries from
          Customers with respect to your Services.
        </Typography>
        <span className={classes.listTitle}>
          4. Restrictions and responsibilities
        </span>{" "}
        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              {` You represent and warrant that you have full power and authority to enter into this Agreement and that all information you provide to Payorb is and will be true, accurate and complete;
`}
            </span>
          </li>
          <li>
            <span className="c0">
              You represent and warrant that all intellectual property rights in
              and to the Services submitted for listing in Payorb Marketplace
              are duly licensed or owned by you. You specifically warrant that
              you have not copied the concepts or otherwise use information
              provided by other vendors.
            </span>
          </li>
          <li>
            <span className="c0">
              You agree not to use irrelevant descriptions of the Services
              submitted by you for listing on Payorb Marketplace;
            </span>
          </li>
          <li>
            <span className="c0">
              You acknowledge that other vendors may develop and post similar or
              otherwise competing applications. You agree not to make any
              intellectual property right infringement claims against such
              vendors with respect to the similar or competing applications
              independently developed by them;
            </span>
          </li>
          <li>
            <span className="c0">
              You agree not to post any Services that may be used for any
              illegal purpose;
            </span>
          </li>
          <li>
            <span className="c0">
              You agree not to make any representations with respect to Payorb
              or your Services that violates any law;
            </span>
          </li>
          <li>
            <span className="c0">
              You agree to conduct yourself in a professional manner and not to
              disparage the goodwill of Payorb.
            </span>
          </li>
        </ol>
        <span className={classes.listTitle}>5. Additional Terms</span>{" "}
        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              {`Payorb Role: You understand and acknowledge that Payorb will only act as an intermediary between You and the End User and shall not be construed to have provided or availed any services, at any cost. Payorb shall at all times be in a position to control your use of the Platform.  

`}
            </span>
          </li>
          <li>
            <span className="c0">
              Ownership: You retain ownership of any intellectual property
              rights in the Services offered by you at Payorb. Payorb owns all
              rights, title, and interest, including all intellectual property
              rights in Payorb. 5.3 Feedback: Payorb may receive feedback from
              you or the End User with regards to the services being provided on
              the Platform and You hereby grant Payorb all rights, title and
              ownership of such Feedback (including all intellectual property
              rights therein), and Payorb may use the Feedback for any and all
              commercial and non-commercial purposes with no obligation of any
              kind to you.
            </span>
          </li>
          <li>
            <span className="c0">
              Trademarks: Your use of any of Payorb’s trademarks, logos or trade
              names (collectively, {`"Payorb Marks"`} ) must comply with the any
              guidelines published by Payorb with respect to use of the Payorb
              Marks. You may not modify or alter the Payorb Marks or use them in
              a confusing way, including without limitation suggesting any
              sponsorship or endorsement by Payorb. You may not use the Payorb
              Marks, or any part thereof, as part of your company name,
              trademarks or service marks. Payorb may terminate your license to
              use the Payorb Marks at any time for any or no reason.
            </span>
          </li>
          <li>
            <span className="c0">
              Privacy of End User information: As part of offering your Services
              on Payorb, (i) you may collect certain information from Customers
              some of which may include personally identifiable information
              (“Vendor Collected End User Data”); and (ii) Payorb may share with
              you certain personally identifiable information of Customers such
              as name, company name, physical address, email address and phone
              number (“Payorb Collected End User Data”) ((“Vendor Collected End
              User Data” and “Payorb Collected End User Data” is hereby called
              “End User Data”).
            </span>
          </li>
          With respect to your use of End User Data, you agree to: <br />
          <br />
          <ol>
            <li>
              {" "}
              Maintain appropriate safeguards for protection of the security,
              confidentiality and integrity of End User Data in accordance with
              industry standards
            </li>
            <li>
              Take all commercially reasonable and appropriate legal,
              organizational, and technical measures to protect End User Data
              against (a) accidental or unlawful destruction, and (b)
              unauthorized disclosure or access;
            </li>
            <li>
              Comply with all applicable general privacy and data security laws;
            </li>
            <li>
              Use End User Data solely as permitted under this Agreement and for
              such other purposes solely as permitted by Customers;
            </li>
            <li>
              Not disclose any End User Data except as compelled by law or as
              expressly permitted in writing by Customers
            </li>
            <li>
              Provide legally adequate privacy notices to Customers and obtain
              all necessary consents in accordance with applicable general
              privacy and data security laws
            </li>
          </ol>
        </ol>
        <Typography paragraph className={classes.listTitle}>
          6.Disclaimer of Warranties
        </Typography>
        <Typography paragraph>
          PAYORB MATERIALS ARE PROVIDED “AS IS”. PAYORB AND ITS THIRD-PARTY
          LICENSORS DISCLAIM ALL REPRESENTATIONS, WARRANTIES AND GUARANTEES,
          WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY, TITLE, NON-INFRINGEMENT AND FITNESS FOR ANY PURPOSE.
          PAYORB MAKES NO REPRESENTATION, WARRANTY OR GUARANTEE THAT USE OF
          PAYORB MATERIALS WILL BE UNINTERRUPTED, ERROR-FREE OR MEET YOUR
          REQUIREMENTS OR EXPECTATIONS.
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          7. Limitation of Liability
        </Typography>
        <Typography paragraph>
          {`EXCEPT AS OTHERWISE, IN NO EVENT SHALL EITHER YOUR OR PAYORB'S
          AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT,
          EXCEED THE MARGIN IN THE TWELVE-MONTH PERIOD PRECEDING THE CLAIM.
          "PAYORB'S MARGIN" SHALL MEANS THE COMMISSION EARNT BY PAYORB THROUGH
          THE SALE OF YOUR SERVICES TO ITS USERS/CUSTOMERS.`}
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          8. Indemnification
        </Typography>
        <Typography paragraph>
          {`You agree to indemnify, defend and hold Payorb and its subsidiaries (including its respective affiliates, officers, directors, employees, contractors and assigns) harmless from and against any loss, claim, liability, damage, action or cause of action (including reasonable attorneys' fees) arising out of any claim relating to any Applications or the use of Applications (including any claims made by or arising from Customers), or from any breach of your representations, warranties or obligations set forth in this Agreement (individually, a "Claim," and collectively, the "Claims"). You agree not to settle a Claim without Payorb's prior written consent, which may not be unreasonably withheld.
`}
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          9. Confidentiality
        </Typography>
        <Typography paragraph>
          {`As part of your participation in as a vendor with Payorb, you may be given access to certain non-public information, which is confidential and proprietary to Payorb. You may use such Confidential Information only as necessary in exercising your rights granted in this Agreement. You agree not to disclose the Confidential Information without our prior written consent. You agree that you will protect the Confidential Information from unauthorized use, access, or disclosure in the same manner that you would protect your own confidential and proprietary information of a similar nature and in any event with no less than a reasonable degree of care. 

`}
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          10. Changes
        </Typography>
        <Typography paragraph>
          {`We may modify the Agreement upon notice to you at any time through a service announcement or by sending an email to your primary email address. If we make significant changes to this Agreement that affect your rights, you will be provided with at least 30 days advance notice of the changes by email to your primary email address. If you do not agree to any of the proposed changes, you may terminate this Agreement within 30 days of being notified of the availability of the modified Agreement by (i) providing written notice of termination; and (ii) withdrawing all your Applications from the Payorb Marketplace. Your continued participation in the Payorb Marketplace after the effective date of any change to the Agreement will be deemed to be your acceptance to the modified Agreement. 


`}
        </Typography>
        <span className={classes.listTitle}>11. Term and Termination</span>{" "}
        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              {`This Agreement shall remain in effect until terminated by either you or Payorb. Either party may terminate this Agreement and access to your account at any time. In addition, either party may terminate this Agreement immediately upon written notice to the other party if the other party (i) becomes the subject of a petition in bankruptcy or other proceeding relating to insolvency, or makes an assignment for the benefit of creditors, or (ii) materially breaches any of its obligations under this Agreement and does not cure such breach within thirty (30) days of receiving notice of such breach, or (iii) infringes or misappropriates the terminating party's intellectual property rights, or (iv) breaches its confidentiality obligations under this Agreement.`}
            </span>
          </li>
          <li>
            <span className="c0">
              {` Notwithstanding anything to the contrary in this Agreement, immediately upon notice to you, Payorb may also terminate this Agreement, if (i) Payorb ceases to operate, or (ii) you violate Payorb Terms and Conditions, or (iii) Payorb determines (in its discretion) that your participation on the Platform could result in legal or business liability to Payorb or any third party or otherwise harm Payorb, its vendors or Customers.`}
            </span>
          </li>
          <li>
            <span className="c0">
              {` Effect of Termination: Following any termination or expiration of this Agreement or withdrawal of your Applications from the Payorb, you agree to provide the promised services as per the pending orders. All terms and provisions of this Agreement, including any and all amendments hereto, which by their nature are intended to survive any termination or expiration of this Agreement, shall so survive.
`}
            </span>
          </li>
        </ol>
        <Typography paragraph className={classes.listTitle}>
          12. Arbitration
        </Typography>
        <Typography paragraph>
          {`In the event of any controversy or claim arising out of or relating to this Agreement, the parties hereto shall consult and negotiate in good faith with each other and, recognizing their mutual interests, attempt to reach a solution satisfactory to both parties. If the parties do not reach a settlement within a period of 60 days, any unresolved controversy or claim arising out of or relating to this Agreement shall be settled by binding arbitration in accordance with the The Arbitration and Conciliation Act 1996 as amended upto date with seat and venue at Telangana, Hyderabad, India. Notwithstanding anything to the contrary, Payorb may at any time seek injunctions or other forms of equitable relief from any court of competent jurisdiction. 


`}
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          13. Governing Law
        </Typography>
        <Typography paragraph>
          {`This Agreement shall be construed, interpreted and governed by the laws prevalent in India from time to time. The parties irrevocably submit to the jurisdiction of Telangana (Hyderabad) and waive any claim in respect of inconvenience thereof. 


`}
        </Typography>
        <Typography paragraph className={classes.listTitle}>
          14. General
        </Typography>
        <Typography paragraph>
          {`This Agreement constitutes the entire agreement between you and Payorb with respect to its subject matter and supersedes and merges all prior proposals, understandings and communications. This Agreement may not be amended except in writing signed by both parties or as provided in Section 10 above.`}{" "}
          <br />
          <br />
          {`
If any provision of this Agreement is held invalid by a court of competent jurisdiction, such provision shall be deemed to be restated to reflect as nearly as possible to the original intentions of the parties in accordance with applicable Laws, and the remainder of this Agreement will remain in full force and effect. `}
          <br />
          <br />
          {`
Each party will bear its own costs and expenses in performing this Agreement. 
You acknowledge and agree that Payorb's affiliates, contractors and service providers may exercise all rights of Payorb under this Agreement, including Payorb's license rights. Any waiver or modification of this Agreement shall only be effective if it is in writing and signed by both parties hereto.`}{" "}
          <br />
          <br />{" "}
          {` 
You may not assign, transfer or delegate any right or obligations under this Agreement and any non-permitted assignment is void. Payorb may however assign this Agreement and its rights and obligations to any of its affiliates or in connection with a merger, reorganization, acquisition or other transfer of all or substantially all of its assets or voting securities to which this Agreement relate. This Agreement does not create or imply any partnership, agency or joint venture.


`}
        </Typography>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    margin: "2em 2em",
    padding: "3em 4em",
    textAlign: "justify",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
      margin: "2em 0",
    },
    "& > div > ol > li": {
      paddingBottom: "1em",
    },
  },
  dateAndRevision: {
    padding: "2em 0",
  },
  contactInfo: {
    paddingLeft: "1em",
  },
  listTitle: {
    fontWeight: "bold",
  },
  antiHackingBullets: {
    paddingLeft: "4em",
  },
}));

export default PolicyUserAgreement;
