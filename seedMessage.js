import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const motivationalMessages = [
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "Everything you've ever wanted is on the other side of fear.",
  "Success is built on daily habits, not occasional achievements.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only way to do great work is to love what you do.",
  "Every expert was once a beginner.",
  "You are never too old to set another goal or to dream a new dream.",
  "The journey of a thousand miles begins with a single step.",
  "Success usually comes to those who are too busy to be looking for it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream big and dare to fail.",
  "What you do today can improve all your tomorrows.",
  "The secret of getting ahead is getting started.",
  "Don't be afraid to give up the good to go for the great.",
  "Success is not in what you have, but who you are.",
  "The best way to predict the future is to create it.",
  "Your limitation—it's only your imagination.",

  "Growth is a process. Results take time.",
  "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  "You are stronger than you think.",
  "Fall seven times, stand up eight.",
  "The only person you should try to be better than is the person you were yesterday.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Life is 10% what happens to you and 90% how you react to it.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your attitude determines your direction.",
  "Every accomplishment starts with the decision to try.",
  "The difference between who you are and who you want to be is what you do.",
  "The only bad workout is the one that didn't happen.",
  "Progress is progress, no matter how small.",
  "Be patient with yourself. Self-growth is tender; it's holy ground.",
  "Small steps every day add up to big results.",
  "Focus on the step in front of you, not the whole staircase.",
  "You don't have to be perfect to be amazing.",
  "Growth and comfort do not coexist.",
  "Embrace the journey of becoming the best version of yourself.",
  "Your potential is endless. Go do what you were created to do.",

  "It does not matter how slowly you go as long as you do not stop.",
  "The only way to do great work is to love what you do.",
  "Persistence guarantees that results are inevitable.",
  "Don't stop when you're tired. Stop when you're done.",
  "The struggle you're in today is developing the strength you need for tomorrow.",
  "Difficult roads often lead to beautiful destinations.",
  "Success is stumbling from failure to failure with no loss of enthusiasm.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Keep going. Everything you need will come to you at the perfect time.",
  "Champions keep playing until they get it right.",
  "When you feel like quitting, remember why you started.",
  "The expert in anything was once a beginner.",
  "Success is not built on success. It's built on failure, frustration, and sometimes catastrophe.",
  "Don't wish it were easier. Wish you were better.",
  "The comeback is always stronger than the setback.",
  "If it was easy, everyone would do it.",
  "Your dreams don't work unless you do.",
  "Perseverance is not a long race; it is many short races one after another.",
  "The harder you work, the luckier you get.",
  "Success is the sum of small efforts repeated day in and day out.",

  "Creativity is intelligence having fun.",
  "Innovation distinguishes between a leader and a follower.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Think different, be different.",
  "Everything you can imagine is real.",
  "Imagination is everything. It is the preview of life's coming attractions.",
  "The best way to predict the future is to create it.",
  "Innovation comes from people meeting up in the hallways or calling each other at 10:30 at night.",
  "Don't be afraid to be different. Be afraid to be the same as everyone else.",
  "Create the things you wish existed.",
  "The biggest risk is not taking any risk.",
  "Ideas are worthless until you get them out of your head to see what they can do.",
  "Creativity takes courage.",
  "Innovation is the ability to see change as an opportunity - not a threat.",
  "The future belongs to the curious.",
  "Where others see walls, innovators see windows.",
  "Don't wait for inspiration. Become it.",
  "Creativity is seeing what others see and thinking what no one else ever thought.",
  "Innovation is taking two things that exist and putting them together in a new way.",
  "The best ideas come from having the freedom to make mistakes.",
  "A leader is one who knows the way, goes the way, and shows the way.",
  "Leadership is not about being in charge. It's about taking care of those in your charge.",
  "The greatest leader is not necessarily the one who does the greatest things, but the one who gets people to do the greatest things.",
  "Leadership and learning are indispensable to each other.",
  "Innovation distinguishes between a leader and a follower.",
  "A good leader takes a little more than his share of the blame, a little less than his share of the credit.",
  "Leadership is the capacity to translate vision into reality.",
  "The function of leadership is to produce more leaders, not more followers.",
  "Leadership is not a position or title, it is action and example.",
  "Great leaders don't set out to be a leader. They set out to make a difference.",
  "Leaders become great not because of their power, but because of their ability to empower others.",
  "The challenge of leadership is to be strong, but not rude; be kind, but not weak.",
  "A leader's job is not to do the work for others, it's to help others figure out how to do it themselves.",
  "True leadership lies in guiding others to success.",
  "Leadership is about making others better as a result of your presence.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "To handle yourself, use your head; to handle others, use your heart.",
  "Leadership is not about titles, positions, or flowcharts. It is about one life influencing another.",
  "A true leader has the confidence to stand alone, the courage to make tough decisions.",
  "Leaders are made, they are not born.",

  "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
  "Time is what we want most, but what we use worst.",
  "Lost time is never found again.",
  "The bad news is time flies. The good news is you're the pilot.",
  "Time management is life management.",
  "Don't wait. The time will never be just right.",
  "Time is the most valuable coin in your life.",
  "Time is the wisest counselor of all.",
  "The two most powerful warriors are patience and time.",
  "Time and tide wait for no man.",
  "Time is free, but it's priceless.",
  "Time is the school in which we learn.",
  "Make use of time, let not advantage slip.",
  "Better three hours too soon than a minute too late.",
  "Time is the most valuable thing a man can spend.",
  "Time has a wonderful way of showing us what really matters.",
  "The future depends on what you do today.",
  "Time waits for no one. Yesterday is history. Tomorrow is a mystery. Today is a gift.",
  "Make time for what matters.",
  "Time flies over us, but leaves its shadow behind.",

  "Alone we can do so little; together we can do so much.",
  "Coming together is a beginning. Keeping together is progress. Working together is success.",
  "Talent wins games, but teamwork wins championships.",
  "The strength of the team is each individual member. The strength of each member is the team.",
  "Unity is strength.",
  "None of us is as smart as all of us.",
  "If you want to go fast, go alone. If you want to go far, go together.",
  "Great things in business are never done by one person. They're done by a team of people.",
  "Teamwork makes the dream work.",
  "The way a team plays as a whole determines its success.",
  "A team is more than a collection of people. It is a process of give and take.",
  "Individual commitment to a group effort - that is what makes a team work.",
  "Together we can face any challenges as deep as the ocean and as high as the sky.",
  "The whole is greater than the sum of its parts.",
  "If everyone is moving forward together, then success takes care of itself.",
  "No one can whistle a symphony. It takes an orchestra to play it.",
  "One piece of log creates a small fire, adequate to warm you up; many logs create a bonfire.",
  "The best teamwork comes from men who are working independently toward one goal in unison.",
  "Collaboration allows us to know more than we are capable of knowing by ourselves.",
  "Many hands make light work.",

  "What doesn't kill you makes you stronger.",
  "Life is not about waiting for the storm to pass but learning to dance in the rain.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Resilience is knowing that you are the only one that has the power and responsibility to pick yourself up.",
  "The oak fought the wind and was broken, the willow bent when it must and survived.",
  "Sometimes you don't realize your own strength until you come face to face with your greatest weakness.",
  "You may have to fight a battle more than once to win it.",
  "Rock bottom became the solid foundation on which I rebuilt my life.",
  "It's not whether you get knocked down, it's whether you get up.",
  "The human capacity for burden is like bamboo - far more flexible than you'd ever believe at first glance.",
  "No matter how much falls on us, we keep plowing ahead. That's the only way to keep the roads clear.",
  "Life doesn't get easier or more forgiving; we get stronger and more resilient.",
  "The moment you're ready to quit is usually the moment right before a miracle happens.",
  "Resilience is very different than being numb. Resilience means you experience, you feel, you fail, you hurt. You fall. But you keep going.",
  "The greatest test of courage on the earth is to bear defeat without losing heart.",
  "Our greatest glory is not in never falling, but in rising every time we fall.",
  "Persistence and resilience only come from having been given the chance to work through difficult problems.",
  "When we learn how to become resilient, we learn how to embrace the beautifully broad spectrum of the human experience.",
  "The bamboo that bends is stronger than the oak that resists.",
  "Every adversity brings new experiences and new lessons.",

  "A goal without a plan is just a wish.",
  "Set your goals high, and don't stop till you get there.",
  "The only limit to the height of your achievements is the reach of your dreams.",
  "Goals are dreams with deadlines.",
  "If you aim at nothing, you will hit it every time.",
  "Your goals are the road maps that guide you and show you what is possible for your life.",
  "The trouble with not having a goal is that you can spend your life running up and down the field and never score.",
  "Goals give you more than a reason to get up in the morning; they are an incentive to keep you going all day.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "Goal setting is the secret to a compelling future.",
  "The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.",
  "A year from now you may wish you had started today.",
  "Don't just set goals. Achieve them.",
  "Your goals are the roadmap to your success.",
  "Goals transform a random walk into a chase.",
  "The only goals you don't achieve in life are the goals you don't set.",
  "Set goals that make you want to jump out of bed in the morning.",
  "Dream it. Believe it. Achieve it.",
  "Goals are not about what you accomplish. Goals are about who you become.",
  "Success is the progressive realization of predetermined, worthwhile, personal goals.",

  "Whether you think you can or think you can't, you're right.",
  "Change your thoughts and you change your world.",
  "Everything is either an opportunity to grow or an obstacle to keep you from growing.",
  "Your attitude determines your direction.",
  "Life is 10% what happens to you and 90% how you react to it.",
  "Happiness is not something ready made. It comes from your own actions.",
  "The mind is everything. What you think you become.",
  "You are never too old to set another goal or dream a new dream.",
  "Your attitude, not your aptitude, will determine your altitude.",
  "It's not what happens to you, but how you react to it that matters.",
  "The only way to do great work is to love what you do.",
  "Success is not in what you have, but who you are.",
  "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Everything negative – pressure, challenges – is all an opportunity for me to rise.",
  "The positive thinker sees the invisible, feels the intangible, and achieves the impossible.",
  "Life is a mirror and will reflect back to the thinker what they think into it.",
  "A positive attitude gives you power over your circumstances instead of your circumstances having power over you.",
  "The greatest discovery of all time is that a person can change their future by merely changing their attitude.",
  "Your mindset determines your success.",

  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  "Never stop learning because life never stops teaching.",
  "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
  "Education is not preparation for life; education is life itself.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "Learning is a treasure that will follow its owner everywhere.",
  "Develop a passion for learning. If you do, you will never cease to grow.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Learning is not compulsory... neither is survival.",
  "Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.",
  "Learning is not a spectator sport.",
  "The expert in anything was once a beginner.",
  "You learn something every day if you pay attention.",
  "The purpose of learning is growth, and our minds, unlike our bodies, can continue growing as long as we live.",
  "Never let formal education get in the way of your learning.",
  "The mind is not a vessel to be filled but a fire to be ignited.",
  "Learning never exhausts the mind.",
  "The more you know, the more you realize you don't know.",
  "The beautiful thing about learning is nobody can take it away from you.",
];

async function seedDatabase() {
  let client;
  try {
    const uri = process.env.MONGODB_URI;
    client = await MongoClient.connect(uri);
    const db = client.db(process.env.DB_NAME);

    console.log("Connected to database");

    const documents = Array.from({ length: 1000 }, () => ({
      content:
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await db.collection("messages").insertMany(documents);

    console.log(`Successfully inserted ${result.insertedCount} messages`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
}

seedDatabase();
