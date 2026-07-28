// ==========================================================
// 1. LOCALIZATION (EN / HY / LV)
// ==========================================================
var currentLang = "en";

var translations = {
    en: {
        coins: "Coins",
        keys: "Keys",
        title: "LIEPĀJA: THE CITY OF WINDS",
        start: "Start Game",
        inst: "Instructions",
        instTitle: "INSTRUCTIONS",
        w: "W / ↑ - Forward",
        s: "S / ↓ - Backward",
        a: "A / ← - Left",
        d: "D / → - Right",
        space: "SPACE - Jump Up",
        r: "R - Reset Position",
        alert: "Explore the Liepāja labyrinth, collect keys, study the landmarks and open the gate!",
        back: "Back",
        boardHeading: "LIEPĀJA LANDMARK INFO",
        btnContinue: "Continue Exploring",
        quizHeading: "LIEPĀJA KNOWLEDGE QUIZ",
        victoryTitle: "VICTORY!",
        victorySub: "TITLE: VIKING OF LIEPĀJA",
        playAgain: "Play Again",
        socialText: "Connect with us on social media:"
    },
    hy: {
        coins: "Մետաղադրամներ",
        keys: "Բանալիներ",
        title: "ԼԻԵՊԱՅԱ՝ ՔԱՄԻՆԵՐԻ ՔԱՂԱՔ",
        start: "Սկսել Խաղը",
        inst: "Ցուցումներ",
        instTitle: "ՀՐԱՀԱՆԳՆԵՐ",
        w: "W / ↑ - Առաջ",
        s: "S / ↓ - Հետ",
        a: "A / ← - Ձախ",
        d: "D / → - Աջ",
        space: "SPACE - Վեր թռչել",
        r: "R - Վերակտավորել դիրքը",
        alert: "Ուսումնասիրեք Լիպայայի լաբիրինթոսը, հավաքեք բանալիները և բացեք դուռը:",
        back: "Հետ",
        boardHeading: "ԼԻԵՊԱՅԻ ՀՈՒՇԱՏԱԽՏԱԿ",
        btnContinue: "Շարունակել որոնումը",
        quizHeading: "ԼԻԵՊԱՅԱՅԻ ԳԻՏԵԼԻՔԻ ԹԵՍՏ",
        victoryTitle: "ՀԱՂԹԱՆԱԿ!",
        victorySub: "ՏԻՏՂՈՍ՝ ԼԻԵՊԱՅԻ ՎԻԿԻՆԳ",
        playAgain: "Կրկին խաղալ",
        socialText: "Կապվեք մեզ հետ սոցցանցերում՝"
    },
    lv: {
        coins: "Monētas",
        keys: "Atslēgas",
        title: "LIEPĀJA: VĒJU PILSĒTA",
        start: "Sākt Spēli",
        inst: "Norādījumi",
        instTitle: "INSTRUKCIJAS",
        w: "W / ↑ - Uz priekšu",
        s: "S / ↓ - Atpakaļ",
        a: "A / ← - Pa kreisi",
        d: "D / → - Pa labi",
        space: "SPACE - Lēkt augšā",
        r: "R - Atiestatīt pozīciju",
        alert: "Izpētiet Liepājas labirintu, vāciet atslēgas, iepazīstiet objektus un atveriet vārtus!",
        back: "Atpakaļ",
        boardHeading: "LIEPĀJAS OBJEKTA INFO",
        btnContinue: "Turpināt izpēti",
        quizHeading: "LIEPĀJAS ZINĀŠANU TESTS",
        victoryTitle: "UZVARA!",
        victorySub: "TITULS: LIEPĀJAS VIKINGS",
        playAgain: "Spēlēt vēlreiz",
        socialText: "Sazinieties ar mums sociālajos tīklos:"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    var t = translations[lang];
    document.getElementById("txtCoins").innerText = t.coins;
    document.getElementById("txtKeys").innerText = t.keys;
    document.getElementById("mTitle").innerText = t.title;
    document.getElementById("btnStart").innerText = t.start;
    document.getElementById("btnInst").innerText = t.inst;
    document.getElementById("instTitle").innerText = t.instTitle;
    document.getElementById("iW").innerText = t.w;
    document.getElementById("iS").innerText = t.s;
    document.getElementById("iA").innerText = t.a;
    document.getElementById("iD").innerText = t.d;
    document.getElementById("iSpace").innerText = t.space;
    document.getElementById("iR").innerText = t.r;
    document.getElementById("iAlert").innerText = t.alert;
    document.getElementById("btnBack").innerText = t.back;
}

// ==========================================================
// 2. DOM REFERENCES & GLOBAL STATE
// ==========================================================
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var world = document.getElementById("world");
var container = document.getElementById("container");
var hud = document.getElementById("hud");
var coinCountEl = document.getElementById("coinCount");
var keyCountEl = document.getElementById("keyCount");
var minimapCanvas = document.getElementById("minimap");
var minimapCtx = minimapCanvas ? minimapCanvas.getContext("2d") : null;

var gameStarted = false;
var gameWon = false;
var deg = Math.PI / 180;

var totalCoinsCollected = 0;
var totalKeysCollected = 0;

var PressLeft = 0, PressRight = 0, PressForward = 0, PressBack = 0, PressUp = 0;
var speed = 3.4;
var MouseX = 0, MouseY = 0;
var lock = false;

var coinSound = new Audio("SOUND/coin.mp3");
var keySound = new Audio("SOUND/key.mp3");
var buttonSound = new Audio("SOUND/button.mp3");
var doorSound = new Audio("SOUND/key.mp3");

// ==========================================================
// 3. MAZE CONFIGURATION & GENERATION
// ==========================================================
var GRID = 9;                  
var CELL = 260;                
var HALF = (GRID * CELL) / 2;  
var WALL_H = 300;              
var WALL_THICK = 18;           
var PLAYER_RADIUS = 42;        
var ENTRANCE_COL = Math.floor(GRID / 2);
var EXIT_COL = Math.floor(GRID / 2);

var doorYOffset = 0;
var doorOpened = false;
var doorWallIndex = -1;

var targetCoins = 11;
var targetKeys = 9;

function player(x, y, z, rx, ry) {
    this.x = x; this.y = y; this.z = z; this.rx = rx; this.ry = ry;
}

var spawnX = -HALF + CELL / 2 + ENTRANCE_COL * CELL;
var spawnZ = HALF - CELL / 2;
var pawn = new player(spawnX, 0, spawnZ, 0, 180);

function buildGrid(rows, cols) {
    var grid = [];
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            row.push({ r: r, c: c, top: true, right: true, bottom: true, left: true, visited: false });
        }
        grid.push(row);
    }
    return grid;
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
}

function carveMaze(grid, rows, cols, startR, startC) {
    var stack = [[startR, startC]];
    grid[startR][startC].visited = true;

    while (stack.length) {
        var cur = stack[stack.length - 1];
        var r = cur[0], c = cur[1];
        var dirs = shuffle([
            { dr: -1, dc: 0, wall: "top", opp: "bottom" },
            { dr: 1, dc: 0, wall: "bottom", opp: "top" },
            { dr: 0, dc: -1, wall: "left", opp: "right" },
            { dr: 0, dc: 1, wall: "right", opp: "left" }
        ]);
        var advanced = false;
        for (var i = 0; i < dirs.length; i++) {
            var d = dirs[i];
            var nr = r + d.dr, nc = c + d.dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].visited) {
                grid[r][c][d.wall] = false;
                grid[nr][nc][d.opp] = false;
                grid[nr][nc].visited = true;
                stack.push([nr, nc]);
                advanced = true;
                break;
            }
        }
        if (!advanced) stack.pop();
    }
    return grid;
}

var mazeGrid = buildGrid(GRID, GRID);
carveMaze(mazeGrid, GRID, GRID, GRID - 1, ENTRANCE_COL); 
mazeGrid[GRID - 1][ENTRANCE_COL].bottom = false; 
mazeGrid[0][EXIT_COL].top = false;               

function cellCenter(r, c) {
    return {
        x: -HALF + CELL / 2 + c * CELL,
        z: -HALF + CELL / 2 + r * CELL
    };
}

var wallSegments = [];

(function buildWallSegments() {
    for (var r = 0; r < GRID; r++) {
        for (var c = 0; c < GRID; c++) {
            var cell = mazeGrid[r][c];
            var center = cellCenter(r, c);

            if (r === 0 && cell.top) {
                wallSegments.push({ orientation: "h", x: center.x, z: center.z - CELL / 2, length: CELL, isGate: false });
            }
            if (cell.bottom) {
                wallSegments.push({ orientation: "h", x: center.x, z: center.z + CELL / 2, length: CELL, isGate: false });
            }
            if (c === 0 && cell.left) {
                wallSegments.push({ orientation: "v", x: center.x - CELL / 2, z: center.z, length: CELL, isGate: false });
            }
            if (cell.right) {
                wallSegments.push({ orientation: "v", x: center.x + CELL / 2, z: center.z, length: CELL, isGate: false });
            }
        }
    }

    var exitCenter = cellCenter(0, EXIT_COL);
    doorWallIndex = wallSegments.length;
    wallSegments.push({
        orientation: "h",
        x: exitCenter.x,
        z: exitCenter.z - CELL / 2,
        length: CELL - 40,
        isGate: true
    });
})();

// ==========================================================
// 4. ITEMS, MOSS & LIEPĀJA ARTWORK DATABASE
// ==========================================================
function allCells() {
    var list = [];
    for (var r = 0; r < GRID; r++)
        for (var c = 0; c < GRID; c++)
            if (!(r === GRID - 1 && c === ENTRANCE_COL) && !(r === 0 && c === EXIT_COL)) list.push({ r: r, c: c });
    return shuffle(list);
}

var pool = allCells();
var coins = [];
var keys = [];
var pictures = [];
var statues = [];

(function placePickups() {
    var idx = 0;
    for (var i = 0; i < targetCoins && idx < pool.length; i++, idx++) {
        var p = cellCenter(pool[idx].r, pool[idx].c);
        coins.push([p.x, 20, p.z, 0, 0, 0, 46, 46, "img/coin.png"]);
    }
    for (var j = 0; j < targetKeys && idx < pool.length; j++, idx++) {
        var p2 = cellCenter(pool[idx].r, pool[idx].c);
        keys.push([p2.x, 20, p2.z, 0, 0, 0, 50, 50, "img/key.png"]);
    }
    for (var k = 0; k < 4 && idx < pool.length; k++, idx++) {
        var p3 = cellCenter(pool[idx].r, pool[idx].c);
        pictures.push([p3.x, 20, p3.z, 0, 0, 0, 55, 55, "img/star.png"]);
    }
    for (var s = 0; s < 5 && idx < pool.length; s++, idx++) {
        var p4 = cellCenter(pool[idx].r, pool[idx].c);
        statues.push([p4.x, 0, p4.z, 0, Math.random() * 360, 0, 200, 220, "img/mamoor.png", 40]);
    }
})();

var galleryPaintings = (function pickPaintingWalls() {
    var candidates = wallSegments.filter(function (w) { return !w.isGate; });
    shuffle(candidates);
    var arts = [];
    var textures = ["img/1.jpeg", "img/2.jpeg", "img/3.jpg", "img/4.jpg", "img/5.jpeg", "img/6.jpeg"];
    for (var i = 0; i < 6 && i < candidates.length; i++) {
        var w = candidates[i];
        if (w.orientation === "h") {
            arts.push([w.x, 0, w.z, 0, 0, 0, 110, 90, textures[i % textures.length]]);
        } else {
            arts.push([w.x, 0, w.z, 0, 90, 0, 110, 90, textures[i % textures.length]]);
        }
    }
    return arts;
})();

// LIEPĀJA THEMED DATABASE (Multilingual support inside object)
var liepajaDatabase = [
    {
        title: { en: "Liepāja Beach", hy: "Լիպայայի լողափ", lv: "Liepājas pludmale" },
        author: { en: "Baltic Coast", hy: "Բալթյան ափ", lv: "Baltijas piekraste" },
        desc: { 
            en: "Famous for its exceptionally white, fine sand and magnificent sunsets over the Baltic Sea.",
            hy: "Հայտնի է իր բացառիկ սպիտակ, մանր ավազով և Բալթյան ծովի վրա բացվող հոյակապ մայրամուտներով:",
            lv: "Slavenā ar savu īpaši balto, smalko smilti un krāšņajiem saulrietiem virs Baltijas jūras."
        },
        question: { 
            en: "What is Liepāja Beach famous for?",
            hy: "Ի՞նչով է հայտնի Լիպայայի լողափը:",
            lv: "Ar ko slavenā Liepājas pludmale?"
        },
        options: {
            en: ["Black volcanic sand", "White fine sand", "Rocky shores", "Red clay"],
            hy: ["Սև հրաբխային ավազ", "Սպիտակ մանր ավազ", "Ժայռոտ ափեր", "Կարմիր կավ"],
            lv: ["Melnas vulkāniskās smiltis", "Balta, smalka smilts", "Akmens krasti", "Sarkanais māls"]
        },
        answer: 1
    },
    {
        title: { en: "Karosta Prison", hy: "Կարոստայի բանտ", lv: "Karostas cietums" },
        author: { en: "Military History", hy: "Ռազմական պատմություն", lv: "Militārā vēsture" },
        desc: { 
            en: "A historic tsarist and Soviet naval prison that now operates as a unique museum and hotel.",
            hy: "Ցարական և խորհրդային ռազմածովային հնագույն բանտ, որն այսօր գործում է որպես թանգարան և հյուրանոց:",
            lv: "Vēsturisks cariskais un padomju flotes cietums, kas tagad darbojas kā unikāls muzejs un viesnīca."
        },
        question: { 
            en: "What is Karosta Prison used for today?",
            hy: "Ի՞նչ նպատակով է այսօր օգտագործվում Կարոստայի բանտը:",
            lv: "Kam šodien izmanto Karostas cietumu?"
        },
        options: {
            en: ["A military base", "A museum and hotel", "A shopping mall", "A residential building"],
            hy: ["Ռազմական բազա", "Թանգարան և հյուրանոց", "Առևտրի կենտրոն", "Բնակելի շենք"],
            lv: ["Militārā bāze", "Muzejs un viesnīca", "Tirdzniecības centrs", "Dzīvojamā ēka"]
        },
        answer: 1
    },
    {
        title: { en: "Dzintars Concert Garden", hy: "Ձինտարս համերգային այգի", lv: "Dzintara koncertdārzs" },
        author: { en: "Music & Culture", hy: "Երաժշտություն և մշակույթ", lv: "Mūzika un kultūra" },
        desc: { 
            en: "A historic open-air stage in Liepāja where cultural events and concerts take place.",
            hy: "Լիպայայի պատմական բացօթյա բեմահարթակ, որտեղ անցկացվում են մշակութային միջոցառումներ և համերգներ:",
            lv: "Vēsturiska brīvdabas skatuve Liepājā, kur notiek kultūras pasākumi un koncerti."
        },
        question: { 
            en: "What type of venue is Dzintars Concert Garden?",
            hy: "Ինչպիսի՞ համալիր է Ձինտարս համերգային այգին:",
            lv: "Kāda veida pasākumu vieta ir Dzintara koncertdārzs?"
        },
        options: {
            en: ["An open-air concert stage", "An indoor theater", "A sports stadium", "A cinema"],
            hy: ["Բացօթյա համերգային բեմ", "Փակ թատրոն", "Մարզադաշտ", "Կինոթատրոն"],
            lv: ["Brīvdabas koncertskatuve", "Slēgts teātris", "Sporta stadions", "Kino"]
        },
        answer: 0
    },
    {
        title: { en: "Liepāja Northern Forts", hy: "Լիպայայի հյուսիսային ամրոցներ", lv: "Liepājas Ziemeļu forti" },
        author: { en: "Coastal Defenses", hy: "Ափամերձ պաշտպանություն", lv: "Piekrastes aizsardzība" },
        desc: { 
            en: "Abandoned tsarist military fortifications crumbling dramatically into the stormy sea.",
            hy: "Լքված ցարական ռազմական ամրություններ, որոնք դրամատիկ կերպով փլուզվում են դեպի ալեկոծ ծովը:",
            lv: "Pamestas cariskā laika militārās fortifikācijas, kas dramatiski sabrūk vētrainajā jūrā."
        },
        question: { 
            en: "Where are the Northern Forts located?",
            hy: "Որտե՞ղ են գտնվում Հյուսիսային ամրոցները:",
            lv: "Kur atrodas Ziemeļu forti?"
        },
        options: {
            en: ["In the city center", "On the Baltic coast", "Inside a dense forest", "On a mountain peak"],
            hy: ["Քաղաքի կենտրոնում", "Բալթյան ափին", "Խիտ անտառում", "Լեռան գագաթին"],
            lv: ["Pilsētas centrā", "Baltijas jūras krastā", "Biezā mežā", "Kalna virsotnē"]
        },
        answer: 1
    },
    {
        title: { en: "The Ghost Tree", hy: "Ուրվականների ծառ", lv: "Spoku koks" },
        author: { en: "Rock Monument", hy: "Ռոք հուշարձան", lv: "Roka piemeklis" },
        desc: { 
            en: "A bronze monument created to honor Latvian rock music legends, featuring silhouettes of musicians.",
            hy: "Բրոնզե հուշարձան՝ նվիրված լատվիական ռոք երաժշտության լեգենդներին, որտեղ պատկերված են երաժիշտների ուրվագծերը:",
            lv: "Bronzas piemeklis, kas veltīts latviešu rokmūzikas leģendām, ar mūziķu siluetiem."
        },
        question: { 
            en: "What does the Ghost Tree monument honor?",
            hy: "Ինչի՞ն է նվիրված «Ուրվականների ծառ» հուշարձանը:",
            lv: "Kam ir veltīts piemeklis 'Spoku koks'?"
        },
        options: {
            en: ["Latvian rock music legends", "Famous sailors", "Local poets", "Historical soldiers"],
            hy: ["Լատվիական ռոք երաժշտության լեգենդներին", "Հայտնի նավաստիներին", "Տեղացի բանաստեղծներին", "Պատմական զինվորներին"],
            lv: ["Latviešu rokmūzikas leģendām", "Slaveniem jūrniekiem", "Vietējiem dzejniekiem", "Vēsturiskiem karavīriem"]
        },
        answer: 0
    },
    {
        title: { en: "Liepāja Swan Pond", hy: "Լիպայայի կարապների լճակ", lv: "Liepājas gulbju dīķis" },
        author: { en: "City Park", hy: "Քաղաքային այգի", lv: "Pilsētas parks" },
        desc: { 
            en: "A serene park pond known as the home of graceful white swans throughout the seasons.",
            hy: "Հանդարտ քաղաքային լճակ, որը հայտնի է որպես շքեղ սպիտակ կարապների բնակավայր:",
            lv: "Mierīgs pilsētas dīķis, kas pazīstams kā graciozo balto gulbju mājvieta visos gadalaikos."
        },
        question: { 
            en: "Which birds populate the Liepāja Swan Pond?",
            hy: "Ի՞նչ թռչուններ են բնակվում Լիպայայի կարապների լճակում:",
            lv: "Kādi putni apdzīvo Liepājas gulbju dīķi?"
        },
        options: {
            en: ["Wild ducks", "White swans", "Pigeons", "Eagles"],
            hy: ["Վայրի բադեր", "Սպիտակ կարապներ", "Աղավնիներ", "Արծիվներ"],
            lv: ["Savvaļas pīles", "Baltie gulbji", "Baloži", "Ērgļi"]
        },
        answer: 1
    },
    {
        title: { en: "Holy Trinity Cathedral", hy: "Սուրբ Երրորդության տաճար", lv: "Svētās Trīsvienības katedrāle" },
        author: { en: "Historic Organ", hy: "Պատմական երգեհոն", lv: "Vēsturiskās ērģeles" },
        desc: { 
            en: "Home to one of the world's largest mechanical organ instruments untouched by major alterations.",
            hy: "Աշխարհի խոշորագույն մեխանիկական երգեհոններից մեկի տունն է՝ առանց հիմնական փոփոխությունների:",
            lv: "Mājvieta vienām no pasaulē lielākajām mehāniskajām ērģelēm, kas saglabājušas savu oriģinālo izskatu."
        },
        question: { 
            en: "What is special about the Cathedral in Liepāja?",
            hy: "Ի՞նչն է հատուկ Լիպայայի այս տաճարում:",
            lv: "Kas ir īpašs šajā Liepājas katedrālē?"
        },
        options: {
            en: ["It has a massive mechanical organ", "It was built underwater", "It is made of pure gold", "It has no roof"],
            hy: ["Այն ունի հսկայական մեխանիկական երգեհոն", "Կառուցված է ջրի տակ", "Պատրաստված է զուտ ոսկուց", "Չունի տանիք"],
            lv: ["Tajā ir milzīgas mehāniskās ērģeles", "Tā uzcelta zem ūdens", "Tā ir no tīra zelta", "Tai nav jumta"]
        },
        answer: 0
    },
    {
        title: { en: "Liepāja Museum", hy: "Լիպայայի թանգարան", lv: "Liepājas muzejs" },
        author: { en: "Art & Heritage", hy: "Արվեստ և ժառանգություն", lv: "Māksla un mantojums" },
        desc: { 
            en: "A major regional cultural institution showcasing rich Kurzeme art, history, and ethnography.",
            hy: "Կურզեմեի հարուստ արվեստը, պատմությունն ու ազգագրությունը ներկայացնող խոշոր տարածաշրջանային մշակութային հաստատություն:",
            lv: "Nozīmīga reģionālā kultūras iestāde, kas demonstrē bagātīgu Kurzemes mākslu, vēsturi un etnogrāfiju."
        },
        question: { 
            en: "Which region's culture does the Liepāja Museum primarily showcase?",
            hy: "Ո՞ր մշակույթն է հիմնականում ցուցադրվում Լիպայայի թանգարանում:",
            lv: "Kura reģiona kultūru galvenokārt demonstrē Liepājas muzejs?"
        },
        options: {
            en: ["Kurzeme region", "Vidzeme region", "Latgale region", "Zemgale region"],
            hy: ["Կուրզեմե մարզի", "Վիդզեմե մարզի", "Լատգալե մարզի", "Զեմգալե մարզի"],
            lv: ["Kurzemes reģiona", "Vidzemes reģiona", "Latgales reģiona", "Zemgales reģiona"]
        },
        answer: 0
    },
    {
        title: { en: "Liepāja Theatre", hy: "Լիպայայի թատրոն", lv: "Liepājas teātris" },
        author: { en: "Dramatic Arts", hy: "Դրամատիկական արվեստ", lv: "Dramatiskā māksla" },
        desc: { 
            en: "The oldest professional Latvian theatre venue, operating since the late 19th century.",
            hy: "Լատվիայի ամենահին պրոֆեսիոնալ թատրոնը, որը գործում է 19-րդ դարի վերջից:",
            lv: "Vecākais profesionālais latviešu teātris, kas darbojas kopš 19. gadsimta beigām."
        },
        question: { 
            en: "What makes Liepāja Theatre unique in Latvia?",
            hy: "Ինչո՞վ է Լիպայայի թատրոնը եզակի Լատվիայում:",
            lv: "Ar ko Liepājas teātris ir unikāls Latvijā?"
        },
        options: {
            en: ["It is the oldest professional Latvian theatre", "It is built on a ship", "It performs only in English", "It opens only in winter"],
            hy: ["Այն Լատվիայի ամենահին պրոֆեսիոնալ թատրոնն է", "Կառուցված է նավի վրա", "Խաղում են միայն անգլերեն", "Բացվում է միայն ձմռանը"],
            lv: ["Tas ir vecākais profesionālais latviešu teātris", "Tas uzbūvēts uz kuģa", "Izrādes notiek tikai angliski", "Tas atvērts tikai ziemā"]
        },
        answer: 0
    },
    {
        title: { en: "Liepāja Port and Lighthouse", hy: "Լիպայայի նավահանգիստ և փարոս", lv: "Liepājas ostas bāka" },
        author: { en: "Naval Gate", hy: "Ծովային դարպաս", lv: "Jūras vārti" },
        desc: { 
            en: "A vital maritime passage and historic red lighthouse guiding ships safely into the harbor.",
            hy: "Կարևոր ծովային անցում և պատմական կարմիր փարոս, որն անվտանգ ուղղորդում է նավերը դեպի նավահանգիստ:",
            lv: "Nozīmīga jūras satiksmes līnija un vēsturiska sarkana bāka, kas droši vada kuģus ostā."
        },
        question: { 
            en: "What color is the historic Liepāja lighthouse?",
            hy: "Ի՞նչ գույն ունի Լիպայայի պատմական փարոսը:",
            lv: "Kādā krāsā ir vēsturiskā Liepājas bāka?"
        },
        options: {
            en: ["Red", "Blue", "Yellow", "Green"],
            hy: ["Կարմիր", "Կապույտ", "Դեղին", "Կանաչ"],
            lv: ["Sarkana", "Zila", "Dzeltena", "Zaļa"]
        },
        answer: 0
    }
];

var discoveredArtworks = {};
var currentQuizQuestionIndex = 0;
var userQuizScore = 0;

function showArtInfoModal(artIndex) {
    var art = liepajaDatabase[artIndex];
    discoveredArtworks[artIndex] = art;

    var modal = document.getElementById("artInfoModal");
    var t = translations[currentLang];

    modal.innerHTML = 
        '<div class="quiz-card">' +
            '<h2 class="quiz-heading">' + t.boardHeading + '</h2>' +
            '<h3 class="art-title">' + art.title[currentLang] + '</h3>' +
            '<p class="art-author">' + art.author[currentLang] + '</p>' +
            '<p class="art-desc">' + art.desc[currentLang] + '</p>' +
            '<button class="victory-btn" onclick="closeArtModal()">' + t.btnContinue + '</button>' +
        '</div>';
    modal.style.display = "flex";
    document.exitPointerLock();
}

window.closeArtModal = function() {
    var modal = document.getElementById("artInfoModal");
    modal.style.display = "none";
    container.requestPointerLock();
};

function triggerVictorySequence() {
    gameWon = true;
    document.exitPointerLock();
    startFinalQuiz();
}

function startFinalQuiz() {
    currentQuizQuestionIndex = 0;
    userQuizScore = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    if (currentQuizQuestionIndex >= 10) {
        showFinalResultsScreen();
        return;
    }

    var qData = liepajaDatabase[currentQuizQuestionIndex];
    var modal = document.getElementById("quizModal");
    var t = translations[currentLang];

    var optionsHtml = "";
    var opts = qData.options[currentLang];
    for (var i = 0; i < opts.length; i++) {
        optionsHtml += '<button class="quiz-option-btn" onclick="submitQuizAnswer(' + i + ', ' + qData.answer + ')">' + opts[i] + '</button>';
    }

    modal.innerHTML = 
        '<div class="quiz-card">' +
            '<h2 class="quiz-heading">' + t.quizHeading + ' (' + (currentQuizQuestionIndex + 1) + '/10)</h2>' +
            '<p class="quiz-question-text">' + qData.question[currentLang] + '</p>' +
            '<div class="quiz-options-container">' + optionsHtml + '</div>' +
        '</div>';
    modal.style.display = "flex";
}

window.submitQuizAnswer = function(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        userQuizScore++;
    }
    currentQuizQuestionIndex++;
    renderQuizQuestion();
};

function showFinalResultsScreen() {
    var modal = document.getElementById("quizModal");
    var t = translations[currentLang];

    modal.innerHTML = 
        '<div class="quiz-card victory-panel">' +
            '<h1 class="victory-title">' + t.victoryTitle + '</h1>' +
            '<p class="victory-text">Score / Արդյունք: <strong>' + userQuizScore + ' / 10</strong></p>' +
            '<hr class="victory-divider">' +
            '<h3 class="victory-subtitle">' + t.victorySub + '</h3>' +
            '<div class="social-links-box">' +
                '<p>' + t.socialText + '</p>' +
                '<a href="https://www.instagram.com/mkrtchyan.luiza?igsh=MWZyZjU4enViM3FnOA%3D%3D&utm_source=qr" target="_blank" class="social-link">Instagram</a> | ' +
                '<a href="https://linkedin.com" target="_blank" class="social-link">LinkedIn</a>' +
            '</div><br>' +
            '<button class="victory-btn" onclick="window.location.reload()">' + t.playAgain + '</button>' +
        '</div>';
}

// ==========================================================
// 5. RENDERING & GAMEPLAY
// ==========================================================
function wallToSquareData(w) {
    if (w.orientation === "h") {
        return [w.x, 0, w.z, 0, 0, 0, w.length, WALL_H, w.isGate ? "img/door.webp" : "img/pattern.jpg"];
    } else {
        return [w.x, 0, w.z, 0, 90, 0, w.length, WALL_H, w.isGate ? "img/door.webp" : "img/pattern.jpg"];
    }
}

function CreateSquares(squares, string, isArt) {
    isArt = isArt || false;
    for (var i = 0; i < squares.length; i++) {
        var newElement = document.createElement("div");
        newElement.className = "square";
        newElement.id = string + i;

        newElement.style.width = squares[i][6] + "px";
        newElement.style.height = squares[i][7] + "px";

        if (squares[i][8].startsWith("#") || squares[i][8].startsWith("rgb")) {
            newElement.style.backgroundColor = squares[i][8];
        } else {
            newElement.style.backgroundImage = "url(" + squares[i][8] + ")";
        }

        if (isArt) {
            newElement.classList.add("art-frame");
        } else if (string === "wall") {
            newElement.classList.add("wall-face");
        }

        newElement.style.transform = "translate3d(" +
            (600 - squares[i][6] / 2 + squares[i][0]) + "px," +
            (400 - squares[i][7] / 2 + squares[i][1]) + "px," +
            squares[i][2] + "px) " +
            "rotateX(" + squares[i][3] + "deg) " +
            "rotateY(" + squares[i][4] + "deg) " +
            "rotateZ(" + squares[i][5] + "deg)";

        world.appendChild(newElement);

        if (string === "wall") {
            var backElement = document.createElement("div");
            backElement.className = "square wall-face wall-back";
            backElement.style.width = squares[i][6] + "px";
            backElement.style.height = squares[i][7] + "px";
            backElement.style.backgroundImage = "url(" + squares[i][8] + ")";

            var offsetZ = squares[i][2] - 12;
            backElement.style.transform = "translate3d(" +
                (600 - squares[i][6] / 2 + squares[i][0]) + "px," +
                (400 - squares[i][7] / 2 + squares[i][1]) + "px," +
                offsetZ + "px) " +
                "rotateX(" + squares[i][3] + "deg) " +
                "rotateY(" + (squares[i][4] + 180) + "deg) " +
                "rotateZ(" + squares[i][5] + "deg)";
            world.appendChild(backElement);
        }
    }
}

function interactItem(squares, string, SquareSound, type) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i][0] > 50000) continue;
        var dis = ((squares[i][0] - pawn.x) ** 2 + (squares[i][1] - pawn.y) ** 2 + (squares[i][2] - pawn.z) ** 2);
        var is = 70 ** 2;
        if (dis < is) {
            SquareSound.currentTime = 0;
            SquareSound.play().catch(function () {});
            var element = document.getElementById(string + i);
            if (element) element.style.display = "none";
            squares[i][0] = 100000;

            if (type === "coin") {
                totalCoinsCollected++;
                coinCountEl.innerText = totalCoinsCollected;
            }
            if (type === "key") {
                totalKeysCollected++;
                keyCountEl.innerText = totalKeysCollected;
            }
            if (type === "star") {
                showArtInfoModal(i % liepajaDatabase.length);
            }
        }
    }
}

function rotate(squares, string, ra) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i][0] > 50000) continue;
        squares[i][4] = squares[i][4] + ra;
        var element = document.getElementById(string + i);
        if (element) {
            element.style.transform = "translate3d(" +
                (600 - squares[i][6] / 2 + squares[i][0]) + "px," +
                (400 - squares[i][7] / 2 + squares[i][1]) + "px," +
                squares[i][2] + "px) " +
                "rotateX(" + squares[i][3] + "deg) " +
                "rotateY(" + squares[i][4] + "deg) " +
                "rotateZ(" + squares[i][5] + "deg)";
        }
    }
}

var floorCeil = [
    [0, 150, 0, 90, 0, 0, GRID * CELL + 200, GRID * CELL + 200, "img/hatak1.jpg"],
    [0, -150, 0, 90, 0, 0, GRID * CELL + 200, GRID * CELL + 200, "#120a06"]
];

var mazeWallSquares = wallSegments.map(wallToSquareData);

CreateSquares(floorCeil, "floor");
CreateSquares(mazeWallSquares, "wall");
CreateSquares(galleryPaintings, "art", true);
CreateSquares(statues, "mamoor");
CreateSquares(coins, "coin");
CreateSquares(keys, "key");
CreateSquares(pictures, "pics");

// ==========================================================
// 6. EVENT LISTENERS & LOOP
// ==========================================================
button1.onclick = function () {
    buttonSound.play().catch(function () {});
    menu1.style.display = "none";
    document.getElementById("langSelector").style.display = "none";
    hud.style.display = "flex";
    if (minimapCanvas) minimapCanvas.style.display = "block";
    gameStarted = true;
    container.requestPointerLock();
};

button2.onclick = function () {
    buttonSound.play().catch(function () {});
    menu1.style.display = "none";
    menu2.style.display = "flex";
};

button3.onclick = function () {
    buttonSound.play().catch(function () {});
    menu2.style.display = "none";
    menu1.style.display = "flex";
};

container.onclick = function () {
    if (gameStarted && !gameWon) container.requestPointerLock();
};

document.addEventListener("pointerlockchange", function () {
    lock = (document.pointerLockElement === container);
});

document.addEventListener("mousemove", function (event) {
    if (lock) {
        MouseX = event.movementX;
        MouseY = event.movementY;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 87 || event.keyCode == 38) PressForward = 1;
    if (event.keyCode == 83 || event.keyCode == 40) PressBack = 1;
    if (event.keyCode == 68 || event.keyCode == 39) PressRight = 1;
    if (event.keyCode == 65 || event.keyCode == 37) PressLeft = 1;
    if (event.keyCode == 32) PressUp = 1;

    if (event.keyCode == 82) { 
        pawn.x = spawnX; pawn.y = 0; pawn.z = spawnZ; pawn.ry = 180; pawn.rx = 0;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 87 || event.keyCode == 38) PressForward = 0;
    if (event.keyCode == 83 || event.keyCode == 40) PressBack = 0;
    if (event.keyCode == 68 || event.keyCode == 39) PressRight = 0;
    if (event.keyCode == 65 || event.keyCode == 37) PressLeft = 0;
    if (event.keyCode == 32) PressUp = 0;
});

function resolveCollisions(px, pz) {
    for (var pass = 0; pass < 2; pass++) {
        for (var i = 0; i < collisionRects.length; i++) {
            var r = collisionRects[i];
            if (r.isGate && doorYOffset >= WALL_H) continue; 
            var closestX = Math.max(r.x1, Math.min(px, r.x2));
            var closestZ = Math.max(r.z1, Math.min(pz, r.z2));
            var dx = px - closestX;
            var dz = pz - closestZ;
            var distSq = dx * dx + dz * dz;
            if (distSq < PLAYER_RADIUS * PLAYER_RADIUS) {
                var dist = Math.sqrt(distSq) || 0.0001;
                var overlap = PLAYER_RADIUS - dist;
                px += (dx / dist) * overlap;
                pz += (dz / dist) * overlap;
            }
        }
    }
    return { x: px, z: pz };
}

var collisionRects = wallSegments.map(function (w, i) {
    if (w.orientation === "h") {
        return { x1: w.x - w.length / 2, x2: w.x + w.length / 2, z1: w.z - WALL_THICK / 2, z2: w.z + WALL_THICK / 2, isGate: w.isGate, idx: i };
    } else {
        return { x1: w.x - WALL_THICK / 2, x2: w.x + WALL_THICK / 2, z1: w.z - w.length / 2, z2: w.z + w.length / 2, isGate: w.isGate, idx: i };
    }
});

function update() {
    if (!gameStarted || gameWon) return;

    var dx = (PressRight - PressLeft) * Math.cos(pawn.ry * deg) - (PressForward - PressBack) * Math.sin(pawn.ry * deg);
    var dz = -(PressRight - PressLeft) * Math.sin(pawn.ry * deg) - (PressForward - PressBack) * Math.cos(pawn.ry * deg);
    var dy = -PressUp * 2.2;

    var nextX = pawn.x + dx * speed;
    var nextZ = pawn.z + dz * speed;

    var resolved = resolveCollisions(nextX, nextZ);
    pawn.x = resolved.x;
    pawn.z = resolved.z;
    pawn.y += dy * speed;
    pawn.y = Math.max(-40, Math.min(0, pawn.y));

    if (lock) {
        pawn.rx += MouseY * 0.12;
        pawn.ry -= MouseX * 0.12;
        pawn.rx = Math.max(-45, Math.min(45, pawn.rx));
    }

    MouseX = 0; MouseY = 0;

    processDoorMechanics();

    world.style.transform =
        "translateZ(600px) " +
        "rotateX(" + (-pawn.rx) + "deg) " +
        "rotateY(" + (-pawn.ry) + "deg) " +
        "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";

    drawMinimap();
}

function processDoorMechanics() {
    var gate = wallSegments[doorWallIndex];
    var doorEl = document.getElementById("wall" + doorWallIndex);
    var nearGate = Math.abs(pawn.x - gate.x) < CELL && Math.abs(pawn.z - gate.z) < CELL;

    if (nearGate && totalCoinsCollected >= targetCoins && totalKeysCollected >= targetKeys) {
        if (!doorOpened) {
            doorOpened = true;
            doorSound.play().catch(function () {});
        }
    }

    if (doorOpened && doorYOffset < WALL_H) {
        doorYOffset += 3;
        if (doorEl) {
            doorEl.style.transform = "translate3d(" +
                (600 - gate.length / 2 + gate.x) + "px," +
                (400 - WALL_H / 2 + doorYOffset) + "px," +
                gate.z + "px) rotateY(0deg)";
        }
    } else if (doorOpened && doorYOffset >= WALL_H && !gameWon) {
        var pastGate = pawn.z < gate.z - 60;
        if (pastGate) triggerVictorySequence();
    }
}

function drawMinimap() {
    if (!minimapCtx) return;
    var size = minimapCanvas.width;
    minimapCtx.clearRect(0, 0, size, size);
    minimapCtx.fillStyle = "rgba(10,6,4,0.85)";
    minimapCtx.fillRect(0, 0, size, size);

    var scale = size / (GRID * CELL);
    minimapCtx.strokeStyle = "#b58d3d";
    minimapCtx.lineWidth = 2;

    minimapCtx.beginPath();
    for (var i = 0; i < wallSegments.length; i++) {
        var w = wallSegments[i];
        if (w.isGate && doorYOffset >= WALL_H) continue;
        var mx = (w.x + HALF) * scale;
        var mz = (w.z + HALF) * scale;
        var half = (w.length / 2) * scale;
        if (w.orientation === "h") {
            minimapCtx.moveTo(mx - half, mz);
            minimapCtx.lineTo(mx + half, mz);
        } else {
            minimapCtx.moveTo(mx, mz - half);
            minimapCtx.lineTo(mx, mz + half);
        }
    }
    minimapCtx.stroke();

    var px = (pawn.x + HALF) * scale;
    var pz = (pawn.z + HALF) * scale;
    var heading = -pawn.ry * deg;

    minimapCtx.save();
    minimapCtx.translate(px, pz);
    minimapCtx.rotate(heading);
    minimapCtx.fillStyle = "#ffb703";
    minimapCtx.beginPath();
    minimapCtx.moveTo(0, -7);
    minimapCtx.lineTo(5, 6);
    minimapCtx.lineTo(-5, 6);
    minimapCtx.closePath();
    minimapCtx.fill();
    minimapCtx.restore();
}

function repeatForever() {
    update();
    if (gameStarted && !gameWon) {
        interactItem(coins, "coin", coinSound, "coin");
        interactItem(keys, "key", keySound, "key");
        interactItem(pictures, "pics", keySound, "star");
        rotate(coins, "coin", 2.0);
        rotate(keys, "key", 2.0);
        rotate(pictures, "pics", 2.0);
    }
}

setInterval(repeatForever, 16);