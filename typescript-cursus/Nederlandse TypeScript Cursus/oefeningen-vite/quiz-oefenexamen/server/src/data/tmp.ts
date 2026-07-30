import {randomUUID} from 'node:crypto'

const x = [
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "What year did the Vietnam War end?",
    "correctAnswer": "1975",
    "incorrectAnswers": [
      "1978",
      "1967",
      "1969"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the \"To Love-Ru\" series, Peke is considered a female robot.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "politics",
    "question": "George W. Bush lost the popular vote in the 2004 United States presidential election.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "Which country gifted the Statue of Liberty to the United States of America?",
    "correctAnswer": "France",
    "incorrectAnswers": [
      "Spain",
      "England",
      "Germany"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the original name of Final Fantasy XV?",
    "correctAnswer": "Final Fantasy Versus XIII",
    "incorrectAnswers": [
      "Final Fantasy: Reborn",
      "Final Fantasy XVI",
      "Final Fantasy XIII-3"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "science",
    "question": "When was the DVD invented?",
    "correctAnswer": "1995",
    "incorrectAnswers": [
      "2000",
      "1990",
      "1980"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "history",
    "question": "Kublai Khan is the grandchild of Genghis Khan?",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In \"Star Trek\", what sauce is commonly used by Klingons on bregit lung?",
    "correctAnswer": "Grapok sauce",
    "incorrectAnswers": [
      "Gazorpazorp pudding",
      "Sweet chili sauce",
      "Grapork sauce"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In the game Pokémon Conquest, which warlord is able to bond with Zekrom and a shiny Rayquazza?",
    "correctAnswer": "Nobunaga",
    "incorrectAnswers": [
      "The Player",
      "Oichi",
      "Hideyoshi"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "When did O, Canada officially become the national anthem?",
    "correctAnswer": "1980",
    "incorrectAnswers": [
      "1950",
      "1920",
      "1880"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "About how old is Earth?",
    "correctAnswer": "4.5 Billion Years",
    "incorrectAnswers": [
      "3.5 Billion Years",
      "2.5 Billion Years",
      "5.5 Billion Years"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "geography",
    "question": "Norway has a larger land area than Sweden.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Which company did the animation for Peter Gabriel's Video Sledgehammer (1986)?",
    "correctAnswer": "Aardman Animations",
    "incorrectAnswers": [
      "HIT Entertainment",
      "Illumination Entertainment",
      "VIZ Media"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "politics",
    "question": "Who was the British Prime Minister at the outbreak of the Second World War?",
    "correctAnswer": "Neville Chamberlain",
    "incorrectAnswers": [
      "Clement Attlee",
      "Winston Churchill",
      "Stanley Baldwin"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What's the Team Fortress 2 Scout's city of origin?",
    "correctAnswer": "Boston",
    "incorrectAnswers": [
      "Sydney",
      "Detroit",
      "New York"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "The creation of the  Entertainment Software Ratings Board (ESRB) is often associated with Mortal Kombat and what FMV video game?",
    "correctAnswer": "Night Trap",
    "incorrectAnswers": [
      "Sewer Shark",
      "The Daedalus Encounter",
      "Corpse Killer"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "sports",
    "question": "How many soccer players should be on the field at the same time?",
    "correctAnswer": "22",
    "incorrectAnswers": [
      "20",
      "24",
      "26"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "When did the rapper Eazy-E die?",
    "correctAnswer": "March 26, 1995",
    "incorrectAnswers": [
      "July 11, 1992",
      "February 14, 1993",
      "October 21, 1994"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which English guitarist has the nickname \"Slowhand\"?",
    "correctAnswer": "Eric Clapton",
    "incorrectAnswers": [
      "Mark Knopfler",
      "Jeff Beck",
      "Jimmy Page"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the name of the comic about a young boy, and a tiger who is actually a stuffed animal?",
    "correctAnswer": "Calvin and Hobbes",
    "incorrectAnswers": [
      "Winnie the Pooh",
      "Albert and Pogo",
      "Peanuts"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "sports",
    "question": "Who is often called \"the Maestro\" in the men's tennis circuit?",
    "correctAnswer": "Roger Federer",
    "incorrectAnswers": [
      "Bill Tilden",
      "Boris Becker",
      "Pete Sampras"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the 1976 film 'Taxi Driver', how many guns did Travis buy from the salesman?",
    "correctAnswer": "4",
    "incorrectAnswers": [
      "2",
      "6",
      "1"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In the \"To Love-Ru\" series, Golden Darkness is sent to kill Lala Deviluke.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "The Pyrenees mountains are located on the border of which two countries?",
    "correctAnswer": "France and Spain",
    "incorrectAnswers": [
      "Italy and Switzerland",
      "Norway and Sweden",
      "Russia and Ukraine"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which one of these action movies are shot entirely in one take?",
    "correctAnswer": "Victoria",
    "incorrectAnswers": [
      "Ip Man 2",
      "The Bourne Legacy",
      "Léon: The Professional"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which of these characters is the mascot of the video game company SEGA?",
    "correctAnswer": "Sonic the Hedgehog",
    "incorrectAnswers": [
      "Dynamite Headdy",
      "Alex Kidd",
      "Opa-Opa"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What is the Linnean name of the domestic apple tree?",
    "correctAnswer": "Malus pumila",
    "incorrectAnswers": [
      "Malus americana",
      "Pomus domestica",
      "Appelus delectica"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "How many unique items does \"Borderlands 2\" claim to have?",
    "correctAnswer": "87 Bazillion ",
    "incorrectAnswers": [
      "87 Million",
      "87 Trillion",
      "87 Gazillion "
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In the \"Portal\" series, who was Cave Johnson's personal assistant?",
    "correctAnswer": "Caroline",
    "incorrectAnswers": [
      "Heather",
      "Melissa",
      "Jane"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "geography",
    "question": "Which country is completely landlocked by South Africa?",
    "correctAnswer": "Lesotho",
    "incorrectAnswers": [
      "Swaziland",
      "Botswana",
      "Zimbabwe"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Who wrote the lyrics for Leonard Bernstein's 1957 Brodway musical West Side Story?",
    "correctAnswer": "Stephen Sondheim",
    "incorrectAnswers": [
      "Himself",
      "Oscar Hammerstein",
      "Richard Rodgers"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which of these \"Worms\" games featured 3D gameplay?",
    "correctAnswer": "Worms 4: Mayhem",
    "incorrectAnswers": [
      "Worms W.M.D",
      "Worms Reloaded",
      "Worms: Open Warfare 2"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the 1964 film \"Zulu\", what song does the British Army company sing before the final battle?",
    "correctAnswer": "Men of Harlech",
    "incorrectAnswers": [
      "Scotland the Brave",
      "Colonel Bogey March",
      "The British Grenadiers"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In the game Destiny, who succeeded Peter Dinklage in voicing the protagonist's \"Ghost\"?",
    "correctAnswer": "Nolan North",
    "incorrectAnswers": [
      "John DiMaggio",
      "Mark Hamill",
      " Troy Baker"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Who is the last boss in Night In The Woods' Demontower minigame?",
    "correctAnswer": "The Blood Thief",
    "incorrectAnswers": [
      "Mega Hairball ",
      "King Skellie ",
      "Krampus "
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of the following is considered classical conditioning?",
    "correctAnswer": "Pavlov's dog experiments",
    "incorrectAnswers": [
      "Skinner box experiment",
      "Schrödinger's cat experiment",
      "Harlow's monkey experiments"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "What is the northernmost human settlement with year round inhabitants?",
    "correctAnswer": "Alert, Canada",
    "incorrectAnswers": [
      "Nagurskoye, Russia",
      "McMurdo Station, Antarctica ",
      "Honningsvâg, Norway"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In Rust, how many Timed Explosive Charges does it take to destroy a Ladder Hatch?",
    "correctAnswer": "1",
    "incorrectAnswers": [
      "3",
      "2",
      "5"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Lenovo acquired IBM's personal computer division, including the ThinkPad line of laptops and tablets, in what year?",
    "correctAnswer": "2005",
    "incorrectAnswers": [
      "1999",
      "2002",
      "2008"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "\"Rich Uncle Pennybags\" from the board game \"Monopoly\" wears a monocle.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the real name of the Scout in \"Team Fortress 2\"?",
    "correctAnswer": "Jeremy",
    "incorrectAnswers": [
      "Lance",
      "Walter",
      "John"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "What was Maggie Simpson's first canonical word, not including the Tracey Ullman shorts?",
    "correctAnswer": "Daddy.",
    "incorrectAnswers": [
      "Sequel?",
      "Ja!",
      "Rusty!"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "Which internet company began life as an online bookstore called 'Cadabra'?",
    "correctAnswer": "Amazon",
    "incorrectAnswers": [
      "eBay",
      "Overstock",
      "Shopify"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What year was the game \"Overwatch\" revealed?",
    "correctAnswer": "2014",
    "incorrectAnswers": [
      "2015",
      "2011",
      "2008"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "\"The Simpsons\" family is named after creator Matt Groening's real family.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "science",
    "question": "Android versions are named in alphabetical order.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Who is the main villain of Kirby's Return to Dreamland?",
    "correctAnswer": "Magolor",
    "incorrectAnswers": [
      "Landia",
      "King Dedede",
      "Queen Sectonia "
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "Which American president appears on a one dollar bill?",
    "correctAnswer": "George Washington",
    "incorrectAnswers": [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In \"Highschool of the Dead\", where did Komuro and Saeko establish to meet after the bus explosion?",
    "correctAnswer": "Eastern Police Station",
    "incorrectAnswers": [
      "The Center Mall",
      "Komuro's House",
      "On The Main Bridge"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "history",
    "question": "How long did the Warsaw Uprising during World War II last?",
    "correctAnswer": "63 Days",
    "incorrectAnswers": [
      "20 Days",
      "55 Days",
      "224 Days"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "\"Undertale\" is an RPG created by Toby Fox and released in 2015.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the name of Ruby Rose's weapon from RWBY?",
    "correctAnswer": "Crescent Rose",
    "incorrectAnswers": [
      "Thorned Rosebud",
      "Magnhild",
      "Crooked Scythe"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "John Williams composed the music for \"Star Wars\".",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "What year was Min Yoongi from South Korea boy band \"BTS\" born in?",
    "correctAnswer": "1993",
    "incorrectAnswers": [
      "1992",
      "1995",
      "1994"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Who is the musical director for the award winning musical \"Hamilton\"?",
    "correctAnswer": "Alex Lacamoire",
    "incorrectAnswers": [
      "Lin-Manuel Miranda",
      "Renee Elise-Goldberry",
      "Leslie Odom Jr."
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "general",
    "question": "The Quadrangularis Reversum is best described as which of the following?",
    "correctAnswer": "A percussion instrument",
    "incorrectAnswers": [
      "A building in Oxford University",
      "A chess move",
      "A geometric theorem"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "general",
    "question": "Nephelococcygia is the practice of doing what?",
    "correctAnswer": "Finding shapes in clouds",
    "incorrectAnswers": [
      "Sleeping with your eyes open",
      "Breaking glass with your voice",
      "Swimming in freezing water"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "history",
    "question": "Oxford University is older than the Aztec Empire. ",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "What was the world's first handheld game device?",
    "correctAnswer": "Mattel Auto Race",
    "incorrectAnswers": [
      "Game Boy",
      "Microvision",
      "Game & Watch"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "general",
    "question": "It is automatically considered entrapment in the United States if the police sell you illegal substances without revealing themselves.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which one of these actors is said to be cut from the film 'E.T. the Extra-Terrestrial'?",
    "correctAnswer": "Harrison Ford",
    "incorrectAnswers": [
      "Michael J. Fox",
      "Andy Kaufman",
      "Arnold Schwarzenegger"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "general",
    "question": "What was the destination of the missing flight MH370?",
    "correctAnswer": "Beijing",
    "incorrectAnswers": [
      "Kuala Lumpur",
      "Singapore",
      "Tokyo"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "sports",
    "question": "In 2008, Usain Bolt set the world record for the 100 meters with one shoelace untied.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "celebrities",
    "question": "Before voicing Pearl in Steven Universe, Deedee Magno Hall was part of which American band?",
    "correctAnswer": "The Party",
    "incorrectAnswers": [
      "The Weather Girls",
      "The Pussycat Dolls",
      "The Cheetah Girls"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "The medical condition osteoporosis affects which part of the body?",
    "correctAnswer": "Bones",
    "incorrectAnswers": [
      "Skin",
      "Brain",
      "Heart"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "animals",
    "question": "Which species is a \"mountain chicken\"?",
    "correctAnswer": "Frog",
    "incorrectAnswers": [
      "Chicken",
      "Horse",
      "Fly"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In \"The Binding of Isaac\", what is the name of the final boss that you fight in The Void?",
    "correctAnswer": "Delirium",
    "incorrectAnswers": [
      "Mega Satan",
      "Hush",
      "The Lamb"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In what engine was Titanfall made in?",
    "correctAnswer": "Source Engine",
    "incorrectAnswers": [
      "Frostbite 3",
      "Unreal Engine",
      "Cryengine"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "What happened on June 6, 1944?",
    "correctAnswer": "D-Day",
    "incorrectAnswers": [
      "Atomic bombings of Hiroshima and Nagasaki",
      "Attack on Pearl Harbor",
      "The Liberation of Paris"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "geography",
    "question": "Which of these is NOT a real tectonic plate?",
    "correctAnswer": "Atlantic Plate",
    "incorrectAnswers": [
      "North American Plate",
      "Eurasian Plate",
      "Nazca Plate"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "sports",
    "question": "In baseball, how many fouls are an out?",
    "correctAnswer": "0",
    "incorrectAnswers": [
      "5",
      "3",
      "2"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "animals",
    "question": "What color/colour is a polar bear's skin?",
    "correctAnswer": "Black",
    "incorrectAnswers": [
      "White",
      "Pink",
      "Green"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What is the name of Sherlock Holmes's brother?",
    "correctAnswer": "Mycroft Holmes",
    "incorrectAnswers": [
      "Mederi Holmes",
      "Martin Holmes",
      "Herbie Hancock Holmes"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What TV show is about a grandfather dragging his grandson around on adventures?",
    "correctAnswer": "Rick & Morty",
    "incorrectAnswers": [
      "Family Guy",
      "South Park",
      "American Dad"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "general",
    "question": "The French word to travel is \"Travail\"",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "sports",
    "question": "Which soccer team won the Copa América 2015 Championship ?",
    "correctAnswer": "Chile",
    "incorrectAnswers": [
      "Argentina",
      "Brazil",
      "Paraguay"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "When did L. L. Zamenhof first publish \"Unua Libro\", the first publication describing his international language Esperanto?",
    "correctAnswer": "1887",
    "incorrectAnswers": [
      "1897",
      "1905",
      "1915"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "The notion of a \"set that contains all sets which do not contain themselves\" is a paradoxical idea attributed to which English philospher?",
    "correctAnswer": "Bertrand Russel",
    "incorrectAnswers": [
      "Francis Bacon",
      "John Locke",
      "Alfred North Whitehead"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "What is the name of NASA's most famous space telescope?",
    "correctAnswer": "Hubble Space Telescope",
    "incorrectAnswers": [
      "Big Eye",
      "Death Star",
      "Millenium Falcon"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which of the following James Bond villains is not affiliated with the SPECTRE organization?",
    "correctAnswer": "Auric Goldfinger",
    "incorrectAnswers": [
      "Dr. Julius No",
      "Rosa Klebb",
      "Emilio Largo"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the name of the inspector in the series \"On the Buses\"?",
    "correctAnswer": "Blakey",
    "incorrectAnswers": [
      "Harper",
      "Naily",
      "Gally"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "history",
    "question": "What year was Canada founded in?",
    "correctAnswer": "1867",
    "incorrectAnswers": [
      "1798",
      "1859",
      "1668"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What breed of dog was Marley in the film \"Marley & Me\" (2008)?",
    "correctAnswer": "Labrador Retriever",
    "incorrectAnswers": [
      "Golden Retriever",
      "Dalmatian",
      "Shiba Inu"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which show is known for the songs \"You are a Pirate\", \"Cooking by the Book\" and \"We Are Number One\"?",
    "correctAnswer": "LazyTown",
    "incorrectAnswers": [
      "Sofia the First",
      "DuckTales",
      "Tom and Jerry"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Who voiced Finn in Adventure Time?",
    "correctAnswer": "Jeremy Shada",
    "incorrectAnswers": [
      "Nolan North",
      "John DiMaggio",
      "Tom Kenny"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which animation studio animated the 2016 anime \"Mob Psycho 100\"?",
    "correctAnswer": "Bones",
    "incorrectAnswers": [
      "A-1 Pictures",
      "Shaft",
      "Madhouse"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "general",
    "question": "Which church's interior in Vatican City was designed in 1503 by renaissance architects including Bramante, Michelangelo and Bernini?",
    "correctAnswer": "St. Peter's Basilica",
    "incorrectAnswers": [
      "Catania Cathedral",
      "St. Mark's Basilica",
      "The Duomo of Florence"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "The PlayStation was originally a joint project between Sega and Sony that was a Sega Genesis with a disc drive.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Krusty is the guild master of which guild in \"Log Horizon\"?",
    "correctAnswer": "D. D. D",
    "incorrectAnswers": [
      "Silver Sword",
      "West Wind Brigade",
      "Oceanic Systems (Marine Agency)"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "mythology",
    "question": "Which of these mythological creatures is said to be half-man and half-horse?",
    "correctAnswer": "Centaur",
    "incorrectAnswers": [
      "Minotaur",
      "Pegasus",
      "Gorgon"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Some of the \"Fallen Empires\" cards from \"Magic: The Gathering\" were misprinted on the backs of which other card game?",
    "correctAnswer": "Wyvern",
    "incorrectAnswers": [
      "Pokemon",
      "Dominion",
      "Yu-Gi-Oh"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the lowest amount of max health you can have in Team Fortress 2?",
    "correctAnswer": "70",
    "incorrectAnswers": [
      "100",
      "50",
      "95"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Who was the original author of Frankenstein?",
    "correctAnswer": "Mary Shelley",
    "incorrectAnswers": [
      "Edgar Allan Poe",
      "Bram Stoker",
      "H. P. Lovecraft"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?",
    "correctAnswer": "Cabbage Patch Kids",
    "incorrectAnswers": [
      "Transformers",
      "Care Bears",
      "Rubik's Cube"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "geography",
    "question": "Japan has left-hand side traffic.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In which year did the British television series \"The Bill\" end?",
    "correctAnswer": "2010",
    "incorrectAnswers": [
      "2001",
      "2007",
      "2012"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "sports",
    "question": "The AHL affiliate team of the Boston Bruins is named what?",
    "correctAnswer": "Providence Bruins",
    "incorrectAnswers": [
      "New Haven Bruins",
      "Cambridge Bruins",
      "Hartford Bruins"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Who was the original drummer for The Beatles?",
    "correctAnswer": "Tommy Moore",
    "incorrectAnswers": [
      "Ringo Starr",
      "Stuart Sutcliffe",
      "Pete Best"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "science",
    "question": "The last Windows operating system to be based on the Windows 9x kernel was Windows 98.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which movie sequel had improved box office results compared to its original film?",
    "correctAnswer": "Toy Story 2",
    "incorrectAnswers": [
      "Sin City: A Dame to Kill For",
      "Speed 2: Cruise Control",
      "Son of the Mask"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What year was Red Hot Chill Pepper's album \"Californication\" released?",
    "correctAnswer": "1999",
    "incorrectAnswers": [
      "1997",
      "2000",
      "1992"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "history",
    "question": "Former United States Presidents John Adams and Thomas Jefferson died within hours of each other.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "general",
    "question": "The website \"Shut Up & Sit Down\" reviews which form of media?",
    "correctAnswer": "Board Games",
    "incorrectAnswers": [
      "Television Shows",
      "Video Games",
      "Films"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Which of these characters from Final Fantasy VIII primarily spoke in one word sentences?",
    "correctAnswer": "Fujin",
    "incorrectAnswers": [
      "Raijin",
      "Seifer",
      "Zell"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "vehicles",
    "question": "What model was the sports car gifted to Yuri Gagarin by the French government in 1965?",
    "correctAnswer": "Matra Djet",
    "incorrectAnswers": [
      "Porsche 911",
      "Alpine A110",
      "AC Cobra"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "general",
    "question": "The architect known as Le Corbusier was an important figure in what style of architecture?",
    "correctAnswer": "Modernism",
    "incorrectAnswers": [
      "Neoclassical",
      "Baroque",
      "Gothic Revival"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which Hanna-Barbera cartoon character travelled with a canine companion named Beegle Beagle?",
    "correctAnswer": "Grape Ape",
    "incorrectAnswers": [
      "Boss Gator",
      "Wally Gator",
      "Yogi Bear"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Matt Damon played an astronaut stranded on an extraterrestrial planet in both of the movies Interstellar and The Martian.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "What is the scientific name of the red fox?",
    "correctAnswer": "Vulpes Vulpes",
    "incorrectAnswers": [
      "Vulpes Redus",
      "Red Fox",
      "Vulpes Vulpie"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which character was introduced to the Super Smash Bros franchise in Super Smash Bros Melee?",
    "correctAnswer": "Sheik",
    "incorrectAnswers": [
      "Samus",
      "Lucas",
      "Mega Man"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What is the full first name of the babysitter in Calvin and Hobbes?",
    "correctAnswer": "Rosalyn",
    "incorrectAnswers": [
      "Rose",
      "Ruby",
      "Rachel"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "What vault in the video game \"Fallout 3\" is the home of multiple clones named Gary?",
    "correctAnswer": "Vault 108",
    "incorrectAnswers": [
      "Vault 101",
      "Vault 87",
      "Vault 21"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "sports",
    "question": "Who is Manchester United's top premier league goal scorer?",
    "correctAnswer": "Wayne Rooney",
    "incorrectAnswers": [
      "Sir Bobby Charlton",
      "Ryan Giggs",
      "David Beckham"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "mythology",
    "question": "In Norse mythology, what is the name of the serpent which eats the roots of the ash tree Yggdrasil?",
    "correctAnswer": "Nidhogg",
    "incorrectAnswers": [
      "Bragi",
      "Odin",
      "Ymir"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the name of the main character in the webcomic Gunnerkrigg Court by Tom Siddell?",
    "correctAnswer": "Antimony",
    "incorrectAnswers": [
      "Bismuth",
      "Mercury",
      "Cobalt"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "vehicles",
    "question": "Where are the cars of the brand \"Ferrari\" manufactured?",
    "correctAnswer": "Italy",
    "incorrectAnswers": [
      "Romania",
      "Germany",
      "Russia"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "According to the American rapper Nelly, what should you do when its hot in here?",
    "correctAnswer": "Take off all your clothes",
    "incorrectAnswers": [
      "Take a cool shower",
      "Drink some water",
      "Go skinny dipping"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Nickelodeon rejected the pilot to Adventure Time.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "How many zeros are there in a googol?",
    "correctAnswer": "100",
    "incorrectAnswers": [
      "10",
      "1,000",
      "1,000,000"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "When was the play \"Macbeth\" written?",
    "correctAnswer": "1606",
    "incorrectAnswers": [
      "1605",
      "1723",
      "1628"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "TF2: The Heavy's voice actor, Gary Schwartz, voices the Demoman as well ",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "sports",
    "question": "Which NBA player has the most games played over the course of their career?",
    "correctAnswer": "Robert Parish",
    "incorrectAnswers": [
      "Kareem Abdul-Jabbar",
      "Kevin Garnett",
      "Kobe Bryant"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "The board game Go has more possible legal positions than the number of atoms in the visible universe.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "Harvard University is located in which city?",
    "correctAnswer": "Cambridge",
    "incorrectAnswers": [
      "Providence",
      "New York",
      "Washington D.C."
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In the movie \"Spaceballs\", what are the Spaceballs attempting to steal from Planet Druidia?",
    "correctAnswer": "Air",
    "incorrectAnswers": [
      "The Schwartz",
      "Princess Lonestar",
      "Meatballs"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "When was Gangnam Style uploaded to YouTube?",
    "correctAnswer": "2012",
    "incorrectAnswers": [
      "2013",
      "2014",
      "2011"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "Which of the following ancient Near Eastern peoples still exists as a modern ethnic group?",
    "correctAnswer": "Assyrians",
    "incorrectAnswers": [
      "Babylonians",
      "Hittites",
      "Elamites"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "science",
    "question": "The first dual-core CPU was the Intel Pentium D.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "general",
    "question": "What is the romanized Japanese word for \"university\"?",
    "correctAnswer": "Daigaku",
    "incorrectAnswers": [
      "Toshokan",
      "Jimusho",
      "Shokudou"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "How old is Chloe Price in Life is Strange: Before the Storm?",
    "correctAnswer": "16",
    "incorrectAnswers": [
      "24",
      "19",
      "15"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What was the first interactive movie video game?",
    "correctAnswer": "Astron Belt",
    "incorrectAnswers": [
      "Dragon's Lair",
      "Cube Quest",
      "M.A.C.H. 3"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Prior to working at Wizards of the Coast, \"Mark Rosewater\" was a writer for which show?",
    "correctAnswer": "Roseanne",
    "incorrectAnswers": [
      "Boy Meets World",
      "The X-Files",
      "NYPD Blue"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "What was the first game in the \"Battlefield\" series?",
    "correctAnswer": "Battlefield 1942",
    "incorrectAnswers": [
      "Battlefield Vietnam",
      "Battlefield 2",
      "Battlefield 1"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In Disney's \"Toontown Online\", which of these species wasn't available as a Toon?",
    "correctAnswer": "Cow",
    "incorrectAnswers": [
      "Monkey",
      "Bear",
      "Pig"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the game Warframe, what Mastery Rank do you need to have to build the Tigris Prime?",
    "correctAnswer": "13",
    "incorrectAnswers": [
      "6",
      "18",
      "10"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In \"Fallout 4\", what is the name of the dog you find at Red Rocket truck stop?",
    "correctAnswer": "Dogmeat",
    "incorrectAnswers": [
      "Sparky",
      "Quazar",
      "Chop"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Which fictional English county was the setting for Thomas Hardy's novels?",
    "correctAnswer": "Wessex",
    "incorrectAnswers": [
      "Barsetshire",
      "Fulchester",
      "Ambridge"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "politics",
    "question": "Former president Theodore Roosevelt (1900-1908)  ran for another term under the Progressive Party in 1912.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "How many differently shaped Tetris pieces are there?",
    "correctAnswer": "7",
    "incorrectAnswers": [
      "5",
      "6",
      "8"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "mythology",
    "question": "Which of the following is NOT a god in Norse Mythology.",
    "correctAnswer": "Jens",
    "incorrectAnswers": [
      "Loki",
      "Tyr",
      "Snotra"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "science",
    "question": "A universal set, or a set that contains all sets, exists.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "vehicles",
    "question": "When was Cadillac founded?",
    "correctAnswer": "1902",
    "incorrectAnswers": [
      "1964",
      "1898",
      "1985"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Who had a 1969 top 5 hit with the song,  'A Boy Named Sue'?",
    "correctAnswer": "Johnny Cash",
    "incorrectAnswers": [
      "Bob Dylan",
      "Willie Nelson",
      "Kris Kristofferson"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What is the half-life of Uranium-235?",
    "correctAnswer": "703,800,000 years",
    "incorrectAnswers": [
      "4,300,400,000 years",
      "1,260,900,000 years",
      "Uranium-235 is a stable isotope"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "What was the first company to use the term \"Golden Master\"?",
    "correctAnswer": "Apple",
    "incorrectAnswers": [
      "IBM",
      "Microsoft",
      "Google"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "vehicles",
    "question": "Bugatti was an Italian car manufacturer.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which country does the electronic music duo \"The Knife\" originate from?",
    "correctAnswer": "Sweden",
    "incorrectAnswers": [
      "Finland",
      "Denmark",
      "Norway"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In Chobits, Hideki found Chii in his apartment.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In \"Yo! Noid 2,\" The Noid can perform what special move?",
    "correctAnswer": "Dab",
    "incorrectAnswers": [
      "Pizza Throw",
      "Dodge Roll",
      "Spin Dash"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In Kendrick Lamar's 2012 album, \"Good Kid, M.A.A.D City\", the album's story takes place in which city?",
    "correctAnswer": "Compton",
    "incorrectAnswers": [
      "Detroit",
      "New York",
      "Baltimore"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "general",
    "question": "The Great Wall of China is visible from the moon.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the webcomic \"Ava's Demon\", what sin is \"Nevy Nervine\" based off of? ",
    "correctAnswer": "Envy ",
    "incorrectAnswers": [
      "Sloth",
      "Wrath ",
      "Lust"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "history",
    "question": "What was the last colony the UK ceded marking the end of the British Empire?",
    "correctAnswer": "Hong Kong",
    "incorrectAnswers": [
      "India",
      "Australia",
      "Ireland"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In \"Star Trek\", what is the Klingon death ritual?",
    "correctAnswer": "Look into sky and yell loudly in mourning.",
    "incorrectAnswers": [
      "Kiss the jagged forehead before burial.",
      "Shoot into space in a torpedo casing.",
      "Split the deceased's earnings between bloodkin."
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What are the smallest blood vessels in the human body?",
    "correctAnswer": "Capillaries",
    "incorrectAnswers": [
      "Arterioles",
      "Veinules",
      "Lymphatics"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of the following is a major muscle of the back?",
    "correctAnswer": "Trapezius",
    "incorrectAnswers": [
      "Trapezium",
      "Trapezoid",
      "Triquetrum"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In the film \"Interstellar\", how long did they spend on Miller's planet?",
    "correctAnswer": "23 years, 4 months, and 8 days",
    "incorrectAnswers": [
      "15 years, 2 months, and 15 days",
      "10 months and 6 days",
      "26 years, 4 months, and 10 days"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "history",
    "question": "When did Canada leave the confederation to become their own nation?",
    "correctAnswer": "July 1st, 1867",
    "incorrectAnswers": [
      "July 1st, 1763",
      "July 1st, 1832",
      "July 1st, 1902"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "science",
    "question": "What is the correct order of operations for solving equations?",
    "correctAnswer": "Parentheses, Exponents, Multiplication, Division, Addition, Subtraction",
    "incorrectAnswers": [
      "Addition, Multiplication, Division, Subtraction, Addition, Parentheses",
      "Parentheses, Exponents, Addition, Substraction, Multiplication, Division",
      "The order in which the operations are written."
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In \"Super Mario 64\", collecting 100 coins on a level will give you a 1-UP.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What is Hypernatremia?",
    "correctAnswer": "Increase in blood sodium",
    "incorrectAnswers": [
      "Decrease in blood potassium",
      "Increase in blood glucose",
      "Decrease in blood iron"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of the following are cells of the adaptive immune system?",
    "correctAnswer": "Cytotoxic T cells",
    "incorrectAnswers": [
      "Dendritic cells",
      "Natural killer cells",
      "White blood cells"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "The Canadian $1 coin is colloquially known as a what?",
    "correctAnswer": "Loonie",
    "incorrectAnswers": [
      "Boolie",
      "Foolie",
      "Moodie"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "history",
    "question": "Who was the first American in space?",
    "correctAnswer": "Alan Shephard",
    "incorrectAnswers": [
      "Neil Armstrong",
      "John Glenn",
      "Jim Lovell"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "\"Grande Valse\" is a phrase from the song \"Gran Vals\". What is that song segment known as?",
    "correctAnswer": "Nokia Tune",
    "incorrectAnswers": [
      "Hello Moto [Motorola Ringtone]",
      "Droid Ringtone",
      "Microsoft Ringtone"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What is the study of the cells and tissues of plants and animals?",
    "correctAnswer": "Histology",
    "incorrectAnswers": [
      "Microbiology",
      "Anatomy",
      "Biochemistry"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "In \"Gravity Falls\", the character Bill Cipher remarks that \"the universe is what?\"",
    "correctAnswer": "A hologram ",
    "incorrectAnswers": [
      "An illusion ",
      "A simulation",
      "Corrupting"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "How many games are there in the \"Colony Wars\" series for the PlayStation?",
    "correctAnswer": "3",
    "incorrectAnswers": [
      "2",
      "4",
      "5"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "Gannymede is the largest moon of which planet?",
    "correctAnswer": "Jupiter",
    "incorrectAnswers": [
      "Uranus",
      "Neptune",
      "Mars"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which of 2 Valve Games are set in the same universe?",
    "correctAnswer": "Half-life and Portal",
    "incorrectAnswers": [
      "Portal and Left 4 Dead",
      "Half-life and Left 4 Dead",
      "Half-life and Counter Strike"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which town was Seamus \"Sledge\" Cowden from \"Tom Clancy's Rainbow Six Siege\" born in?",
    "correctAnswer": "John O'Groats",
    "incorrectAnswers": [
      "Brawl",
      "Kearvaig",
      "Talmine"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In the Video Game, Half-life, what type of US military force starts clearing out the Black Mesa Research Facility?",
    "correctAnswer": "The HECU",
    "incorrectAnswers": [
      "Navy Seals",
      "The Combine",
      "The Marines"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of the following is used to measure blood pressure?",
    "correctAnswer": "Sphygmomanometer",
    "incorrectAnswers": [
      "Barometer",
      "Ruler",
      "Haemoerythrometer"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "geography",
    "question": "What is the most common climbing route for the second highest mountain in the world, K2?",
    "correctAnswer": "Abruzzi Spur",
    "incorrectAnswers": [
      "Magic Line",
      "Cesen Route",
      "Polish Line"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "science",
    "question": "What does LASER stand for?",
    "correctAnswer": "Light amplification by stimulated emission of radiation",
    "incorrectAnswers": [
      "Lite analysing by stereo ecorazer",
      "Light amplifier by standby energy of radio",
      "Life antimatter by standing entry of range"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "celebrities",
    "question": "How tall is Tom Cruise?",
    "correctAnswer": "5′  7″",
    "incorrectAnswers": [
      "5′  9″",
      "5′  4″",
      "5′  5″"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "How many Chaos Emeralds can you collect in the first Sonic The Hedgehog?",
    "correctAnswer": "Six",
    "incorrectAnswers": [
      "Seven",
      "Five",
      "Eight"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which of these artists do NOT originate from France?",
    "correctAnswer": "The Chemical Brothers",
    "incorrectAnswers": [
      "Air",
      "Justice",
      "Daft Punk"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "What is \"dabbing\"?",
    "correctAnswer": "A dance",
    "incorrectAnswers": [
      "A medical procedure",
      "A sport",
      "A language"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the name of the virus in \"Metal Gear Solid 1\"?",
    "correctAnswer": "FOXDIE",
    "incorrectAnswers": [
      "FOXENGINE",
      "FOXALIVE",
      "FOXKILL"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "Which country was NOT part of the Soviet Union?",
    "correctAnswer": "Romania",
    "incorrectAnswers": [
      "Turkmenistan",
      "Belarus",
      "Tajikistan"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which member of the British pop group \"The Spice Girls\" was known as Ginger Spice?",
    "correctAnswer": "Geri Halliwell",
    "incorrectAnswers": [
      "Melanie Brown",
      "Emma Bunton",
      "Victoria Beckham"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "Which of the following blood component forms a plug at the site of injuries?",
    "correctAnswer": "Platelets",
    "incorrectAnswers": [
      "Red blood cells",
      "White blood cells",
      "Blood plasma"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "sports",
    "question": "Which of the following sports is not part of the triathlon?",
    "correctAnswer": "Horse-Riding",
    "incorrectAnswers": [
      "Cycling",
      "Swimming",
      "Running"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "celebrities",
    "question": "The eccentric natural philosopher Tycho Brahe kept what as a pet?",
    "correctAnswer": "Moose",
    "incorrectAnswers": [
      "Dog",
      "Bear",
      "Goat"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which of these Bojack Horseman characters is a human?",
    "correctAnswer": "Todd Chavez",
    "incorrectAnswers": [
      "Lennie Turtletaub",
      "Princess Carolyn",
      "Tom Jumbo-Grumbo"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What was the name given to Android 4.3?",
    "correctAnswer": "Jelly Bean",
    "incorrectAnswers": [
      "Lollipop",
      "Nutella",
      "Froyo"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "animals",
    "question": "What is the name for a male bee that comes from an unfertilized egg?",
    "correctAnswer": "Drone",
    "incorrectAnswers": [
      "Soldier",
      "Worker",
      "Male"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "politics",
    "question": "What was the personal nickname of the 40th Governor of the US State Louisiana, Huey Long?",
    "correctAnswer": "The Kingfish",
    "incorrectAnswers": [
      "The Champ",
      "The Hoot Owl",
      "The Oracle"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "All the following metal elements are liquids at or near room temperature EXCEPT:",
    "correctAnswer": "Beryllium",
    "incorrectAnswers": [
      "Gallium",
      "Caesium",
      "Mercury"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which episode from The Amazing World Of Gumball won the Childrens Choice Award at the British Animation Awards in 2016?",
    "correctAnswer": "The Shell",
    "incorrectAnswers": [
      "The Limit",
      "The Kids",
      "The Gripes"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "celebrities",
    "question": "How old was Muhammad Ali when he died?",
    "correctAnswer": "74",
    "incorrectAnswers": [
      "61",
      "He's still alive",
      "56"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "general",
    "question": "The term \"Spam\" came before the food product \"Spam\".",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "How many states are in Australia?",
    "correctAnswer": "6",
    "incorrectAnswers": [
      "7",
      "8",
      "5"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "The Space Needle is located in which city?",
    "correctAnswer": "Seattle",
    "incorrectAnswers": [
      "Los Angles",
      "Toronto",
      "Vancouver"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "science",
    "question": "The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which one of these Pink Floyd albums were also a movie?",
    "correctAnswer": "The Wall",
    "incorrectAnswers": [
      "The Dark Side of the Moon",
      "Wish You Were Here",
      "animals"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "During the game's development, what was the first ever created Pokémon?",
    "correctAnswer": "Rhyhorn",
    "incorrectAnswers": [
      "Bulbasaur",
      "Mew",
      "Arceus"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "Which of the following language families is the most controversial amongst modern linguists?",
    "correctAnswer": "Altaic",
    "incorrectAnswers": [
      "Sino-Tibetan",
      "Dravidian",
      "Indo-European"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In the show \"Dragonball Z\", what is the name of Cell's most powerful attack?",
    "correctAnswer": "Solar Kamehameha",
    "incorrectAnswers": [
      "Super Kamehameha",
      "Cell Kamehameha",
      "Android Kamehameha"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "celebrities",
    "question": "What is generally considered to be William Shakespeare's birth date?",
    "correctAnswer": "April 23rd, 1564",
    "incorrectAnswers": [
      "July 4th, 1409",
      "September 29th, 1699",
      "December 1st, 1750"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "What colour is the circle on the Japanese flag?",
    "correctAnswer": "Red",
    "incorrectAnswers": [
      "White",
      "Yellow",
      "Black"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "art",
    "question": "Who painted the epic mural Guernica?",
    "correctAnswer": "Pablo Picasso",
    "incorrectAnswers": [
      "Francisco Goya",
      "Leonardo da Vinci",
      "Henri Matisse"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?",
    "correctAnswer": "Drill Containment Unit",
    "incorrectAnswers": [
      "Anti-Gravity Hook",
      "Influx Waver",
      "Cosmic Car Key"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "What is the largest lake in the African continent?",
    "correctAnswer": "Lake Victoria",
    "incorrectAnswers": [
      "Lake Tanganyika",
      "Lake Malawi",
      "Lake Turkana"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which of the following is NOT a quote from the 1942 film Casablanca? ",
    "correctAnswer": "\"Frankly, my dear, I don't give a damn.\"",
    "incorrectAnswers": [
      "\"Here's lookin' at you, kid.\"",
      "\"Of all the gin joints, in all the towns, in all the world, she walks into mine...\"",
      "\"Round up the usual suspects.\""
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Which of the following actors portrayed the Ninth Doctor in the British television show \"Doctor Who\"?",
    "correctAnswer": "Christopher Eccleston",
    "incorrectAnswers": [
      "David Tennant",
      "Matt Smith",
      "Tom Baker"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "What is the name given to layer 4 of the Open Systems Interconnection (ISO) model?",
    "correctAnswer": "Transport",
    "incorrectAnswers": [
      "Session",
      "Data link",
      "Network"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "sports",
    "question": "Soccer player Cristiano Ronaldo opened a museum dedicated to himself.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "history",
    "question": "What year did World War I begin?",
    "correctAnswer": "1914",
    "incorrectAnswers": [
      "1905",
      "1919",
      "1925"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of these is not a key value of Agile software development?",
    "correctAnswer": "Comprehensive documentation",
    "incorrectAnswers": [
      "Individuals and interactions",
      "Customer collaboration",
      "Responding to change"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "The \"fairy\" type made it's debut in which generation of the Pokemon core series games?",
    "correctAnswer": "6th",
    "incorrectAnswers": [
      "2nd",
      "7th",
      "4th"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "history",
    "question": "Who rode on horseback to warn the Minutemen that the British were coming during the U.S. Revolutionary War?",
    "correctAnswer": "Paul Revere",
    "incorrectAnswers": [
      "Thomas Paine",
      "Henry Longfellow",
      "Nathan Hale"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "animals",
    "question": "What is the scientific name of the Budgerigar?",
    "correctAnswer": "Melopsittacus undulatus",
    "incorrectAnswers": [
      "Nymphicus hollandicus",
      "Pyrrhura molinae",
      "Ara macao"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "geography",
    "question": "What's the first National Park designated in the United States?",
    "correctAnswer": "Yellowstone",
    "incorrectAnswers": [
      "Sequoia ",
      "Yosemite",
      "Rocky Mountain"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "entertainment",
    "question": "Which of the following games was NOT included in Valve's Orange Box?",
    "correctAnswer": "Counter-Strike",
    "incorrectAnswers": [
      "Portal",
      "Half-Life 2: Episode Two",
      "Team Fortress 2"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In \"Pheonix Wright: Ace Attorney\" which character is the District Chief of Police?",
    "correctAnswer": "Damon Gant",
    "incorrectAnswers": [
      "Miles Edgeworth",
      "Lana Skye",
      "Mike Meekins"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which actor plays the role of the main antagonist in the 2011 movie \"Tower Heist?\"",
    "correctAnswer": "Alan Alda",
    "incorrectAnswers": [
      "Eddie Murphy",
      "Alec Baldwin",
      "Kevin Nealon"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "John Moses Browning, the designer of the M1918 BAR (Browning Automatic Rifle) was a part of which religion?",
    "correctAnswer": "Mormon",
    "incorrectAnswers": [
      "Catholic",
      "Jewish",
      "Atheist"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In Pokémon, Bulbasaur is the only starter pokemon that is a Grass/Poison type.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "general",
    "question": "You can legally drink alcohol while driving in Mississippi.",
    "correctAnswer": "True",
    "incorrectAnswers": [
      "False"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "What year did the Battle of Agincourt take place?",
    "correctAnswer": "1415",
    "incorrectAnswers": [
      "1463",
      "1401",
      "1422"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "geography",
    "question": "The mountainous Khyber Pass connects which of the two following countries?",
    "correctAnswer": "Afghanistan and Pakistan",
    "incorrectAnswers": [
      "India and Nepal",
      "Pakistan and India",
      "Tajikistan and Kyrgyzstan"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In the Portal series of games, who was the founder of Aperture Science?",
    "correctAnswer": "Cave Johnson",
    "incorrectAnswers": [
      "GLaDOs",
      "Wallace Breen",
      "Gordon Freeman"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What is the first primary weapon the player gets in \"PAYDAY: The Heist\"?",
    "correctAnswer": "AMCAR-4",
    "incorrectAnswers": [
      "Brenner 21",
      "Reinbeck",
      "M308"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In World of Warcraft lore, who was first to have the title \"The Ashbringer\"?",
    "correctAnswer": "Alexandros Mograine",
    "incorrectAnswers": [
      "Tirion Fordring",
      "Arthas Menethil",
      "Uther the Lightbringer"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "Which small country is located between the borders of France and Spain?",
    "correctAnswer": "Andorra",
    "incorrectAnswers": [
      "San Marino",
      "Vatican City",
      "Lichtenstein"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "history",
    "question": "The minigun was designed in 1960 by which manufacturer.",
    "correctAnswer": "General Electric",
    "incorrectAnswers": [
      "Colt Firearms",
      "Heckler & Koch",
      "Sig Sauer"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Which of these is not a DLC vehicle in \"Mario Kart 8\"?",
    "correctAnswer": "Wild Wiggler",
    "incorrectAnswers": [
      "Bone Rattler",
      "B Dasher",
      "300 SL Roadster"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "Which of these is NOT a playable character in \"Left 4 Dead\"?",
    "correctAnswer": "Nick",
    "incorrectAnswers": [
      "Louis",
      "Zoey",
      "Bill"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "science",
    "question": "What polymer is used to make CDs, safety goggles and riot shields?",
    "correctAnswer": "Polycarbonate",
    "incorrectAnswers": [
      "Rubber",
      "Nylon",
      "Bakelite"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "hard",
    "category": "science",
    "question": "Which of these chemical compounds is NOT found in gastric acid?",
    "correctAnswer": "Sulfuric acid",
    "incorrectAnswers": [
      "Hydrochloric acid",
      "Potassium chloride",
      "Sodium chloride"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "science",
    "question": "Time on Computers is measured via the EPOX System.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "What's the weakness of american vampires (Scott Snyder's American Vampire)?",
    "correctAnswer": "Gold",
    "incorrectAnswers": [
      "Sunlight",
      "Wood",
      "Silver"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "In the Super Smash Bros. series, which character was the first one to return to the series after being absent from a previous game?",
    "correctAnswer": "Dr. Mario",
    "incorrectAnswers": [
      "Mewtwo",
      "Lucas",
      "Roy"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "entertainment",
    "question": "There are 2 player roles in Trouble in Terrorist Town.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "sports",
    "question": "What is the oldest team in the NFL?",
    "correctAnswer": "Arizona Cardinals",
    "incorrectAnswers": [
      "Chicago Bears",
      "Green Bay Packers",
      "New York Giants"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "geography",
    "question": "What is the capital of Indonesia?",
    "correctAnswer": "Jakarta",
    "incorrectAnswers": [
      "Bandung",
      "Medan",
      "Palembang"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "The stop motion comedy show \"Robot Chicken\" was created by which of the following?",
    "correctAnswer": "Seth Green",
    "incorrectAnswers": [
      "Seth MacFarlane",
      "Seth Rogen",
      "Seth Rollins"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "general",
    "question": "Area 51 is located in which US state?",
    "correctAnswer": "Nevada",
    "incorrectAnswers": [
      "Arizona",
      "New Mexico",
      "Utah"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "politics",
    "question": "The S in Harry S. Truman stands for \"Samuel\".",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "Bob Ross was a US Air Force pilot.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "easy",
    "category": "sports",
    "question": "Who won the 2015 Formula 1 World Championship?",
    "correctAnswer": "Lewis Hamilton",
    "incorrectAnswers": [
      "Nico Rosberg",
      "Sebastian Vettel",
      "Jenson Button"
    ]
  },
  {
    "type": "multiple-choice",
    "difficulty": "medium",
    "category": "entertainment",
    "question": "In the Mass Effect trilogy, who is the main protagonist?",
    "correctAnswer": "Shepard",
    "incorrectAnswers": [
      "Mordin",
      "Garrus",
      "Thane"
    ]
  },
  {
    "type": "true-false",
    "difficulty": "easy",
    "category": "general",
    "question": "Dihydrogen Monoxide is a dangerous chemical.",
    "correctAnswer": "False",
    "incorrectAnswers": [
      "True"
    ]
  }
]


console.log(JSON.stringify(x.map(xx => ({...xx, id: randomUUID()}))))