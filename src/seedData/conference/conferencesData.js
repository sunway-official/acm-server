// eslint-disable-next-line no-extend-native
Date.prototype.addDays = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const today = new Date();

const dl_submit_abstract = today.addDays(10);
const dl_review_abstract = today.addDays(15);
const dl_release_abstract = today.addDays(20);
const dl_re_submit_abstract = today.addDays(30);
const dl_re_review_abstract = today.addDays(32);
const dl_release_final_abstract = today.addDays(40);
const dl_submit_paper = today.addDays(45);
const dl_review_paper = today.addDays(50);
const dl_release_paper = today.addDays(60);
const dl_re_submit_paper = today.addDays(65);
const dl_re_review_paper = today.addDays(70);
const dl_release_final_paper = today.addDays(75);
const dl_registration = today.addDays(80);
const start_date = today.addDays(85);
const end_date = today.addDays(90);
const created_at = today;
const updated_at = today;

const conferences = [
  {
    title: 'Hoi nghi quoc te SigTelCom 2017',
    description:
      'International Conference on Recent Advances on Signal Processing, Telecommunications & Computing',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'HoinghiquocteSigTelCom2017.png',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '6',
  },
  {
    title: 'Block Chain for Big Coin',
    description:
      'The practical consequence […is…] for the first time, a way for one Internet user to transfer a unique piece of digital property to another Internet user, such that the transfer is guaranteed to be safe and secure, everyone knows that the transfer has taken place, and nobody can challenge the legitimacy of the transfer. The consequences of this breakthrough are hard to overstate.',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'HoinghiCDIOvungchauA2017.png',
    organizer_detail_id: '2',
    address_id: '2',
    user_id: '2',
  },
  {
    title: 'Hoi nghi Sinh viên ASEAN 2018',
    description: 'P2A – Passage to ASEAN ',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'HoinghiSinhviênASEAN2016.png',
    organizer_detail_id: '3',
    address_id: '3',
    user_id: '6',
  },
  {
    title: 'Hoi nghi Quan he hop tac giua DTU voi cong dong doanh nghiep',
    description:
      'Phat trien Quan he hop tac giua DTU voi cong dong doanh nghiep ',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'QuanhehoptacgiuaDTUvoicongdongdoanhnghiep.png',
    organizer_detail_id: '4',
    address_id: '4',
    user_id: '4',
  },
  {
    title: 'Hoi nghi Nghien cuu khoa hoc sinh vien Duy Tan',
    description:
      'Encourage more students to dedicate themselves to scientific research. If we succeed in doing this, a new era will open up for us in the 21st century',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'QuanhehoptacgiuaDTUvoicongdongdoanhnghiep.png',
    organizer_detail_id: '5',
    address_id: '5',
    user_id: '5',
  },
  {
    title: 'Hoi nghi Cac truong dai hoc ngoai cong lap',
    description:
      'Muc dich: tim cac giai phap phat trien he thong giao duc ngoai cong lap mot cach ben vung ',
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
    dl_registration,
    start_date,
    end_date,
    created_at,
    updated_at,
    bg_image: 'HoinghiCactruongdaihocngoaiconglap.png',
    organizer_detail_id: '6',
    address_id: '7',
    user_id: '6',
  },

  // *******************************************************
  // ******** Seed data by Thong Nguyen    *****************
  // ******** Last update: April 02, 2018  *****************
  // *******************************************************

  // id 01
  {
    title:
      'The Second International Conference on Information Technology Applications in Medicine',
    description:
      'Currently many different applications areas for Virtual Reality (VR) and Augmented Reality (AR) are being explored. A particularly promising application area for VR/AR is Healthcare and Medicine. Various use-cases for this application area are being researched and developed, software applications are already being published and used in various settings from education and training to patient assessments and diagnoses, treatments and operations. However, we do not have a clear overview how effective these are, nor whether these software solutions are adequate replacements or additions in the long-term. Additionally, combining VR/AR technologies with Artificial Intelligence (AI) and the Internet of Things (IoT) will provide powerful, largely unexplored application areas that will revolutionize Healthcare and Medicine practice. The main purposes of this special session are to allow researchers, software developers and practitioners to showcase novel use-cases and applications, present empirical research results from user-centered qualitative and quantitative experiments of these new applications, and facilitate a discussion forum to explore the latest trends in new VR/AR Healthcare and Medicine applications.',
    start_date: '09/20/2018',
    end_date: '09/21/2018',
    bg_image:
      'http://dev.duytan.edu.vn:8045/ndJK184IUkdfn23df675/coms/images/citam2018-636560275482809088.jpg',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '6/15/2018',
    dl_review_paper: '6/21/2018',
    dl_release_paper: '6/22/2018',
    dl_re_submit_paper: '7/22/2018',
    dl_re_review_paper: '8/5/2018',
    dl_release_final_paper: '8/6/2018',
    dl_registration: '8/7/2018',
  },

  // id 02

  {
    title: 'INTERNATIONAL FOOD TOURISM FORUM',
    description:
      'As a part of the 3 rd Annual Hoi An International Food Festival to be held in Hoi An, Vietnam from March 11 to 17, 2018, Duy Tan University in collaboration with Hoi An Culinary Events and the Danang Department of Tourism will hold the International Food Tourism Forum. With “Taste the World” as its theme, the International Food Tourism Forum provides opportunities for local Vietnamese food-related businesses to meet and exchange information with famous international counterparts and connects tourism training units with tourism companies to improve tourism development of Danang city and promote Danang’s cultural and tourism image to the world. Participants include Mr. Thomas Gugler, President of the World Association of Chefs Societies, 12 renowned chefs from Switzerland, France, South Africa, Japan, China, Spain, The Netherlands, Cook Islands, Turkey, Norway, Ecuador and Italy, and many well-known speakers such as Dr. Wantanee joint Editor-in-Chief of the journal “Tourism, Culture & Communication” from the School of Hotel and Tourism Management, The Hong Kong Polytechnic University, Mr. Edward Koh, Excutive Director, South East Asia, Singapore Tourism Board and others. The International Food Tourism Forum takes place at Duy Tan University, 03 Quang Trung Street, Hall 713, on March 15, 2018.',
    start_date: '3/15/2018',
    end_date: '3/15/2018',
    bg_image:
      'http://dev.duytan.edu.vn:8045/ndJK184IUkdfn23df675/coms/images/food_2018_banner_confs-636558437244524661.jpg',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '',
    dl_review_paper: '',
    dl_release_paper: '',
    dl_re_submit_paper: '',
    dl_re_review_paper: '',
    dl_release_final_paper: '',
    dl_registration: '',
  },

  // id 03
  {
    title: 'CDIO REGIONAL MEETING - ASIA-PACIFIC',
    description:
      'The CDIO™ INITIATIVE is an innovative educational framework for producing the next generation of engineers. The framework provides students with an education stressing engineering fundamentals set in the context of Conceiving - Designing - Implementing - Operating (CDIO) real-world systems and products. Throughout the world, CDIO Initiative collaborators have adopted CDIO as the framework of their curricular planning and outcome-based assessment. CDIO collaborators recognize that an engineering education is acquired over a long period and in a variety of institutions, and that educators in all parts of this spectrum can learn from practice elsewhere. The CDIO network therefore welcomes members in a diverse range of institutions ranging from research-led internationally acclaimed universities to local colleges dedicated to providing students with their initial grounding in engineering.',
    start_date: '3/11/2018',
    end_date: '3/14/2018',
    bg_image:
      'http://dev.duytan.edu.vn:8045/ndJK184IUkdfn23df675/coms/images/slide-banner-1-636493993928319645.jpg',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '',
    dl_review_paper: '',
    dl_release_paper: '',
    dl_re_submit_paper: '',
    dl_re_review_paper: '',
    dl_release_final_paper: '',
    dl_registration: '',
  },

  // id 04
  {
    title:
      '4TH INTERNATIONAL CONFERENCE ON INFORMATION SYSTEM DESIGN AND INTELLIGENT APPLICATIONS',
    description:
      'The 4th International Conference on Information Systesm Design and Intelligent Applications ( INDIA-2017 ) will be held in Duy Tan University, Da Nang, Vietnam during June 15-17, 2017. The Proceedings of INDIA-2017 will be published in Springer AISC Series and are indexed by ISI Proceedings, EI-Compendex, DBLP, SCOPUS, Google Scholar and Springerlink. Also, out of the papers being presented during INDIA-2017, the extended versions of shortlisted and recommended papers, from each track, shall be considered for publication in International Journals (non-paid) under (Scopus, DBLP & ACM indexed) Inderscience and IGI Global publications.',
    start_date: '6/15/2017',
    end_date: '6/17/2017',
    bg_image: '',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '4/10/2017',
    dl_review_paper: '4/9/2017',
    dl_release_paper: '4/20/2017',
    dl_re_submit_paper: '4/26/2017',
    dl_re_review_paper: '5/1/2017',
    dl_release_final_paper: '5/1/2017',
    dl_registration: '5/3/2017',
  },

  // id 05
  {
    title:
      'ICERE 2018: 2018 4th International Conference on Environment and Renewable Energy',
    description:
      'Welcome to the official website of the 2018 4th International Conference on Environment and Renewable Energy (ICERE 2018). It will be held during February 25-27, 2018 in Da Nang, Vietnam. ICERE 2018, is to bring together innovative academics and industrial experts in the field of Environment and Renewable Energy to a common forum.',
    start_date: '2/25/2018',
    end_date: '2/26/2018',
    bg_image: '',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '12/20/2017',
    dl_review_paper: '1/9/2018',
    dl_release_paper: '1/10/2018',
    dl_re_submit_paper: '2/10/2018',
    dl_re_review_paper: '2/18/2018',
    dl_release_final_paper: '12/20/2017',
    dl_registration: '1/25/2018',
  },

  // id 06
  {
    title:
      'The 6th International Conference on Matrix Analysis and Applications (ICMAA 2017)',
    description:
      'This meeting aims to stimulate research and interaction of mathematicians in all aspects of linear and multilinear algebra, matrix analysis, graph theory, and their applications and to provide an opportunity for researchers to exchange ideas and developments on these subjects. The previous conferences were held in China (Beijing, Hangzhou), United States (Nova Southeastern University), and Turkey (Selcuk University, Konya). Former keynote speakers are Roger Horn, Richard Brualdi, Chi-Kwong Li, Steve Kirkland, Alexander A. Klyachko (ILAS guest speaker), and Shmuel Friedland.',
    start_date: '6/15/2017',
    end_date: '6/18/2017',
    bg_image: '',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '5/15/2017',
    dl_review_abstract: '5/18/2017',
    dl_release_abstract: '5/19/2017',
    dl_re_submit_abstract: '5/22/2017',
    dl_re_review_abstract: '5/25/2017',
    dl_release_final_abstract: '5/26/2017',
    dl_submit_paper: '6/1/2017',
    dl_review_paper: '1/3/2017',
    dl_release_paper: '6/3/2017',
    dl_re_submit_paper: '6/7/2017',
    dl_re_review_paper: '6/9/2017',
    dl_release_final_paper: '6/10/2017',
    dl_registration: '6/15/2017',
  },

  // id 07
  {
    title:
      '2017 International Conference on Recent Advances on  Signal Processing, Telecommunications & Computing (SigTelCom)',
    description:
      'The International Conference on Recent Advances on Signal Processing, Telecommunications & Computing (SigTelCom 2017) will be organised at Duy Tan University, Da Nang, Vietnam on January 9-11th 2017. SigTelCom 2017 will feature a comprehensive technical programme that spans most state-of-the-art research in all fields of Signal Processing, Telecommunications and Computing. Conference attendees will be hearing from world-class speakers in keynotes and tutorials sessions, as well as presenting their own original technical works. The focus of SigTelCom 2017 will be on Signal Processing, Telecommunications and Computing theory, algorithms, and applications. Prospective authors are invited to submit their technical paper(s) in the following topics of interest.',
    start_date: '1/9/2017',
    end_date: '1/11/2017',
    bg_image: '',
    create_at: '2/04/2018',
    organizer_detail_id: '1',
    address_id: '1',
    user_id: '1',
    dl_submit_abstract: '',
    dl_review_abstract: '',
    dl_release_abstract: '',
    dl_re_submit_abstract: '',
    dl_re_review_abstract: '',
    dl_release_final_abstract: '',
    dl_submit_paper: '8/31/2016',
    dl_review_paper: '10/6/2016',
    dl_release_paper: '10/7/2016',
    dl_re_submit_paper: '10/15/2016',
    dl_re_review_paper: '10/22/2016',
    dl_release_final_paper: '10/23/2016',
    dl_registration: '10/30/2016',
  },
];

module.exports = conferences;
