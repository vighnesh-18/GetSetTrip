const sampleListings = [
{
  title: "Cozy Beachfront Cottage",
  description: "Experience the snow-capped serenity of Kashmir in this cozy mountain cottage.",
  image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 1500,
  location: "Kashmir",
  country: "India"
},
{
  title: "Modern Loft in Downtown",
  description: "Unwind by the sunny beaches of Goa with vibrant nightlife and Portuguese charm.",
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 1200,
  location: "Goa",
  country: "India"
},
{
  title: "Mountain Retreat",
  description: "Nestled in the Nilgiris, this Ooty retreat offers peace and scenic hill views.",
  image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 1000,
  location: "Ooty",
  country: "India"
},
{
  title: "Historic Villa in Tuscany",
  description: "Enjoy colonial charm and chilly weather in this lovely Shimla home.",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 2500,
  location: "Shimla",
  country: "India"
},
{
  title: "Secluded Treehouse Getaway",
  description: "Relax in the cool hills of Kodaikanal surrounded by lush pine forests.",
  image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 800,
  location: "Kodaikanal",
  country: "India"
},
{
  title: "Beachfront Paradise",
  description: "Soak in the French-Indian vibes of Puducherry in this seaside villa.",
  image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 2000,
  location: "Puducherry",
  country: "India"
},
{
  title: "Rustic Cabin by the Lake",
  description: "Explore the wild beauty of Assam with lush tea gardens all around.",
  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 900,
  location: "Assam",
  country: "India"
},
{
  title: "Luxury Penthouse with City Views",
  description: "Live in the lap of nature in Arunachal's misty valleys and tribal culture.",
  image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 3500,
  location: "Arunachal Pradesh",
  country: "India"
},
{
  title: "Ski-In/Ski-Out Chalet",
  description: "Bask in the snowy views of Manali from your cozy riverside cabin.",
  image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 3000,
  location: "Manali",
  country: "India"
},
{
  title: "Safari Lodge in the Serengeti",
  description: "Sip hot chai in Darjeeling and watch the sunrise over Kanchenjunga.",
  image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 4000,
  location: "Darjeeling",
  country: "India"
},
{
  title: "Historic Canal House",
  description: "Stay close to the Himalayas in Leh and witness monasteries and lakes.",
  image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 1800,
  location: "Leh",
  country: "India"
},
{
  title: "Private Island Retreat",
  description: "Rejuvenate your soul with yoga and rafting in Rishikesh.",
  image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 10000,
  location: "Rishikesh",
  country: "India"
},
{
  title: "Charming Cottage in the Cotswolds",
  description: "Overlook the sparkling Naini Lake from this Nainital lakeside stay.",
  image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 1200,
  location: "Nainital",
  country: "India"
},
{
  title: "Historic Brownstone in Boston",
  description: "Breathe in the fresh air of Munnar's rolling tea hills.",
  image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 2200,
  location: "Munnar",
  country: "India"
},
{
  title: "Beachfront Bungalow in Bali",
  description: "Relax in a private boathouse on the backwaters of Alleppey.",
  image: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 1800,
  location: "Alleppey",
  country: "India"
},
{
  title: "Mountain View Cabin in Banff",
  description: "Enjoy cool forests and waterfalls in this Wayanad escape.",
  image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 1500,
  location: "Wayanad",
  country: "India"
},
{
  title: "Art Deco Apartment in Miami",
  description: "Get cozy in Coorg's coffee-scented air and verdant plantations.",
  image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 1600,
  location: "Coorg",
  country: "India"
},
{
  title: "Tropical Villa in Phuket",
  description: "Live the island life in the Andaman Islands with a private beach.",
  image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 3000,
  location: "Andaman and Nicobar Islands",
  country: "India"
},
{
  title: "Historic Castle in Scotland",
  description: "Escape to a lagoon-surrounded villa in the Lakshadweep archipelago.",
  image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 4000,
  location: "Lakshadweep",
  country: "India"
},
{
  title: "Desert Oasis in Dubai",
  description: "Explore barren beauty and adventure in Spiti’s remote charm.",
  image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 5000,
  location: "Spiti Valley",
  country: "India"
},
{
  title: "Rustic Log Cabin in Montana",
  description: "Camp near the meadows of Chopta, the mini Switzerland of India.",
  image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 1100,
  location: "Chopta",
  country: "India"
},
{
  title: "Beachfront Villa in Greece",
  description: "Relive history among the ruins and rocks of Hampi.",
  image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 2500,
  location: "Hampi",
  country: "India"
},
{
  title: "Eco-Friendly Treehouse Retreat",
  description: "Admire ancient art and temples in Khajuraho’s unique ambiance.",
  image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 750,
  location: "Khajuraho",
  country: "India"
},
{
  title: "Historic Cottage in Charleston",
  description: "Enjoy romantic lake views in the royal city of Udaipur.",
  image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 1600,
  location: "Udaipur",
  country: "India"
},
{
  title: "Modern Apartment in Tokyo",
  description: "Live like royalty in a sandcastle-style haveli in Jaisalmer.",
  image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  price: 2000,
  location: "Jaisalmer",
  country: "India"
},
{
  title: "Lakefront Cabin in New Hampshire",
  description: "Blue city charm and forts await you in Jodhpur’s heart.",
  image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 1200,
  location: "Jodhpur",
  country: "India"
},
{
  title: "Luxury Villa in the Maldives",
  description: "Catch the Taj Mahal sunrise from this peaceful Agra retreat.",
  image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 6000,
  location: "Agra",
  country: "India"
},
{
  title: "Ski Chalet in Aspen",
  description: "Float on the Ganges at dawn in spiritual Varanasi.",
  image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  price: 4000,
  location: "Varanasi",
  country: "India"
},
{
  title: "Secluded Beach House in Costa Rica",
  description: "Spot tigers in the wild in a cozy Ranthambore jungle lodge.",
  image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: 1800,
  location: "Ranthambore",
  country: "India"
}
];

module.exports = { data: sampleListings };