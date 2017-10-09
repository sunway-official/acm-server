const faker = require('faker');

const newsPhotos = [
  {
    news_id: '1',
    name: 'This component only works with a feed',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '2',
    name: 'By default, all feeds are set to fifteen events, over 180 days.',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Events will display until their end time is reached.',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '2',
    name: 'The number of African wild dogs in a pack',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '1',
    name: 'Crossrail is a megaproject meant to bind London together',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '3',
    name: 'This component only works with a feed',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  },
];

for (let i = 0; i < 100; i += 1) {
  newsPhotos.push({
    news_id: faker.random.number({
      min: 1,
      max: 100,
    }),
    name: faker.name.title(),
    url:
      'https://onehdwallpaper.com/wp-content/uploads/2016/11/Most-Beautiful-Girls-Wallpapers.jpg',
    created_at: new Date(),
  });
}

module.exports = newsPhotos;
