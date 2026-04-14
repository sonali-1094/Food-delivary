import React, { useMemo, useState } from 'react';
import './MoodChatbot.css';
import { food_list } from '../assets/assets';

const moodRules = [
  {
    mood: 'homesick',
    keywords: ['home', 'homesick', 'miss', 'maa', 'mom', 'ghar', 'comfort', 'sad'],
    reply: 'You sound like you need something familiar and gentle. I would pick these home-style comfort meals.',
    matches: ['varan', 'dal', 'khichdi', 'curd rice', 'rajma', 'litti', 'saag']
  },
  {
    mood: 'exam stress',
    keywords: ['exam', 'study', 'stressed', 'stress', 'assignment', 'late night', 'focus'],
    reply: 'For study stress, go light but filling so you do not feel sleepy.',
    matches: ['idli', 'poha', 'dalia', 'curd rice', 'lemon rice', 'thukpa']
  },
  {
    mood: 'tired',
    keywords: ['tired', 'low energy', 'sleepy', 'lazy', 'drained', 'exhausted'],
    reply: 'For low energy, choose warm food with dal, rice, or protein.',
    matches: ['rajma', 'paneer', 'sattu', 'khichdi', 'usal', 'chana']
  },
  {
    mood: 'sick',
    keywords: ['sick', 'fever', 'cold', 'cough', 'stomach', 'light', 'not well'],
    reply: 'Keep it simple and soft today. These are lighter options.',
    matches: ['curd rice', 'khichdi', 'dalia', 'idli', 'khar', 'thukpa']
  },
  {
    mood: 'healthy',
    keywords: ['healthy', 'diet', 'gym', 'protein', 'fit', 'light', 'low oil'],
    reply: 'Healthy mode on. These are cleaner, protein-friendly picks.',
    matches: ['sprouted', 'paneer', 'chilla', 'sattu', 'matki', 'ragi', 'muthia']
  },
  {
    mood: 'budget',
    keywords: ['cheap', 'budget', 'less money', 'under', 'affordable', 'low price'],
    reply: 'Student budget understood. These are filling and friendly on the pocket.',
    maxPrice: 90
  },
  {
    mood: 'regional craving',
    keywords: ['maharashtra', 'gujarat', 'punjab', 'bengal', 'rajasthan', 'bihar', 'south', 'north east'],
    reply: 'I found regional comfort food close to what you mentioned.',
    useCategory: true
  }
];

const defaultSuggestions = ['Khichdi', 'Poha', 'Idli', 'Rajma', 'Sattu', 'Dhokla'];

const findSuggestions = (message) => {
  const normalized = message.trim().toLowerCase();
  const rule = moodRules.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (!normalized) {
    return {
      reply: 'Tell me your mood first, like "I am homesick", "exam stress", or "I want light food".',
      foods: []
    };
  }

  if (!rule) {
    const fallbackFoods = food_list.filter((food) =>
      defaultSuggestions.some((word) => food.name.toLowerCase().includes(word.toLowerCase()))
    );

    return {
      reply: 'I am reading this as a comfort-food craving. Try one of these safe, healthy picks.',
      foods: fallbackFoods.slice(0, 3)
    };
  }

  let foods = [];

  if (rule.useCategory) {
    foods = food_list.filter((food) => normalized.includes(food.category.toLowerCase()));
  } else if (rule.maxPrice) {
    foods = food_list.filter((food) => food.price <= rule.maxPrice);
  } else {
    foods = food_list.filter((food) =>
      rule.matches.some((match) => food.name.toLowerCase().includes(match))
    );
  }

  return {
    reply: rule.reply,
    foods: foods.slice(0, 4)
  };
};

const MoodChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([
    {
      from: 'bot',
      text: 'Tell me how you feel, and I will suggest healthy Indian food for your mood.'
    }
  ]);

  const quickPrompts = useMemo(() => [
    'I miss home food',
    'I have exam stress',
    'I want light food',
    'I need budget food'
  ], []);

  const sendMessage = (message = input) => {
    const userText = message.trim();
    if (!userText) return;

    const result = findSuggestions(userText);
    setConversation((prev) => [
      ...prev,
      { from: 'user', text: userText },
      { from: 'bot', text: result.reply, foods: result.foods }
    ]);
    setInput('');
  };

  return (
    <div className='mood-chatbot'>
      {isOpen && (
        <section className='mood-chatbot-panel' aria-label='Mood food chatbot'>
          <div className='mood-chatbot-header'>
            <div>
              <p>AI Mood Food</p>
              <h3>What do you feel like eating?</h3>
            </div>
            <button type='button' onClick={() => setIsOpen(false)} aria-label='Close chatbot'>x</button>
          </div>

          <div className='mood-chatbot-messages'>
            {conversation.map((message, index) => (
              <article className={`mood-message ${message.from}`} key={`${message.from}-${index}`}>
                <p>{message.text}</p>
                {message.foods?.length > 0 && (
                  <div className='mood-food-list'>
                    {message.foods.map((food) => (
                      <a href='#food-display' className='mood-food-card' key={food._id}>
                        <img src={food.image} alt={food.name} />
                        <span>{food.state}</span>
                        <strong>{food.name}</strong>
                        <small>Rs. {food.price}</small>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className='mood-chatbot-prompts'>
            {quickPrompts.map((prompt) => (
              <button type='button' key={prompt} onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form
            className='mood-chatbot-form'
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder='Example: I am homesick and want light food'
            />
            <button type='submit'>Ask</button>
          </form>
        </section>
      )}

      <button type='button' className='mood-chatbot-toggle' onClick={() => setIsOpen((prev) => !prev)}>
        AI Food Mood
      </button>
    </div>
  );
};

export default MoodChatbot;
