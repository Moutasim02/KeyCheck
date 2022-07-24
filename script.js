const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

let wordsArray = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
    typedValueElement.value = '';
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    wordsArray = quote.split(' ');
    wordIndex = 0; // reset for tracking

    const spanWords = wordsArray.map(
        function (word) {
            return `<span>${word} </span>`;
    });

    quoteElement.innerHTML = spanWords.join(''); // returns array as string
    quoteElement.childNodes[0].className = 'highlight';

    messageElement.innerText = '';

    typedValueElement.focus();
    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    const currentWord = wordsArray[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === wordsArray.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
        typedValueElement.value = '';

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';

    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = 'textField';

    } else {
        typedValueElement.className = 'error';
    }
});