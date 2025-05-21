const bcrypt = require("bcrypt");

async function data() {
    const users = [
        {
            name: {
                first: "Sara",
                middle: "",
                last: "Noah"
            },
            phone: "0586633988",
            email: "sara@gmail.com",
            password: await bcrypt.hash("Aa11111!", 14),
            image: {},
            address: {
                country: "Israel",
                city: "Hazchut",
                street: "Karnei Shomron",
                houseNumber: 22,
                zip: 123456
            },
            isBusiness: false,
            isAdmin: false
        },
        {
            name: {
                first: "Tehila",
                middle: "",
                last: "Nagar"
            },
            phone: "0586619366",
            email: "tehila@gmail.com",
            password: await bcrypt.hash("Bb11111!", 14),
            image: {},
            address: {
                country: "Israel",
                city: "shoham",
                street: "Tirat Yehuda",
                houseNumber: 11,
                zip: 654321
            },
            isBusiness: true,
            isAdmin: false
        },
        {
            name: {
                first: "Avital",
                middle: "",
                last: "Madar"
            },
            phone: "0556693019",
            email: "avital@gmail.com",
            password: await bcrypt.hash("Cc11111!", 14),
            image: {},
            address: {
                country: "Israel",
                city: "Ariel",
                street: "Dimona",
                houseNumber: 33,
                zip: 987654
            },
            isBusiness: false,
            isAdmin: true
        }
    ];

    const cards = [
        {
            title: "Green Leaf Cafe",
            subtitle: "Organic & Vegan Coffee Shop",
            description: "Enjoy our 100% organic coffee, vegan pastries, and eco-friendly atmosphere in the heart of Tel Aviv.",
            phone: "03-6781234",
            email: "info@greenleaf.co.il",
            web: "https://www.happycow.net/reviews/origem-fresh-coffee-tel-aviv-106067",
            image: {
                url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
                alt: "Green Leaf Cafe interior"
            },
            address: {
                state: "TA",
                country: "Israel",
                city: "Tel Aviv",
                street: "Rothschild Blvd",
                houseNumber: 12,
                zip: 6688123
            },
            bizNumber: 123456,
            user_id: "682c8bd9a2110c71a7ef319d"
        },
        {
            title: "Pixel Studio",
            subtitle: "Graphic Design & Branding",
            description: "We help startups and businesses stand out with bold visual identities and creative design solutions.",
            phone: "054-9876543",
            email: "studio@pixelbranding.com",
            web: "https://stockcake.com/i/creative-design-studio_1081117_1048107",
            image: {
                url: "https://onlinegraphic.co.il/wp-content/uploads/2022/04/%D7%9E%D7%99%D7%AA%D7%95%D7%92-%D7%A0%D7%99%D7%99%D7%A8%D7%AA-%D7%9E%D7%A9%D7%A8%D7%93%D7%99%D7%AA.jpg",
                alt: "Pixel Studio workspace"
            },
            address: {
                state: "NY",
                country: "USA",
                city: "Brooklyn",
                street: "Bedford Ave",
                houseNumber: 456,
                zip: 11211
            },
            bizNumber: 456789,
            user_id: "682c8bd9a2110c71a7ef319d"
        },
        {
            title: "TechWiz Solutions",
            subtitle: "IT Consulting & Support",
            description: "Providing reliable IT services, cloud solutions, and cybersecurity for small to mid-size businesses.",
            phone: "050-3344556",
            email: "support@techwiz.co.il",
            web: "https://techwizmsp.com/",
            image: {
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkT6q960BaqC7iH5BhtVzDr25suzL_vMDXk0rskw-0BUDq1vfLvEzg5T8npdVGkV6VVn8&usqp=CAU",
                alt: "TechWiz team in a meeting"
            },
            address: {
                state: "IL",
                country: "Israel",
                city: "Haifa",
                street: "Horev Street",
                houseNumber: 78,
                zip: 3457654
            },
            bizNumber: 987654,
            user_id: "682c8bd9a2110c71a7ef319d"
        }
    ];

    return ({
        users, cards
    });
}

module.exports = data;