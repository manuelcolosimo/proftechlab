/* Prof Tech Lab · Lingua di aiuto (modalità bilingue)
   L'app resta in italiano; sotto le scritte principali compare la traduzione nella lingua scelta.
   Lingua salvata in localStorage "ptl-lingua". Traduzioni da far controllare a un madrelingua. */
(function () {
  const ORDINE = ["en", "es", "ar", "ro", "sq", "uk", "zh"];
  const LINGUE = {
    en: { nome: "English", it: "inglese" }, es: { nome: "Español", it: "spagnolo" }, ar: { nome: "العربية", it: "arabo", rtl: true },
    ro: { nome: "Română", it: "romeno" }, sq: { nome: "Shqip", it: "albanese" }, uk: { nome: "Українська", it: "ucraino" }, zh: { nome: "中文", it: "cinese" }
  };
  /* "testo italiano": [en, es, ar, ro, sq, uk, zh] — {n} = numero, {x} = parola */
  const D = {
    // ---- Home e accesso
    "le app della nostra scuola": ["our school's apps", "las apps de nuestra escuela", "تطبيقات مدرستنا", "aplicațiile școlii noastre", "aplikacionet e shkollës sonë", "застосунки нашої школи", "我们学校的应用"],
    "Scegli il tuo grado di scuola, poi apri il quaderno della materia": ["Choose your school level, then open the subject notebook", "Elige tu nivel escolar y abre el cuaderno de la asignatura", "اختر مرحلتك الدراسية، ثم افتح دفتر المادة", "Alege nivelul școlar, apoi deschide caietul materiei", "Zgjidh nivelin e shkollës, pastaj hap fletoren e lëndës", "Обери свій рівень школи, потім відкрий зошит предмета", "选择你的学段，然后打开科目的笔记本"],
    "Accessibilità": ["Accessibility", "Accesibilidad", "سهولة الاستخدام", "Accesibilitate", "Aksesueshmëria", "Доступність", "无障碍"],
    "Benvenuto in Prof Tech Lab!": ["Welcome to Prof Tech Lab!", "¡Bienvenido a Prof Tech Lab!", "مرحبًا بك في Prof Tech Lab!", "Bine ai venit în Prof Tech Lab!", "Mirë se vjen në Prof Tech Lab!", "Ласкаво просимо до Prof Tech Lab!", "欢迎来到 Prof Tech Lab！"],
    "Chi sei?": ["Who are you?", "¿Quién eres?", "من أنت؟", "Cine ești?", "Kush je?", "Хто ти?", "你是谁？"],
    "Sono uno studente": ["I am a student", "Soy estudiante", "أنا طالب", "Sunt elev", "Jam nxënës", "Я учень", "我是学生"],
    "Le app si aprono con il codice che ti dà il docente": ["The apps open with the code your teacher gives you", "Las apps se abren con el código que te da el profesor", "تُفتح التطبيقات بالرمز الذي يعطيك إياه المعلّم", "Aplicațiile se deschid cu codul pe care ți-l dă profesorul", "Aplikacionet hapen me kodin që të jep mësuesi", "Застосунки відкриваються кодом, який дає вчитель", "用老师给你的密码打开应用"],
    "Sono un docente": ["I am a teacher", "Soy docente", "أنا معلّم", "Sunt profesor", "Jam mësues", "Я вчитель", "我是老师"],
    "Serve la password dei docenti": ["Teacher password required", "Se necesita la contraseña de los docentes", "يلزم كلمة مرور المعلّمين", "Este nevoie de parola profesorilor", "Duhet fjalëkalimi i mësuesve", "Потрібен пароль учителів", "需要教师密码"],
    "Indietro": ["Back", "Atrás", "رجوع", "Înapoi", "Mbrapa", "Назад", "返回"],
    "Entra": ["Enter", "Entrar", "دخول", "Intră", "Hyr", "Увійти", "进入"],
    "Scrivi il codice che ti ha dato il docente": ["Type the code your teacher gave you", "Escribe el código que te dio el profesor", "اكتب الرمز الذي أعطاك إياه المعلّم", "Scrie codul pe care ți l-a dat profesorul", "Shkruaj kodin që të dha mësuesi", "Напиши код, який тобі дав учитель", "输入老师给你的密码"],
    "Annulla": ["Cancel", "Cancelar", "إلغاء", "Anulează", "Anulo", "Скасувати", "取消"],
    "Sblocca": ["Unlock", "Desbloquear", "افتح القفل", "Deblochează", "Zhblloko", "Розблокувати", "解锁"],
    "Inserisci il codice": ["Enter the code", "Introduce el código", "أدخل الرمز", "Introdu codul", "Fut kodin", "Введи код", "输入密码"],
    "Apri il quaderno": ["Open the notebook", "Abre el cuaderno", "افتح الدفتر", "Deschide caietul", "Hap fletoren", "Відкрий зошит", "打开笔记本"],
    "Il codice ha 4 cifre": ["The code has 4 digits", "El código tiene 4 cifras", "الرمز مكوّن من 4 أرقام", "Codul are 4 cifre", "Kodi ka 4 shifra", "Код має 4 цифри", "密码是 4 位数字"],
    "Codice non valido. Controlla con il docente": ["Wrong code. Check with your teacher", "Código no válido. Pregunta al profesor", "رمز غير صحيح. تحقّق مع المعلّم", "Cod greșit. Verifică cu profesorul", "Kod i pavlefshëm. Pyet mësuesin", "Неправильний код. Перевір з учителем", "密码无效。请问老师"],
    "Studente · cambia": ["Student · change", "Estudiante · cambiar", "طالب · تغيير", "Elev · schimbă", "Nxënës · ndrysho", "Учень · змінити", "学生 · 更换"],
    "Tutte le classi": ["All classes", "Todas las clases", "كل الصفوف", "Toate clasele", "Të gjitha klasat", "Усі класи", "所有年级"],
    "Scuola primaria": ["Primary school", "Escuela primaria", "المدرسة الابتدائية", "Școala primară", "Shkolla fillore", "Початкова школа", "小学"],
    "Scuola media": ["Middle school", "Secundaria (ESO)", "المدرسة الإعدادية", "Gimnaziu", "Shkolla e mesme e ulët", "Середня школа", "初中"],
    "Sezione STEM": ["STEM section", "Sección STEM", "قسم العلوم والتكنولوجيا (STEM)", "Secțiunea STEM", "Seksioni STEM", "Розділ STEM", "STEM 区"],
    "Matematica": ["Mathematics", "Matemáticas", "الرياضيات", "Matematică", "Matematikë", "Математика", "数学"],
    "Italiano": ["Italian", "Italiano", "اللغة الإيطالية", "Limba italiană", "Italisht", "Італійська мова", "意大利语"],
    "Arte": ["Art", "Arte", "الفن", "Arte", "Art", "Мистецтво", "美术"],
    "Storia": ["History", "Historia", "التاريخ", "Istorie", "Histori", "Історія", "历史"],
    "Tecnologia": ["Technology", "Tecnología", "التكنولوجيا", "Tehnologie", "Teknologji", "Технології", "技术"],
    "Metodo di studio": ["Study skills", "Método de estudio", "طريقة الدراسة", "Metodă de studiu", "Metoda e studimit", "Як навчатися", "学习方法"],
    "Tutte le materie": ["All subjects", "Todas las asignaturas", "كل المواد", "Toate materiile", "Të gjitha lëndët", "Усі предмети", "所有科目"],
    "Tutte le app": ["All apps", "Todas las apps", "كل التطبيقات", "Toate aplicațiile", "Të gjitha aplikacionet", "Усі застосунки", "所有应用"],
    "Schermo intero": ["Full screen", "Pantalla completa", "ملء الشاشة", "Ecran complet", "Ekran i plotë", "Повний екран", "全屏"],
    "Carattere ad alta leggibilità": ["Easy-to-read font", "Letra de alta legibilidad", "خط سهل القراءة", "Font ușor de citit", "Shkronja të lexueshme lehtë", "Шрифт, що легко читати", "易读字体"],
    "Dimensione": ["Size", "Tamaño", "الحجم", "Mărime", "Madhësia", "Розмір", "大小"],
    "Più spazio tra le righe": ["More space between lines", "Más espacio entre líneas", "مسافة أكبر بين الأسطر", "Mai mult spațiu între rânduri", "Më shumë hapësirë mes rreshtave", "Більше місця між рядками", "加大行距"],
    "Contrasto alto": ["High contrast", "Alto contraste", "تباين عالٍ", "Contrast ridicat", "Kontrast i lartë", "Високий контраст", "高对比度"],
    "Riduci le animazioni": ["Reduce animations", "Reducir animaciones", "تقليل الحركات", "Redu animațiile", "Ul animacionet", "Менше анімацій", "减少动画"],
    "Righello di lettura": ["Reading ruler", "Regla de lectura", "مسطرة القراءة", "Riglă de citire", "Vizore leximi", "Лінійка для читання", "阅读标尺"],
    "Lettura ad alta voce": ["Read aloud", "Lectura en voz alta", "القراءة بصوت عالٍ", "Citire cu voce tare", "Lexim me zë", "Читання вголос", "朗读"],
    "Velocità della voce": ["Voice speed", "Velocidad de la voz", "سرعة الصوت", "Viteza vocii", "Shpejtësia e zërit", "Швидкість голосу", "语音速度"],
    "Ripristina": ["Reset", "Restablecer", "إعادة الضبط", "Resetează", "Rivendos", "Скинути", "重置"],
    "Fatto": ["Done", "Hecho", "تمّ", "Gata", "U krye", "Готово", "完成"],
    "Chiudi": ["Close", "Cerrar", "إغلاق", "Închide", "Mbyll", "Закрити", "关闭"],
    "Lingua di aiuto": ["Help language", "Idioma de ayuda", "لغة المساعدة", "Limba de ajutor", "Gjuha ndihmëse", "Мова-помічник", "辅助语言"],
    "Solo italiano": ["Italian only", "Solo italiano", "الإيطالية فقط", "Doar italiană", "Vetëm italisht", "Лише італійська", "仅意大利语"],
    "L'app resta in italiano: sotto ogni scritta compare la traduzione nella tua lingua. Così impari anche l'italiano": ["The app stays in Italian: under each label you see the translation in your language. This way you also learn Italian", "La app sigue en italiano: debajo de cada texto aparece la traducción en tu idioma. Así también aprendes italiano", "يبقى التطبيق بالإيطالية: تحت كل عبارة تظهر الترجمة بلغتك. هكذا تتعلّم الإيطالية أيضًا", "Aplicația rămâne în italiană: sub fiecare text apare traducerea în limba ta. Așa înveți și italiana", "Aplikacioni mbetet në italisht: poshtë çdo shkrimi shfaqet përkthimi në gjuhën tënde. Kështu mëson edhe italishten", "Застосунок залишається італійською: під кожним написом з'являється переклад твоєю мовою. Так ти вчиш і італійську", "应用保持意大利语：每段文字下面会出现你的语言的翻译。这样你也能学意大利语"],
    "Caccia alle parole chiave": ["Keyword hunt", "Caza de palabras clave", "البحث عن الكلمات المفتاحية", "Vânătoarea de cuvinte-cheie", "Gjueti fjalësh kyçe", "Полювання на ключові слова", "寻找关键词"],
    "Dal testo alla mappa": ["From text to map", "Del texto al mapa", "من النص إلى الخريطة", "De la text la hartă", "Nga teksti te harta", "Від тексту до карти", "从课文到导图"],
    "Ripasso furbo": ["Smart review", "Repaso inteligente", "مراجعة ذكية", "Recapitulare isteață", "Përsëritje e zgjuar", "Розумне повторення", "聪明复习"],
    // ---- Caccia alle parole chiave
    "Leggi un paragrafo alla volta e trova ciò che conta": ["Read one paragraph at a time and find what matters", "Lee un párrafo cada vez y encuentra lo importante", "اقرأ فقرة واحدة في كل مرة واعثر على المهم", "Citește câte un paragraf și găsește ce contează", "Lexo një paragraf në një herë dhe gjej atë që ka rëndësi", "Читай по одному абзацу й знаходь головне", "一次读一段，找出重要的内容"],
    "Testi": ["Texts", "Textos", "النصوص", "Texte", "Tekste", "Тексти", "课文"],
    "Lavora": ["Work", "Trabaja", "اعمل", "Lucrează", "Puno", "Працюй", "练习"],
    "Come si trovano": ["How to find them", "Cómo encontrarlas", "كيف تجدها", "Cum le găsești", "Si gjenden", "Як їх знайти", "怎么找"],
    "Scegli un testo. Lo leggerai un paragrafo alla volta e in ognuno sottolineerai poche parole: quelle che bastano per ricordare tutto": ["Choose a text. You will read it one paragraph at a time and underline a few words in each: the ones you need to remember everything", "Elige un texto. Lo leerás párrafo a párrafo y en cada uno subrayarás pocas palabras: las necesarias para recordarlo todo", "اختر نصًا. ستقرؤه فقرة فقرة، وفي كل فقرة ستضع خطًا تحت كلمات قليلة: تلك التي تكفي لتتذكّر كل شيء", "Alege un text. Îl vei citi paragraf cu paragraf și în fiecare vei sublinia câteva cuvinte: cele care ajung ca să-ți amintești tot", "Zgjidh një tekst. Do ta lexosh paragraf pas paragrafi dhe në secilin do të nënvizosh pak fjalë: ato që mjaftojnë për të kujtuar gjithçka", "Обери текст. Ти читатимеш його по абзацу й у кожному підкреслиш кілька слів: тих, яких досить, щоб усе запам'ятати", "选一篇课文。你会一段一段地读，每段只划几个词：足够让你记住全部内容的词"],
    "Usa un testo tuo: incollalo, carica un PDF o fai una foto": ["Use your own text: paste it, upload a PDF or take a photo", "Usa tu propio texto: pégalo, sube un PDF o haz una foto", "استخدم نصّك: الصقه أو حمّل ملف PDF أو التقط صورة", "Folosește un text al tău: lipește-l, încarcă un PDF sau fă o poză", "Përdor një tekst tëndin: ngjite, ngarko një PDF ose bëj një foto", "Використай свій текст: встав його, завантаж PDF або сфотографуй", "用你自己的课文：粘贴、上传 PDF 或拍照"],
    "Ho un codice dal docente": ["I have a code from the teacher", "Tengo un código del profesor", "لديّ رمز من المعلّم", "Am un cod de la profesor", "Kam një kod nga mësuesi", "У мене є код від учителя", "我有老师给的代码"],
    "Inizia": ["Start", "Empezar", "ابدأ", "Începe", "Fillo", "Почати", "开始"],
    "Continua": ["Continue", "Continuar", "تابع", "Continuă", "Vazhdo", "Продовжити", "继续"],
    "Scheda": ["Study sheet", "Ficha", "البطاقة", "Fișa", "Skeda", "Картка", "学习卡"],
    "con le parole del docente": ["with the teacher's words", "con las palabras del profesor", "مع كلمات المعلّم", "cu cuvintele profesorului", "me fjalët e mësuesit", "зі словами вчителя", "有老师的关键词"],
    "controllo da solo": ["self-check", "autocontrol", "تحقّق ذاتي", "verificare singur", "kontroll vetë", "самоперевірка", "自己检查"],
    "percorso": ["path", "recorrido", "المسار", "parcurs", "rruga", "маршрут", "学习路径"],
    "Il mio percorso": ["My path", "Mi recorrido", "مساري", "Parcursul meu", "Rruga ime", "Мій маршрут", "我的学习路径"],
    "Base": ["Basic", "Básico", "أساسي", "De bază", "Bazë", "Базовий", "基础"],
    "Medio": ["Medium", "Medio", "متوسط", "Mediu", "Mesatar", "Середній", "中级"],
    "Completo": ["Complete", "Completo", "كامل", "Complet", "I plotë", "Повний", "完整"],
    "Leggi": ["Read", "Lee", "اقرأ", "Citește", "Lexo", "Читай", "读"],
    "Sottolinea": ["Underline", "Subraya", "ضع خطًا تحت الكلمات", "Subliniază", "Nënvizo", "Підкреслюй", "划线"],
    "Controlla": ["Check", "Comprueba", "تحقّق", "Verifică", "Kontrollo", "Перевір", "检查"],
    "Sintesi e domanda": ["Summary and question", "Resumen y pregunta", "ملخّص وسؤال", "Rezumat și întrebare", "Përmbledhje dhe pyetje", "Підсумок і запитання", "概括和提问"],
    "In poche parole": ["In a few words", "En pocas palabras", "بكلمات قليلة", "În câteva cuvinte", "Me pak fjalë", "Кількома словами", "用几句话"],
    "Leggi il paragrafo con calma, fino in fondo. Per ora non sottolineare": ["Read the paragraph calmly, to the end. Don't underline yet", "Lee el párrafo con calma, hasta el final. Todavía no subrayes", "اقرأ الفقرة بهدوء حتى النهاية. لا تضع خطوطًا الآن", "Citește paragraful liniștit, până la capăt. Deocamdată nu sublinia", "Lexoje paragrafin me qetësi, deri në fund. Për tani mos nënvizo", "Прочитай абзац спокійно до кінця. Поки що не підкреслюй", "慢慢把这一段读完。先不要划线"],
    "Tocca le parole chiave: al massimo {n}. Tocca di nuovo una parola per toglierla": ["Tap the keywords: {n} at most. Tap a word again to remove it", "Toca las palabras clave: como máximo {n}. Toca otra vez una palabra para quitarla", "المس الكلمات المفتاحية: {n} على الأكثر. المس الكلمة مرة أخرى لإزالتها", "Atinge cuvintele-cheie: cel mult {n}. Atinge din nou un cuvânt ca să-l scoți", "Prek fjalët kyçe: jo më shumë se {n}. Prek përsëri një fjalë për ta hequr", "Торкнися ключових слів: щонайбільше {n}. Торкнися слова ще раз, щоб прибрати його", "点选关键词：最多 {n} 个。再点一次可以取消"],
    "Ecco il confronto con le parole scelte dal docente": ["Here is the comparison with the words chosen by the teacher", "Aquí está la comparación con las palabras elegidas por el profesor", "هذه مقارنة مع الكلمات التي اختارها المعلّم", "Iată comparația cu cuvintele alese de profesor", "Ja krahasimi me fjalët e zgjedhura nga mësuesi", "Ось порівняння зі словами, які обрав учитель", "这是和老师选的词的对比"],
    "Controlla da solo con la prova del telegramma": ["Check by yourself with the telegram test", "Compruébalo tú solo con la prueba del telegrama", "تحقّق بنفسك باختبار البرقية", "Verifică singur cu proba telegramei", "Kontrollo vetë me provën e telegramit", "Перевір сам за допомогою «телеграми»", "用“电报测试”自己检查"],
    "Scrivi di che cosa parla il paragrafo, in poche parole. Prova a usare le tue parole chiave": ["Write what the paragraph is about, in a few words. Try to use your keywords", "Escribe de qué trata el párrafo, en pocas palabras. Intenta usar tus palabras clave", "اكتب عمّا تتحدث الفقرة بكلمات قليلة. حاول أن تستخدم كلماتك المفتاحية", "Scrie despre ce este paragraful, în câteva cuvinte. Încearcă să folosești cuvintele-cheie", "Shkruaj për çfarë flet paragrafi, me pak fjalë. Provo të përdorësh fjalët e tua kyçe", "Напиши, про що абзац, кількома словами. Спробуй використати свої ключові слова", "用几句话写出这段讲什么。试着用你的关键词"],
    "Una frase alla volta": ["One sentence at a time", "Una frase cada vez", "جملة واحدة في كل مرة", "Câte o propoziție", "Një fjali në një herë", "По одному реченню", "一次一句"],
    "Frase dopo": ["Next sentence", "Frase siguiente", "الجملة التالية", "Propoziția următoare", "Fjalia tjetër", "Наступне речення", "下一句"],
    "Ascolta": ["Listen", "Escucha", "استمع", "Ascultă", "Dëgjo", "Слухати", "听"],
    "Ferma": ["Stop", "Parar", "إيقاف", "Oprește", "Ndalo", "Зупинити", "停止"],
    "Parole difficili": ["Difficult words", "Palabras difíciles", "كلمات صعبة", "Cuvinte grele", "Fjalë të vështira", "Складні слова", "难词"],
    "Ho letto ➜ Sottolineo": ["I've read it ➜ I underline", "He leído ➜ Subrayo", "قرأت ➜ أضع الخطوط", "Am citit ➜ Subliniez", "E lexova ➜ Nënvizoj", "Я прочитав ➜ Підкреслюю", "读完了 ➜ 划线"],
    "Tocca le parole che non conosci. Poi scrivi qui sotto che cosa vogliono dire, con parole tue (chiedi al docente o usa il dizionario). Ritocca una parola per toglierla": ["Tap the words you don't know. Then write below what they mean, in your own words (ask the teacher or use the dictionary). Tap a word again to remove it", "Toca las palabras que no conoces. Luego escribe abajo qué significan, con tus palabras (pregunta al profesor o usa el diccionario). Vuelve a tocar una palabra para quitarla", "المس الكلمات التي لا تعرفها. ثم اكتب في الأسفل معناها بكلماتك (اسأل المعلّم أو استخدم القاموس). المس الكلمة مرة أخرى لإزالتها", "Atinge cuvintele pe care nu le cunoști. Apoi scrie mai jos ce înseamnă, cu cuvintele tale (întreabă profesorul sau folosește dicționarul). Atinge din nou un cuvânt ca să-l scoți", "Prek fjalët që nuk i njeh. Pastaj shkruaj më poshtë çfarë do të thonë, me fjalët e tua (pyet mësuesin ose përdor fjalorin). Prek përsëri një fjalë për ta hequr", "Торкнися слів, яких не знаєш. Потім напиши нижче, що вони означають, своїми словами (запитай учителя або скористайся словником). Торкнися слова ще раз, щоб прибрати його", "点选你不认识的词。然后在下面用自己的话写出意思（可以问老师或查词典）。再点一次可以取消"],
    "Le tue parole difficili di questo paragrafo": ["Your difficult words in this paragraph", "Tus palabras difíciles de este párrafo", "كلماتك الصعبة في هذه الفقرة", "Cuvintele tale grele din acest paragraf", "Fjalët e tua të vështira në këtë paragraf", "Твої складні слова з цього абзацу", "这一段里你的难词"],
    "Che cosa vuol dire?": ["What does it mean?", "¿Qué significa?", "ماذا تعني؟", "Ce înseamnă?", "Çfarë do të thotë?", "Що це означає?", "是什么意思？"],
    "Nella mia lingua": ["In my language", "En mi idioma", "بلغتي", "În limba mea", "Në gjuhën time", "Моєю мовою", "用我的语言"],
    "Nessuna parola ancora": ["No words yet", "Todavía ninguna palabra", "لا توجد كلمات بعد", "Încă niciun cuvânt", "Asnjë fjalë ende", "Ще немає слів", "还没有词"],
    "Parole sottolineate": ["Underlined words", "Palabras subrayadas", "الكلمات التي وضعت تحتها خطًا", "Cuvinte subliniate", "Fjalë të nënvizuara", "Підкреслені слова", "已划的词"],
    "Non sai quali scegliere? Fatti queste domande": ["Don't know which to choose? Ask yourself these questions", "¿No sabes cuáles elegir? Hazte estas preguntas", "لا تعرف ماذا تختار؟ اسأل نفسك هذه الأسئلة", "Nu știi ce să alegi? Pune-ți aceste întrebări", "Nuk di cilat të zgjedhësh? Bëji vetes këto pyetje", "Не знаєш, які обрати? Постав собі ці запитання", "不知道选哪个？问问自己这些问题"],
    "Di chi o di che cosa parla?": ["Who or what is it about?", "¿De quién o de qué habla?", "عمّن أو عمّا يتحدث؟", "Despre cine sau despre ce vorbește?", "Për kë ose për çfarë flet?", "Про кого або про що йдеться?", "讲的是谁或什么？"],
    "Che cosa fa o che cosa succede?": ["What does it do or what happens?", "¿Qué hace o qué pasa?", "ماذا يفعل أو ماذا يحدث؟", "Ce face sau ce se întâmplă?", "Çfarë bën ose çfarë ndodh?", "Що робить або що відбувається?", "做什么，或者发生了什么？"],
    "Dove? ⏰ Quando?": ["Where? ⏰ When?", "¿Dónde? ⏰ ¿Cuándo?", "أين؟ ⏰ متى؟", "Unde? ⏰ Când?", "Ku? ⏰ Kur?", "Де? ⏰ Коли?", "在哪里？⏰ 什么时候？"],
    "Perché? A che cosa serve?": ["Why? What is it for?", "¿Por qué? ¿Para qué sirve?", "لماذا؟ ما فائدته؟", "De ce? La ce folosește?", "Pse? Për çfarë shërben?", "Чому? Для чого це?", "为什么？有什么用？"],
    "C'è una parola nuova o difficile che il testo spiega?": ["Is there a new or difficult word that the text explains?", "¿Hay una palabra nueva o difícil que el texto explica?", "هل توجد كلمة جديدة أو صعبة يشرحها النص؟", "Există un cuvânt nou sau greu pe care textul îl explică?", "A ka një fjalë të re ose të vështirë që teksti e shpjegon?", "Чи є нове або складне слово, яке пояснює текст?", "有没有课文解释的新词或难词？"],
    "Le parole chiave sono quasi sempre nomi (cose, persone, luoghi) e verbi che dicono cosa succede. Articoli, preposizioni e «che», «e», «di»… sono parole-colla: uniscono le altre ma da sole non dicono niente": ["Keywords are almost always nouns (things, people, places) and verbs that say what happens. Articles, prepositions and «che», «e», «di»… are glue words: they join the others but alone they say nothing", "Las palabras clave casi siempre son sustantivos (cosas, personas, lugares) y verbos que dicen qué pasa. Artículos, preposiciones y «che», «e», «di»… son palabras pegamento: unen las demás pero solas no dicen nada", "الكلمات المفتاحية غالبًا أسماء (أشياء، أشخاص، أماكن) وأفعال تقول ماذا يحدث. أدوات التعريف وحروف الجر و«che» و«e» و«di»… كلمات رابطة: تربط الكلمات الأخرى لكنها وحدها لا تقول شيئًا", "Cuvintele-cheie sunt aproape mereu substantive (lucruri, persoane, locuri) și verbe care spun ce se întâmplă. Articolele, prepozițiile și «che», «e», «di»… sunt cuvinte-lipici: le leagă pe celelalte, dar singure nu spun nimic", "Fjalët kyçe janë pothuajse gjithmonë emra (sende, njerëz, vende) dhe folje që tregojnë çfarë ndodh. Nyjet, parafjalët dhe «che», «e», «di»… janë fjalë-ngjitëse: lidhin të tjerat, por vetëm nuk thonë asgjë", "Ключові слова — майже завжди іменники (речі, люди, місця) і дієслова, що кажуть, що відбувається. Артиклі, прийменники та «che», «e», «di»… — слова-клей: вони з'єднують інші, але самі нічого не означають", "关键词几乎都是名词（东西、人、地方）和说明发生了什么的动词。冠词、介词以及 «che»、«e»、«di»… 是“胶水词”：它们连接其他词，但单独没有意思"],
    "Se leggi solo le tue parole": ["If you read only your words", "Si lees solo tus palabras", "إذا قرأت كلماتك فقط", "Dacă citești doar cuvintele tale", "Nëse lexon vetëm fjalët e tua", "Якщо прочитати лише твої слова", "如果只读你划的词"],
    "Rileggi": ["Read again", "Vuelve a leer", "أعد القراءة", "Recitește", "Rilexo", "Перечитай", "再读一遍"],
    "Cancella tutto": ["Clear all", "Borrar todo", "امسح الكل", "Șterge tot", "Fshi të gjitha", "Стерти все", "全部清除"],
    "Massimo {n}! Per sceglierne un'altra, togline una": ["{n} at most! To choose another one, remove one", "¡Máximo {n}! Para elegir otra, quita una", "{n} كحدّ أقصى! لتختار كلمة أخرى أزل واحدة", "Maximum {n}! Ca să alegi alt cuvânt, scoate unul", "Maksimumi {n}! Për të zgjedhur një tjetër, hiq një", "Щонайбільше {n}! Щоб обрати інше, прибери одне", "最多 {n} 个！想选别的，先取消一个"],
    "«{x}» è una parola-colla: unisce le altre, ma da sola non dice niente": ["«{x}» is a glue word: it joins the others but alone says nothing", "«{x}» es una palabra pegamento: une las demás, pero sola no dice nada", "«{x}» كلمة رابطة: تربط الكلمات الأخرى لكنها وحدها لا تقول شيئًا", "«{x}» este un cuvânt-lipici: le leagă pe celelalte, dar singur nu spune nimic", "«{x}» është fjalë-ngjitëse: lidh të tjerat, por vetëm nuk thotë asgjë", "«{x}» — слово-клей: воно з'єднує інші, але саме нічого не означає", "«{x}» 是胶水词：它连接其他词，但单独没有意思"],
    "trovata": ["found", "encontrada", "وجدتها", "găsit", "e gjetur", "знайдено", "找到了"],
    "ti è sfuggita": ["you missed it", "se te escapó", "فاتتك", "ți-a scăpat", "të ka shpëtuar", "ти пропустив", "漏掉了"],
    "non sbagliata, ma meno importante": ["not wrong, but less important", "no está mal, pero es menos importante", "ليست خطأ لكنها أقل أهمية", "nu e greșit, dar e mai puțin important", "jo e gabuar, por më pak e rëndësishme", "не помилка, але менш важливе", "没错，但没那么重要"],
    "La prova del telegramma: leggi solo le tue parole. Si capisce di che cosa parla il paragrafo?": ["The telegram test: read only your words. Can you tell what the paragraph is about?", "La prueba del telegrama: lee solo tus palabras. ¿Se entiende de qué trata el párrafo?", "اختبار البرقية: اقرأ كلماتك فقط. هل يُفهم عمّا تتحدث الفقرة؟", "Proba telegramei: citește doar cuvintele tale. Se înțelege despre ce e paragraful?", "Prova e telegramit: lexo vetëm fjalët e tua. A kuptohet për çfarë flet paragrafi?", "Перевірка «телеграмою»: прочитай лише свої слова. Чи зрозуміло, про що абзац?", "电报测试：只读你划的词。能看懂这段讲什么吗？"],
    "Voglio correggere": ["I want to fix it", "Quiero corregir", "أريد أن أصحّح", "Vreau să corectez", "Dua të korrigjoj", "Хочу виправити", "我想改一改"],
    "Avanti": ["Next", "Adelante", "التالي", "Înainte", "Përpara", "Далі", "下一步"],
    "Bene: hai trovato {n} parole chiave su {n}": ["Good: you found {n} keywords out of {n}", "Bien: has encontrado {n} palabras clave de {n}", "أحسنت: وجدت {n} من أصل {n} كلمات مفتاحية", "Bine: ai găsit {n} cuvinte-cheie din {n}", "Mirë: gjete {n} fjalë kyçe nga {n}", "Добре: ти знайшов {n} ключових слів із {n}", "很好：你找到了 {n} 个关键词（共 {n} 个）"],
    "Perfetto: proprio le parole del docente!": ["Perfect: exactly the teacher's words!", "¡Perfecto: justo las palabras del profesor!", "ممتاز: هي نفسها كلمات المعلّم!", "Perfect: exact cuvintele profesorului!", "Përsosur: pikërisht fjalët e mësuesit!", "Чудово: саме слова вчителя!", "完美：正是老师选的词！"],
    "Hai trovato {n} parole chiave su {n}. Guarda quelle tratteggiate: a quale domanda rispondono?": ["You found {n} keywords out of {n}. Look at the dashed ones: which question do they answer?", "Has encontrado {n} palabras clave de {n}. Mira las punteadas: ¿a qué pregunta responden?", "وجدت {n} من أصل {n} كلمات مفتاحية. انظر إلى المحاطة بخط متقطّع: على أي سؤال تجيب؟", "Ai găsit {n} cuvinte-cheie din {n}. Uită-te la cele punctate: la ce întrebare răspund?", "Gjete {n} fjalë kyçe nga {n}. Shiko ato me vija të ndërprera: cilës pyetje i përgjigjen?", "Ти знайшов {n} ключових слів із {n}. Подивись на позначені пунктиром: на яке запитання вони відповідають?", "你找到了 {n} 个关键词（共 {n} 个）。看看虚线框的词：它们回答哪个问题？"],
    "Hai trovato tutte le {n} parole chiave del docente!": ["You found all {n} of the teacher's keywords!", "¡Has encontrado las {n} palabras clave del profesor!", "وجدت كل الكلمات المفتاحية للمعلّم ({n})!", "Ai găsit toate cele {n} cuvinte-cheie ale profesorului!", "I gjete të {n} fjalët kyçe të mësuesit!", "Ти знайшов усі {n} ключових слів учителя!", "你找到了老师的全部 {n} 个关键词！"],
    "Se dal telegramma si capisce il paragrafo, hai scelto bene. Se manca qualcosa, torna a correggere": ["If the telegram makes the paragraph clear, you chose well. If something is missing, go back and fix it", "Si con el telegrama se entiende el párrafo, elegiste bien. Si falta algo, vuelve a corregir", "إذا فُهمت الفقرة من البرقية فقد أحسنت الاختيار. وإذا نقص شيء فارجع وصحّح", "Dacă din telegramă se înțelege paragraful, ai ales bine. Dacă lipsește ceva, întoarce-te și corectează", "Nëse nga telegrami kuptohet paragrafi, ke zgjedhur mirë. Nëse mungon diçka, kthehu e korrigjo", "Якщо з «телеграми» зрозумілий абзац, ти обрав добре. Якщо чогось бракує, повернися й виправ", "如果从“电报”能看懂这段，你选得很好。如果缺了什么，回去改一改"],
    "Fai una domanda su questo paragrafo": ["Ask a question about this paragraph", "Haz una pregunta sobre este párrafo", "اطرح سؤالًا عن هذه الفقرة", "Pune o întrebare despre acest paragraf", "Bëj një pyetje për këtë paragraf", "Постав запитання до цього абзацу", "就这一段提一个问题"],
    "Una domanda la cui risposta si trova nel paragrafo. Diventerà una carta per il ripasso": ["A question whose answer is in the paragraph. It will become a review card", "Una pregunta cuya respuesta está en el párrafo. Se convertirá en una tarjeta de repaso", "سؤال جوابه موجود في الفقرة. سيصبح بطاقة للمراجعة", "O întrebare al cărei răspuns se află în paragraf. Va deveni o fișă de recapitulare", "Një pyetje që e ka përgjigjen në paragraf. Do të bëhet kartë përsëritjeje", "Запитання, відповідь на яке є в абзаці. Воно стане карткою для повторення", "答案就在这段里的问题。它会变成一张复习卡"],
    "Domanda (es. Che cos'è la stagionatura?)": ["Question", "Pregunta", "سؤال", "Întrebare", "Pyetje", "Запитання", "问题"],
    "Domanda": ["Question", "Pregunta", "سؤال", "Întrebare", "Pyetje", "Запитання", "问题"],
    "Risposta, con parole tue": ["Answer, in your own words", "Respuesta, con tus palabras", "الجواب بكلماتك", "Răspuns, cu cuvintele tale", "Përgjigje, me fjalët e tua", "Відповідь своїми словами", "用自己的话回答"],
    "Risposta": ["Answer", "Respuesta", "الجواب", "Răspuns", "Përgjigje", "Відповідь", "答案"],
    "Che cos'è": ["What is", "Qué es", "ما هو", "Ce este", "Çfarë është", "Що таке", "什么是"],
    "Perché": ["Why", "Por qué", "لماذا", "De ce", "Pse", "Чому", "为什么"],
    "Come": ["How", "Cómo", "كيف", "Cum", "Si", "Як", "怎样"],
    "A che cosa serve": ["What is it for", "Para qué sirve", "ما فائدة", "La ce folosește", "Për çfarë shërben", "Для чого", "有什么用"],
    "Quando": ["When", "Cuándo", "متى", "Când", "Kur", "Коли", "什么时候"],
    "Dove": ["Where", "Dónde", "أين", "Unde", "Ku", "Де", "在哪里"],
    "Che differenza c'è tra": ["What is the difference between", "Qué diferencia hay entre", "ما الفرق بين", "Ce diferență este între", "Çfarë ndryshimi ka mes", "Яка різниця між", "…和…有什么区别"],
    "Scrivi anche la risposta: ti servirà per il ripasso": ["Write the answer too: you'll need it for review", "Escribe también la respuesta: la necesitarás para repasar", "اكتب الجواب أيضًا: ستحتاجه للمراجعة", "Scrie și răspunsul: îți va trebui la recapitulare", "Shkruaj edhe përgjigjen: do të të duhet për përsëritjen", "Напиши й відповідь: вона знадобиться для повторення", "也写上答案：复习时会用到"],
    "Hai scritto la risposta: manca la domanda": ["You wrote the answer: the question is missing", "Has escrito la respuesta: falta la pregunta", "كتبت الجواب: السؤال ناقص", "Ai scris răspunsul: lipsește întrebarea", "Shkrove përgjigjen: mungon pyetja", "Ти написав відповідь: бракує запитання", "你写了答案：还缺问题"],
    "Salta": ["Skip", "Saltar", "تخطَّ", "Sari peste", "Kapërce", "Пропустити", "跳过"],
    "Paragrafo dopo": ["Next paragraph", "Párrafo siguiente", "الفقرة التالية", "Paragraful următor", "Paragrafi tjetër", "Наступний абзац", "下一段"],
    "Vedi lo schema": ["See the summary", "Ver el esquema", "شاهد المخطط", "Vezi schema", "Shiko skemën", "Переглянути схему", "查看提纲"],
    "Le tue parole": ["Your words", "Tus palabras", "كلماتك", "Cuvintele tale", "Fjalët e tua", "Твої слова", "你的词"],
    "La scheda del testo: il tuo percorso di studio e tutto quello che hai costruito. Continua con le tappe che mancano": ["The text sheet: your study path and everything you have built. Continue with the missing steps", "La ficha del texto: tu recorrido de estudio y todo lo que has construido. Sigue con las etapas que faltan", "بطاقة النص: مسار دراستك وكل ما بنيته. تابع المراحل الناقصة", "Fișa textului: parcursul tău de studiu și tot ce ai construit. Continuă cu etapele care lipsesc", "Skeda e tekstit: rruga jote e studimit dhe gjithçka që ke ndërtuar. Vazhdo me hapat që mungojnë", "Картка тексту: твій навчальний маршрут і все, що ти створив. Продовжуй етапи, яких бракує", "课文学习卡：你的学习路径和你完成的所有内容。继续完成还没做的步骤"],
    "Leggi e sottolinea": ["Read and underline", "Lee y subraya", "اقرأ وضع خطوطًا", "Citește și subliniază", "Lexo dhe nënvizo", "Читай і підкреслюй", "阅读并划线"],
    "Domande": ["Questions", "Preguntas", "أسئلة", "Întrebări", "Pyetje", "Запитання", "问题"],
    "Mappa": ["Map", "Mapa", "الخريطة", "Hartă", "Hartë", "Карта", "导图"],
    "Ripassa": ["Review", "Repasa", "راجع", "Recapitulează", "Përsërit", "Повторюй", "复习"],
    "Scrivi le domande": ["Write the questions", "Escribe las preguntas", "اكتب الأسئلة", "Scrie întrebările", "Shkruaj pyetjet", "Напиши запитання", "写问题"],
    "Fai la mappa": ["Make the map", "Haz el mapa", "اصنع الخريطة", "Fă harta", "Bëj hartën", "Створи карту", "做导图"],
    "Apri la mappa": ["Open the map", "Abre el mapa", "افتح الخريطة", "Deschide harta", "Hap hartën", "Відкрий карту", "打开导图"],
    "Le mie domande": ["My questions", "Mis preguntas", "أسئلتي", "Întrebările mele", "Pyetjet e mia", "Мої запитання", "我的问题"],
    "Le mie parole difficili": ["My difficult words", "Mis palabras difíciles", "كلماتي الصعبة", "Cuvintele mele grele", "Fjalët e mia të vështira", "Мої складні слова", "我的难词"],
    "Le frasi della mia mappa": ["The sentences of my map", "Las frases de mi mapa", "جمل خريطتي", "Propozițiile hărții mele", "Fjalitë e hartës sime", "Речення моєї карти", "我的导图里的句子"],
    "Copia la scheda": ["Copy the sheet", "Copiar la ficha", "انسخ البطاقة", "Copiază fișa", "Kopjo skedën", "Скопіювати картку", "复制学习卡"],
    "Salva": ["Save", "Guardar", "احفظ", "Salvează", "Ruaj", "Зберегти", "保存"],
    "Stampa": ["Print", "Imprimir", "اطبع", "Tipărește", "Printo", "Друк", "打印"],
    "Rifai il testo": ["Redo the text", "Rehacer el texto", "أعد العمل على النص", "Refă textul", "Ribëje tekstin", "Пройти текст знову", "重做课文"],
    "Hai finito tutto il testo!": ["You finished the whole text!", "¡Has terminado todo el texto!", "أنهيت النص كله!", "Ai terminat tot textul!", "E mbarove gjithë tekstin!", "Ти завершив увесь текст!", "你完成了整篇课文！"],
    "Hai trovato {n} parole chiave su {n} del docente": ["You found {n} of the teacher's {n} keywords", "Has encontrado {n} de las {n} palabras clave del profesor", "وجدت {n} من أصل {n} كلمات مفتاحية للمعلّم", "Ai găsit {n} din cele {n} cuvinte-cheie ale profesorului", "Gjete {n} nga {n} fjalët kyçe të mësuesit", "Ти знайшов {n} із {n} ключових слів учителя", "你找到了 {n} 个关键词（老师共 {n} 个）"],
    "Usa": ["Use", "Usar", "استخدم", "Folosește", "Përdor", "Використати", "使用"],
    "Hai trovato {n} parole chiave su {n} del docente. Le parole tratteggiate sono quelle da guardare con più attenzione la prossima volta": ["You found {n} of the teacher's {n} keywords. Look more carefully at the dashed words next time", "Has encontrado {n} de las {n} palabras clave del profesor. La próxima vez fíjate más en las palabras punteadas", "وجدت {n} من أصل {n} كلمات مفتاحية للمعلّم. انتبه أكثر في المرة القادمة إلى الكلمات المحاطة بخط متقطّع", "Ai găsit {n} din cele {n} cuvinte-cheie ale profesorului. Data viitoare uită-te mai atent la cuvintele punctate", "Gjete {n} nga {n} fjalët kyçe të mësuesit. Herën tjetër shiko me më shumë kujdes fjalët me vija të ndërprera", "Ти знайшов {n} із {n} ключових слів учителя. Наступного разу уважніше подивись на слова, позначені пунктиром", "你找到了 {n} 个关键词（老师共 {n} 个）。下次多注意虚线框的词"],
    "Base: parole chiave e sintesi": ["Basic: keywords and summary", "Básico: palabras clave y resumen", "أساسي: كلمات مفتاحية وملخّص", "De bază: cuvinte-cheie și rezumat", "Bazë: fjalë kyçe dhe përmbledhje", "Базовий: ключові слова й підсумок", "基础：关键词和概括"],
    "Medio: + domande e ripasso": ["Medium: + questions and review", "Medio: + preguntas y repaso", "متوسط: + أسئلة ومراجعة", "Mediu: + întrebări și recapitulare", "Mesatar: + pyetje dhe përsëritje", "Середній: + запитання й повторення", "中级：+ 提问和复习"],
    "Completo: + mappa": ["Complete: + map", "Completo: + mapa", "كامل: + خريطة", "Complet: + hartă", "I plotë: + hartë", "Повний: + карта", "完整：+ 导图"],
    "Il docente ti dice quale percorso usare": ["Your teacher tells you which path to use", "El profesor te dice qué recorrido usar", "يخبرك المعلّم بالمسار الذي تستخدمه", "Profesorul îți spune ce parcurs să folosești", "Mësuesi të thotë cilën rrugë të përdorësh", "Учитель скаже, який маршрут обрати", "老师会告诉你用哪条路径"],
    // ---- Dal testo alla mappa
    "Le parole chiave diventano una mappa concettuale": ["Keywords become a concept map", "Las palabras clave se convierten en un mapa conceptual", "تتحوّل الكلمات المفتاحية إلى خريطة مفاهيم", "Cuvintele-cheie devin o hartă conceptuală", "Fjalët kyçe bëhen hartë konceptuale", "Ключові слова стають картою понять", "关键词变成概念图"],
    "Nuova mappa": ["New map", "Mapa nuevo", "خريطة جديدة", "Hartă nouă", "Hartë e re", "Нова карта", "新导图"],
    "Le mie mappe": ["My maps", "Mis mapas", "خرائطي", "Hărțile mele", "Hartat e mia", "Мої карти", "我的导图"],
    "Come si fa": ["How to do it", "Cómo se hace", "كيف تُصنع", "Cum se face", "Si bëhet", "Як це зробити", "怎么做"],
    "Una mappa concettuale è fatta di concetti (le parole chiave) uniti da frecce con una parola-legame. Ogni freccia, letta ad alta voce, forma una frase vera": ["A concept map is made of concepts (the keywords) joined by arrows with a linking word. Each arrow, read aloud, makes a true sentence", "Un mapa conceptual está hecho de conceptos (las palabras clave) unidos por flechas con una palabra de enlace. Cada flecha, leída en voz alta, forma una frase verdadera", "تتكوّن خريطة المفاهيم من مفاهيم (الكلمات المفتاحية) تربطها أسهم عليها كلمة ربط. كل سهم، إذا قُرئ بصوت عالٍ، يكوّن جملة صحيحة", "O hartă conceptuală e făcută din concepte (cuvintele-cheie) unite prin săgeți cu un cuvânt de legătură. Fiecare săgeată, citită cu voce tare, formează o propoziție adevărată", "Një hartë konceptuale përbëhet nga koncepte (fjalët kyçe) të lidhura me shigjeta me një fjalë-lidhëse. Çdo shigjetë, e lexuar me zë, formon një fjali të vërtetë", "Карта понять складається з понять (ключових слів), з'єднаних стрілками зі словом-зв'язкою. Кожна стрілка, прочитана вголос, утворює правдиве речення", "概念图由概念（关键词）组成，用带连接词的箭头连起来。每个箭头大声读出来，都是一句正确的话"],
    "Dalle parole chiave": ["From the keywords", "Desde las palabras clave", "من الكلمات المفتاحية", "Din cuvintele-cheie", "Nga fjalët kyçe", "З ключових слів", "从关键词开始"],
    "Usa un testo che hai già lavorato in «Caccia alle parole chiave»": ["Use a text you already worked on in «Caccia alle parole chiave»", "Usa un texto que ya trabajaste en «Caccia alle parole chiave»", "استخدم نصًا عملت عليه في «Caccia alle parole chiave»", "Folosește un text lucrat deja în «Caccia alle parole chiave»", "Përdor një tekst që e ke punuar te «Caccia alle parole chiave»", "Використай текст, з яким ти вже працював у «Caccia alle parole chiave»", "使用你在 «Caccia alle parole chiave» 里做过的课文"],
    "Scrivo io i concetti": ["I write the concepts", "Escribo yo los conceptos", "أكتب المفاهيم بنفسي", "Scriu eu conceptele", "I shkruaj vetë konceptet", "Я сам пишу поняття", "我自己写概念"],
    "Crea la mappa": ["Create the map", "Crear el mapa", "أنشئ الخريطة", "Creează harta", "Krijo hartën", "Створити карту", "创建导图"],
    "Mappa vuota": ["Empty map", "Mapa vacío", "خريطة فارغة", "Hartă goală", "Hartë bosh", "Порожня карта", "空白导图"],
    "Parti solo dall'argomento al centro e aggiungi i concetti uno alla volta": ["Start just with the topic in the middle and add the concepts one at a time", "Empieza solo con el tema en el centro y añade los conceptos uno a uno", "ابدأ بالموضوع في الوسط وأضف المفاهيم واحدًا تلو الآخر", "Pornește doar de la subiectul din centru și adaugă conceptele pe rând", "Nis vetëm nga tema në qendër dhe shto konceptet një nga një", "Почни лише з теми в центрі й додавай поняття по одному", "先把主题放在中间，再一个一个加概念"],
    "Argomento": ["Topic", "Tema", "الموضوع", "Subiect", "Tema", "Тема", "主题"],
    "Argomento (es. Il legno)": ["Topic", "Tema", "الموضوع", "Subiect", "Tema", "Тема", "主题"],
    "Un concetto per riga, oppure separati da virgole": ["One concept per line, or separated by commas", "Un concepto por línea, o separados por comas", "مفهوم في كل سطر، أو مفصولة بفواصل", "Un concept pe rând sau separate prin virgule", "Një koncept për rresht, ose të ndara me presje", "Одне поняття в рядку або через кому", "每行一个概念，或用逗号分开"],
    "Concetto": ["Concept", "Concepto", "مفهوم", "Concept", "Koncept", "Поняття", "概念"],
    "Collega": ["Link", "Conectar", "اربط", "Leagă", "Lidh", "З'єднати", "连接"],
    "Riordina": ["Tidy up", "Ordenar", "رتّب", "Rearanjează", "Rregullo", "Упорядкувати", "整理"],
    "Tocca il concetto da cui parte la freccia": ["Tap the concept where the arrow starts", "Toca el concepto donde empieza la flecha", "المس المفهوم الذي يبدأ منه السهم", "Atinge conceptul de unde pornește săgeata", "Prek konceptin nga nis shigjeta", "Торкнися поняття, звідки починається стрілка", "点选箭头开始的概念"],
    "Ora tocca il concetto a cui arriva la freccia": ["Now tap the concept where the arrow ends", "Ahora toca el concepto donde llega la flecha", "الآن المس المفهوم الذي ينتهي عنده السهم", "Acum atinge conceptul unde ajunge săgeata", "Tani prek konceptin ku mbërrin shigjeta", "Тепер торкнися поняття, куди веде стрілка", "现在点选箭头指向的概念"],
    "I concetti sono pronti ma non sono ancora collegati: spostali (il più generale in alto) e uniscili con le frecce": ["The concepts are ready but not linked yet: move them (the most general at the top) and join them with arrows", "Los conceptos están listos pero aún no están conectados: muévelos (el más general arriba) y únelos con flechas", "المفاهيم جاهزة لكنها غير مربوطة بعد: حرّكها (الأعمّ في الأعلى) واربطها بالأسهم", "Conceptele sunt gata, dar încă nelegate: mută-le (cel mai general sus) și unește-le cu săgeți", "Konceptet janë gati, por ende të palidhura: zhvendosi (më të përgjithshmin lart) dhe bashkoji me shigjeta", "Поняття готові, але ще не з'єднані: перемісти їх (найзагальніше вгорі) і з'єднай стрілками", "概念已经准备好但还没连接：移动它们（最概括的放上面），再用箭头连起来"],
    "Esempio": ["Example", "Ejemplo", "مثال", "Exemplu", "Shembull", "Приклад", "例子"],
    "Collega da qui": ["Link from here", "Conectar desde aquí", "اربط من هنا", "Leagă de aici", "Lidh nga këtu", "З'єднати звідси", "从这里连接"],
    "Elimina": ["Delete", "Eliminar", "احذف", "Șterge", "Fshi", "Видалити", "删除"],
    "Parola-legame": ["Linking word", "Palabra de enlace", "كلمة الربط", "Cuvânt de legătură", "Fjalë-lidhëse", "Слово-зв'язка", "连接词"],
    "Inverti": ["Reverse", "Invertir", "اعكس", "Inversează", "Kthe drejtimin", "Розвернути", "反转"],
    "Elimina freccia": ["Delete arrow", "Eliminar flecha", "احذف السهم", "Șterge săgeata", "Fshi shigjetën", "Видалити стрілку", "删除箭头"],
    "è": ["is", "es", "هو", "este", "është", "є", "是"],
    "è formato da": ["is made of", "está formado por", "يتكوّن من", "este format din", "përbëhet nga", "складається з", "由…组成"],
    "contiene": ["contains", "contiene", "يحتوي على", "conține", "përmban", "містить", "包含"],
    "si divide in": ["is divided into", "se divide en", "ينقسم إلى", "se împarte în", "ndahet në", "поділяється на", "分为"],
    "è un tipo di": ["is a type of", "es un tipo de", "هو نوع من", "este un tip de", "është një lloj", "є видом", "是一种"],
    "serve a": ["is used to", "sirve para", "يُستخدم لـ", "servește la", "shërben për", "служить для", "用来"],
    "si usa per": ["is used for", "se usa para", "يُستعمل من أجل", "se folosește pentru", "përdoret për", "використовується для", "用于"],
    "produce": ["produces", "produce", "يُنتج", "produce", "prodhon", "виробляє", "产生"],
    "causa": ["causes", "causa", "يسبّب", "cauzează", "shkakton", "спричиняє", "导致"],
    "dipende da": ["depends on", "depende de", "يعتمد على", "depinde de", "varet nga", "залежить від", "取决于"],
    "si trova in": ["is found in", "se encuentra en", "يوجد في", "se află în", "gjendet në", "знаходиться в", "位于"],
    "per esempio": ["for example", "por ejemplo", "مثلًا", "de exemplu", "për shembull", "наприклад", "例如"],
    "Le frasi della tua mappa": ["The sentences of your map", "Las frases de tu mapa", "جمل خريطتك", "Propozițiile hărții tale", "Fjalitë e hartës sate", "Речення твоєї карти", "你的导图里的句子"],
    "leggile ad alta voce: sono vere? hanno senso?": ["read them aloud: are they true? do they make sense?", "léelas en voz alta: ¿son verdaderas? ¿tienen sentido?", "اقرأها بصوت عالٍ: هل هي صحيحة؟ هل لها معنى؟", "citește-le cu voce tare: sunt adevărate? au sens?", "lexoji me zë: a janë të vërteta? a kanë kuptim?", "прочитай їх уголос: чи вони правдиві? чи мають сенс?", "大声读出来：它们对吗？有意义吗？"],
    "Copia le frasi": ["Copy the sentences", "Copiar las frases", "انسخ الجمل", "Copiază propozițiile", "Kopjo fjalitë", "Скопіювати речення", "复制句子"],
    "Salva come immagine": ["Save as image", "Guardar como imagen", "احفظ كصورة", "Salvează ca imagine", "Ruaj si imazh", "Зберегти як зображення", "保存为图片"],
    "Flashcard dalla mappa": ["Flashcards from the map", "Tarjetas desde el mapa", "بطاقات من الخريطة", "Fișe din hartă", "Karta nga harta", "Картки з карти", "从导图做卡片"],
    "Scheda del testo": ["Text sheet", "Ficha del texto", "بطاقة النص", "Fișa textului", "Skeda e tekstit", "Картка тексту", "课文学习卡"],
    "Collega i concetti con le frecce: una mappa senza frecce è solo un elenco": ["Link the concepts with arrows: a map without arrows is just a list", "Une los conceptos con flechas: un mapa sin flechas es solo una lista", "اربط المفاهيم بالأسهم: الخريطة بلا أسهم مجرّد قائمة", "Leagă conceptele cu săgeți: o hartă fără săgeți e doar o listă", "Lidhi konceptet me shigjeta: një hartë pa shigjeta është vetëm një listë", "З'єднай поняття стрілками: карта без стрілок — це лише список", "用箭头连接概念：没有箭头的导图只是一个列表"],
    // ---- Ripasso furbo
    "Flashcard con le 5 scatole · metodo di studio": ["Flashcards with 5 boxes · study skills", "Tarjetas con 5 cajas · método de estudio", "بطاقات مع 5 صناديق · طريقة الدراسة", "Fișe cu 5 cutii · metodă de studiu", "Karta me 5 kuti · metoda e studimit", "Картки з 5 коробками · як навчатися", "五个盒子的记忆卡 · 学习方法"],
    "I miei mazzi": ["My decks", "Mis mazos", "مجموعاتي", "Pachetele mele", "Paketat e mia", "Мої колоди", "我的卡组"],
    "Crea e modifica": ["Create and edit", "Crear y editar", "أنشئ وعدّل", "Creează și modifică", "Krijo dhe ndrysho", "Створити й змінити", "创建和编辑"],
    "Come funziona": ["How it works", "Cómo funciona", "كيف يعمل", "Cum funcționează", "Si funksionon", "Як це працює", "怎么用"],
    "Scrivo io la risposta": ["I write the answer", "Escribo yo la respuesta", "أكتب الجواب بنفسي", "Scriu eu răspunsul", "E shkruaj vetë përgjigjen", "Я сам пишу відповідь", "我自己写答案"],
    "Oggi ci sono {n} carte da ripassare": ["Today there are {n} cards to review", "Hoy hay {n} tarjetas para repasar", "اليوم توجد {n} بطاقات للمراجعة", "Azi sunt {n} fișe de recapitulat", "Sot ka {n} karta për të përsëritur", "Сьогодні {n} карток для повторення", "今天有 {n} 张卡片要复习"],
    "Inizia il ripasso": ["Start reviewing", "Empezar el repaso", "ابدأ المراجعة", "Începe recapitularea", "Fillo përsëritjen", "Почати повторення", "开始复习"],
    "Gira la carta": ["Turn the card", "Da la vuelta a la tarjeta", "اقلب البطاقة", "Întoarce fișa", "Ktheje kartën", "Переверни картку", "翻卡片"],
    "Scatola {n}": ["Box {n}", "Caja {n}", "الصندوق {n}", "Cutia {n}", "Kutia {n}", "Коробка {n}", "第 {n} 盒"],
    "Sii onesto: la sapevi?": ["Be honest: did you know it?", "Sé sincero: ¿la sabías?", "كن صادقًا: هل كنت تعرفه؟", "Fii sincer: o știai?", "Ji i sinqertë: e dije?", "Будь чесним: ти знав?", "诚实点：你知道吗？"],
    "Da ripassare": ["To review again", "Por repasar", "للمراجعة", "De recapitulat", "Për ta përsëritur", "Повторити ще", "需要再复习"],
    "La sapevo": ["I knew it", "La sabía", "كنت أعرفه", "O știam", "E dija", "Я знав", "我知道"],
    "Ripasso finito!": ["Review finished!", "¡Repaso terminado!", "انتهت المراجعة!", "Recapitulare terminată!", "Përsëritja mbaroi!", "Повторення завершено!", "复习完成！"],
    "Torna ai mazzi": ["Back to decks", "Volver a los mazos", "العودة إلى المجموعات", "Înapoi la pachete", "Kthehu te paketat", "Назад до колод", "返回卡组"],
    "Torna alla scheda del testo": ["Back to the text sheet", "Volver a la ficha del texto", "العودة إلى بطاقة النص", "Înapoi la fișa textului", "Kthehu te skeda e tekstit", "Назад до картки тексту", "返回课文学习卡"],
    "Oggi niente da ripassare in questo mazzo": ["Nothing to review in this deck today", "Hoy no hay nada que repasar en este mazo", "لا شيء للمراجعة في هذه المجموعة اليوم", "Azi nimic de recapitulat în acest pachet", "Sot asgjë për të përsëritur në këtë paketë", "Сьогодні в цій колоді нічого повторювати", "这个卡组今天没有要复习的"],
    "Ripassa lo stesso tutte le carte": ["Review all the cards anyway", "Repasa igualmente todas las tarjetas", "راجع كل البطاقات على أي حال", "Recapitulează totuși toate fișele", "Përsërit gjithsesi të gjitha kartat", "Однаково повторити всі картки", "还是复习全部卡片"],
    "Uguale alla risposta!": ["Same as the answer!", "¡Igual a la respuesta!", "مطابق للجواب!", "La fel ca răspunsul!", "Njësoj si përgjigjja!", "Збігається з відповіддю!", "和答案一样！"]
  };

  /* ---------- Motore ---------- */
  const norm = t => String(t).replace(/\s+/g, " ").trim().replace(/^[^\p{L}\p{Nd}«"(]+/u, "").replace(/[\s.:…➜→⬅◀▶—-]+$/u, "").trim();
  const esatti = new Map(), schemi = [];
  for (const [k, v] of Object.entries(D)) {
    const n = norm(k);
    if (/\{[nx]\}/.test(n)) {
      const tipi = [];
      const re = new RegExp("^" + n.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{([nx])\}/g, (_, t) => { tipi.push(t); return t === "n" ? "(\\d+)" : "(.+?)"; }).replace(/[{}]/g, "\\$&") + "$", "u");
      schemi.push({ re, v });
    } else esatti.set(n.toLowerCase(), v);
  }
  function traduci(testo, lingua) {
    const i = ORDINE.indexOf(lingua); if (i < 0) return null;
    const n = norm(testo); if (!n) return null;
    const v = esatti.get(n.toLowerCase()); if (v) return v[i];
    for (const s of schemi) { const m = n.match(s.re); if (m) { let k = 1; return s.v[i].replace(/\{[nx]\}/g, () => m[k++] || ""); } }
    return null;
  }
  const leggiLingua = () => { try { const v = JSON.parse(localStorage.getItem("ptl-lingua")); return ORDINE.includes(v) ? v : null; } catch (e) { return null; } };
  let lingua = leggiLingua();

  if (!document.getElementById("ptl-lingue-css")) {
    const st = document.createElement("style"); st.id = "ptl-lingue-css";
    st.textContent = `.ptl-tr{border:0!important;padding:0!important;background:none!important;box-shadow:none!important;border-radius:0!important;width:auto!important;height:auto!important;min-height:0!important}
.ptl-tr{display:block;font:600 .64em/1.2 system-ui,"Segoe UI",sans-serif!important;letter-spacing:0!important;text-transform:none;opacity:.78;margin-top:2px;white-space:normal}
.ptl-tr[dir=rtl]{font-family:"Noto Naskh Arabic","Geeza Pro",Tahoma,system-ui,sans-serif!important;font-size:.72em!important}
button .ptl-tr,a .ptl-tr,summary .ptl-tr{font-weight:500!important}
input.ptl-ph-tr::placeholder,textarea.ptl-ph-tr::placeholder{opacity:.75}`;
    document.head.appendChild(st);
  }
  const SALTA = ".foglio,.telegramma,.chip,svg,.schema h4,.carta .testo,textarea,.tab-codici,#lim-nome,#lim-cod,[data-noi18n],.ptl-tr,script,style,#ptl-voce-btn";
  const SEL = "button,summary,h1,h2,h3,h4,p,li,label,a,b,span,small,div.domande>div,legend,option";
  function testoProprio(el) { let t = ""; el.childNodes.forEach(c => { if (c.nodeType === 3) t += c.nodeValue; else if (c.nodeType === 1 && !c.classList.contains("ptl-tr") && !/^(INPUT|SELECT|TEXTAREA)$/.test(c.tagName)) t += testoProprio(c); }); return t; }
  function pulisci() {
    document.querySelectorAll(".ptl-tr").forEach(x => x.remove());
    document.querySelectorAll("[data-ptl-trk]").forEach(x => x.removeAttribute("data-ptl-trk"));
    document.querySelectorAll("[data-ptl-ph]").forEach(x => { x.placeholder = x.dataset.ptlPh; x.removeAttribute("data-ptl-ph"); x.classList.remove("ptl-ph-tr"); });
  }
  function annota() {
    if (!lingua || !document.body) return;
    osservatore.disconnect();
    const rtl = !!LINGUE[lingua].rtl;
    document.body.querySelectorAll(SEL).forEach(el => {
      if (el.closest(SALTA)) return;
      if (el.parentElement && el.parentElement.closest("[data-ptl-trk]")) return;
      const t = testoProprio(el), k = norm(t);
      const giaSpan = el.querySelector(":scope > .ptl-tr");
      if (el.dataset.ptlTrk && el.dataset.ptlTrk === k && giaSpan) return;
      if (giaSpan) giaSpan.remove();
      const tr = k.length > 0 && k.length < 400 ? traduci(k, lingua) : null;
      if (!tr) { el.removeAttribute("data-ptl-trk"); return; }
      if (el.tagName === "OPTION") { el.textContent = t.split(" · ")[0] + " · " + tr; el.dataset.ptlTrk = norm(el.textContent); return; }
      const s = document.createElement("span"); s.className = "ptl-tr"; s.lang = lingua; s.dir = rtl ? "rtl" : "ltr"; s.textContent = tr; s.setAttribute("aria-hidden", "false");
      el.appendChild(s); el.dataset.ptlTrk = k;
    });
    document.body.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(el => {
      const orig = el.dataset.ptlPh || el.placeholder; const tr = traduci(orig, lingua);
      if (!tr) return;
      el.dataset.ptlPh = orig; el.placeholder = orig + "  ·  " + tr; el.classList.add("ptl-ph-tr");
    });
    osserva();
  }
  let timer = null;
  const osservatore = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(annota, 40); });
  const osserva = () => { if (document.body) osservatore.observe(document.body, { childList: true, subtree: true, characterData: true }); };
  function imposta(l) {
    lingua = ORDINE.includes(l) ? l : null;
    try { if (lingua) localStorage.setItem("ptl-lingua", JSON.stringify(lingua)); else localStorage.removeItem("ptl-lingua"); } catch (e) {}
    osservatore.disconnect(); pulisci(); if (lingua) annota();
  }
  window.addEventListener("storage", e => { if (e.key === "ptl-lingua") { lingua = leggiLingua(); osservatore.disconnect(); pulisci(); if (lingua) annota(); } });
  window.ptlLingua = { LINGUE, ORDINE, imposta, attuale: () => lingua, traduci: t => lingua ? traduci(t, lingua) : null };
  const avvia = () => { if (lingua) annota(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", avvia); else avvia();
})();
