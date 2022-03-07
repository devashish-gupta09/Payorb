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
      "With your personal virtual online workspace, accessible anytime, anywhere.👋",
    urls: [],
  };
  // }
};

export const getHowItWorksContent = async () => {
  return {
    title: "How it works?",
    image: "/assets/howItWorks/video-bg.svg",
    works: [
      {
        title: "Create your profile",
        description:
          "Input material at the beginning of farming cycle is the most important aspect that determines the quality.",
        image: "/assets/howItWorks/create-profile.svg",
      },
      {
        title: "List your Services",
        description:
          "Input material at the beginning of farming cycle is the most important aspect that determines the quality.",
        image: "/assets/howItWorks/services.svg",
      },
      {
        title: "Bookings & Payments",
        description:
          "Dynamically architect real-time web services for installed base systems.",
        image: "/assets/howItWorks/booking-payment.svg",
      },
    ],
  };
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

export const getVision = async () =>
{
  return{
    title:"Vision",
    para1: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",

    para2: "Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",
    
    para3: "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    para4: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  }
}

export const getPayOrbStory =async () =>{
  return{
    title:"Story of PayOrb",
    section1: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",

    section2: "Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",
    
    section3: "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    section4: "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  }
}

export const getFoundersData= async()=>{
  return{
    details:[
      {
        image:"/assets/aboutUs/VindeshRaghuwanshi.svg",
        name:"VINDESH RAGHUWANSHI",
        title:"COO",
      },
      {
        image:"/assets/aboutUs/DeepamChakrwarty.svg",
        name:"DEEPAM CHAKRWARTY",
        title:"CTO",
      },
    ],
  };
}

export const getAdvisorsData= async()=>{
  return{
    details:[
      {
        image:"/assets/aboutUs/NSRaghuwanshi.svg",
        name:"Dr. N. S. RAGHUWANSHI",
        title:"Ph. D. (Univ. of California, Davis) ",
        description:"Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
      {
        image:"/assets/aboutUs/NSRaghuwanshi2.svg",
        name:"Dr. N. S. RAGHUWANSHI",
        title:"Ph. D. (Univ. of California, Davis) ",
        description:"Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
      {
        image:"/assets/aboutUs/NSRaghuwanshi3.svg",
        name:"Dr. N. S. RAGHUWANSHI",
        title:"Ph. D. (Univ. of California, Davis) ",
        description:"Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
    ],
  };
}