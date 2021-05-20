import { Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function PolicyTermsAndConds() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography variant={"h4"}>Terms and conditions.</Typography>
      {/* Data and revision */}
      <Grid className={classes.dateAndRevision}>
        <Typography>Agreement Date and Version: 15.05.2021</Typography>
        <Typography>Date of Revision:</Typography>
      </Grid>

      <Grid>
        <Typography paragraph>
          {`THESE PLATFORM TERMS AND CONDITIONS ("AGREEMENT") ARE PUBLISED IN
          COMPLAINCE OF THE INDIAN CONTRACT ACT, 1872 AND ARE MADE AVAILABLE IN
          AN ELECTRONIC RECORD IN THE FORM OF AN ELECTRONIC CONTRACT FORMED
          UNDER INFORMATION TECHNOLOGY ACT, 2000, RULES, REGULATIONS, GUIDELINES
          AND CLARIFICATIONS FRAMED THERE UNDER, INCLUDING THE (INDIAN)
          INFORMATION TECHNOLOGY (REASONABLE SECURITY PRACTICES AND PROCEDURES
          AND SENSITIVE PERSONAL INFORMATION) RULES, 2011 AND THE (INDIAN)
          INFORMATION TECHNOLOGY (INTERMEDIARIES GUIDELINES) RULES, 2011 AND
          OTHER RULES MADE THEREUNDER AND THE AMENDED PROVISIONS PERTAINING TO
          ELECTRONIC DOCUMENTS / RECORDS IN VARIOUS STATUTES AS AMENDED BY THE
          INFORMATION TECHNOLOGY ACT, 2000. THESE TERMS AND CONDITIONS DO NOT
          REQUIRE ANY PHYSICAL, ELECTRONIC OR DIGITAL SIGNATURE.`}
        </Typography>

        <Typography paragraph>
          {`THESE TERMS AND CONDITIONS ARE A LEGALLY BINDING DOCUMENT BETWEEN YOU THE END USER, SELLER (BOTH REFERRED TOGETHER AS ‘YOU’, ‘YOUR’) AND PAYORB (TERMS DEFINED BELOW). THESE TERMS AND CONDITIONS WILL BE EFFECTIVE UPON ACCEPTANCE OF THE SAME (DIRECTLY OR INDIRECTLY IN ELECTRONIC FORM OR BY MEANS OF AN ELECTRONIC RECORD) AND WILL GOVERN THE RELATIONSHIP BETWEEN USER AND PAYORB FOR THE USE OF THE PLATFORM (DEFINED BELOW).`}
        </Typography>

        <Typography paragraph>
          {`THIS DOCUMENT IS PUBLISHED AND SHALL BE CONSTRUED IN ACCORDANCE WITH THE PROVISIONS OF RULE 3 (1) OF THE INFORMATION TECHNOLOGY (INTERMEDIARIES GUIDELINES) RULES, 2011 UNDER INFORMATION TECHNOLOGY ACT, 2000 THAT REQUIRE PUBLISHING THE RULES AND REGULATIONS, PRIVACY POLICY AND USER AGREEMENT FOR ACCESS OR USAGE OF THE PLATFORM.`}
        </Typography>

        <Typography paragraph>
          <b>Vanickel Labs LLP</b>{" "}
          {` on behalf of itself and its affiliates under the brand`}{" "}
          <b>{`"Payorb" (“Payorb”)`}</b>,{" "}
          {`is the author and publisher of the
          internet resource`}{" "}
          <Link href="www.payorb.in">www.payorb.in</Link>{" "}
          {`(together, “Platform”). These Terms and conditions together with the Privacy Policy and other related agreements available at`}{" "}
          <Link href="www.payorb.in/policies">www.payorb.in/policies</Link>{" "}
          {`on the Platform together with all other notices, disclaimers, guidelines appearing on the Platform from time to time (collectively referred to as "Agreement(s)") constitute the entire agreement upon which You are allowed to access and use the Platform and avail the Services`}
        </Typography>

        <Grid>
          <Typography gutterBottom>
            {`For the purpose of these Terms & Conditions and all other legal polices on the Platform:`}
          </Typography>
          <Typography>
            <b>‘Platform’</b>
            {` shall mean and include the internet resource www.payorb.in, Payorb and Vanickel Labs LLP. `}
          </Typography>
          <Typography>
            <b>‘Seller’</b>{" "}
            {` shall mean and include the freelancers, having a registered account with the Platform, hosting the event / services on the platform.`}
          </Typography>
          <Typography paragraph>
            <b>‘End User’</b>
            {` shall mean and include the end users and / or clients of the Sellers or otherwise registered users of the Platform.`}
          </Typography>
        </Grid>

        <Typography paragraph>
          {`As You browse through the Platform, You may access other Websites that are subject to different terms of use. When You use those sites, You will be legally bound by the specific terms of use posted on such sites. If there is a conflict between these Terms & Conditions and the other terms and conditions, the other terms & conditions will govern with respect to use of such pages.`}
        </Typography>

        <Typography paragraph>
          {`Payorb may change these Terms & Conditions at any time without notice. Changes will be posted on the Platform under "Terms & Conditions".`}
        </Typography>

        <Typography paragraph>
          {`Your use of the Platform after any changes have been posted will constitute Your agreement to the modified Terms & Conditions and all of the changes. Therefore, You should read these Terms & Conditions from time to time for changes. `}
        </Typography>
      </Grid>
      <Grid>
        <span className={classes.listTitle}>1. USE OF THE PLATFORM </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              Payorb hereby grants You a non-exclusive, non-transferable,
              limited license to access and use the Platform for the fees, if
              applicable, and under the terms set forth below.
            </span>
          </li>
          <li>
            <span className="c0">
              The Platform and the content including, but not limited to, text,
              data, reports, opinions, images, photos, graphics, graphs, charts,
              animations and video (the &quot;Content&quot;), displayed on the
              Platform, may be used only for Your personal and non-commercial
              use. Except as otherwise permitted under these Terms &amp;
              Conditions, You agree not to copy, reproduce, modify, create
              derivative works from, or store any Content, in whole or in part,
              from the Platform or to display, perform, publish, distribute,
              transmit, broadcast or circulate any Content to anyone, or for any
              commercial purpose, without the express prior written consent of
              Payorb.
            </span>
          </li>
          <li>
            <span className="c0">
              The Content prepared and uploaded by Payorb is the exclusive
              property of Payorb or its licensors, and is protected by copyright
              and other intellectual property laws. All trade names, trademarks,
              service marks and other product and service names and logos on the
              Platform and within the Content are proprietary to their
              respective owners and are protected by applicable trademark and
              copyright laws. Any of the trademarks, service marks or logos
              (collectively, the &quot;Marks&quot;) displayed on the Platform
              may be registered or unregistered marks of Payorb or others.
              Nothing contained on this Platform should be construed as granting
              any license or right to use any of the Marks displayed on the
              Platform without the express written permission of Payorb or a
              third party owner of such Marks. Any unauthorized uses of the
              Marks or any other Content are strictly prohibited. To request
              permission to use any Content or other Payorb material, please
              contact Payorb at{" "}
            </span>
            <span className="c13 c20">
              <Link className="c9" href="mailto:contact@payorb.in">
                contact@payorb.in
              </Link>
            </span>
          </li>
          <li>
            <span className="c0">
              The Content prepared and uploaded by the Seller is their exclusive
              property and is protected by copyright and other intellectual
              property laws. All trade names, trademarks, service marks and
              other product and service names and logos uploaded by the Sellers
              are proprietary to the respective Sellers and are protected by
              applicable trademark and copyright laws. Nothing contained on this
              Platform should be construed as granting any license or right to
              use any of the Marks displayed on the Platform without the express
              written permission of Payorb or a third party owner of such Marks.
              Any unauthorized uses of the Marks or any other Content are
              strictly prohibited.
            </span>
          </li>
          <li>
            <span className="c0">
              All User Content is the exclusive property of respective User and
              the User before uploading such content agrees to have been either
              the creator of such User Content or has valid authorisation from
              the original publisher.
            </span>
          </li>
          <li>
            <span className="c0">
              You may not use the Platform for any unlawful purpose. You shall
              honor all reasonable requests by the Platform to protect
              Payorb&rsquo;s proprietary interests in the Platform.
            </span>
          </li>
        </ol>

        {/* Registration Section  */}
        <span className={classes.listTitle}>2. REGISTRATION </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              As part of the registration process, You must select a username
              and password and provide the Platform with accurate, complete, and
              updated information. Failure to do so constitutes a breach of this
              Agreement, which may result in immediate termination of Your
              access.
            </span>
          </li>
          <li>
            <span className="c0">
              You agree to safeguard your personal information including but not
              limited to your password, login details, bank account details,
              subsequent to registration.
            </span>
          </li>
        </ol>

        {/* Limitation of liability */}
        <span className={classes.listTitle}>3. LIMITATION OF LIABILITY </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              You are entirely liable for activities conducted by You in
              connection with Your browsing and use of the Platform. If You are
              dissatisfied with the Content or the Platform or with these Terms
              of Use, Your sole and exclusive remedy is to stop using the
              Content and the Platform. The Platform will not pay You any
              damages in connection with Your browsing or use of the Web.
            </span>
          </li>
          <li>
            <span className="c0">
              Due to the number of sources from which the Content is obtained
              and the potential hazards of electronic distribution, there may be
              delays, omissions or inaccuracies in such Content and the
              Platform. THE CONTENT AND THE PLATFORM ARE PROVIDED &quot;AS
              IS&quot;, WITHOUT ANY WARRANTIES. NEITHER THE PLATFORM NOR PAYORB
              MAKES ANY GUARANTEES OR WARRANTIES AS TO THE ACCURACY,
              COMPLETENESS, TIMELINESS OR CURRENTNESS OF OR RESULTS TO BE
              OBTAINED FROM, ACCESSING AND USING THE PLATFORM, THE
              PLATFORM&#39;S OWN CONTENT, THE OTHER CONTENT, NOR ANY MATERIAL
              THAT CAN BE ACCESSED (VIA A DIRECT OR INDIRECT HYPERLINK OR
              OTHERWISE) THROUGH THE PLATFORM. THE PLATFORM HEREBY DISCLAIMS ANY
              AND ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
              MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE AND OF
              NON- INFRINGEMENT. NEITHER THE PLATFORM NOR PAYORB SHALL BE LIABLE
              TO THE USER OR ANYONE ELSE FOR ANY INACCURACY, DELAY, INTERRUPTION
              IN SERVICE, ERROR OR OMISSION, REGARDLESS OF CAUSE, OR FOR ANY
              DAMAGES RESULTING THEREFROM. IN NO EVENT WILL THE PLATFORM, PAYORB
              NOR ANY OF THEIR THIRD PARTY LICENSORS BE LIABLE FOR ANY DIRECT,
              INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT
              LIMITED TO, LOST TIME, LOST MONEY, LOST PROFITS OR GOOD WILL,
              WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, AND
              WHETHER OR NOT SUCH DAMAGES ARE FORESEEN OR UNFORESEEN WITH
              RESPECT TO ANY USE OF THE PLATFORM. NEITHER THE PLATFORM NOR ANY
              OF ITS AFFILIATES, AGENTS OR LICENSORS WILL BE LIABLE TO YOU OR
              ANYONE ELSE FOR ANY LOSS OR INJURY RESULTING FROM USE OF THE
              PLATFORM, IN WHOLE OR PART, WHETHER CAUSED BY NEGLIGENCE,
              CONTINGENCIES BEYOND ITS CONTROL IN PROCURING, COMPILING,
              INTERPRETING, REPORTING OR DELIVERING THE PLATFORM AND ANY CONTENT
              AT THE PLATFORM OR OTHERWISE. IN NO EVENT WILL THE PLATFORM, ITS
              AFFILIATES, AGENTS OR LICENSORS BE LIABLE TO YOU OR ANYONE ELSE
              FOR ANY DECISION MADE OR ACTION TAKEN BY YOU IN RELIANCE ON SUCH
              CONTENT OR THE PLATFORM.
            </span>
          </li>
          <li>
            <span className="c0">
              The Platform assumes no responsibility once End User registers for
              the event / service being provided by the Seller. Hosting the
              actual event / service is the Seller&rsquo;s liability and the
              Quantity, Details &amp; quality of service as promised in the
              event flyer is the Seller&rsquo;s responsibility.
            </span>
          </li>
        </ol>

        <span className={classes.listTitle}>4. LINKS TO OTHER WEBSITES </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              You may, through hypertext or other computer links, gain access to
              Websites operated by persons other than the Platform Such
              hyperlinks are provided for Your reference and convenience only,
              and are the exclusive responsibility of such Websites&#39; owners.
              You agree that the Platform is not responsible for the content or
              operation of such Websites, and that the Platform shall have no
              liability to You or any other person or entity for the use of
              third party Websites. Except as described below, a hyperlink from
              this Platform to another website does not imply or mean that the
              Platform endorses the content on that website or the operator or
              operations of that website. You are solely responsible for
              determining the extent to which You may use any content at any
              other Websites to which You link from the Platform.
            </span>
          </li>
        </ol>

        {/* The User's Content */}
        <span className={classes.listTitle}>5. THE USER&#39;S CONTENT </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              The End User and the Seller grant to Payorb the non-exclusive
              right to use all material entered into the Platform by the User
              (other than third-party material transmitted through private
              electronic mail) in any of The Payorb&#39;s print or electronic
              publications (&quot;Other Content&quot;).
            </span>
          </li>
          <li>
            <span className="c0">
              Users entering material into the Platform are responsible for the
              Other Content. Neither the Platform nor Payorb has any
              responsibility for Other Content, including the content of any
              messages or information posted by Users or others, or for the
              content of information accessible via direct or indirect
              hyperlinks from the Platform. However, the Platform retains the
              right, which it may or may not exercise in its sole discretion ,to
              review, edit, or delete Other Content that the Platform deems to
              be illegal, offensive, or otherwise inappropriate.
            </span>
          </li>
          <li>
            <span className="c0">
              The User agrees to indemnify the Platform and Payorb from all
              damages, liabilities, costs, charges and expenses, including
              reasonable attorneys&#39; fees, that the Platform, Payorb, their
              affiliates, employees, and authorized representatives may incur as
              a result of either: (i) the User&#39;s breach of this Agreement;
              or (ii) material entered into the Platform with the use of the
              User&#39;s screen name or password.
            </span>
          </li>
        </ol>

        <span className={classes.listTitle}>
          6. PAYMENTS, CANCELLATION &amp; REFUNDS{" "}
        </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              Onboarding for the End User as well as the Seller is free of cost,
              however, the same may change at anytime with or without prior
              intimation to You.
            </span>
          </li>
          <li>
            <span className="c0">
              The Seller will be liable to pay a Platform service fee of 6%
              excluding the applicable taxes and payment gateway&rsquo;s
              processing fee for the transactions performed through the
              Platform.
            </span>
          </li>
          <li>
            <span className="c0">
              Refunds to the End User, through the Platform, shall be processed
              by Payorb upon receipt of a request by the Seller. A refund
              request in this regard will have to be initiated by the Seller
              either upon receiving a request from the End User or otherwise.
            </span>
          </li>
          <li>
            <span className="c0">
              All refunds shall be processed by Payorb within 5-7 working days.
            </span>
          </li>
          <li>
            <span className="c0">
              Payment Gateway Fees shall be the responsibility of the Seller. In
              all cases, payment gateway fees shall be borne by the Seller.
            </span>
          </li>
        </ol>

        <span className={classes.listTitle}>7. ADDITIONAL LEGAL TERMS </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              This Agreement will continue until terminated by either Payorb or
              You. Either party can terminate the Agreement by notifying the
              other party by either deleting their account or electronic mail of
              the decision to terminate.
            </span>
          </li>
          <li>
            <span className="c0">
              Payorb may discontinue or change the Platform or its availability
              to You, at any time.
            </span>
          </li>
          <li>
            <span className="c0">
              This Agreement constitutes the entire agreement between the
              parties relating to Platform and supersedes any and all other
              agreements, oral or in writing, with respect to the Platform. The
              failure of the Platform, to insist upon strict compliance with any
              term of this Agreement shall not be construed as a waiver with
              regard to any subsequent failure to comply with such term or
              provision. This Agreement is personal to You, and You may not
              assign Your rights or obligations to anyone. If any provision in
              this Agreement is invalid or unenforceable under applicable law,
              the remaining provisions will continue in full force and effect.
              This Agreement, Your rights and obligations, and all actions
              contemplated by this Agreement shall be governed by the laws of
              India and subject to jurisdiction of courts of Telangana as if the
              Agreement was a contract wholly entered into and wholly performed
              within Telangana, and any litigation related to this Agreement
              shall be brought exclusively in the courts of Telangana, India.
              All rights not expressly granted herein are reserved.
            </span>
          </li>
        </ol>

        <span className={classes.listTitle}>8. ANTI-HACKING PROVISION </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              You expressly agree not to use this Platform in any manner or for
              any purpose that is prohibited by these terms and conditions. In
              addition, You expressly agree not to:
            </span>
          </li>
        </ol>
        <ol className={classes.antiHackingBullets} start="1">
          <li className="c7 li-bullet-1">
            <span className="c0">
              use the Platform for any purpose that is prohibited by any law or
              regulation, or to facilitate the violation of any law or
              regulation;
            </span>
          </li>
          <li className="c7 li-bullet-2">
            <span className="c0">
              use or attempt to use any &quot;deep-link,&quot;
              &quot;scraper,&quot; &quot;robot,&quot; &quot;bot,&quot;
              &quot;spider,&quot; &quot;data mining,&quot; &quot;computer
              code&quot; or any other automated device, program, tool,
              algorithm, process or methodology or manual process having similar
              processes or functionality, to access, ac-quire, copy, or monitor
              any portion of the Platform or any data or content found on or
              accessed through the Platform without prior express written
              consent;
            </span>
          </li>
          <li className="c7 li-bullet-2">
            <span className="c0">
              obtain or attempt to obtain through any means any materials or
              information on the Platform that have not been intentionally made
              publicly available either by their public display on the Platform
              or through their accessibility by a visible link on the Platform;
            </span>
          </li>
          <li className="c7 li-bullet-2">
            <span className="c0">
              in any way bypass or circumvent any other measure employed to
              limit or pre-vent access to the Platform or its ;
            </span>
          </li>
          <li className="c7 li-bullet-2">
            <span className="c0">
              violate the security of the Platform or attempt to gain
              unauthorized access to the Platform, data, materials, information,
              computer systems or networks connected to any server associated
              with this Platform, through hacking, password mining or any other
              means;
            </span>
          </li>
          <li className="c7 li-bullet-1">
            <span className="c0">
              interfere or attempt to interfere with the proper working of the
              Platform or any activities conducted on or through the Platform,
              including accessing any data, &nbsp;or other information prior to
              the time that it is intended to be available to the public on the
              Platform;
            </span>
          </li>
          <li className="c7 li-bullet-2">
            <span className="c0">
              take or attempt any action that, in the sole discretion of this
              Platform&#39;s operators, imposes or may impose an unreasonable or
              disproportionately large load or burden on the Platform or such
              operation&#39;s infrastructure.
            </span>
          </li>
        </ol>

        <span className={classes.listTitle}>
          9. CONTACT INFORMATION GRIEVANCE OFFICER
        </span>

        <ol className="c6 start" start="1">
          <li>
            <span className="c0">
              Any concerns, questions or grievances arising out of or pertaining
              to either this Agreement or the Services provided herein can be
              raised at{" "}
            </span>
            <span className="c13 c20">
              <Link className="c9" href="mailto:support@payorb.in">
                support@payorb.in
              </Link>
            </span>
            <span className="c0">&nbsp;.</span>
          </li>
          <li>
            <span className="c0">
              Payorb, in accordance with the Information Technology Act, 2000,
              and the rules made there under, hereby appoints a grievance
              officer. Should the user have any grievance with respect to the
              Platform or the service or suffer as a result of access or usage
              of our Platform by any person in violation of Rule 3 of The
              (Indian) Information Technology (Intermediaries Guidelines) Rules,
              2011, the Grievance Officer can be contacted at:
            </span>
          </li>
        </ol>
        <p className={classes.contactInfo}>
          <span className="c10">
            Name: Madhurima <br />
            Address:&nbsp;Vanickel Labs. LLP. A-208, Aparna Tower, Kothaguda.
            Hyderabad
            <br />
            Phone:&nbsp;9966879447
            <br />
            Email:{" "}
          </span>
          <span className="c13">
            <Link className="c9" href="mailto:support@payorb.in">
              support@payorb.in
            </Link>
          </span>
          <span className="c0">&nbsp;</span>
        </p>

        <span className={classes.listTitle}>10. SEVERABILITY</span>

        <p className="c2">
          <span className="c0">
            If any provision within this Agreement is held by a court of
            competent jurisdiction to be unenforceable under applicable law,
            then such provision shall be excluded from this Agreement and the
            remainder of the Agreement shall be interpreted as if such provision
            were so non existent and the remainder Agreement shall be
            enforceable as-is.
          </span>
        </p>

        <span className={classes.listTitle}>11. WAIVER</span>

        <p className="c2 c3">
          <span className="c0">
            No provision of this Agreement shall be deemed to be waived and no
            breach shall be excused, unless such waiver or consent is given to
            the user in writing.
          </span>
        </p>
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

export default PolicyTermsAndConds;
