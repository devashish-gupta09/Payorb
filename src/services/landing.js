export const getHomeContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/home`);
  //   const urls = res.data.carousel.map((image) =>
  //     buildImageUrl(image.formats.large.url)
  //   );

  //   return {
  //     titleSection1: res.data.titleSection1,
  //     titleSection2: res.data.titleSection2,
  //     titleSection3: res.data.titleSection3,
  //     description: res.data.description,
  //     urls,
  //   };
  // } catch (err) {
  //   console.error(err.message);
  return {
    titleSection1: "Up your multitasking game as a",
    titleSection2: "SOLOPRENEUR!",
    titleSection3: "",
    description:
      "With your personal virtual online workspace, accessible anytime, anywhere.",
    urls: [
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2Flanding-carousel4.jpg?alt=media&token=4f5c9789-9a19-4f7b-ab9e-7d1e61c27d7a",
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2Flanding-caraousel1-resize.jpg?alt=media&token=0d0f4234-d01f-4adf-8cc0-b26ad7be5cf1",
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2Flanding-caraousel2.jpg?alt=media&token=e620258a-6971-4257-a13c-79138d54982c",
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2Flanding-carousel3.jpg?alt=media&token=3abb2f45-e52c-47a0-9cd9-4279ab817f8b",
    ],
  };
  // }
};

export const getFeaturesContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/feature-section`);

  //   res.data.features.map((feature, index) => {
  //     res.data.features[index].image = buildImageUrl(feature.image.url);
  //   });

  //   return {
  //     title: res.data.title,
  //     sectionLogo: buildImageUrl(res.data.sectionLogo.url),
  //     sectionTitle: res.data.sectionTitle,
  //     features: res.data.features,
  //   };
  // } catch (err) {
  //   console.error(err.message);
  return {
    topPara:
      "The desire for having a more flexible and fulfilling career path has led to Freelancing & solo entrepreneurship supplementing and complementing existing 9-5 worklife. When people think of venturing out on their own, the thought of all the efforts required in 'managing the business' holds them back. Hours spent in planning your offering, client communications, promoting your offering, booking reminders, scheduling & rescheduling, managing payments, follow up for feedback & reviews, and the list goes on...",
    bottomPara: "Don't let all these overwhelm & hold you back.",
    title: "Features",
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "Features",
    description:
      "Our platform helps you transition into the freelance ecosystem at a faster pace by taking care of all basic operational barriers to starting something new: Online presence, bookings, payment, CRM all at one space.",
    features: [
      {
        title: "Online Presence",
        description: "Dynamically architect real-time web services for installed base systems",
        image: "/assets/features/onlinePresence.svg",
      },

      {
        title: "Unlimited service listings",
        description: "Dynamically architect real-time web services for installed base systems",
        image: "/assets/features/UnlimitedServiceListing.svg",
      },
      {
        title: "Bookings & Payments",
        description: "Dynamically architect real-time web services for installed base systems",

        image: "/assets/features/Bookings&Payments.svg",
      },
      {
        title: "Verified Reviews",
        description: "Dynamically architect real-time web services for installed base systems",
        image: "/assets/features/VerifiedReview.svg",
      },
      {
        title: "Business Dashboards",
        description: "Dynamically architect real-time web services for installed base systems",
        image: "/assets/features/BusinessDashboard.svg",
      },
      {
        title: "One Click Promotions",
        description: "Dynamically architect real-time web services for installed base systems",
        image: "/assets/features/OneClickPromotions.svg",
      },
    ],
  };
  // }
};

export const getEventRegistrationContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/event-registration`);

  //   return {
  //     sectionLogo: buildImageUrl(res.data.sectionLogo.url),
  //     sectionTitle: res.data.sectionTitle,
  //     title: res.data.title,
  //     description: res.data.description,
  //     image: buildImageUrl(res.data.image.url),
  //   };
  // } catch (err) {
  return {
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "Event Registration",
    title: "Complete Business Dashboard",
    description: "Track every penny flowing in and each customer joining your network, in real time",
    image:
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FDashboard.jpg?alt=media&token=29ff26b6-abae-4d67-bb57-19f718417be4",
  };
  // }
};

export const getUserRegistrationContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/user-registration`);

  //   return {
  //     sectionLogo: buildImageUrl(res.data.sectionLogo.url),
  //     sectionTitle: res.data.sectionTitle,
  //     title: res.data.title,
  //     description: res.data.description,
  //     image: buildImageUrl(res.data.image.url),
  //   };
  // } catch (err) {
  //   console.error(err.message);
  return {
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "User Registration",
    title: "Unlimited Events Creation",
    description:
      "Create Group events and One-on-one services, Monetize all your business ideas.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FEvent.jpg?alt=media&token=5e1ad1da-90d9-4ab2-93c9-f25ecf1c6145",
  };
  // }
};

export const getClientReviewContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/client-review`);

  //   res.data.clients.map((client, index) => {
  //     res.data.clients[index].image = buildImageUrl(
  //       client.image.formats.thumbnail.url
  //     );
  //   });

  //   return {
  //     title: res.data.title,
  //     sectionLogo: buildImageUrl(res.data.sectionLogo.url),
  //     sectionTitle: res.data.sectionTitle,
  //     clients: res.data.clients,
  //   };
  // } catch (err) {
  //   console.error(err.message);
  return {
    title: "Client Words",
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "REVIEW",
    clients: [
      {
        name: "Jonathon",
        review:
          "salkfhjsafsnfsda f sdaf sadf sadf saf sa fsa fsa dfnbadsf dsafsad f sadf sadf sad fdsa fdsa f dsaf",
        image:
          "https://storage.googleapis.com/bucket_icon_assets/assets/Ellipse%201.png",
      },
    ],
  };
  // }
};

export const getUserBenefits = async () => {

  return{
    title:"Why choose Payorb?",
    contentSection1: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",
    contentSection2: "Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",
    contentSection3: "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    contentSection4: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  }
}

export const getFeatureBookings= async () =>{
  return{
    title:"People who are ready to book events"
  }
}

export const getGrowthContent = async () => {
  // try {
  //   const res = await axios.get(`${CMS_URL}/growth`);

  //   res.data.growth_points.map((point, index) => {
  //     res.data.growth_points[index].image = buildImageUrl(point.pointImage.url);
  //   });

  //   return {
  //     title: res.data.title,
  //     sectionLogo: buildImageUrl(res.data.sectionLogo.url),
  //     sectionTitle: res.data.sectionTitle,
  //     growthPoints: res.data.growth_points,
  //   };
  // } catch (err) {
  //   console.error(err.message);
  return {
    title: "Platform Pricing",
    sectionLogo:
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FGroup%20(1).png?alt=media&token=b3134df5-8143-43e9-b425-55bf168a3bdb",
    sectionTitle: "Platform pricing",
    growthPoints: [
      {
        description: "Zero Onboarding Fee",
        image:
          "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FGroup%20(2).png?alt=media&token=e0918a49-8343-4f3b-b8f8-be7de1a0e9df",
      },

      {
        description: "No annual subscription charges",
        image:
          "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FGroup%20(2).png?alt=media&token=e0918a49-8343-4f3b-b8f8-be7de1a0e9df",
      },

      {
        description:
          "Platform Usage Charges 6% (+ taxes), reduced to 4.5% (+ taxes) for early users",
        image:
          "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FGroup%20(2).png?alt=media&token=e0918a49-8343-4f3b-b8f8-be7de1a0e9df",
      },
    ],
    // };
  };
};