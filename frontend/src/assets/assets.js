import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'


import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

const escapeSvgText = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    }[char]));

const splitDishTitle = (title) => {
    const words = title.split(" ");
    const lines = [""];

    words.forEach((word) => {
        const current = lines[lines.length - 1];
        if (`${current} ${word}`.trim().length > 19 && lines.length < 3) {
            lines.push(word);
        } else {
            lines[lines.length - 1] = `${current} ${word}`.trim();
        }
    });

    return lines;
};

const dishImage = (name, state, accent = "#f4a325", deep = "#1f6f3d", note = "Healthy") => {
    const titleLines = splitDishTitle(name);
    const titleMarkup = titleLines
        .map((line, index) => `<text x="310" y="${118 + index * 32}" text-anchor="middle" font-size="28" font-weight="800" fill="#173d25">${escapeSvgText(line)}</text>`)
        .join("");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="420" viewBox="0 0 620 420">
        <defs>
            <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#fff8e8"/>
                <stop offset="0.55" stop-color="#f3f7df"/>
                <stop offset="1" stop-color="#e7f4dc"/>
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#414a25" flood-opacity="0.22"/>
            </filter>
        </defs>
        <rect width="620" height="420" rx="36" fill="url(#bg)"/>
        <circle cx="102" cy="74" r="74" fill="${accent}" opacity="0.18"/>
        <circle cx="536" cy="72" r="96" fill="${deep}" opacity="0.13"/>
        <circle cx="510" cy="344" r="92" fill="${accent}" opacity="0.16"/>
        <g filter="url(#shadow)">
            <ellipse cx="310" cy="282" rx="190" ry="72" fill="#ffffff"/>
            <ellipse cx="310" cy="260" rx="170" ry="78" fill="${deep}"/>
            <ellipse cx="310" cy="242" rx="146" ry="58" fill="#fffdf5"/>
            <circle cx="250" cy="236" r="28" fill="${accent}" opacity="0.9"/>
            <circle cx="315" cy="232" r="34" fill="#f8d56b"/>
            <circle cx="376" cy="242" r="26" fill="#72a66a"/>
            <path d="M196 262 C252 302 370 304 426 262" fill="none" stroke="#f0b24c" stroke-width="18" stroke-linecap="round"/>
            <path d="M224 252 C268 278 355 281 402 252" fill="none" stroke="#8dbb63" stroke-width="11" stroke-linecap="round" opacity="0.85"/>
        </g>
        <rect x="34" y="32" width="172" height="38" rx="19" fill="rgba(255,255,255,0.84)"/>
        <text x="120" y="57" text-anchor="middle" font-size="16" font-weight="800" fill="${deep}">${escapeSvgText(state)}</text>
        ${titleMarkup}
        <text x="310" y="222" text-anchor="middle" font-size="16" font-weight="700" fill="#a84f20">${escapeSvgText(note)}</text>
        <text x="310" y="370" text-anchor="middle" font-size="18" font-weight="700" fill="#6f776e">regional home-style meal</text>
    </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const menu_list = [
    {
        menu_name: "Maharashtra",
        menu_image: menu_1
    },
    {
        menu_name: "Gujarat",
        menu_image: menu_2
    },
    {
        menu_name: "Punjab",
        menu_image: menu_3
    },
    {
        menu_name: "South India",
        menu_image: menu_4
    },
    {
        menu_name: "Bengal",
        menu_image: menu_5
    },
    {
        menu_name: "Rajasthan",
        menu_image: menu_6
    },
    {
        menu_name: "Bihar",
        menu_image: menu_7
    },
    {
        menu_name: "North East",
        menu_image: menu_8
    }]

export const food_list = [
    {
        _id: "1",
        name: "Sprouted Misal Bowl",
        image: dishImage("Sprouted Misal Bowl", "Maharashtra", "#f4a325", "#1f6f3d", "sprouts + pav"),
        price: 99,
        state: "Maharashtra",
        description: "A lighter Maharashtrian misal with sprouts, farsan on the side and soft pav.",
        category: "Maharashtra"
    },
    {
        _id: "2",
        name: "Poha With Peanuts",
        image: dishImage("Poha With Peanuts", "Maharashtra", "#f4c542", "#26734d", "lemon + peanuts"),
        price: 69,
        state: "Maharashtra",
        description: "Classic poha with peanuts, lemon and coriander for a quick hostel breakfast.",
        category: "Maharashtra"
    }, {
        _id: "3",
        name: "Jowar Bhakri Pithla",
        image: dishImage("Jowar Bhakri Pithla", "Maharashtra", "#d99a33", "#6f4d23", "jowar + pithla"),
        price: 119,
        state: "Maharashtra",
        description: "Jowar bhakri with pithla and salad for a wholesome home-style plate.",
        category: "Maharashtra"
    }, {
        _id: "4",
        name: "Varan Bhaat Tiffin",
        image: dishImage("Varan Bhaat Tiffin", "Maharashtra", "#f1c75b", "#26734d", "dal + rice"),
        price: 89,
        state: "Maharashtra",
        description: "Simple varan bhaat with ghee, lemon and vegetable side for comfort food days.",
        category: "Maharashtra"
    }, {
        _id: "5",
        name: "Kothimbir Vadi Plate",
        image: dishImage("Kothimbir Vadi Plate", "Maharashtra", "#8fbc5a", "#1f6f3d", "coriander snack"),
        price: 85,
        state: "Maharashtra",
        description: "Steamed coriander vadi with chutney, finished lightly for a healthier bite.",
        category: "Maharashtra"
    }, {
        _id: "6",
        name: "Matki Usal Roti Meal",
        image: dishImage("Matki Usal Roti Meal", "Maharashtra", "#c17d3a", "#1f6f3d", "matki + roti"),
        price: 109,
        state: "Maharashtra",
        description: "Sprouted matki usal with rotis and salad for a protein-rich Maharashtrian meal.",
        category: "Maharashtra"
    }, {
        _id: "7",
        name: "Steamed Dhokla Plate",
        image: dishImage("Steamed Dhokla Plate", "Gujarat", "#f6d35b", "#2d7d52", "steamed dhokla"),
        price: 79,
        state: "Gujarat",
        description: "Soft steamed dhokla with chutney, light enough for breakfast or evening hunger.",
        category: "Gujarat"
    }, {
        _id: "8",
        name: "Gujarati Dal Khichdi",
        image: dishImage("Gujarati Dal Khichdi", "Gujarat", "#f4b84a", "#278653", "dal khichdi"),
        price: 95,
        state: "Gujarat",
        description: "Mild dal khichdi with kadhi-style comfort and a small salad on the side.",
        category: "Gujarat"
    }, {
        _id: "9",
        name: "Thepla Curd Roll Box",
        image: dishImage("Thepla Curd Roll Box", "Gujarat", "#c58b32", "#2d7d52", "thepla + curd"),
        price: 89,
        state: "Gujarat",
        description: "Methi thepla with curd and pickle, easy to eat between classes.",
        category: "Gujarat"
    }, {
        _id: "10",
        name: "Handvo Veg Slice",
        image: dishImage("Handvo Veg Slice", "Gujarat", "#e7a44a", "#2d7d52", "lentil bake"),
        price: 85,
        state: "Gujarat",
        description: "Baked lentil-vegetable handvo slices for a healthier regional snack-meal.",
        category: "Gujarat"
    }, {
        _id: "11",
        name: "Kadhi Khichdi Bowl",
        image: dishImage("Kadhi Khichdi Bowl", "Gujarat", "#f0cf73", "#2d7d52", "kadhi + khichdi"),
        price: 99,
        state: "Gujarat",
        description: "Warm khichdi with Gujarati kadhi for a gentle, filling dinner.",
        category: "Gujarat"
    }, {
        _id: "12",
        name: "Methi Muthia Bowl",
        image: dishImage("Methi Muthia Bowl", "Gujarat", "#91b95d", "#2d7d52", "steamed muthia"),
        price: 89,
        state: "Gujarat",
        description: "Steamed methi muthia with chutney and salad for a low-oil regional plate.",
        category: "Gujarat"
    }, {
        _id: "13",
        name: "Rajma Brown Rice Bowl",
        image: dishImage("Rajma Brown Rice Bowl", "Punjab", "#b9523a", "#1f6f3d", "rajma + rice"),
        price: 119,
        state: "Punjab",
        description: "Punjab-style rajma with brown rice, onion salad and lemon, made less oily.",
        category: "Punjab"
    }, {
        _id: "14",
        name: "Sarson Saag Roti Meal",
        image: dishImage("Sarson Saag Roti Meal", "Punjab", "#5f9f42", "#124525", "saag + roti"),
        price: 139,
        state: "Punjab",
        description: "Sarson saag with roti, salad and curd for a winter-home feeling.",
        category: "Punjab"
    }, {
        _id: "15",
        name: "Chole Rice Lite Bowl",
        image: dishImage("Chole Rice Lite Bowl", "Punjab", "#c0793a", "#1f6f3d", "chole + rice"),
        price: 109,
        state: "Punjab",
        description: "Chole with rice and salad, cooked with balanced spice for daily eating.",
        category: "Punjab"
    }, {
        _id: "16",
        name: "Paneer Roti Protein Plate",
        image: dishImage("Paneer Roti Protein Plate", "Punjab", "#f4c471", "#1f6f3d", "paneer + roti"),
        price: 149,
        state: "Punjab",
        description: "Paneer sabzi, rotis and salad for a protein-rich vegetarian lunch.",
        category: "Punjab"
    }, {
        _id: "17",
        name: "Kadhi Pakora Rice Lite",
        image: dishImage("Kadhi Pakora Rice Lite", "Punjab", "#f1c45c", "#1f6f3d", "kadhi + rice"),
        price: 115,
        state: "Punjab",
        description: "A lighter kadhi rice bowl with baked pakora-style bites and salad.",
        category: "Punjab"
    }, {
        _id: "18",
        name: "Moong Dal Chilla Curd",
        image: dishImage("Moong Dal Chilla Curd", "Punjab", "#91b95d", "#1f6f3d", "moong chilla"),
        price: 99,
        state: "Punjab",
        description: "Moong dal chillas with curd and chutney for a clean protein breakfast.",
        category: "Punjab"
    },
    {
        _id: "19",
        name: "Idli Sambar Plate",
        image: dishImage("Idli Sambar Plate", "South India", "#f0f0dd", "#b85c38", "steamed idli"),
        price: 79,
        state: "South India",
        description: "Soft idlis with sambar and chutney, steamed and easy on the stomach.",
        category: "South India"
    },
    {
        _id: "20",
        name: "Ragi Dosa Plate",
        image: dishImage("Ragi Dosa Plate", "South India", "#9b6d42", "#b85c38", "ragi dosa"),
        price: 99,
        state: "South India",
        description: "Ragi dosa with sambar and chutney for a lighter millet-based meal.",
        category: "South India"
    }, {
        _id: "21",
        name: "Curd Rice Bowl",
        image: dishImage("Curd Rice Bowl", "South India", "#fff2d2", "#b85c38", "curd rice"),
        price: 79,
        state: "South India",
        description: "Cooling curd rice with tadka, pomegranate and pickle for comfort days.",
        category: "South India"
    }, {
        _id: "22",
        name: "Pesarattu Upma Combo",
        image: dishImage("Pesarattu Upma Combo", "South India", "#78a85a", "#b85c38", "moong dosa"),
        price: 115,
        state: "South India",
        description: "Moong dosa with upma, sambar and chutney for a protein-rich plate.",
        category: "South India"
    }, {
        _id: "23",
        name: "Lemon Rice Curd Box",
        image: dishImage("Lemon Rice Curd Box", "South India", "#f4d64b", "#b85c38", "lemon rice"),
        price: 89,
        state: "South India",
        description: "Lemon rice with curd and peanuts for a light, familiar hostel lunch.",
        category: "South India"
    }, {
        _id: "24",
        name: "Vegetable Uttapam Plate",
        image: dishImage("Vegetable Uttapam Plate", "South India", "#f0d6a0", "#b85c38", "uttapam"),
        price: 105,
        state: "South India",
        description: "Uttapam topped with vegetables and served with sambar and chutney.",
        category: "South India"
    }, {
        _id: "25",
        name: "Bengali Moong Dal Rice",
        image: dishImage("Bengali Moong Dal Rice", "Bengal", "#f1c75b", "#365f91", "moong dal"),
        price: 95,
        state: "Bengal",
        description: "Moong dal with rice, vegetable bhaja-style side and salad in a light tiffin.",
        category: "Bengal"
    }, {
        _id: "26",
        name: "Veg Shukto Bowl",
        image: dishImage("Veg Shukto Bowl", "Bengal", "#96b36b", "#365f91", "mixed veg"),
        price: 119,
        state: "Bengal",
        description: "A gentle mixed-vegetable Bengali bowl with rice for home-food cravings.",
        category: "Bengal"
    }, {
        _id: "27",
        name: "Cholar Dal Roti Plate",
        image: dishImage("Cholar Dal Roti Plate", "Bengal", "#f1b94d", "#365f91", "cholar dal"),
        price: 99,
        state: "Bengal",
        description: "Cholar dal with rotis and salad, made as a balanced everyday plate.",
        category: "Bengal"
    }, {
        _id: "28",
        name: "Lau Chingri Rice Lite",
        image: dishImage("Lau Chingri Rice Lite", "Bengal", "#8ebf78", "#365f91", "lau + rice"),
        price: 149,
        state: "Bengal",
        description: "Bottle gourd and prawn-style regional comfort with rice, portioned light.",
        category: "Bengal"
    }, {
        _id: "29",
        name: "Masoor Dal Bhaat",
        image: dishImage("Masoor Dal Bhaat", "Bengal", "#d86a4a", "#365f91", "masoor dal"),
        price: 89,
        state: "Bengal",
        description: "Red lentil dal with rice and a vegetable side for a simple Bengali meal.",
        category: "Bengal"
    }, {
        _id: "30",
        name: "Posto Veg Rice Bowl",
        image: dishImage("Posto Veg Rice Bowl", "Bengal", "#d9c7a3", "#365f91", "posto veg"),
        price: 125,
        state: "Bengal",
        description: "Poppy-seed style vegetable bowl with rice, made mild and homely.",
        category: "Bengal"
    }, {
        _id: "31",
        name: "Bajra Khichdi Bowl",
        image: dishImage("Bajra Khichdi Bowl", "Rajasthan", "#c8a264", "#7c4a23", "bajra khichdi"),
        price: 109,
        state: "Rajasthan",
        description: "Warm bajra khichdi with vegetables, curd and simple home-style seasoning.",
        category: "Rajasthan"
    }, {
        _id: "32",
        name: "Gatte Roti Lite Meal",
        image: dishImage("Gatte Roti Lite Meal", "Rajasthan", "#d99145", "#7c4a23", "gatte + roti"),
        price: 129,
        state: "Rajasthan",
        description: "Gatte curry with rotis and salad, lighter than the usual restaurant version.",
        category: "Rajasthan"
    }, {
        _id: "33",
        name: "Ker Sangri Millet Plate",
        image: dishImage("Ker Sangri Millet Plate", "Rajasthan", "#9d8a48", "#7c4a23", "ker sangri"),
        price: 139,
        state: "Rajasthan",
        description: "Ker sangri with millet roti and curd for a regional Rajasthani plate.",
        category: "Rajasthan"
    }, {
        _id: "34",
        name: "Moong Dal Chilla Box",
        image: dishImage("Moong Dal Chilla Box", "Rajasthan", "#a6bf64", "#7c4a23", "moong chilla"),
        price: 95,
        state: "Rajasthan",
        description: "Moong dal chillas with chutney and salad for a high-protein snack-meal.",
        category: "Rajasthan"
    }, {
        _id: "35",
        name: "Rajasthani Kadhi Rice",
        image: dishImage("Rajasthani Kadhi Rice", "Rajasthan", "#f2c05e", "#7c4a23", "kadhi rice"),
        price: 99,
        state: "Rajasthan",
        description: "Tangy kadhi with steamed rice for a light Rajasthani comfort bowl.",
        category: "Rajasthan"
    }, {
        _id: "36",
        name: "Bajra Roti Curd Plate",
        image: dishImage("Bajra Roti Curd Plate", "Rajasthan", "#c9a06b", "#7c4a23", "bajra roti"),
        price: 105,
        state: "Rajasthan",
        description: "Bajra roti with curd, salad and a seasonal vegetable side.",
        category: "Rajasthan"
    },
    {
        _id: "37",
        name: "Litti Chokha Lite Plate",
        image: dishImage("Litti Chokha Lite Plate", "Bihar", "#b67a3f", "#5c6f32", "litti chokha"),
        price: 99,
        state: "Bihar",
        description: "Baked litti with chokha and curd, made lighter for students missing Bihar food.",
        category: "Bihar"
    },
    {
        _id: "38",
        name: "Sattu Paratha Curd Box",
        image: dishImage("Sattu Paratha Curd Box", "Bihar", "#c08a47", "#5c6f32", "sattu paratha"),
        price: 95,
        state: "Bihar",
        description: "Sattu paratha with curd and pickle for a filling, protein-friendly lunch.",
        category: "Bihar"
    }, {
        _id: "39",
        name: "Chana Ghugni Bowl",
        image: dishImage("Chana Ghugni Bowl", "Bihar", "#c5833d", "#5c6f32", "chana ghugni"),
        price: 79,
        state: "Bihar",
        description: "Spiced chana ghugni with onion, lemon and coriander for a budget meal.",
        category: "Bihar"
    }, {
        _id: "40",
        name: "Dalia Khichdi Bowl",
        image: dishImage("Dalia Khichdi Bowl", "Bihar", "#d4b16a", "#5c6f32", "dalia khichdi"),
        price: 85,
        state: "Bihar",
        description: "Broken wheat khichdi with vegetables for a soft, high-fibre comfort bowl.",
        category: "Bihar"
    }, {
        _id: "41",
        name: "Bihari Dal Pitha",
        image: dishImage("Bihari Dal Pitha", "Bihar", "#f0dfbd", "#5c6f32", "dal pitha"),
        price: 89,
        state: "Bihar",
        description: "Steamed rice dumplings filled with dal, served with chutney.",
        category: "Bihar"
    }, {
        _id: "42",
        name: "Sattu Drink Meal Box",
        image: dishImage("Sattu Drink Meal Box", "Bihar", "#d0a05e", "#5c6f32", "sattu meal"),
        price: 75,
        state: "Bihar",
        description: "Cooling sattu drink with light paratha bites for a student-friendly mini meal.",
        category: "Bihar"
    }, {
        _id: "43",
        name: "Assamese Khar Rice Bowl",
        image: dishImage("Assamese Khar Rice Bowl", "North East", "#c4d28a", "#2e6572", "khar rice"),
        price: 115,
        state: "North East",
        description: "A gentle Assamese-inspired khar rice bowl with vegetables and light seasoning.",
        category: "North East"
    }, {
        _id: "44",
        name: "Veg Thukpa Bowl",
        image: dishImage("Veg Thukpa Bowl", "North East", "#e1a857", "#2e6572", "warm thukpa"),
        price: 109,
        state: "North East",
        description: "Warm vegetable thukpa with noodles and broth for rainy hostel evenings.",
        category: "North East"
    }, {
        _id: "45",
        name: "Black Rice Veg Bowl",
        image: dishImage("Black Rice Veg Bowl", "North East", "#544263", "#2e6572", "black rice"),
        price: 125,
        state: "North East",
        description: "Black rice with vegetables for a distinct, wholesome regional plate.",
        category: "North East"
    }, {
        _id: "46",
        name: "Steamed Momos Soup Plate",
        image: dishImage("Steamed Momos Soup Plate", "North East", "#f1e7d0", "#2e6572", "momos + soup"),
        price: 105,
        state: "North East",
        description: "Steamed veg momos with clear soup for a lighter comfort meal.",
        category: "North East"
    }, {
        _id: "47",
        name: "Manipuri Kangshoi Bowl",
        image: dishImage("Manipuri Kangshoi Bowl", "North East", "#7fb36b", "#2e6572", "veg stew"),
        price: 115,
        state: "North East",
        description: "Light vegetable stew with rice, inspired by Manipuri home cooking.",
        category: "North East"
    }, {
        _id: "48",
        name: "Jadoh Veg Millet Bowl",
        image: dishImage("Jadoh Veg Millet Bowl", "North East", "#b58952", "#2e6572", "millet bowl"),
        price: 119,
        state: "North East",
        description: "A veg millet bowl inspired by Meghalaya-style comfort food.",
        category: "North East"
    }
]