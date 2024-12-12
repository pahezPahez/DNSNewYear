import React, { useState, useEffect } from "react";
import './Main.css';
import arrow1 from '../assets/Arrow 1.svg';
import arrow2 from '../assets/Arrow 2.svg';
import giftIcon from '../assets/gift.svg';
import ballSmall from '../assets/ball-small.svg';
import ballBig from '../assets/ball-big.svg';

const Main = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'Какой пол у получателя подарка?',
      options: ['Мужской', 'Женский', 'Не имеет значения'],
      answer: null,
    },
    {
      id: 2,
      text: 'Какой возраст получателя?',
      options: ['Подростки (13-17 лет)', 'Взрослые (18-60 лет)', 'Пожилые (60+)'],
      answer: null,
    },
    {
      id: 3,
      text: 'Какое хобби у получателя?',
      options: ['Музыка', 'Рисование', 'Спорт', 'Видеоигры', 'Бытовая техника', 'Смартфон'],
      answer: null,
    },
    {
      id: 4,
      text: 'Насколько важен бюджет?',
      options: ['Низкий (до 3499 руб.)', 'Средний (3499-6000 руб.)', 'Высокий (6000+ руб.)'],
      answer: null,
    },
    {
      id: 5,
      text: 'Предпочтительны премиальные бренды?',
      options: ['Да', 'Нет'],
      answer: null,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = answer;
    setQuestions(updatedQuestions);
  };

  const handleSubmitAnswer = () => {
    if (questions[currentQuestionIndex].answer === null) {
      alert('Пожалуйста, выберите ответ перед переходом к следующему вопросу.');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const fetchGifts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { answer: gender } = questions[0];
      const { answer: age } = questions[1];
      const { answer: hobby } = questions[2];
      const { answer: budget } = questions[3];
      const { answer: brandPreference } = questions[4];

      const hobbyToCategoryAndClass = {
        Музыка: { category: 'music', class: ['headphones/smartphone'] },
        Рисование: { category: 'art', class: [] },
        Спорт: { category: 'sport', class: [] },
        Видеоигры: { category: 'gaming', class: [] },
        'Бытовая техника': { category: 'household', class: [] },
        Смартфон: { category: 'smarthpone', class: ['smartphone', 'headphones/smartphone'] },
      };

      const { category, class: classList } = hobbyToCategoryAndClass[hobby];

      const ageToAgeParam = {
        'Подростки (13-17 лет)': '13',
        'Взрослые (18-60 лет)': '18',
        'Пожилые (60+)': '60',
      };

      const ageParam = ageToAgeParam[age];

      const budgetToPriceRange = {
        'Низкий (до 3499 руб.)': { min: 0, max: 3499 },
        'Средний (3499-6000 руб.)': { min: 0, max: 6000 },
        'Высокий (6000+ руб.)': { min: 0, max: Infinity },
      };

      const priceRange = budgetToPriceRange[budget];

      const response = await fetch('https://674d10f454e1fca9290e3e1b.mockapi.io/react-ideas/arr/products');
      const data = await response.json();

      const filteredGifts = data.filter((gift) => {
        const isGenderMatch =
          gender === 'Не имеет значения' ||
          gift.type === (gender === 'Мужской' ? 'male' : 'female') ||
          gift.type === 'all';

        const isAgeMatch =
          gift.age === 'all' ||
          gift.age === ageParam ||
          (ageParam === '18' && gift.age === '18/60') ||
          (ageParam === '60' && gift.age === '18/60');

        const isHobbyMatch =
          gift.category === category ||
          classList.includes(gift.class);
        const isPriceMatch = gift.price >= priceRange.min && gift.price <= priceRange.max;

        const isCategoryAllowed = !(hobby === 'Музыка' || hobby === 'Смартфон') || gift.category !== 'gaming';

        const isBrandMatch = brandPreference === 'Нет' || gift.brand === 'prior';

        return isGenderMatch && isAgeMatch && isHobbyMatch && isPriceMatch && isCategoryAllowed && isBrandMatch;
      });

      const sortedGifts = filteredGifts.sort((a, b) => {
        const categoryPriority = {
          mouse: 1,
          keyboard: 2,
          headphones: 3,
          other: 4,
        };

        const getCategoryPriority = (gift) => {
          if (gift.category === 'gaming' && (gift.class === 'mouse' || gift.class === 'keyboard')) {
            return categoryPriority.mouse;
          } else if (gift.category === 'gaming' && gift.class === 'headphones') {
            return categoryPriority.headphones;
          } else {
            return categoryPriority.other;
          }
        };

        const aPriority = getCategoryPriority(a);
        const bPriority = getCategoryPriority(b);

        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        } else if (a.brand === 'prior' && b.brand !== 'prior') {
          return -1;
        } else if (a.brand !== 'prior' && b.brand === 'prior') {
          return 1;
        } else {
          return b.price - a.price;
        }
      });

      const limitedGifts = sortedGifts.slice(0, 4);

      if (limitedGifts.length === 0) {
        setError('К сожалению, подарков по вашему запросу не найдено.');
      } else {
        setGifts(limitedGifts);
      }
    } catch (err) {
      setError('Ошибка при загрузке подарков. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      fetchGifts();
    }
  }, [currentQuestionIndex]);

  return (
    <main className="main">
      <img className="main__ball-small1" src={ballSmall} alt="шарик" />
      <img className="main__ball-big1" src={ballBig} alt="шарик" />
      <img className="main__ball-small2" src={ballSmall} alt="шарик" />
      <img className="main__ball-big2" src={ballBig} alt="шарик" />

      <div className={`card ${currentQuestionIndex === questions.length ? 'card--expanded' : ''} ${gifts.length > 2 ? 'card--extra-expanded' : ''}`}>
        {currentQuestionIndex < questions.length ? (
          <>
            <h2>{questions[currentQuestionIndex].text}</h2>
            <ul>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li className="card__li" key={index}>
                  <input
                    className="card__input"
                    type="radio"
                    name="answer"
                    value={option}
                    checked={questions[currentQuestionIndex].answer === option}
                    onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                  />
                  <label className="card__label">{option}</label>
                </li>
              ))}
            </ul>
            <img className="card__gift" src={giftIcon} alt="подарок" />
            <div className="button-box">
              <button className="btn" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                <img className="btn__img" src={arrow1} alt="стрелка" />
              </button>
              <button className="btn" onClick={handleSubmitAnswer}>
                <img className="btn__img" src={arrow2} alt="стрелка" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Рекомендуемые подарки:</h2>
            {loading ? (
              <p className="loading">Загрузка рекомендуемых подарков...</p>
            ) : error ? (
              <p className="err">{error}</p>
            ) : (
              <ul className="gift-list">
                {gifts.map((gift) => (
                  <div key={gift.id} className="gift-card">
                    <img src={gift.image} alt={gift.name} />
                    <h3>{gift.name}</h3>
                    <div className="gift-box">
                      <p>Цена: {gift.price} ₽</p>
                      <a href={gift.link} target="_blank" rel="noopener noreferrer">
                        Купить
                      </a>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Main;