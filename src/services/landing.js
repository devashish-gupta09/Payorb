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
    titleSection1: "Let your passion lead you to",
    titleSection2: " new opportunities.",
    titleSection3: "",
    description: "The smartest first step for the Solopreneur in you.",
    urls: [],
  };
  // }
};

export const getHowItWorksContent = async () => {
  return {
    title: "How to get started with PayOrb?",
    image: "/assets/howItWorks/video-bg.svg",
    works: [
      {
        title: "Create your profile",
        description:
          "Fill in your basic details, link your socials.\n" +
          "Take your business online in less than 5 minutes.\n" +
          "Your profile is now ready to take you places!",
        image: "/assets/howItWorks/create-profile.svg",
      },
      {
        title: "List your Services",
        description:
          "You have a service to offer? Here’s where you introduce it to the rest of the world. One on one appointments or group events, as many as you want.",
        image: "/assets/howItWorks/services.svg",
      },
      {
        title: "Bookings & Payments",
        description:
          "Bookings, payments, reviews, CRM, and more. One workspace for all your operational needs.",
        image: "/assets/howItWorks/booking-payment.svg",
      },
    ],
  };
};

export const getWhyChooseUsContent = async () => {
  return {
    title: "Why Solopreneurs choose PayOrb?",
    subtitle:
      "Foolproof growth hacks for Solopreneurs: Delegate & Automate. You focus on what you do best, and let us handle the rest.",
    testimonies: [
      {
        name: "Gina",
        content:
          "“Thank you PayOrb for making my life so much easier. It is so easy to use, and it saves me so much time. My students also love PayOrb”",
        img: "/assets/whyChooseUs/gina.png",
      },
      {
        name: "Ahona",
        content:
          "“The easiest way to take your solo business online! The best thing about PayOrb is its simplicity. You can create your online presence in just 2 minutes, no technological expertise required.”",
        img: "/assets/whyChooseUs/ahona.png",
      },
      {
        name: "Sakshi",
        content:
          "“PayOrb gave the professional touch to my online classes booking, and my students liked the experience. I can manage & utilise all my customer database very easily”",
        img: "/assets/whyChooseUs/sakshi.png",
      },
    ],
  };
};

export const getPricingContent = async () => {
  return {
    title: "Platform pricing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    img: "/assets/pricing/pricing-img.svg",
    plans: [
      {
        feature: "Free Sign-up",
      },
      {
        feature: "No Monthly or annual subscription",
      },
      {
        feature: "Free trial class & promotional dashboard features",
      },
      {
        feature:
          "Service fee of 4.5 % (plus tax) on transactions facilitated by PayOrb. This includes payment gateway fee.",
      },
    ],
  };
};

export const getFaqsContent = async () => {
  return {
    title: "FAQ's",
    image: "/assets/faqs/faq-img.svg",
    faqs: [
      {
        ques: "What all services does PayOrb provide?",
        ans: "PayOrb is a platform that helps solopreneurs & independent professionals launch, manage and scale up their services seamlessly. It helps solopreneurs create an online presence, manage bookings & payments, CRM automations, reviews, promotions, and much more through an easy to use platform.",
      },
      {
        ques: "I am not a full time freelancer, I host services and classes as a side hustle. Is PayOrb suitable for me?",
        ans: "Absolutely. We understand the value of time for side hustlers. PayOrb helps you double your income, by taking the business execution chores off your schedule. You focus on what you do best, and let us handle the rest.",
      },
      {
        ques: "Does PayOrb help me in getting new clients?",
        ans: "We have specially designed features to help Solopreneurs grow their client base. Our ‘Trial Class feature’ helps you take your business from 0 to 1 (get your first client), Our ‘promotion automation tool’ helps you promote your services to hundreds of prospective customers on one click and double your customer acquisition. ",
      },
      {
        ques: "Do my clients need to create an account on PayOrb to buy my offerings?",
        ans: "We have specially designed features to help Solopreneurs grow their client base. Our ‘Trial Class feature’ helps you take your business from 0 to 1 (get your first client), Our ‘promotion automation tool’ helps you promote your services to hundreds of prospective customers on one click and double your customer acquisition. ",
      },
      {
        ques: "What all payment methods are accepted?",
        ans: "We facilitate transactions from all Debit cards, Credit cards & UPIs.",
      },
      {
        ques: "Are there any hidden charges apart from service fee?",
        ans: "No. PayOrb charges Zero Onboarding Fee. No monthly or annual charges for basic tier. We only deduct a Platform Usage fee of only 4.5% (+ taxes) on your transactions facilitated through PayOrb.",
      },
      {
        ques: "Do I need to have a GST number to create an account on PayOrb?",
        ans: "Not necessarily. Independent professionals (freelancers) using PayOrb for facilitating their services are liable to handle matters of taxation (ITR filing) at their end as per provisions of Income Tax Act.",
      },
      {
        ques: "Do you offer any discounts for bigger business houses or institutes?",
        ans: "Yes. We do offer tailored service fees for Service SMBs. Please drop us a query, and we will get back to you within 24hrs.",
      },
    ],
  };
};

export const getSignInContent = async () => {
  return {
    titleSection1: "One Platform",
    titleSection2: "Infinite Opportunities!",
  };
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

export const getFeaturesContent = async () => {
  return {
    topPara:
      "The desire for having a more flexible and fulfilling career path has led to Freelancing & solo entrepreneurship supplementing and complementing existing 9-5 worklife. When people think of venturing out on their own, the thought of all the efforts required in 'managing the business' holds them back. Hours spent in planning your offering, client communications, promoting your offering, booking reminders, scheduling & rescheduling, managing payments, follow up for feedback & reviews, and the list goes on...",
    bottomPara: "Don't let all these overwhelm & hold you back.",
    title: "Features",
    sectionLogo:
      "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
    sectionTitle: "At PayOrb you enjoy",
    description:
      "Our platform helps you transition into the freelance ecosystem at a faster pace by taking care of all basic operational barriers to starting something new: Online presence, bookings, payment, CRM all at one space.",
    features: [
      {
        title: "Simplified Workspace for Solopreneurs",
        description: "Setting up your business online has never been easier!",
        image: "/assets/features/onlinePresence.svg",
      },

      {
        title: "Unlimited service listings",
        description:
          "Create unlimited listings of group events or one-on-one appointments. ",
        image: "/assets/features/UnlimitedServiceListing.svg",
      },
      {
        title: "Easy Bookings & Payments",
        description:
          "One-click bookings for your clients & instant payouts for you!",
        image: "/assets/features/Bookings&Payments.svg",
      },
      {
        title: "Automated Verified Reviews",
        description:
          "Our automated review tool captures reviews from all your customers, and helps build your credentials.",
        image: "/assets/features/VerifiedReview.svg",
      },
      {
        title: "Business Dashboards",
        description:
          "Realtime updates & analytics of your business, all at one place. The real power-tool to keep it running smoothly.",
        image: "/assets/features/BusinessDashboard.svg",
      },
      {
        title: "One Click Promotions",
        description:
          "Integrated automations to promote your offerings to hundreds of prospective customers, with just one click!",
        image: "/assets/features/OneClickPromotions.svg",
      },
    ],
  };
  // }
};
