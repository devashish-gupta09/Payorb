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
    titleSection1: "The world is full of opportunities.",
    titleSection2: "Our goal is to help you realise yours.",
    // titleSection3: "",
    // description:
    //   "With your personal virtual online workspace, accessible anytime, anywhere.👋",
    // urls: [],
  };
  // }
};

export const getVision = async () => {
  return {
    title: "Vision",
    para1:
      "Our vision is to make solopreneurship a smooth route to success, by empowering people with digital tools which help turn their passion and ideas into businesses.",

    para2:
      "We are here to simplify your life as a solopreneur by offering you one single platform to launch, manage and scale up your services seamlessly.",

    // para3:
    //   "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    // para4:
    //   "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  };
};

export const getWhatAreWeHereFor = async () => {
  return {
    title: "What are we here for...",
    section1:
      "Entrepreneurship, Side hustle, passion project, these aren’t jargons anymore, it is everywhere around us. The meaning of a fulfilling career is rapidly changing, and independent income sources or multiple income sources are becoming important for a fulfilling career to many people. Ever wondered how so many people are turning their passions into a viable business? What does it take to start something of your own?",

    section2: "All it takes is an idea!",

    section3:
      "PayOrb aims to bridge the gap between one’s passion and a potential business venture. Our online platform is designed to help you establish yourself as an independent professional. If you have an idea for a viable business, PayOrb facilitates you to establish it into a seamlessly running professional set up.",
  };
};

export const getPayOrbStory = async () => {
  return {
    title: "Story of PayOrb",
    section1:
      "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",

    section2:
      "Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",

    section3:
      "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    section4:
      "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  };
};

export const getFoundersData = async () => {
  return {
    details: [
      {
        image: "/assets/aboutUs/madhurimaRoy.png",
        name: "MADHURIMA ROY",
        title: "Operations & Marketing",
      },
      {
        image: "/assets/aboutUs/abhinavVishwa.png",
        name: "ABHINAV VISHWA",
        title: "Tech",
      },
    ],
  };
};

export const getAdvisorsData = async () => {
  return {
    details: [
      {
        image: "/assets/aboutUs/NSRaghuwanshi.svg",
        name: "Dr. N. S. RAGHUWANSHI",
        title: "Ph. D. (Univ. of California, Davis) ",
        description:
          "Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
      {
        image: "/assets/aboutUs/NSRaghuwanshi2.svg",
        name: "Dr. N. S. RAGHUWANSHI",
        title: "Ph. D. (Univ. of California, Davis) ",
        description:
          "Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
      {
        image: "/assets/aboutUs/NSRaghuwanshi3.svg",
        name: "Dr. N. S. RAGHUWANSHI",
        title: "Ph. D. (Univ. of California, Davis) ",
        description:
          "Director MANIT, Mentor Director, IIIT Bhopal and Professor, IIT Kharagpur. He has over 25 years of research experience in IT application in agricuture. Seven developed software are copyrighted. He is a fellow of INAE and NAAS",
      },
    ],
  };
};
