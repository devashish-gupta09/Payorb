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
    titleSection1: "Up your multitasking game as a ",
    titleSection2: "SOLOPRENEUR!",
    titleSection3: "",
    image: "/assets/solopreneur/videobg.svg",
    imageMobile: "/assets/solopreneur/videobg-mobile.svg",
    description:
      "With your personal virtual online workspace, accessible anytime, anywhere.👋",
    urls: [],
  };
  // }
};

export const getSolopreneurAdvantages = async () => {
  return {
    title: "Advantages of being a Solopreneur",
    para1:
      "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",
    para2:
      " Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",
    checklist1: [
      {
        item: "Collaboratively extend end-to-end quality vectors via client-centric catalysts for change. Phosfluorescently.",
      },
      {
        item: "Lorem ipsum dolor sit amet.",
      },
      {
        item: "Consectetur adipiscing elit.",
      },
      {
        item: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        item: "Lorem ipsum dolor sit amet.",
      },
    ],
    checklist2: [
      {
        item: "Collaboratively extend end-to-end quality vectors via client-centric catalysts for change. Phosfluorescently.",
      },
      {
        item: "Lorem ipsum dolor sit amet.",
      },
      {
        item: "Consectetur adipiscing elit.",
      },
      {
        item: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        item: "Lorem ipsum dolor sit amet.",
      },
    ],
  };
};

export const getSolopreneurStories = async () => {
  return {
    title: "Success Stories",
    bannerStory: {
      image: "/assets/solopreneur/SuccessStories/cover-issue1.svg",
      headline: "long established",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
      date: "May 20th 2020",
    },
    stories: [
      {
        image: "/assets/solopreneur/SuccessStories/cover-issue2.svg",
        headline: "long established",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
        date: "May 20th 2020",
      },
      {
        image: "/assets/solopreneur/SuccessStories/cover-issue3.svg",
        headline: "long established",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
        date: "May 20th 2020",
      },
      {
        image: "/assets/solopreneur/SuccessStories/cover-issue4.svg",
        headline: "long established",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
        date: "May 20th 2020",
      },
      {
        image: "/assets/solopreneur/SuccessStories/cover-issue1.svg",
        headline: "long established",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....",
        date: "May 20th 2020",
      },
    ],
  };
};

export const getSolopreneurLife = async () => {
  return {
    title: "Life of a Solopreneur",
    para1:
      "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before covalent web services. Holisticly empower sticky customer service with sticky bandwidth.",
    para2:
      "Distinctively supply granular collaboration and idea-sharing through effective information. Progressively monetize functionalized results without equity invested vortals. Progressively harness value-added systems through backward-compatible markets. Conveniently morph interactive synergy via cutting-edge manufactured products. Interactively supply proactive scenarios and fully tested functionalities.",
    para3:
      "Dynamically drive progressive experiences after parallel paradigms. Enthusiastically predominate prospective technology and alternative channels.",
    para4:
      "Professionally incentivize future-proof data whereas out-of-the-box action items. Appropriately administrate client-centric testing procedures vis-a-vis inexpensive methodologies. Conveniently morph vertical ROI via focused value. Continually productize resource sucking processes before ",
  };
};
