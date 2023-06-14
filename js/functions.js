// Функция сравнения длины строки
const checkLenghtString = (string, maxLength) => string.length <= maxLength;

checkLenghtString('maxim', 5);


//Функция проверки полиндрома
const getPolindrom = (string) => {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();
  let reverseString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    reverseString += normalizeString[i];
  }
  return normalizeString === reverseString;
};

getPolindrom('Лёша на полке клопа нашёл');

//Функция, которая извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const stringToNumber = (stringOrNumber) => {
  let result = '';
  const normalizeString = stringOrNumber.toString();
  for (let i = 0; i <= normalizeString.length; i++) {
    const char = parseInt(normalizeString[i], 10);
    if(!Number.isNaN(char)) {
      result += normalizeString[i];
    }
  }
  return result;
};

stringToNumber('ECMAScript 2022');
