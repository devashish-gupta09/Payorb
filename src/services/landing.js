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
    titleSection1: "One",
    titleSection2: "Platform",
    titleSection3: "Infinite Opportunities",
    description: "A place to start & grow all your business ideas",
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
    title: "What Payorb Offers You",
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "FEATURES",
    description:
      "Our platform helps you transition into the freelance ecosystem at a faster pace by taking care of all basic operational barriers to starting something new: Online presence, bookings, payment, CRM all at one space.",
    features: [
      {
        title: "Event",
        description: "Event creation or On-on-one service bookings",
        image: "/assets/features/eventCreation.png",
      },

      {
        title: "Booking",
        description: "Easy one-click event booking for your clients",
        image: "/assets/features/eventBooking.png",
      },
      {
        title: "Instant Payouts",
        description: "Receive money in your account sooner than you think",

        image: "/assets/features/payments.png",
      },
      {
        title: "Reviews",
        description: "Verified user reviews to boost profile credibility",
        image: "/assets/features/rating.png",
      },
      {
        title: "Analytics",
        description: "Real-time analytics for your business",
        image: "/assets/features/analytics.png",
      },
      {
        title: "Social Media Sharing",
        description: "Easy marketing of your events",
        image: "/assets/features/social-media.png",
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
    description:
      "Track every penny flowing in and each customer joining your network, in real time",
    image:
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FDashboard.png?alt=media&token=a6e600cf-672f-4342-8785-ab97353dee22",
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
      "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/landing-page-assets%2FEvent.png?alt=media&token=decc0f20-fdf4-46f4-8760-99cd27a6a721",
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
