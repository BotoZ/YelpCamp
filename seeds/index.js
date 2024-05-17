const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66265c3c71a955302e6ecd98',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ab eligendi at distinctio aliquam doloremque vel cum suscipit corporis explicabo quos nemo quaerat optio laudantium possimus sequi delectus, alias nihil.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dndmjcqaf/image/upload/v1713875608/YelpCamp/ahm1enlcuhkoda3cgjcg.jpg',
                    filename: 'YelpCamp/ahm1enlcuhkoda3cgjcg',
                },
                {
                    url: 'https://res.cloudinary.com/dndmjcqaf/image/upload/v1713875608/YelpCamp/dsxy7rcnh0ogknrf1xuz.jpg',
                    filename: 'YelpCamp/dsxy7rcnh0ogknrf1xuz',
                },
                {
                    url: 'https://res.cloudinary.com/dndmjcqaf/image/upload/v1713875609/YelpCamp/uvknrpewzkwuzxjnc8pa.jpg',
                    filename: 'YelpCamp/uvknrpewzkwuzxjnc8pa',
                },
                {
                    url: 'https://res.cloudinary.com/dndmjcqaf/image/upload/v1713875613/YelpCamp/ahdmb4ju7en0am8tx4fw.jpg',
                    filename: 'YelpCamp/ahdmb4ju7en0am8tx4fw',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})