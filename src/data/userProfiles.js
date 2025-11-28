// src/data/userProfiles.js

const userProfiles = {
    "x0lk43jLOLXLn8NGe9pcaqgW5462": {
        displayName: "Beshoy Foamil",
        username: "@beshoy-13",
        bio: '"I think therefore I am"',
        email: "beshoy@biblios.com",
        joinedDate: "January 2024",
        location: "Cairo, Egypt",
        photoURL: "/images/profile.jpg",
        stats: {
            booksRead: 58,
            reviews: 24,
            following: 156,
            followers: 203
        },
        favoriteBooks: [
            {
                id: 1,
                title: "Inferno",
                author: "Dante Alighieri",
                cover: "../../public/images/Inferno.jpg"
            },
            {
                id: 2,
                title: "Hamlet",
                author: "William Shakespeare",
                cover: "../../public/images/Hamlet.jpg"
            },
            {
                id: 3,
                title: "Those Spoke Zarathustra",
                author: "Friedrich Nietzsche",
                cover: "../../public/images/ThoseSpokeZarathustra.jpg"
            },
            {
                id: 4,
                title: "Harry Potter and the prisoner of azkaban",
                author: "J.K. Rowling",
                cover: "../../public/images/harryPotter.jpg"
            },
            {
                id: 5,
                title: "White Nights",
                author: "Fyodor Dostoevsky",
                cover: "../../public/images/WhiteNights.jpg"
            }
        ]
    },

    "y3mIQY7GG8QEdyzmEZ8slrb6EQt1": {
        displayName: "Ebrahem Hassan",
        username: "@ebrahem-2005",
        bio: '"Reality is that which, when you stop believing in it, doesn\'t go away"',
        email: "ebrahem@biblios.com",
        joinedDate: "March 2024",
        location: "Alexandria, Egypt",
        photoURL: "/images/profile2.png",
        stats: {
            booksRead: 35,
            reviews: 15,
            following: 89,
            followers: 124
        },
        favoriteBooks: [
            {
                id: 1,
                title: "1984",
                author: "George Orwell",
                cover: "../../public/images/1984.jpg"
            },
            {
                id: 2,
                title: "Great Expectations",
                author: "Charles Dickens",
                cover: "../../public/images/GreatExpectations.jpg"
            },
            {
                id: 3,
                title: "A Clockwork Orange",
                author: "Anthony Burgess",
                cover: "../../public/images/AClockworkOrange.jpg"
            },
            {
                id: 4,
                title: "The Art of War",
                author: "Sun Tzu",
                cover: "../../public/images/TheArtOfWar.jpeg"
            },
            {
                id: 5,
                title: "The myth of Sisyphus",
                author: "Albert Camus",
                cover: "../../public/images/TheMythOfSisyphus.jpeg"
            }
        ]
    },

    "ZhpyqpOfXcO1KwuyxeObpgfNORP2": {
        displayName: "Kareem Hossam",
        username: "@kareemghorab",
        bio: '',
        email: "kareem@biblios.com",
        joinedDate: "july 2024",
        location: "tanta, Egypt",
        photoURL: "/images/profile3.jpg",
        stats: {
            booksRead: 20,
            reviews: 15,
            following: 89,
            followers: 124
        },
        favoriteBooks: [
            {
                id: 1,
                title: "1984",
                author: "George Orwell",
                cover: "../../public/images/1984.jpg"
            },
            {
                id: 2,
                title: "Great Expectations",
                author: "Charles Dickens",
                cover: "../../public/images/GreatExpectations.jpg"
            },
            {
                id: 3,
                title: "A Clockwork Orange",
                author: "Anthony Burgess",
                cover: "../../public/images/AClockworkOrange.jpg"
            },
            {
                id: 4,
                title: "The Art of War",
                author: "Sun Tzu",
                cover: "../../public/images/TheArtOfWar.jpeg"
            },
            {
                id: 5,
                title: "The myth of Sisyphus",
                author: "Albert Camus",
                cover: "../../public/images/TheMythOfSisyphus.jpeg"
            }
        ]
    }
};

export const getUserProfile = (uid) => {
    return userProfiles[uid] || null;
};

export const hasCustomProfile = (uid) => {
    return uid in userProfiles;
};

export default userProfiles;