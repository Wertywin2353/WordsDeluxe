let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let wordCounter = 0;
let Rolls = 1;
let Words = [];
let Rules = ["Если выпадает 6-ка, то Игрок задает новое правило."];
let RulesMiniFade = "<gradient></gradient><button onclick='openAllRules()' id='openRulesBTN'>▼ Увидеть все правила</button>";
window.onload = async function () {
    document.getElementById('intro').style.opacity = "100";
    document.getElementById('DeluxeIntroText').style.opacity = "100";
    document.getElementById('DeluxeIntroText').style.translate = "0";
    await delay(1500);
    document.getElementById('intro').style.opacity = "0";
    await delay(250);
    document.getElementById('IntroSplash').style.animation = "introFade linear 0.3s";
    await delay(300);
    document.getElementById('GameCloseButton').style.animation = "headerAppear cubic-bezier(.73,-0.01,.23,.97) 0.4s";
    document.getElementById('GameCloseButton').style.opacity = "100%";
    document.getElementById('IntroSplash').style.display = "none";
    await delay(200);
    document.getElementById('headerInfo').style.animation = "headerAppear cubic-bezier(.73,-0.01,.23,.97) 0.4s";
    document.getElementById('headerInfo').style.opacity = "100%";
    await delay(200);
    document.getElementById('GameResetButton').style.animation = "headerAppear cubic-bezier(.73,-0.01,.23,.97) 0.4s";
    document.getElementById('GameResetButton').style.opacity = "100%";
    await delay(300);
    let initCube = getRandomIntInclusive(1, 6);
    document.getElementById("Cube").innerHTML = "<img src='res/" + initCube + ".gif' width='250px'>";
    document.getElementById("cubeHistory").innerHTML = document.getElementById("cubeHistory").innerHTML + "<div class='rollhiselm'><img src='res/" + initCube + ".png'></div>";
    document.getElementById('content').style.animation = "contentAppear cubic-bezier(.73,-0.01,.23,.97) 0.4s";
    document.getElementById('content').style.opacity = "100%"; 
}

async function reRoll() {
    Rolls++;
    let initCube = getRandomIntInclusive(1, 6);
    document.getElementById("Cube").innerHTML = "<img src='res/" + initCube + ".gif' width='250px'>";
    await delay(3000);
    document.getElementById("cubeHistory").innerHTML = "<div class='rollhiselm'><img src='res/" + initCube + ".png'></div>" + document.getElementById("cubeHistory").innerHTML;
}
let isTimerRunning = false; 

function startCountingTimer() {
    // Если таймер уже запущен, выходим из функции
    if (isTimerRunning) {
        console.warn("Таймер уже работает!");
        return; 
    }

    const display = document.getElementById('Timer');
    if (!display) {
        console.error("Элемент с id='Timer' не найден!");
        return;
    }

    // Устанавливаем флаг, что таймер запущен
    isTimerRunning = true; 
    let totalSeconds = 0;

    const interval = setInterval(() => {
        totalSeconds++;

        // Высчитываем часы, минуты и секунды
        const hours = Math.floor(totalSeconds / 3600);
        // Делим на 60 и берем остаток от деления на 60, чтобы минуты сбрасывались после 59
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = totalSeconds % 60;

        // Форматируем значения (добавляем ведущий ноль, если число меньше 10)
        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        // Выводим в формате ЧЧ:ММ:СС
        display.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }, 1000);
}
async function openWordInput() {
    document.getElementById("newWordSplash").style.display = "block";
    await delay(10);
    document.getElementById("newWordSplash").style.opacity = "100%";
    await delay(50);
    document.getElementById("newWordContent").style.translate = "0px";
}
async function ConfirmWord() {
    Words.push(document.getElementById("wordInput").value);
    if(wordCounter == 0) {
        document.getElementById("wordHistory").innerHTML = "<div>" + wordCounter + ". <p style='float: right;'>00:00:00</p>" + document.getElementById("wordInput").value + "</div>" + document.getElementById("wordHistory").innerHTML;
        document.getElementById("headerInfo").style.opacity = "0%";
        await delay(300);
        document.getElementById("headerInfo").innerHTML = " <span id='Timer'>00:00:00</span>";
        await delay(150);
        document.getElementById("headerInfo").style.opacity = "100%";
    }
    else {
        document.getElementById("wordHistory").innerHTML = "<div>" + wordCounter + ". <p style='float: right;'>" + document.getElementById("Timer").innerText + "</p>" + document.getElementById("wordInput").value + "</div>" + document.getElementById("wordHistory").innerHTML;
    }
    startCountingTimer();
    wordCounter++;
    document.getElementById("newWordContent").style.translate = "0 500px";
    await delay(500);
    document.getElementById("newWordSplash").style.opacity = "0%";
    await delay(50);
    document.getElementById("newWordSplash").style.display = "none";
    document.getElementById("wordInput").value = "";
}
async function closeNewWord() {
    document.getElementById("newWordContent").style.translate = "0 500px";
    await delay(500);
    document.getElementById("newWordSplash").style.opacity = "0%";
    await delay(50);
    document.getElementById("newWordSplash").style.display = "none";
    document.getElementById("wordInput").value = "";
}
async function openRuleAdd() {
    document.getElementById("newRuleSplash").style.display = "block";
    await delay(10);
    document.getElementById("newRuleSplash").style.opacity = "100%";
    await delay(50);
    document.getElementById("newRuleContent").style.translate = "0px";
}
async function ConfirmRule() {
    Rules.push(document.getElementById("ruleInput").value);
    document.getElementById("RulesMini").innerHTML = RulesMiniFade;
    let i = 0;
    while(i != Rules.length) {
        if(i == 4) {
            break;
        }
        else {
        document.getElementById("RulesMini").innerHTML = "<p class='RuleP'>" + Rules[i] + "</p>" + document.getElementById("RulesMini").innerHTML;
        i++
        }
    }
    document.getElementById("newRuleContent").style.translate = "0 500px";
    await delay(500);
    document.getElementById("newRuleSplash").style.opacity = "0%";
    await delay(50);
    document.getElementById("newRuleSplash").style.display = "none";
    document.getElementById("ruleInput").value = "";
}

async function closeNewRules() {
    document.getElementById("newRuleContent").style.translate = "0 500px";
    await delay(500);
    document.getElementById("newRuleSplash").style.opacity = "0%";
    await delay(50);
    document.getElementById("newRuleSplash").style.display = "none";
    document.getElementById("ruleInput").value = "";
}
async function openAbout() {
    document.getElementById("AboutSplash").style.display = "block";
    await delay(10);
    document.getElementById("AboutSplash").style.opacity = "100%";
    await delay(50);
    document.getElementById("AboutContent").style.translate = "0px";
}

async function closeAbout() {
    document.getElementById("AboutSplash").style.opacity = "0%";
    await delay(500);
    document.getElementById("AboutContent").style.translate = "0 500px";
    await delay(50);
    document.getElementById("AboutSplash").style.display = "none";

}

async function openAllRules() {
    document.getElementById("AllRulesSplash").style.display = "block";
    await delay(50);
    document.getElementById("AllRulesSplash").style.opacity = "100%";
    document.getElementById("AllRulesSplash").style.scale = "1";
    await delay(500);
    document.getElementById("AllRulesSplash").style.opacity = "100%";
    let i = 0;
    document.getElementById("rulesContainer").innerHTML = "";
    while(i != Rules.length) {
        document.getElementById("rulesContainer").innerHTML =  document.getElementById("rulesContainer").innerHTML + "<p class='RuleP'>" + Rules[i] + "</p>";
        i++
    }
}

async function confirmRestart() {
    document.getElementById("RestartSplash").style.display = "block";
    await delay(10);
    document.getElementById("RestartSplash").style.opacity = "100%";
}

async function closeReset() {
    document.getElementById("RestartSplash").style.opacity = "0%";
    await delay(500);
    document.getElementById("RestartSplash").style.display = "none";
}

async function confirmClosing() {
    document.getElementById("CloseSplash").style.display = "block";
    await delay(10);
    document.getElementById("CloseSplash").style.opacity = "100%";
}

async function closeExit() {
    document.getElementById("CloseSplash").style.opacity = "0%";
    await delay(500);
    document.getElementById("CloseSplash").style.display = "none";
}

async function ReloadPage() {
    closeReset();
    await delay(500);
    document.getElementById('AutroSplash').style.display = "block";
    await delay(50);
    document.getElementById('AutroSplash').style.animation = "AutroFade linear 0.3s";
    await delay(300);
    window.location.reload();
}
async function closeAllRules() {
    document.getElementById("AllRulesSplash").style.opacity = "0%";
    document.getElementById("AllRulesSplash").style.scale = "0.5";
    await delay(500);
    document.getElementById("AllRulesSplash").style.display = "none";
}

async function showHighLights() {
    try {
        console.log(document.getElementById("Timer").innerText);
    } catch (e) {
        document.getElementById('AutroSplash').style.display = "block";
        await delay(50);
        document.getElementById('AutroSplash').style.animation = "AutroFade linear 0.3s";
        await delay(300);
        window.location.reload();
    }
    closeExit();
    await delay(500);
    document.getElementById("OVRLAY").style.translate = "0 -200px";
    document.getElementById("OVRLAY").style.opacity = 0;
    await delay(500);
    let longest = Words.reduce((a, b) => (a.length > b.length ? a : b));
    let headER = "<div id='goh'><h2>Игра окончена!</h2><p style='margin-bottom: 15px;'>Посмотрите на итоги этой сессии</p></div>";
    let block1 = " <div class='UIBGGO' id='gob1'><p>Длительность</p><h2>" + document.getElementById("Timer").innerText + "</h2></div>";
    let block2 = " <div class='UIBGGO' id='gob2'><p>Кол-во слов</p><h2>" + wordCounter + "</h2></div><br>";
    let block3 = " <div class='UIBGGO' style='width: 320px;' id='gob3'><p>Самое длинное слово</p><h2>" + longest + "</h2></div><br>";
    let block4 = " <div class='UIBGGO' id='gob4'><p>Кол-во бросков</p><h2>" + Rolls + "</h2></div>";
    let block5 = " <div class='UIBGGO' id='gob5'><p>Кол-во правил</p><h2>" + Rules.length + "</h2></div>";
    let CloseBTN = "<button id='CloseGlobal' onclick='window.close()'>Закрыть вкладку</button>";
    document.getElementById("OVRLAY").style.translate = "0 0";
    document.getElementById("OVRLAY").innerHTML = "";
    await delay(200);
    document.getElementById("OVRLAY").style.opacity = 100;
    document.getElementById("OVRLAY").innerHTML = CloseBTN + "<div id='gameOverScreen'>" + headER + block1 + block2 + block3 + block4 + block5 + "</div>";
}