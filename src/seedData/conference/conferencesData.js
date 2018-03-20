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
];

module.exports = conferences;
