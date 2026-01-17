const QUIZ_DATA = {
    general:[
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correct: 0,
            hint: "Known as the 'City of Light'",
            difficulty:'easy'
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            hint: "Named after the Roman god of war",
            difficulty: "easy"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2,
            hint: "Italian Renaissance artist and inventor",
            difficulty: "medium"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3,
            hint: "Covers more than 30% of Earth's surface",
            difficulty: "easy"
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2,
            hint: "The year atomic bombs were dropped on Japan",
            difficulty: "medium"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correct: 1,
            hint: "Located within Rome, Italy",
            difficulty: "medium"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1,
            hint: "English playwright from Stratford-upon-Avon",
            difficulty: "easy"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            hint: "From the Latin word 'aurum'",
            difficulty: "medium"
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2,
            hint: "Asia, Africa, North America, South America, Antarctica, Europe, Australia",
            difficulty: "easy"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
            correct: 2,
            hint: "Located in the Himalayas",
            difficulty: "easy"
        },
        {
            question: "Who invented the telephone?",
            options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
            correct: 1,
            hint: "Scottish-born scientist who made the first phone call in 1876",
            difficulty: "medium"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correct: 1,
            hint: "Lives in the ocean and can weigh up to 200 tons",
            difficulty: "easy"
        },
        {
            question: "In which country would you find the Great Barrier Reef?",
            options: ["Brazil", "Australia", "Indonesia", "Philippines"],
            correct: 1,
            hint: "The world's largest coral reef system",
            difficulty: "medium"
        },
        {
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            correct: 0,
            hint: "Approximately 186,000 miles per second",
            difficulty: "hard"
        },
        {
            question: "Who was the first person to walk on the moon?",
            options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
            correct: 1,
            hint: "Apollo 11 mission commander in 1969",
            difficulty: "easy"
        },
        {
            question: "What is the currency of Japan?",
            options: ["Yuan", "Won", "Yen", "Ringgit"],
            correct: 2,
            hint: "Symbol is ¥",
            difficulty: "medium"
        },
        {
            question: "How many bones are in the human body?",
            options: ["186", "206", "226", "246"],
            correct: 1,
            hint: "Babies are born with more, which fuse together as they grow",
            difficulty: "medium"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2,
            hint: "Rates 10 on the Mohs hardness scale",
            difficulty: "easy"
        },
        {
            question: "Who is known as the father of computers?",
            options: ["Alan Turing", "Charles Babbage", "Steve Jobs", "Bill Gates"],
            correct: 1,
            hint: "19th-century mathematician who designed the Analytical Engine",
            difficulty: "hard"
        },
        {
            question: "What is the largest desert in the world?",
            options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
            correct: 3,
            hint: "Cold desert, not sandy!",
            difficulty: "hard"
        }
    ],
    science: [
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "CO2", "O2", "H2O2"],
            correct: 0,
            hint: "Two hydrogen atoms and one oxygen atom",
            difficulty: "easy"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            correct: 2,
            hint: "Produces ATP energy",
            difficulty: "easy"
        },
        {
            question: "What is the atomic number of carbon?",
            options: ["4", "6", "8", "12"],
            correct: 1,
            hint: "Number of protons in the nucleus",
            difficulty: "medium"
        },
        {
            question: "What force keeps planets in orbit around the sun?",
            options: ["Magnetism", "Gravity", "Friction", "Inertia"],
            correct: 1,
            hint: "Discovered by Isaac Newton",
            difficulty: "easy"
        },
        {
            question: "What is the most abundant gas in Earth's atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct: 2,
            hint: "Makes up about 78% of the atmosphere",
            difficulty: "medium"
        },
        {
            question: "At what temperature does water boil at sea level?",
            options: ["90°C", "100°C", "110°C", "120°C"],
            correct: 1,
            hint: "212°F or 373.15 Kelvin",
            difficulty: "easy"
        },
        {
            question: "What is the smallest unit of life?",
            options: ["Atom", "Molecule", "Cell", "Organ"],
            correct: 2,
            hint: "Basic structural and functional unit",
            difficulty: "easy"
        },
        {
            question: "What is the study of earthquakes called?",
            options: ["Meteorology", "Seismology", "Geology", "Volcanology"],
            correct: 1,
            hint: "From the Greek word 'seismos' meaning earthquake",
            difficulty: "medium"
        },
        {
            question: "How many planets are in our solar system?",
            options: ["7", "8", "9", "10"],
            correct: 1,
            hint: "Pluto is no longer considered a planet",
            difficulty: "easy"
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Liver", "Brain", "Skin", "Heart"],
            correct: 2,
            hint: "Covers the entire body",
            difficulty: "medium"
        },
        {
            question: "What is the process by which plants make food?",
            options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
            correct: 1,
            hint: "Uses sunlight, water, and CO2",
            difficulty: "easy"
        },
        {
            question: "What is the speed of sound in air at room temperature?",
            options: ["243 m/s", "343 m/s", "443 m/s", "543 m/s"],
            correct: 1,
            hint: "About 1,235 km/h or 767 mph",
            difficulty: "hard"
        },
        {
            question: "What type of blood cell fights infections?",
            options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
            correct: 1,
            hint: "Part of the immune system",
            difficulty: "medium"
        },
        {
            question: "What is the pH of pure water?",
            options: ["5", "6", "7", "8"],
            correct: 2,
            hint: "Neutral on the pH scale",
            difficulty: "medium"
        },
        {
            question: "What element has the atomic symbol 'Fe'?",
            options: ["Fluorine", "Iron", "Fermium", "Francium"],
            correct: 1,
            hint: "From the Latin word 'ferrum'",
            difficulty: "medium"
        },
        {
            question: "What is the name of Earth's only natural satellite?",
            options: ["Mars", "Venus", "Moon", "Titan"],
            correct: 2,
            hint: "Visible in the night sky",
            difficulty: "easy"
        },
        {
            question: "What is the largest bone in the human body?",
            options: ["Tibia", "Femur", "Humerus", "Fibula"],
            correct: 1,
            hint: "Thigh bone",
            difficulty: "medium"
        },
        {
            question: "What is the center of an atom called?",
            options: ["Electron", "Proton", "Neutron", "Nucleus"],
            correct: 3,
            hint: "Contains protons and neutrons",
            difficulty: "easy"
        },
        {
            question: "What is the freezing point of water in Fahrenheit?",
            options: ["0°F", "32°F", "64°F", "100°F"],
            correct: 1,
            hint: "Same as 0°C",
            difficulty: "medium"
        },
        {
            question: "What is the most common element in the universe?",
            options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
            correct: 2,
            hint: "Makes up about 75% of the universe's mass",
            difficulty: "medium"
        }
    ],
    history:[
        {
            question: "When did the Roman Empire fall?",
            options: ["376 AD", "476 AD", "576 AD", "676 AD"],
            correct: 1,
            hint: "Fifth century",
            difficulty: "medium"
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            correct: 2,
            hint: "Served from 1789 to 1797",
            difficulty: "easy"
        },
        {
            question: "In which year did India gain independence?",
            options: ["1945", "1946", "1947", "1948"],
            correct: 2,
            hint: "Two years after World War II ended",
            difficulty: "medium"
        },
        {
            question: "Who built the Taj Mahal?",
            options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
            correct: 1,
            hint: "Mughal emperor, built it for his wife Mumtaz Mahal",
            difficulty: "medium"
        },
        {
            question: "When did the Berlin Wall fall?",
            options: ["1987", "1988", "1989", "1990"],
            correct: 2,
            hint: "End of the Cold War era",
            difficulty: "medium"
        },
        {
            question: "Who discovered America in 1492?",
            options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Amerigo Vespucci"],
            correct: 1,
            hint: "Italian explorer sailing for Spain",
            difficulty: "easy"
        },
        {
            question: "What was the name of the ship that brought the Pilgrims to America?",
            options: ["Santa Maria", "Mayflower", "Nina", "Pinta"],
            correct: 1,
            hint: "Arrived in 1620",
            difficulty: "medium"
        },
        {
            question: "Who was the first man to circumnavigate the Earth?",
            options: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "James Cook"],
            correct: 1,
            hint: "Portuguese explorer, died during the voyage",
            difficulty: "medium"
        },
        {
            question: "In which battle did Napoleon meet his final defeat?",
            options: ["Battle of Leipzig", "Battle of Austerlitz", "Battle of Waterloo", "Battle of Jena"],
            correct: 2,
            hint: "Happened in 1815 in Belgium",
            difficulty: "medium"
        },
        {
            question: "Who was the ancient Egyptian pharaoh known for his tomb?",
            options: ["Ramses II", "Tutankhamun", "Cleopatra", "Khufu"],
            correct: 1,
            hint: "Young pharaoh, tomb discovered in 1922",
            difficulty: "medium"
        }
    ],
    geography:[
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2,
            hint: "Not the most famous city!",
            difficulty: "medium"
        },
        {
            question: "Which river is the longest in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct: 1,
            hint: "Flows through Egypt",
            difficulty: "medium"
        },
        {
            question: "What is the smallest continent?",
            options: ["Europe", "Australia", "Antarctica", "South America"],
            correct: 1,
            hint: "Also a country",
            difficulty: "easy"
        },
        {
            question: "Which country has the most islands?",
            options: ["Indonesia", "Sweden", "Philippines", "Japan"],
            correct: 1,
            hint: "Scandinavian country",
            difficulty: "hard"
        },
        {
            question: "What is the deepest point in the ocean?",
            options: ["Java Trench", "Puerto Rico Trench", "Mariana Trench", "Tonga Trench"],
            correct: 2,
            hint: "Located in the Pacific Ocean",
            difficulty: "medium"
        }
    ],
    sports:[
        {
            question: "How many players are there in a cricket team?",
            options: ["9", "10", "11", "12"],
            correct: 2,
            hint: "Same as football/soccer",
            difficulty: "easy"
        },
        {
            question: "In which sport would you perform a 'slam dunk'?",
            options: ["Volleyball", "Basketball", "Tennis", "Baseball"],
            correct: 1,
            hint: "Popular in NBA",
            difficulty: "easy"
        },
        {
            question: "How many Grand Slam tournaments are there in tennis?",
            options: ["3", "4", "5", "6"],
            correct: 1,
            hint: "Australian Open, French Open, Wimbledon, US Open",
            difficulty: "medium"
        },
        {
            question: "What is the maximum break in snooker?",
            options: ["137", "147", "157", "167"],
            correct: 1,
            hint: "Perfect game score",
            difficulty: "hard"
        },
        {
            question: "In which year were the first modern Olympic Games held?",
            options: ["1892", "1896", "1900", "1904"],
            correct: 1,
            hint: "19th century, in Athens",
            difficulty: "medium"
        },
        {
            question: "How many holes are there in a standard golf course?",
            options: ["9", "12", "18", "21"],
            correct: 2,
            hint: "Traditional full round",
            difficulty: "easy"
        },
        {
            question: "What is the diameter of a basketball hoop in inches?",
            options: ["16", "18", "20", "22"],
            correct: 1,
            hint: "Standard NBA regulation",
            difficulty: "hard"
        },
        {
            question: "Which country has won the most FIFA World Cups?",
            options: ["Germany", "Argentina", "Brazil", "Italy"],
            correct: 2,
            hint: "South American country, won 5 times",
            difficulty: "medium"
        },
        {
            question: "What is the fastest recorded tennis serve?",
            options: ["153 mph", "163 mph", "173 mph", "183 mph"],
            correct: 1,
            hint: "By Samuel Groth in 2012",
            difficulty: "hard"
        },
        {
            question: "How many minutes is a rugby union match?",
            options: ["70", "80", "90", "100"],
            correct: 1,
            hint: "Two 40-minute halves",
            difficulty: "medium"
        }
    ],
    movies: [
    {
        question: "Who directed the movie 'Titanic'?",
        options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
        correct: 1,
        hint: "Also directed Avatar",
        difficulty: "medium"
    },
    {
        question: "Which movie won the first Academy Award for Best Picture?",
        options: ["Wings", "The Jazz Singer", "Sunrise", "7th Heaven"],
        correct: 0,
        hint: "1927 silent film about WWI pilots",
        difficulty: "hard"
    },
    {
        question: "In which movie does the quote 'May the Force be with you' appear?",
        options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"],
        correct: 1,
        hint: "George Lucas franchise",
        difficulty: "easy"
    },
    {
        question: "Who played Iron Man in the Marvel Cinematic Universe?",
        options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
        correct: 2,
        hint: "Tony Stark actor",
        difficulty: "easy"
    },
    {
        question: "Which movie features the song 'My Heart Will Go On'?",
        options: ["The Notebook", "Titanic", "Romeo + Juliet", "Pearl Harbor"],
        correct: 1,
        hint: "Sung by Celine Dion",
        difficulty: "easy"
    },
    {
        question: "What is the highest-grossing film of all time?",
        options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
        correct: 1,
        hint: "James Cameron's 2009 sci-fi epic",
        difficulty: "medium"
    },
    {
        question: "Who played the Joker in 'The Dark Knight'?",
        options: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"],
        correct: 2,
        hint: "Won posthumous Oscar",
        difficulty: "easy"
    },
    {
        question: "Which Pixar movie features a character named Woody?",
        options: ["Cars", "Finding Nemo", "Toy Story", "Monsters Inc."],
        correct: 2,
        hint: "Cowboy toy",
        difficulty: "easy"
    },
    {
        question: "In which year was the first Harry Potter movie released?",
        options: ["1999", "2000", "2001", "2002"],
        correct: 2,
        hint: "Philosopher's Stone / Sorcerer's Stone",
        difficulty: "medium"
    },
    {
        question: "Who directed 'Inception'?",
        options: ["Quentin Tarantino", "Christopher Nolan", "Denis Villeneuve", "David Fincher"],
        correct: 1,
        hint: "Also directed The Dark Knight trilogy",
        difficulty: "easy"
    }
]
};

// Get questions by category and difficulty
function getQuestions(category, difficulty) {
    const categoryQuestions = QUIZ_DATA[category] || QUIZ_DATA.general;
    if (difficulty === 'easy') {
        return categoryQuestions.filter(q => q.difficulty === 'easy').slice(0, 10);
    } else if (difficulty === 'medium') {
        return shuffleArray(categoryQuestions).slice(0, 15);
    } else if (difficulty === 'hard') {
        return shuffleArray(categoryQuestions).slice(0, 20);
    }

    return shuffleArray(categoryQuestions).slice(0, 10);
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}