
const moods = [
    { id: 1, title: "Romantic Songs", description: "Soft melodies to fill your heart with love.", img: "./pic/romance_songs.png" ,color:"#ca645d"},
    { id: 2, title: "Sad Songs", description: "A collection of soulful ballads and emotional tunes that speak to your heart.", img: "./pic/sad_songs.png" ,color:"#42423c"},
    { id: 3, title: "Happy Songs", description: "Feel the joy and let the rhythm lift your spirits.", img: "./pic/happy_songs.png" ,color:"#2a73c1"},
    { id: 4, title: "Energetic Songs", description: "Powerful beats to fuel your energy and keep you moving.", img: "./pic/energetic_songs.png",color:"#0d0b0b" },
  ];
  

  const artists = [
    { id: 2, name: "Sonu Nigam", img: "./pic/sonu_nigam.png" ,color:"#616d57"},
    { id: 1, name: "Arijit Singh", img: "./pic/arjit_singh.png" ,color:"#7c3922"},
    { id: 3, name: "Pritam", img: "./pic/pritam.png" ,color:"#0c0c0c"},
    { id: 4, name: "The Weeknd", img: "./pic/weeknd.png" ,color:"#d7322e"},
    { id: 5, name: "A.R. Rahman", img: "./pic/arr.png" ,color:"#039acf"},
    { id: 6, name: "Udit Narayan", img: "./pic/udit.png" ,color:"#515393"},
    { id: 7, name: "Alka Yagnik", img: "./pic/alka.png" ,color:"#34201b"},
    { id: 8, name: "Shreya Ghosal", img: "./pic/shreya.png" ,color:"#2b4d59"},
    { id: 9, name: "Karan Auijla", img: "./pic/karan.png" ,color:"#2f233d"},
    { id: 10, name: "Honey Singh", img: "./pic/honeypaaji.png" ,color:"#b6593c"},
    { id: 11, name: "Eminem", img: "./pic/eminem.png" ,color:"#1c1a1b"},
    { id: 12, name: "Diljit Dosanjh", img: "./pic/diljit.png" ,color:"#44545c"},
    { id: 13, name: "Bruno Mars", img: "./pic/bruno.png" ,color:"#791c0c"},
    { id: 14, name: "Hanumankind", img: "./pic/hanumankind.png" ,color:"#5a170d"},
    { id: 15, name: "Shaan", img: "./pic/shaan.png" ,color:"#190e0c"},
    { id: 16, name: "Kailash Kher", img: "./pic/kailash.png" ,color:"#3b4444"},
  ];

  const toggle = [
    { id: 1, action: "Pause", img: "./pic/play.png" },
    { id: 2, action: "Play", img: "./pic/pause.png" },
  ];

  const repeat = [
    { id: 1, action: "Repeat Off", img: "./pic/repeat.png" },
    { id: 2, action: "Repeat On", img: "./pic/loop.png" },
  ];

  const shuffle = [
    { id: 1, action: "Shuffle Off", img: "./pic/shuffle.png" },
    { id: 2, action: "Shuffle On", img: "./pic/shuffle_on.png" },
  ];
  
  export { moods, artists,toggle, repeat, shuffle };  
  