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