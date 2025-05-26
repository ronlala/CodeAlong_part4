// Array containing 3 objects, each object representing information about a specific book. This is a representation of information that would actually be stored in a database. Since we're not to databases yet, we'll use this array instead. 
const bookInventory = [
    {
      _id: "001",
      title: "Midnight for Charlie Bone",
      author: "Jenny Nimmo",
      price: 23,
      starRating: 4,
      synopsis:
        "In the first novel, 10-year-old Charlie Bone discovers that he has a special power. After accidentally encountering a photograph of a missing baby, Charlie begins to hear the voices of people in photographs. He discovers that he is a descendant of the Red King, who was an ancient magician."
    },
    {
      _id: "002",
      title: "Akira",
      author: "Katsuhiro Otomo",
      price: 16,
      starRating: 3,
      synopsis:
        "Akira, a dystopian saga set in Neo-Tokyo, a city recovering from thermonuclear attack where the streets have been ceded to motorcycle gangs and the rich and powerful run dangerous experiments on destructive, supernatural powers that they cannot control."
    },
    {
      _id: "003",
      title: "Matilda",
      author: "Roald Dahl",
      price: 15,
      starRating: 5,
      synopsis:
        "A girl gifted with a keen intellect and psychic powers uses both to get even with her callous family and free her kindly schoolteacher from the tyrannical grip of a headmistress."
    },
    //make more books if you want...
    {
      _id: "004",
      title: "CodeSquad Cohort 2025: Fightin' the Back End",
      author: "Everyone!",
      price: 99,
      starRating: 5,
      synopsis:
        "The power of teamwork, collaboration and community will take all of you to the end of the bootcamp. - Kit"
    }
]

module.exports = bookInventory;