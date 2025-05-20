const fs = require("fs");

// Input/output paths
const inputFile = "./data.js";
const outputFile = "./updated_data.js";

// 50+ Indian destinations and descriptions
const indianDestinations = [
  "Kashmir", "Goa", "Ooty", "Shimla", "Kodaikanal", "Puducherry", "Assam", "Arunachal Pradesh",
  "Manali", "Darjeeling", "Leh", "Rishikesh", "Nainital", "Munnar", "Alleppey", "Wayanad",
  "Coorg", "Andaman and Nicobar Islands", "Lakshadweep", "Spiti Valley", "Chopta", "Hampi",
  "Khajuraho", "Udaipur", "Jaisalmer", "Jodhpur", "Agra", "Varanasi", "Ranthambore", "Jim Corbett",
  "Tawang", "Ziro Valley", "Majuli", "Shillong", "Cherrapunji", "Sikkim", "Gulmarg", "Mount Abu",
  "Mahabaleshwar", "Lonavala", "Panchgani", "Ranikhet", "Mussoorie", "Dehradun", "Auli", "Bikaner",
  "Bundi", "Pushkar", "Ajmer", "Kanha", "Bandhavgarh"
];

const indianDescriptions = [
  "Experience the snow-capped serenity of Kashmir in this cozy mountain cottage.",
  "Unwind by the sunny beaches of Goa with vibrant nightlife and Portuguese charm.",
  "Nestled in the Nilgiris, this Ooty retreat offers peace and scenic hill views.",
  "Enjoy colonial charm and chilly weather in this lovely Shimla home.",
  "Relax in the cool hills of Kodaikanal surrounded by lush pine forests.",
  "Soak in the French-Indian vibes of Puducherry in this seaside villa.",
  "Explore the wild beauty of Assam with lush tea gardens all around.",
  "Live in the lap of nature in Arunachal's misty valleys and tribal culture.",
  "Bask in the snowy views of Manali from your cozy riverside cabin.",
  "Sip hot chai in Darjeeling and watch the sunrise over Kanchenjunga.",
  "Stay close to the Himalayas in Leh and witness monasteries and lakes.",
  "Rejuvenate your soul with yoga and rafting in Rishikesh.",
  "Overlook the sparkling Naini Lake from this Nainital lakeside stay.",
  "Breathe in the fresh air of Munnar's rolling tea hills.",
  "Relax in a private boathouse on the backwaters of Alleppey.",
  "Enjoy cool forests and waterfalls in this Wayanad escape.",
  "Get cozy in Coorg's coffee-scented air and verdant plantations.",
  "Live the island life in the Andaman Islands with a private beach.",
  "Escape to a lagoon-surrounded villa in the Lakshadweep archipelago.",
  "Explore barren beauty and adventure in Spiti’s remote charm.",
  "Camp near the meadows of Chopta, the mini Switzerland of India.",
  "Relive history among the ruins and rocks of Hampi.",
  "Admire ancient art and temples in Khajuraho’s unique ambiance.",
  "Enjoy romantic lake views in the royal city of Udaipur.",
  "Live like royalty in a sandcastle-style haveli in Jaisalmer.",
  "Blue city charm and forts await you in Jodhpur’s heart.",
  "Catch the Taj Mahal sunrise from this peaceful Agra retreat.",
  "Float on the Ganges at dawn in spiritual Varanasi.",
  "Spot tigers in the wild in a cozy Ranthambore jungle lodge.",
  "Stay inside the forest at Jim Corbett for a true safari thrill.",
  "Mountain dreams come true in peaceful and pristine Tawang.",
  "Stay in a bamboo house in the green meadows of Ziro Valley.",
  "Relax on the banks of the mighty Brahmaputra in Majuli Island.",
  "Stay in a treehouse above misty Shillong pine forests.",
  "Walk through waterfalls in the wettest place on Earth — Cherrapunji.",
  "This Sikkim home offers mountain views and Buddhist calm.",
  "Ski or sip hot tea in a wooden cabin in Gulmarg.",
  "Enjoy panoramic views from the highest point in Mount Abu.",
  "Breathe in the crisp mountain air in Mahabaleshwar orchards.",
  "Spend your weekend in a Lonavala valley-view apartment.",
  "Cool breeze and strawberry fields welcome you in Panchgani.",
  "Stay in a colonial-style lodge in peaceful Ranikhet.",
  "A British-style cottage nestled in Mussoorie's quiet hills.",
  "Experience a mountain-view apartment in scenic Dehradun.",
  "Ski right from your door in the slopes of Auli.",
  "Explore royal history and camel rides in Bikaner.",
  "Experience Rajput elegance and stepwells in Bundi.",
  "Camp on the holy shores of Pushkar Lake.",
  "Marvel at Mughal architecture in the heart of Ajmer.",
  "Watch wildlife from a bamboo hut in Kanha National Park.",
  "Rustic, serene stay surrounded by nature in Bandhavgarh."
];

// Load file content
const original = fs.readFileSync(inputFile, 'utf-8');

// Extract array safely
const arrayStart = original.indexOf('[');
const arrayEnd = original.lastIndexOf(']') + 1;
const arrayContent = original.slice(arrayStart, arrayEnd);

// Parse using eval (safe here due to local file control)
const listings = eval(arrayContent);

// Replace fields
listings.forEach((listing, i) => {
  listing.location = indianDestinations[i % indianDestinations.length];
  listing.country = "India";
  listing.description = indianDescriptions[i % indianDescriptions.length];
});

// Convert back to JavaScript object format (removing quotes on keys)
function toJSObjectString(obj) {
  if (obj.image) {
    // If image is an object and has a nested url object, flatten it
    if (typeof obj.image === "object") {
      if (obj.image.url && typeof obj.image.url === "object") {
        // Replace nested object with just the URL string:
        obj.image.url = obj.image.url.url;
      }
      // Always override the filename to our static value:
      obj.image.filename = "GetSetTrip archives";
    } else {
      // If it's not an object, create one
      obj.image = { url: obj.image, filename: "GetSetTrip archives" };
    }
  }
  return JSON.stringify(obj, null, 2)
    .replace(/"(\w+)"\s*:/g, '$1:');  // Remove quotes around keys
}

// Convert listings to pretty JS code
const output = `const sampleListings = [\n${listings.map(toJSObjectString).join(",\n")}\n];\n\nmodule.exports = { data: sampleListings };`;

// Write new file
fs.writeFileSync(outputFile, output);
console.log("✅ Updated file saved as updated_data.js");
