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
  