document.body.style.zoom = "75%";

if (/MSIE|Trident/.test(window.navigator.userAgent)) {
    alert('Този браузър не се поддържа!');
    throw new Error('Browser support');
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

let EASY_WORDS_ARRAYS = [
    [['млат', 3, 'д'], ['глат', 3, 'д'], ['вхот', 3, 'д'], ['плот', 3, 'д'], ['самолед', 6, 'т'], ['сладолет', 7, 'д'], ['изглет', 5, 'д'], ['брад', 3, 'т'], ['братовчет', 8, 'д'], ['шоколат', 6, 'д']],
    [['пръф', 3, 'в'], ['праф', 3, 'в'], ['роф', 2, 'в'], ['картов', 5, 'ф'], ['пантов', 5, 'ф'], ['жераф', 4, 'в'], ['жирав', 4, 'ф'], ['лъф', 2, 'в'], ['лоф', 2, 'в'], ['хубаф', 4, 'в']],
    [['блог', 3, 'к'], ['прак', 3, 'г'], ['врак', 3, 'г'], ['лег', 2, 'к'], ['мег', 2, 'к'], ['белек', 4, 'г'], ['сняк', 3, 'г'], ['срог', 3, 'к'], ['строк', 4, 'г'], ['краг', 3, 'к']],
    [['прас', 3, 'з'], ['мрас', 3, 'з'], ['орис', 3, 'з'], ['гриз', 3, 'с'], ['круис', 4, 'з'], ['вируз', 4, 'с'], ['адрез', 4, 'с'], ['автобуз', 6, 'с'], ['вкуз', 3, 'с'], ['соз', 2, 'с']],
    [['прилеб', 5, 'п'], ['боп', 2, 'б'], ['корап', 4, 'б'], ['поб', 2, 'п'], ['микроп', 5, 'б'], ['изкоб', 4, 'п'], ['свиреб', 5, 'п'], ['скръп', 4, 'б'], ['чораб', 4, 'п'], ['телескоб', 7, 'п']],
    [['свеш', 3, 'ж'], ['годеш', 4, 'ж'], ['нош', 2, 'ж'], ['разкож', 5, 'ш'], ['кож', 2, 'ш'], ['лож', 2, 'ш'], ['таралеш', 6, 'ж'], ['валеш', 4, 'ж'], ['еташ', 3, 'ж'], ['репорташ', 7, 'ж']],
    [['маимуна', 2, 'й'], ['леика', 2, 'й'], ['пеика', 2, 'й'], ['чаиник', 2, 'й'], ['чаика', 2, 'й'], ['маика', 2, 'й'], ['идей', 3, 'и'], ['змий', 3, 'и'], ['кайшка', 2, 'и'], ['найстина', 2, 'и']],
    [['маьонеза', 2, 'й'], ['маьор', 2, 'й'], ['актйор', 3, 'ь'], ['булйон', 3, 'ь'], ['дресйор', 4, 'ь'], ['жонглйор', 5, 'ь'], ['позйор', 3, 'ь'], ['шофйор', 3, 'ь'], ['ьод', 0, 'й'], ['раьон', 2, 'й']]
];
let EASY_RULE_TITLES = [].concat.apply([], [Array(6).fill('Обеззвучаване в краесловие'), 'Употреба на и/й', 'Употреба на йо/ьо']);
let HARD_WORDS_ARRAYS = [
    [['дръфче', 3, 'в'], ['плотче', 3, 'д'], ['мрафка', 3, 'в'], ['платнохотка', 8, 'д'], ['гъпка', 2, 'б'], ['жапче', 2, 'б'], ['корапче', 4, 'б'], ['слатка', 3, 'д'], ['бисквидка', 6, 'т'], ['разхотка', 5, 'д']],
    [['стоден', 2, 'у'], ['бодилник', 1, 'у'], ['дарводелец', 1, 'ъ'], ['тагувам', 1, 'ъ'], ['жъдувам', 1, 'а'], ['патека', 1, 'ъ'], ['ракавичка', 1, 'ъ'], ['кащурка', 1, 'ъ'], ['санувам', 1, 'ъ'], ['дърявам', 1, 'а']],
    [['оважавам', 0, 'у'], ['окраса', 0, 'у'], ['обиец', 0, 'у'], ['оцелвам', 0, 'у'], ['оморен', 0, 'у'], ['опражнявам', 0, 'у'], ['оченолюбив', 0, 'у'], ['очтив', 0, 'у'], ['обедителен', 0, 'у'], ['овличам', 0, 'у']],
    [['убратно', 0, 'о'], ['умекна', 0, 'о'], ['упаковка', 0, 'о'], ['умагьосам', 0, 'о'], ['убида', 0, 'о'], ['убогатявам', 0, 'о'], ['убелвам', 0, 'о'], ['уписвам', 0, 'о'], ['умесвам', 0, 'о'], ['учертавам', 0, 'о']],
    [['испращам', 1, 'з'], ['исключвам', 1, 'з'], ['исхвърлям', 1, 'з'], ['распределям', 2, 'з'], ['раскривам', 2, 'з'], ['бессмъртен', 2, 'з'], ['бесплатен', 2, 'з'], ['одмъщавам', 1, 'т'], ['одхвърлям', 1, 'т'], ['испиша', 1, 'з']],
    [['радуст', 3, 'о'], ['мъдруст', 4, 'о'], ['старуст', 4, 'о'], ['отговорнуст', 8, 'о'], ['човечнуст', 6, 'о'], ['хубуст', 3, 'о'], ['бодруст', 4, 'о'], ['работоспособнуст', 13, 'о'], ['жертвоготовнуст', 12, 'о'], ['глупуст', 4, 'о']],
    [['свера', 1, 'ф'], ['кумин', 1, 'о'], ['изтория', 1, 'с'], ['стъдион', 2, 'а'], ['лотка', 2, 'д'], ['сърми', 1, 'а'], ['бубулечка', 3, 'о'], ['асвалт', 2, 'ф'], ['къзан', 1, 'а'], ['госба', 2, 'з']],
    [['малак', 3, 'ъ'], ['сладак', 4, 'ъ'], ['сладникъв', 7, 'а'], ['гладак', 4, 'ъ'], ['мъдар', 3, 'ъ'], ['щедар', 3, 'ъ'], ['ведар', 3, 'ъ'], ['казъл', 3, 'а'], ['лекър', 3, 'а'], ['хубъв', 3, 'а']]
];
let HARD_RULE_TITLES = ['Обеззвучаване в средата на думата', 'Правопис на гласни звукове', 'Правопис на думи с начално о/у', 'Правопис на думи с начално о/у', 'Правопис на думи с представки',
    'Правопис на думи с наставки', 'Думи с непроверяем правопис', 'Правопис на гласни а/ъ в последна сричка', 'Правопис на гласни а/ъ в последна сричка'];
let EXCEPTIONS_INDEX = 7;

fetch('./js/words_explanation.json').then(res => res.json()).then(data => {
    data.forEach(wordArray => sessionStorage.setItem('word_' + wordArray['word'], wordArray['explanation']));
});
let PLAYER_POINTS = 0, DIFFICULTY_LEVEL = null, COMPLETED_ARRAYS = [], WRONG_ONLY_WORDS = [],
    WORDS_ARRAYS = [], WORDS_ARRAY = [], CHOSEN_INDEX = 0;
sessionStorage.setItem('playerPoints', 0);
sessionStorage.setItem('difficultyLevel', null);
sessionStorage.setItem('completed_arrays', []);
sessionStorage.setItem('wrong_only_words', []);

$(function () {
    if (isMobile()) {
        $('#welcome-screen').hide();
        $('#no-mobile-screen').show();
        return;
    }
    clickHandlers();
});

function startOrRefresh() {
    WRONG_ONLY_WORDS = [];
    sessionStorage.setItem('wrong_only_words', JSON.stringify(WRONG_ONLY_WORDS));
    clearPlayerPoints();

    WORDS_ARRAY = getRandomArrayOfWords(WORDS_ARRAYS);
    let rules = DIFFICULTY_LEVEL === 'easy' ? EASY_RULE_TITLES : HARD_RULE_TITLES;
    $('#rule-title').html(rules[CHOSEN_INDEX]);
    $('#next-word').show();
    $('#words').html('');

    if (DIFFICULTY_LEVEL === 'hard' && EXCEPTIONS_INDEX === CHOSEN_INDEX) $('#exceptions').show();
    else $('#exceptions').hide();

    const EDITABLE = DIFFICULTY_LEVEL === 'easy' ? 'readonly' : '';
    WORDS_ARRAY.forEach(function (wordArray) {
        let word = wordArray[0];
        let wrongIndex = parseInt(wordArray[1]);
        let wrongLetter = wordArray[2];
        let wordIndex = WORDS_ARRAY.indexOf(wordArray);

        $('#words').html(function (i, oldContent) {
            let content = oldContent + '<div class="word" data-index="' + wordIndex + '" data-word="' + word + '">';

            Array.from(word).forEach(function (letter, index) {
                if (index === wrongIndex) {
                    content += '<input class="letter wrong-letter" data-index="' + index + '" data-correct="' + wrongLetter + '" value="' + letter + '" ' + EDITABLE + ' maxlength="1" minlength="1">';
                } else {
                    content += '<input class="letter" data-index="' + index + '" value="' + letter + '" ' + EDITABLE + ' maxlength="1" minlength="1">';
                }
            });

            return content += '</div>';
        });
        $('.word:not([data-index=0])').hide();
        if (!isEasyLevel()) {
            $('#next-word').hide();
            $('#check-word').show();
        }
    });
}

function clickHandlers() {
    $('.difficulty-level').on('click', function () {
        $('#levelModal').hide();
        if ($(this).attr('id') === 'easy-level') {
            $('#easyLevelModal').show();
            DIFFICULTY_LEVEL = 'easy';
            WORDS_ARRAYS = EASY_WORDS_ARRAYS;
        } else {
            $('#hardLevelModal').show();
            DIFFICULTY_LEVEL = 'hard';
            WORDS_ARRAYS = HARD_WORDS_ARRAYS;
        }
        sessionStorage.setItem('difficultyLevel', DIFFICULTY_LEVEL);

        $('#start-screen').hide();
        $('#playing-screen').show('slow');
        $('#wrong-words-screen').hide();
        $('#result-game-screen').hide();

        startOrRefresh();
    });

    $(document).on('click', '.wrong-letter', function () {
        let word = $(this).parent('.word');
        if (!word.hasClass('finished-word') && isEasyLevel()) {
            word.addClass('finished-word');
            markCorrectLetter(this);
            addPlayerPoint();
            reactionCorrectWord();
        }
    });

    $(document).on('click', '.letter:not(.wrong-letter)', function () {
        let word = $(this).parent('.word');
        if (!word.hasClass('finished-word') && isEasyLevel()) {
            $(this).addClass('mistake-letter');
            word.addClass('finished-word');
            markCorrectLetter($(word).find('.wrong-letter'));
            addToWrongWordsArray(word.data('word'), $(this).val(), $(this).data('index'));
            reactionMistakeWord();
            showExplanation(word);
        }
    });

    $('#check-word').on('click', function () {
        let word = $('.word:visible');
        if (!checkFinishedWord(word)) return;

        if (word.hasClass('finished-word')) {
            let wrongLetter = $(word).find('.wrong-letter');

            if (wrongLetter.hasClass('edited-letter') && wrongLetter.data('correct') === wrongLetter.val()) {
                addPlayerPoint();
                reactionCorrectWord();
            } else {
                let editedLetter = word.find('.edited-letter');
                editedLetter.addClass('mistake-letter');
                reactionMistakeWord();
                showExplanation(word);
                addToWrongWordsArray(word.data('word'), editedLetter.val(), editedLetter.data('index'));
            }
            word.addClass('finished-word');
            markCorrectLetter(wrongLetter);
            $('#next-word').show();
            $('#check-word').hide();
        }
    });

    $('#next-word').on('click', function () {
        let word = $('.word:visible');
        if (!checkFinishedWord(word)) return;

        let index = parseInt(word.data('index'));
        word.hide();
        $('#explanation').hide();

        index = ++index;
        $('.word[data-index=' + index + ']').show();
        $('#explanation-wrapper').hide();
        $('#correct-wrapper').hide();
        $('#board-pipi-worried').hide();
        $('#board-pipi-happy').hide();
        $('.teacher-watching').show();
        $('#board-pipi-watching').show();
        if (!isEasyLevel()) {
            $('#next-word').hide();
            $('#check-word').show();
        }
        if (index === 10) {
            $('#next-word').hide();
            $('#playing-screen').hide();
            $('#result-game-screen').show('slow');
            $('.result-pipi').show();

            if (PLAYER_POINTS === 10) {
                resultDisplay('img/result_10_pipi.png', 'img/teacher_happy.png', 'Браво! Справи се отлично!');
            } else if (PLAYER_POINTS === 9 || PLAYER_POINTS === 8) {
                resultDisplay('img/result_9-8_pipi.png', 'img/teacher_happy.png', 'Браво! Справи се много добре!');
            } else if (PLAYER_POINTS === 7 || PLAYER_POINTS === 6) {
                resultDisplay('img/result_7-6_pipi.png', 'img/teacher_angry.png', 'Внимавай повече следващия път!');
            } else if (PLAYER_POINTS <= 5) {
                resultDisplay('img/result_5-0_pipi.png', 'img/teacher_angry.png', 'Упражнявай се!');
            }

            function resultDisplay(resultPipi, resultTeacher, speechTextResult) {
                $('.result-pipi').attr('src', resultPipi);
                $('.result-teacher').attr('src', resultTeacher);
                $('.speech-text-result').text(speechTextResult);
            }

            if (WRONG_ONLY_WORDS.length === 0) {
                $('#show-wrong-words').hide();
            } else {
                $('#show-wrong-words').show();
            }
            if (COMPLETED_ARRAYS.length === WORDS_ARRAYS.length) {
                $('.next-game').hide();
            }
        }
    });

    $('#btn-start').on('click', function () {
        $('#welcome-screen').hide();
        $('#start-screen').show('slow');
    });

    $('.error-modal-close, .close-instructions').on('click', function () {
        $('.modal-wrapper').hide();
    });

    $('.btn-transparent').on('click', function () {
        $('#levelModal').show();
    });

    $('#exceptions').on('click', function () {
        $('#exceptionsModal').show();
    });

    $('.next-game').on('click', function () {
        $('#levelModal').show();
    });

    if (!isEasyLevel()) {
        $(document).on('keypress paste', '.letter', function () {
            let word = $('.word:visible');
            word.addClass('finished-word');
            $(this).addClass('edited-letter');
            $(word).find('.letter').not(this).attr('disabled', true);
        });
    }

    $('#show-wrong-words').on('click', function () {
        $('#wrong-words').html('');
        WRONG_ONLY_WORDS.forEach(function (wordArray) {
            let word = wordArray[0];
            let wrongIndex = parseInt(wordArray[1]);
            let wrongLetter = wordArray[2];
            let mistakeIndex = parseInt(wordArray[3]);
            let mistakeLetter = wordArray[4];
            let wordIndex = WRONG_ONLY_WORDS.indexOf(wordArray);

            $('#wrong-words').html(function (i, oldContent) {
                let content = oldContent + '<div class="wrong-word-wrapper" data-index="' + wordIndex + '"><div class="wrong-word">';

                Array.from(word).forEach(function (letter, index) {
                    if (index === mistakeIndex) {
                        content += '<input class="letter mistake-letter" value="' + mistakeLetter + '" readonly>';
                    } else if (index === wrongIndex) {
                        content += '<input class="letter correct-letter" value="' + wrongLetter + '" readonly>';
                    } else {
                        content += '<input class="letter" value="' + letter + '">';
                    }
                });
                return content += '</div><div class="wrong-word-explanation">' + sessionStorage.getItem('word_' + word) + '</div></div>';
            });
        });
        $('#result-game-screen').hide();
        $('#wrong-words-screen').show('slow');
        $('.wrong-word-wrapper:not([data-index=0])').hide();
        if (WRONG_ONLY_WORDS.length === 1) {
            $('#next-wrong-word').hide();
            $('#previous-wrong-word').hide();
        } else {
            $('#next-wrong-word').show();
            $('#previous-wrong-word').hide();
            $('.next-game').hide();
            $('.end-game').hide();
        }
    });


    $('#next-wrong-word').on('click', function () {
        nextPreviousWrongWord(true);
    });

    $('#previous-wrong-word').on('click', function () {
        nextPreviousWrongWord(false);
    });

    function nextPreviousWrongWord(next) {
        let word = $('.wrong-word-wrapper:visible');
        let index = parseInt(word.data('index'));
        word.hide();

        if (next) index = ++index;
        else index = --index;

        if (index === 0) {
            $('#previous-wrong-word').hide();
        } else {
            $('#previous-wrong-word').show();
        }

        $('.wrong-word-wrapper[data-index=' + index + ']').show();
        if (index === (WRONG_ONLY_WORDS.length - 1)) {
            $('#next-wrong-word').hide();
            $('.next-game').show();
            $('.end-game').show();
        } else {
            $('#next-wrong-word').show();
            $('.next-game').hide();
            $('.end-game').hide();
        }
    }

    $('.end-game').on('click', function () {
        location.reload();
    });
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getRandomArrayOfWords(array) {
    const chosenIndex = Math.floor(Math.random() * array.length);

    if (!COMPLETED_ARRAYS.includes(chosenIndex)) {
        COMPLETED_ARRAYS.push(chosenIndex);
        sessionStorage.setItem('completed_arrays', JSON.stringify(COMPLETED_ARRAYS));
        CHOSEN_INDEX = chosenIndex;
        return shuffle(array[chosenIndex]);
    } else {
        return getRandomArrayOfWords(array);
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function checkFinishedWord(word) {
    if (!word.hasClass('finished-word')) {
        $('#errorModal').show();
        return false;
    }
    return true;
}

function isEasyLevel() {
    return sessionStorage.getItem('difficultyLevel') === 'easy';
}

function addToWrongWordsArray(word, letter, letterIdx) {
    let wordArr = [];
    WORDS_ARRAY.some(function (row, index) {
        if (row.includes(word)) wordArr = WORDS_ARRAY[index];
    });
    wordArr.push(letterIdx)
    wordArr.push(letter)

    WRONG_ONLY_WORDS.push(wordArr);
    sessionStorage.setItem('wrong_only_words', JSON.stringify(WRONG_ONLY_WORDS));
}

function addPlayerPoint() {
    PLAYER_POINTS++;
    sessionStorage.setItem('playerPoints', PLAYER_POINTS);
    $('.points span').html(PLAYER_POINTS);
}

function clearPlayerPoints() {
    PLAYER_POINTS = 0;
    sessionStorage.setItem('playerPoints', 0);
    $('.points span').html(0);
}

function markCorrectLetter(el) {
    $(el).val($(el).data('correct')).addClass('correct-letter');
}

function reactionCorrectWord() {
    $('.teacher-watching').hide();
    $('#correct-wrapper').show();
    $('#board-pipi-watching').hide();
    $('#board-pipi-happy').show();
    new Audio('sound/right-answer.mp3').play();

}

function reactionMistakeWord() {
    $('.teacher-watching').hide();
    $('#explanation-wrapper').show();
    $('#board-pipi-watching').hide();
    $('#board-pipi-worried').show();
    new Audio('sound/wrong-answer.mp3').play();
}

function showExplanation(word) {
    $('#explanation').show().html(sessionStorage.getItem('word_' + word.data('word')));
}
