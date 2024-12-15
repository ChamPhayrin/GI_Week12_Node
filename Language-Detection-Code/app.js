/* Print the most accurate language for the following phrases:
“Es macht gut”
“Dobrá práce”
“Gwaith da”
*/

const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

let str1 = 'Es macht gut';
let str2 = 'Dobrá práce';
let str3 = 'Gwaith da';



console.log(lngDetector.detect(str1, 1))
console.log(lngDetector.detect(str2, 1))
console.log(lngDetector.detect(str3, 1))

