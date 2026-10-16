import { useState, useEffect, useMemo } from 'react';
import { Scroll, X, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';

const questDatabase = [
  // Original 5
  { question: "Which of these is the highest-grossing anime film of all time?", options: ["Your Name", "Spirited Away", "Demon Slayer: Mugen Train", "Suzume"], answer: "Demon Slayer: Mugen Train" },
  { question: "What is the name of the Nine-Tailed Fox in Naruto?", options: ["Shukaku", "Kurama", "Gyuki", "Matatabi"], answer: "Kurama" },
  { question: "In Attack on Titan, who is the commander of the Survey Corps?", options: ["Levi Ackerman", "Erwin Smith", "Hange Zoë", "Dot Pixis"], answer: "Erwin Smith" },
  { question: "Which breathing style does Zenitsu Agatsuma use?", options: ["Water Breathing", "Thunder Breathing", "Beast Breathing", "Flame Breathing"], answer: "Thunder Breathing" },
  { question: "What is the name of Goku's signature attack?", options: ["Rasengan", "Getsuga Tensho", "Kamehameha", "Spirit Bomb"], answer: "Kamehameha" },
  
  // Naruto (6-15)
  { question: "Who was the First Hokage of the Hidden Leaf Village?", options: ["Tobirama Senju", "Hiruzen Sarutobi", "Minato Namikaze", "Hashirama Senju"], answer: "Hashirama Senju" },
  { question: "What is Kakashi Hatake's nickname?", options: ["The White Fang", "The Copy Ninja", "The Yellow Flash", "The Red Fiend"], answer: "The Copy Ninja" },
  { question: "Which Akatsuki member uses explosive clay?", options: ["Sasori", "Deidara", "Hidan", "Kakuzu"], answer: "Deidara" },
  { question: "What is the name of Sasuke Uchiha's Mangekyou Sharingan ability that creates black flames?", options: ["Tsukuyomi", "Amaterasu", "Susanoo", "Izanagi"], answer: "Amaterasu" },
  { question: "Who teaches Naruto the Rasengan?", options: ["Kakashi", "Iruka", "Jiraiya", "Tsunade"], answer: "Jiraiya" },
  { question: "What village is Gaara from?", options: ["Hidden Leaf", "Hidden Sand", "Hidden Cloud", "Hidden Mist"], answer: "Hidden Sand" },
  { question: "Who is Itachi Uchiha's partner in the Akatsuki?", options: ["Kisame Hoshigaki", "Deidara", "Orochimaru", "Pain"], answer: "Kisame Hoshigaki" },
  { question: "What is the highest rank a ninja can achieve in their village?", options: ["Jonin", "Chunin", "Anbu", "Kage"], answer: "Kage" },
  { question: "Which of the Legendary Sannin relies on medical ninjutsu?", options: ["Jiraiya", "Orochimaru", "Tsunade", "Danzo"], answer: "Tsunade" },
  { question: "What is the name of the cursed seal Orochimaru gives to Sasuke?", options: ["Seal of Earth", "Seal of Heaven", "Seal of Fire", "Seal of Water"], answer: "Seal of Heaven" },

  // One Piece (16-25)
  { question: "What is Monkey D. Luffy's ultimate goal?", options: ["Find the All Blue", "Map the world", "Become the Pirate King", "Defeat the Marines"], answer: "Become the Pirate King" },
  { question: "Which Devil Fruit did Luffy eat?", options: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Ope Ope no Mi", "Bara Bara no Mi"], answer: "Gomu Gomu no Mi" },
  { question: "Who is the navigator of the Straw Hat Pirates?", options: ["Robin", "Nami", "Vivi", "Carrot"], answer: "Nami" },
  { question: "How many swords does Roronoa Zoro use in combat?", options: ["One", "Two", "Three", "Four"], answer: "Three" },
  { question: "What is the name of the Straw Hat Pirates' first ship?", options: ["Thousand Sunny", "Going Merry", "Red Force", "Oro Jackson"], answer: "Going Merry" },
  { question: "Who gave Luffy his signature straw hat?", options: ["Gold Roger", "Whitebeard", "Shanks", "Garp"], answer: "Shanks" },
  { question: "What is Sanji's role on the ship?", options: ["Doctor", "Sniper", "Shipwright", "Cook"], answer: "Cook" },
  { question: "Which sea is considered the most dangerous in the One Piece world?", options: ["East Blue", "The Grand Line", "The New World", "The Calm Belt"], answer: "The New World" },
  { question: "What was Tony Tony Chopper before he ate his Devil Fruit?", options: ["A human", "A dog", "A reindeer", "A bear"], answer: "A reindeer" },
  { question: "Who is known as the 'Surgeon of Death'?", options: ["Chopper", "Trafalgar Law", "Eustass Kid", "Basil Hawkins"], answer: "Trafalgar Law" },

  // Dragon Ball (26-35)
  { question: "What planet is Goku originally from?", options: ["Earth", "Namek", "Vegeta", "Vampa"], answer: "Vegeta" },
  { question: "How many Dragon Balls are needed to summon Shenron?", options: ["Five", "Six", "Seven", "Eight"], answer: "Seven" },
  { question: "Who is the Prince of all Saiyans?", options: ["Goku", "Broly", "Trunks", "Vegeta"], answer: "Vegeta" },
  { question: "What is the maximum gravity Goku trains in on his way to Namek?", options: ["10x", "50x", "100x", "500x"], answer: "100x" },
  { question: "Who destroys Planet Vegeta?", options: ["Beerus", "Frieza", "Majin Buu", "Cell"], answer: "Frieza" },
  { question: "Which transformation is characterized by silver hair?", options: ["Super Saiyan Blue", "Super Saiyan God", "Ultra Instinct", "Ultra Ego"], answer: "Ultra Instinct" },
  { question: "Who is Gohan's first martial arts teacher?", options: ["Goku", "Master Roshi", "Piccolo", "Krillin"], answer: "Piccolo" },
  { question: "What technique allows Goku to travel instantly to any known ki signature?", options: ["Instant Transmission", "Flying Nimbus", "Kaioken", "Afterimage"], answer: "Instant Transmission" },
  { question: "Who creates the Cell Games?", options: ["Dr. Gero", "Frieza", "Cell", "Babidi"], answer: "Cell" },
  { question: "What is the name of Vegeta's signature ki attack?", options: ["Kamehameha", "Special Beam Cannon", "Galick Gun", "Destructo Disc"], answer: "Galick Gun" },

  // Attack on Titan (36-45)
  { question: "What is the name of the outermost wall in Paradis Island?", options: ["Wall Rose", "Wall Sina", "Wall Maria", "Wall Sheena"], answer: "Wall Maria" },
  { question: "Who is the Colossal Titan that breaches Shiganshina?", options: ["Reiner Braun", "Bertholdt Hoover", "Zeke Yeager", "Armin Arlert"], answer: "Bertholdt Hoover" },
  { question: "What is Mikasa's last name?", options: ["Yeager", "Arlert", "Ackerman", "Smith"], answer: "Ackerman" },
  { question: "Which Titan can crystalize its skin to create hardened armor?", options: ["Female Titan", "Armored Titan", "War Hammer Titan", "All of the above"], answer: "All of the above" },
  { question: "What does ODM gear stand for?", options: ["Omni-Directional Mobility", "Outer-Defense Mechanism", "Over-Drive Motor", "Offensive-Defensive Maneuver"], answer: "Omni-Directional Mobility" },
  { question: "Who is the true king of the walls?", options: ["Karl Fritz", "Rod Reiss", "Willy Tybur", "Erwin Smith"], answer: "Rod Reiss" },
  { question: "What is hidden in the basement of Eren's childhood home?", options: ["Gold", "Weapons", "Grisha's Journals", "Titan Serums"], answer: "Grisha's Journals" },
  { question: "Which regiment is responsible for exploring outside the walls?", options: ["Garrison Regiment", "Military Police Brigade", "Survey Corps", "Cadet Corps"], answer: "Survey Corps" },
  { question: "Who holds the Beast Titan power?", options: ["Eren Yeager", "Zeke Yeager", "Grisha Yeager", "Marcel Galliard"], answer: "Zeke Yeager" },
  { question: "What is the name of the founding Ymir's coordinate dimension?", options: ["The Paths", "The Nexus", "The Origin", "The Source"], answer: "The Paths" },

  // Demon Slayer (46-55)
  { question: "What is Tanjiro Kamado's primary motivation?", options: ["To become a Hashira", "To cure his sister", "To find his father", "To master Sun Breathing"], answer: "To cure his sister" },
  { question: "Who is the creator of all demons?", options: ["Akaza", "Kokushibo", "Muzan Kibutsuji", "Douma"], answer: "Muzan Kibutsuji" },
  { question: "What color does Tanjiro's Nichirin sword turn?", options: ["Red", "Blue", "Black", "Yellow"], answer: "Black" },
  { question: "Which Hashira wears a boar's head?", options: ["Tengen Uzui", "Sanemi Shinazugawa", "Inosuke Hashibira", "None (Inosuke isn't a Hashira)"], answer: "None (Inosuke isn't a Hashira)" },
  { question: "What breathing style does Giyu Tomioka use?", options: ["Water", "Wind", "Flame", "Serpent"], answer: "Water" },
  { question: "What is Nezuko's Blood Demon Art?", options: ["Exploding Blood", "Ice Manipulation", "Thread Manipulation", "Dream Manipulation"], answer: "Exploding Blood" },
  { question: "Who is the Flame Hashira?", options: ["Tengen Uzui", "Kyojuro Rengoku", "Muichiro Tokito", "Mitsuri Kanroji"], answer: "Kyojuro Rengoku" },
  { question: "What flower is deadly to demons?", options: ["Spider Lily", "Wisteria", "Lotus", "Cherry Blossom"], answer: "Wisteria" },
  { question: "What rank is Akaza in the Twelve Kizuki?", options: ["Upper Rank 1", "Upper Rank 2", "Upper Rank 3", "Lower Rank 1"], answer: "Upper Rank 3" },
  { question: "What sense does Tanjiro have that is extremely heightened?", options: ["Sight", "Hearing", "Smell", "Touch"], answer: "Smell" },

  // Jujutsu Kaisen (56-65)
  { question: "Who is the King of Curses?", options: ["Satoru Gojo", "Suguru Geto", "Ryomen Sukuna", "Mahito"], answer: "Ryomen Sukuna" },
  { question: "What is Yuji Itadori's club before joining Jujutsu High?", options: ["Kendo Club", "Occult Research Club", "Track and Field", "Drama Club"], answer: "Occult Research Club" },
  { question: "What is the name of Gojo Satoru's Domain Expansion?", options: ["Malevolent Shrine", "Chimera Shadow Garden", "Infinite Void", "Coffin of the Iron Mountain"], answer: "Infinite Void" },
  { question: "How many fingers does Sukuna have in total?", options: ["10", "15", "20", "25"], answer: "20" },
  { question: "What weapon does Maki Zenin primarily use?", options: ["A cursed sword", "A cursed gun", "A cursed spear (Playful Cloud)", "Cursed throwing knives"], answer: "A cursed spear (Playful Cloud)" },
  { question: "What is Megumi Fushiguro's innate technique?", options: ["Cursed Speech", "Ten Shadows Technique", "Limitless", "Boogie Woogie"], answer: "Ten Shadows Technique" },
  { question: "Who says 'Tuna Mayo' to communicate?", options: ["Panda", "Toge Inumaki", "Yuta Okkotsu", "Kento Nanami"], answer: "Toge Inumaki" },
  { question: "What ratio does Nanami target to trigger a critical hit?", options: ["5:5", "6:4", "7:3", "8:2"], answer: "7:3" },
  { question: "What is Mahito's cursed technique?", options: ["Idle Transfiguration", "Disaster Plants", "Cleave", "Blood Manipulation"], answer: "Idle Transfiguration" },
  { question: "Who was Satoru Gojo's best friend?", options: ["Kento Nanami", "Suguru Geto", "Masamichi Yaga", "Toji Fushiguro"], answer: "Suguru Geto" },

  // My Hero Academia (66-75)
  { question: "What is Izuku Midoriya's hero name?", options: ["Great Explosion Murder God Dynamight", "Red Riot", "Deku", "Uravity"], answer: "Deku" },
  { question: "What quirk does Katsuki Bakugo possess?", options: ["Fire", "Explosion", "Hardening", "Acid"], answer: "Explosion" },
  { question: "Who is the homeroom teacher for Class 1-A?", options: ["All Might", "Present Mic", "Shota Aizawa", "Midnight"], answer: "Shota Aizawa" },
  { question: "What is the name of All Might's Quirk?", options: ["Super Strength", "One For All", "All For One", "Muscle Augmentation"], answer: "One For All" },
  { question: "Which student has the quirk 'Half-Cold Half-Hot'?", options: ["Momo Yaoyorozu", "Denki Kaminari", "Shoto Todoroki", "Eijiro Kirishima"], answer: "Shoto Todoroki" },
  { question: "Who is the main antagonist and leader of the League of Villains?", options: ["Overhaul", "Dabi", "Tomura Shigaraki", "Stain"], answer: "Tomura Shigaraki" },
  { question: "What is Ochaco Uraraka's quirk?", options: ["Creation", "Invisibility", "Zero Gravity", "Frog"], answer: "Zero Gravity" },
  { question: "What school do the main characters attend?", options: ["Shiketsu High", "U.A. High School", "Ketsubutsu Academy", "Seijin High"], answer: "U.A. High School" },
  { question: "What is the name of the Hero Killer?", options: ["Dabi", "Stain", "Muscular", "Toga"], answer: "Stain" },
  { question: "Which pro hero has the quirk 'Fierce Wings'?", options: ["Endeavor", "Best Jeanist", "Hawks", "Mirko"], answer: "Hawks" },

  // Bleach (76-85)
  { question: "What is Ichigo Kurosaki's Zanpakuto named?", options: ["Zangetsu", "Senbonzakura", "Kyoka Suigetsu", "Hyorinmaru"], answer: "Zangetsu" },
  { question: "Who gives Ichigo his Soul Reaper powers?", options: ["Byakuya Kuchiki", "Rukia Kuchiki", "Kisuke Urahara", "Sosuke Aizen"], answer: "Rukia Kuchiki" },
  { question: "What is the term for the release of a Zanpakuto's ultimate form?", options: ["Shikai", "Bankai", "Kido", "Hollowfication"], answer: "Bankai" },
  { question: "Who is the captain of the 6th Division?", options: ["Kenpachi Zaraki", "Toshiro Hitsugaya", "Byakuya Kuchiki", "Shunsui Kyoraku"], answer: "Byakuya Kuchiki" },
  { question: "What are the corrupted human souls in Bleach called?", options: ["Quincy", "Arrancar", "Hollows", "Shinigami"], answer: "Hollows" },
  { question: "Who is the main antagonist of the Arrancar arc?", options: ["Yhwach", "Gin Ichimaru", "Sosuke Aizen", "Ulquiorra Cifer"], answer: "Sosuke Aizen" },
  { question: "What weapon do the Quincy primarily use?", options: ["Swords", "Spears", "Bows", "Guns"], answer: "Bows" },
  { question: "What is Orihime Inoue's power called?", options: ["Fullbring", "Shun Shun Rikka", "Kido", "Bringer Light"], answer: "Shun Shun Rikka" },
  { question: "Where do Soul Reapers live?", options: ["Hueco Mundo", "The Human World", "Soul Society", "Wandenreich"], answer: "Soul Society" },
  { question: "Who was the founder of the Gotei 13?", options: ["Genryusai Shigekuni Yamamoto", "Yhwach", "Ichibe Hyosube", "Sosuke Aizen"], answer: "Genryusai Shigekuni Yamamoto" },

  // Hunter x Hunter (86-95)
  { question: "What is Gon Freecss's main motivation to become a Hunter?", options: ["To get rich", "To find his father", "To defeat the Phantom Troupe", "To explore the Dark Continent"], answer: "To find his father" },
  { question: "What is the name of the life energy used in the series?", options: ["Ki", "Chakra", "Nen", "Reiatsu"], answer: "Nen" },
  { question: "Which character is an assassin from the Zoldyck family?", options: ["Kurapika", "Leorio", "Killua", "Hisoka"], answer: "Killua" },
  { question: "What is Hisoka's Nen ability called?", options: ["Bungee Gum", "Texture Surprise", "Needle Men", "Crazy Slots"], answer: "Bungee Gum" },
  { question: "Who is the leader of the Phantom Troupe?", options: ["Feitan", "Chrollo Lucilfer", "Uvogin", "Machi"], answer: "Chrollo Lucilfer" },
  { question: "What game do Meruem and Komugi play continuously?", options: ["Chess", "Shogi", "Gungi", "Go"], answer: "Gungi" },
  { question: "Which Nen category allows the user to change the properties of their aura?", options: ["Enhancer", "Transmuter", "Conjurer", "Specialist"], answer: "Transmuter" },
  { question: "Who was the Chairman of the Hunter Association during the Chimera Ant arc?", options: ["Ging Freecss", "Pariston Hill", "Isaac Netero", "Biscuit Krueger"], answer: "Isaac Netero" },
  { question: "What is Kurapika's primary goal?", options: ["To master Nen", "To find his father", "To become Chairman", "To avenge the Kurta Clan"], answer: "To avenge the Kurta Clan" },
  { question: "What weapon does Gon traditionally use in the beginning of the series?", options: ["A sword", "A fishing rod", "Two yo-yos", "A dagger"], answer: "A fishing rod" },

  // Mixed Anime & General Otaku Trivia (96-105)
  { question: "Whose notebook can kill anyone whose name is written in it?", options: ["Lelouch vi Britannia", "Light Yagami", "Spike Spiegel", "Shinji Ikari"], answer: "Light Yagami" },
  { question: "In Fullmetal Alchemist, what is the ultimate taboo of alchemy?", options: ["Creating gold", "Human transmutation", "Destroying souls", "Altering time"], answer: "Human transmutation" },
  { question: "What is the name of the virtual reality game in Sword Art Online?", options: ["Alfheim Online", "Gun Gale Online", "Sword Art Online", "Underworld"], answer: "Sword Art Online" },
  { question: "In Tokyo Ghoul, what is the only human food ghouls can consume without getting sick?", options: ["Coffee", "Apples", "Bread", "Watermelon"], answer: "Coffee" },
  { question: "What is the catchphrase of JoJo's Jotaro Kujo?", options: ["Muda Muda!", "Yare Yare Daze", "Ora Ora!", "Wryyyyy!"], answer: "Yare Yare Daze" },
  { question: "Which anime features the 'Elric Brothers'?", options: ["Blue Exorcist", "Fullmetal Alchemist", "Soul Eater", "D.Gray-man"], answer: "Fullmetal Alchemist" },
  { question: "In Steins;Gate, what household appliance is used as a time machine?", options: ["A refrigerator", "A microwave", "A television", "A washing machine"], answer: "A microwave" },
  { question: "What sport is featured in the anime Haikyuu!!?", options: ["Basketball", "Swimming", "Volleyball", "Tennis"], answer: "Volleyball" },
  { question: "Who is the main protagonist of Cowboy Bebop?", options: ["Jet Black", "Vash the Stampede", "Spike Spiegel", "Faye Valentine"], answer: "Spike Spiegel" },
  { question: "In One Punch Man, what is Saitama's hero rank at the beginning of the series?", options: ["S-Class", "A-Class", "B-Class", "C-Class"], answer: "C-Class" }
];

export default function QuestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [questState, setQuestState] = useState<'question' | 'wrong' | 'cleared'>('question');
  
  // Controls the little floating bubble text
  const [showNotification, setShowNotification] = useState(true);
  const [isCompletedToday, setIsCompletedToday] = useState(false);

  // Auto-hide the notification bubble after 15 seconds
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    
    if (showNotification) {
      // Set timer to hide the bubble after 15 seconds (15000 milliseconds)
      hideTimer = setTimeout(() => {
        setShowNotification(false);
      }, 15000);
    }
    
    return () => clearTimeout(hideTimer);
  }, [showNotification]); // Re-runs this effect whenever showNotification becomes true!

  // Generate today's date string (e.g., "Mon Oct 12 2026")
  const todayStr = new Date().toDateString();

  // Load state on mount
  useEffect(() => {
    const savedDate = localStorage.getItem('oac_quest_date');
    if (savedDate === todayStr) {
      setIsCompletedToday(true);
      setQuestState('cleared');
    }
  }, [todayStr]);

  // Automatically select the question based on the current date
  const todayTrivia = useMemo(() => {
    const startDate = new Date('2024-01-01T00:00:00Z').getTime();
    const today = new Date().getTime();
    const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const questionIndex = daysPassed % questDatabase.length;
    return questDatabase[questionIndex];
  }, []);

  const handleAnswer = (selected: string) => {
    if (selected === todayTrivia.answer) {
      setQuestState('cleared');
      setIsCompletedToday(true);
      localStorage.setItem('oac_quest_date', todayStr);
    } else {
      setQuestState('wrong');
      // Reset back to question after showing 'wrong' for 1.5s
      setTimeout(() => setQuestState('question'), 1500);
    }
  };

  return (
    <>
      {/* Floating Quest Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
        {/* Notification Bubble */}
        {showNotification && !isOpen && (
          <div 
            className={`animate-fade-in text-[#0C0C0C] text-xs font-bold px-3 py-2 rounded-t-xl rounded-bl-xl shadow-[0_0_10px_rgba(243,179,52,0.5)] flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${isCompletedToday ? 'bg-[#25D366]' : 'bg-[#F3B334]'}`} 
            onClick={() => setIsOpen(true)}
          >
            {isCompletedToday ? <CheckCircle size={14} /> : <Sparkles size={14} />}
            <span>{isCompletedToday ? "Quest done for today" : "New Quest!"}</span>
          </div>
        )}
        
        <button
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false); // Hide the text bubble instantly when opened
          }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0C0C0C]/80 backdrop-blur-md border-2 flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg ${isCompletedToday ? 'border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#0C0C0C]' : 'border-[#F3B334] text-[#F3B334] hover:bg-[#F3B334] hover:text-[#0C0C0C] shadow-[0_0_15px_rgba(243,179,52,0.3)]'}`}
        >
          {isCompletedToday ? <CheckCircle size={24} /> : <Scroll size={24} className="group-hover:animate-pulse" />}
        </button>
      </div>

      {/* Quest Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          
          {/* Modal Container */}
          <div className="relative w-full max-w-[90vw] sm:max-w-md bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Top accent bar */}
            <div className={`h-1.5 w-full ${questState === 'cleared' ? 'bg-[#F3B334]' : 'bg-[#D91515]'} transition-colors duration-500`} />
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowNotification(true); // Bring back the floating text (it will auto-hide again after 15s)
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>

            <div className="p-5 sm:p-8">
              
              {/* --- STATE: QUESTION --- */}
              {questState === 'question' && (
                <div className="animate-fade-in mt-2">
                  <div className="flex items-center gap-2 text-[#D91515] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
                    <Scroll size={16} />
                    <span>Daily Quest</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-white mb-6 leading-snug">
                    {todayTrivia.question}
                  </h3>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {todayTrivia.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left px-4 py-3 sm:px-5 sm:py-3 rounded-xl border border-white/10 bg-white/5 text-sm sm:text-base text-gray-300 hover:bg-[#D91515]/20 hover:border-[#D91515]/50 hover:text-white transition-all duration-200 active:scale-[0.98]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- STATE: WRONG ANSWER --- */}
              {questState === 'wrong' && (
                <div className="py-16 flex flex-col items-center justify-center text-center animate-shake">
                  <span className="text-5xl mb-4">💦</span>
                  <h3 className="text-xl font-bold text-[#D91515]">Wrong Answer, Senpai!</h3>
                  <p className="text-gray-400 mt-2 text-sm">Try again...</p>
                </div>
              )}

              {/* --- STATE: QUEST CLEARED (REWARD SCROLL) --- */}
              {questState === 'cleared' && (
                <div className="py-6 sm:py-8 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3B334]/20 text-[#F3B334] mb-4 shadow-[0_0_20px_rgba(243,179,52,0.4)]">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display text-white mb-2">
                    {isCompletedToday ? "ALREADY CLEARED!" : "QUEST CLEARED!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F3B334] mb-8 tracking-wider">Reward Scroll Unlocked</p>
                  
                  {/* Single Reward Link */}
                  <a 
                    href="https://shorturl.at/evfmd" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-[#D91515] to-[#F3B334] text-white font-bold text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(217,21,21,0.4)] group"
                  >
                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    <span>Access Community Links</span>
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
} 