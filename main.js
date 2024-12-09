const categories = {
    js: [
        {
            question: "Какой логотип соответствует JavaScript?",
            answers: ["./image/1V.png", "./image/X.png"],
            correct: 0, // Номер правильного ответа (с индексом 0)
            isImageQuestion: true,
        },
        {
            question: "Что делает данный символ в коде JavaScript: `===`?",
            answers: ["Присваивание", "Сравнение", "Сложение"],
            correct: 1, // Номер правильного ответа
            isImageQuestion: false,
        },
        {
            question: "Какое из перечисленных ниже слов не является зарезервированным словом в JavaScript?",
            answers: ["default", "undefined", "throw"],
            correct: 2,
            isImageQuestion: false,
        },
        {
            question: "Что обозначает `let` в JavaScript?",
            answers: ["Объявление переменной", "Цикл", "Функция"],
            correct: 0,
            isImageQuestion: false,
        },
        {
            question: "Выберите условный оператор javascript",
            answers: ["for/while", "when/let", "if/else if/else"],
            correct: 2,
            isImageQuestion: false,
        },
    ],
    html: [
        {
            question: "Что такое HTML?",
            answers: ["Язык программирования","Язык разметки гипертекста","Язык баз данных","Язык для создания серверов",],
            correct: 1, // Номер правильного ответа
            isImageQuestion: false,
        },
        {
            question: "Какой тег используется для создания самой большой заголовка?",
            answers: ["h1","header","head","title",],
            correct: 0, // Номер правильного ответа
            isImageQuestion: false,
        },
        {
            question: "Какой атрибут используется для указания пути к изображению в теге img",
            answers: ["src","alt","href","path",],
            correct: 0, // Номер правильного ответа
            isImageQuestion: false,
        },
        {
            question: "Какой тег используется для создания нумерованного списка?",
            answers: ["ul","ol","li","dl",],
            correct: 1, // Номер правильного ответа
            isImageQuestion: false,
        },
        {
            question: "Какой из этих тегов является пустым (self-closing)?",
            answers: ["div","span","img","p",],
            correct: 2, // Номер правильного ответа
            isImageQuestion: false,
        },
    ],
};

let selectedCategory = null; // Выбранная категория
let question = []; // Вопросы текущей категории
let questionIndex = 0; // Текущий вопрос
let score = 0; // Очки пользователя

const headerContainer = document.getElementById('header');
const listContainer = document.getElementById('list');
const submitBtn = document.getElementById('submit');

// Начальный экран
showCategorySelection();

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showCategorySelection() {
    clearPage();

    const headerTemplate = `<h2 class="title">Выберите категорию викторины</h2>`;
    headerContainer.innerHTML = headerTemplate;

    const createCategoryHTML = key => `
    <li>
        <button class="category-btn" data-category="${key}">
            ${key.toUpperCase()}
        </button>
    </li>
`;

listContainer.innerHTML = Object.keys(categories).map(createCategoryHTML).join('');

    // Добавляем обработчики для кнопок выбора категории
    document.querySelectorAll('.category-btn').forEach((button) =>
        button.addEventListener('click', (e) => {
            selectedCategory = e.target.dataset.category;
            question = categories[selectedCategory];
            startQuiz();
        })
    );

    submitBtn.style.display = 'none'; // Скрываем кнопку до начала викторины
}

function startQuiz() {
    questionIndex = 0;
    score = 0;

    clearPage();
    showQuestion();
    submitBtn.style.display = 'block'; // Показываем кнопку
    submitBtn.onclick = checkAnswer;
    submitBtn.innerText = 'Ответить'; 
}

function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', question[questionIndex].question);
    headerContainer.innerHTML = title;

    listContainer.innerHTML = '';

    question[questionIndex].answers.forEach((item, index) => {
        const isImageAnswer = question[questionIndex].isImageQuestion;

        let answerHTML;

        if (isImageAnswer) {
            answerHTML = `
                <li>
                    <label>
                        <input type="radio" class="answer" name="answer" value="${index}" />
                        <img src="${item}" alt="Ответ ${index + 1}" class="answer-image" />
                    </label>
                </li>
            `;
        } else {
            answerHTML = `
                <li>
                    <label>
                        <input type="radio" class="answer" name="answer" value="${index}" />
                        <span>${item}</span>
                    </label>
                </li>
            `;
        }

        listContainer.innerHTML += answerHTML;
    });
}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input:checked');
    if (!checkedRadio) {
        submitBtn.blur();
        return;
    }

    const userAnswer = parseInt(checkedRadio.value);
    if (userAnswer === question[questionIndex].correct) {
        score++;
    }

    if (questionIndex !== question.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;

    let title, message;

    if (score === question.length) {
        title = 'Поздравляем!';
        message = 'Вы ответили верно на все вопросы!';
    } else if ((score * 100) / question.length >= 50) {
        title = 'Неплохой результат!';
        message = 'Вы дали более половины правильных ответов.';
    } else {
        title = 'Стоит постараться';
        message = 'Пока у вас меньше половины правильных ответов';
    }

    let result = `${score} из ${question.length}`;
    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    submitBtn.innerText = 'Начать заново';
    submitBtn.onclick = () => showCategorySelection();
}









/*const question = [
    {
        question: "Какой логотип соответствует JavaScript?",
        answers: ["./image/1V.png", "./image/X.png"],
        correct: 0, // Номер правильного ответа (с индексом 0)
        isImageQuestion: true,
    },
    {
        question: "Что делает данный символ в коде JavaScript: `===`?",
        answers: ["Присваивание", "Сравнение", "Сложение"],
        correct: 1, // Номер правильного ответа
        isImageQuestion: false,
    },
    {
        question: "Какое из перечисленных ниже слов не является зарезервированным словом в JavaScript?",
        answers: ["default", "undefined", "throw"],
        correct: 2,
        isImageQuestion: false,
    },
    {
        question: "Что обозначает `let` в JavaScript?",
        answers: ["Объявление переменной", "Цикл", "Функция"],
        correct: 0,
        isImageQuestion: false,
    },
    {
        question: "Выберите условный оператор javascript",
        answers: ["for/while", "when/let", "if/else if/else"],
        correct: 2,
        isImageQuestion: false,
    },
];

const headerContainer = document.getElementById('header');
const listContainer = document.getElementById('list');
const submitBtn = document.getElementById('submit');

let questionIndex = 0; // Текущий вопрос
let score = 0; // Очки пользователя

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
    // Очищаем содержимое страницы (вопросы и ответы)
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    // Вставляем вопрос
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', question[questionIndex].question);
    headerContainer.innerHTML = title;

    // Вставляем ответы
    listContainer.innerHTML = ''; // Очищаем предыдущие ответы

    question[questionIndex].answers.forEach((item, index) => {
        const isImageAnswer = question[questionIndex].isImageQuestion;

        let answerHTML;

        if (isImageAnswer) {
            // Если это вопрос с изображениями, то вставляем картинку
            answerHTML = `
                <li>
                    <label>
                        <input type="radio" class="answer" name="answer" value="${index}" />
                        <img src="${item}" alt="Ответ ${index + 1}" class="answer-image" />
                    </label>
                </li>
            `;
        } else {
            // Если это текстовый вопрос, то вставляем текстовый ответ
            answerHTML = `
                <li>
                    <label>
                        <input type="radio" class="answer" name="answer" value="${index}" />
                        <span>${item}</span>
                    </label>
                </li>
            `;
        }

        listContainer.innerHTML += answerHTML;
    });
}

function checkAnswer() {
    console.log('checkAnswer начался!');

    // Ищем выбранный радиобаттон
    const checkedRadio = listContainer.querySelector('input:checked');
    if (!checkedRadio) {
        submitBtn.blur(); // Если ничего не выбрано, прекращаем выполнение
        return;
    }

    // Получаем индекс выбранного ответа
    const userAnswer = parseInt(checkedRadio.value);

    // Проверяем правильность ответа
    if (userAnswer === question[questionIndex].correct) {
        score++; // Увеличиваем очки за правильный ответ
    }

    // Переходим к следующему вопросу или показываем результаты
    if (questionIndex !== question.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    // Шаблон для отображения результатов
    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;

    let title, message;

    // Определяем заголовок и сообщение в зависимости от количества правильных ответов
    if (score === question.length) {
        title = 'Поздравляем!';
        message = 'Вы ответили верно на все вопросы!';
    } else if ((score * 100) / question.length >= 50) {
        title = 'Неплохой результат!';
        message = 'Вы дали более половины правильных ответов.';
    } else {
        title = 'Стоит постараться';
        message = 'Пока у вас меньше половины правильных ответов';
    }

    let result = `${score} из ${question.length}`;
    // Создаем финальное сообщение с результатами
    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    // Меняем текст кнопки и добавляем обработчик на её клик для перезапуска
    submitBtn.blur(); 
    submitBtn.innerText = 'Начать заново';
    submitBtn.onclick = () => history.go() ;
}*/


