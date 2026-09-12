// Bilingual UA/EN string dictionary ported 1:1 from the data-uk / data-en
// attributes in the original static index.html. Keys are grouped by
// section to mirror the source markup, so any reviewer can diff this
// file against index.html section by section.

export type Lang = "uk" | "en";

export const translations = {
  uk: {
    metaTitle: "Boweb — створення сайтів, дизайн та SEO-просування",
    metaDescription:
      "Digital-агенція повного циклу: створення та розробка сайтів, веб-дизайн, SEO-просування й аналітика. Робимо сайти, що приносять клієнтів. Львів та вся Україна.",
    skipLink: "Перейти до вмісту",
    cursorLabel: "дивитись",

    notFound: {
      title: "Сторінку не знайдено",
      lead: "Можливо, її перенесли або вона ніколи не існувала. Перевірте адресу або повертайтесь на головну.",
      cta: "На головну",
    },

    nav: {
      about: "Про нас",
      services: "Послуги",
      cases: "Кейси",
      price: "Ціни",
      blog: "Блог",
      contacts: "Контакти",
      openMenu: "Відкрити меню",
      mainNav: "Головна навігація",
      mobileNav: "Мобільна навігація",
      homeLink: "Boweb, на головну",
      backToTop: "Boweb, нагору",
    },

    headerCta: "Розрахувати проєкт",

    hero: {
      eyebrow: "Інноваційна digital agency",
      lineLeft: "digital",
      lineRight: "agency",
      lead: "Агенція повного циклу: дизайн, веб-розробка, просування та аналітика. Створюємо продукти, що працюють на результат.",
      ctaPrimary: "Розрахувати проєкт",
      ctaSecondary: "Дивитись cases",
      figureAlt: "Фігура Boweb",
    },

    about: {
      // Each word is rendered individually for the scroll text-fill effect.
      words:
        "Ми full cycle digital агенція. Design, що приводить клієнтів. Code, що тримає навантаження. Marketing, що рахує гроші. Analytics, що перетворює здогадки на рішення. Одна команда, що випускає продукти, які працюють на результат.".split(
          " ",
        ),
    },

    stats: {
      items: [
        { target: 50, suffix: "+", label: "Проектів реалізовано" },
        { target: 10, suffix: "", label: "Років досвіду" },
        { target: 95, suffix: "%", label: "Задоволених клієнтів" },
        { target: 30, suffix: "+", label: "Спеціалістів у команді" },
      ],
    },

    services: {
      eyebrow: "Services",
      title: "Що ми робимо",
      sub: "Шість напрямків, один результат: ваш продукт зростає.",
      list: [
        {
          idx: "01",
          name: "Дизайн",
          desc: "Брендинг, UX/UI та візуальні системи, що виглядають дорого і працюють зрозуміло.",
          features: [
            "Брендинг та візуальна ідентичність",
            "UX/UI дизайн інтерфейсів",
            "Дизайн-системи для масштабування",
            "Прототипування та тестування",
          ],
        },
        {
          idx: "02",
          name: "Розробка сайтів",
          desc: "Швидкі, надійні сайти та продукти на сучасному стеку, готові до масштабування.",
          features: [
            "Сайти на WordPress та кастомний код",
            "Інтернет-магазини",
            "Інтеграції та API",
            "Оптимізація швидкості",
          ],
        },
        {
          idx: "03",
          name: "Просування",
          desc: "SEO та performance marketing: трафік, що перетворюється на заявки та продажі.",
          features: [
            "SEO-оптимізація",
            "Performance marketing (Google/Meta Ads)",
            "Контент-маркетинг",
            "Аналітика кампаній",
          ],
        },
        {
          idx: "04",
          name: "Аналіз",
          desc: "Аналітика та research: рішення на даних, а не на здогадках.",
          features: [
            "Веб-аналітика (GA4, Tag Manager)",
            "А/Б тестування",
            "Дослідження користувачів",
            "Звіти та дашборди",
          ],
        },
        {
          idx: "05",
          name: "Контент",
          desc: "Копірайтинг, UX-тексти та контент-стратегія, що говорять мовою клієнта.",
          features: [
            "Копірайтинг для сайтів",
            "UX-тексти та мікрокопі",
            "Контент-стратегія",
            "SEO-тексти",
          ],
        },
        {
          idx: "06",
          name: "Підтримка",
          desc: "Супровід після запуску: оновлення, моніторинг і постійні покращення.",
          features: [
            "Моніторинг та оновлення",
            "Технічна підтримка",
            "Регулярні бекапи",
            "Поступові покращення",
          ],
        },
      ],
    },

    cases: {
      eyebrow: "Cases",
      title: "Вибрані роботи",
      all: "Всі cases",
      items: [
        {
          slug: "nuelle-nue",
          url: "https://nuelle.com.ua/",
          img: "/images/case-nuelle.jpg",
          cat: "Дизайн, WordPress, SEO",
          title: "Nuelle&Nue",
          alt: "Nuelle&Nue, інтернет-магазин жіночої білизни на WordPress",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress + WooCommerce",
          design: "Власний дизайн",
          roles: ["Дизайн", "Розробка", "SEO", "Деплой"],
          description:
            "Інтернет-магазин жіночої білизни: кастомна тема WordPress на WooCommerce, каталог на 300+ моделей, швидке додавання в кошик і розмірна сітка. Дизайн, розробка, SEO та запуск.",
        },
        {
          slug: "bropicer",
          url: "https://bropicer.vercel.app",
          img: "/images/case-bropicer.jpg",
          cat: "Дизайн, розробка",
          title: "BROPICER",
          alt: "BROPICER, крафтова пивоварня — дизайн і розробка сайту",
          categories: ["design", "webdev"],
          platform: "Vanilla (HTML/CSS/JS)",
          design: "Власний дизайн",
          roles: ["Дизайн", "Розробка", "Деплой"],
          description:
            "Промо-сайт крафтової пивоварні: чорно-біла естетика, велика типографіка й макрозйомка пляшки. Дизайн, верстка та деплой на Vercel.",
        },
        {
          slug: "ostero-gloves",
          url: "https://www.ostero-gloves.com/",
          img: "/images/case-2.png",
          cat: "Дизайн, WordPress, SEO",
          title: "Ostero Gloves",
          alt: "Ostero Gloves, повний цикл розробки на WordPress",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress",
          design: "Власний дизайн",
          roles: ["Дизайн", "Розробка", "SEO", "Деплой"],
          description:
            "Повний цикл проєкту: дизайн, розробка теми WordPress, SEO-оптимізація та деплой — від ідеї до робочого сайту.",
        },
        {
          slug: "sppes",
          url: "https://sppes.pl/",
          img: "/images/case-3.png",
          cat: "Дизайн, WordPress, SEO",
          title: "SPPES",
          alt: "SPPES, повний цикл розробки на WordPress",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress",
          design: "Власний дизайн",
          roles: ["Дизайн", "Розробка", "SEO", "Деплой"],
          description:
            "Повний цикл проєкту: дизайн, розробка теми WordPress, SEO-оптимізація та деплой — від ідеї до робочого сайту.",
        },
        {
          slug: "rock-code",
          url: "https://www.figma.com/design/BlACsdo78Eh2C68vXPktUD/CODE-ROCK-%7C-BO-Team",
          img: "/images/case-8.png",
          cat: "Дизайн, концепт",
          title: "Rock Code",
          alt: "Rock Code, дизайн-концепт сайту для web-студії",
          categories: ["design"],
          platform: "Figma (концепт)",
          design: "Власний дизайн",
          roles: ["Дизайн"],
          description:
            "Дизайн-концепт сайту для web-студії: брутальна типографіка, текстура каменю та чорно-біла палітра. Розробка в код ще не виконувалась.",
        },
      ],
    },

    casesPage: {
      eyebrow: "Cases",
      title: "Усі кейси",
      lead: "Фільтруйте за типом роботи, щоб швидше знайти схожий на ваш проєкт.",
      filterAll: "Усі",
      back: "Всі cases",
      visit: "Переглянути сайт",
      platformLabel: "Платформа",
      designLabel: "Дизайн",
      roleLabel: "Роль",
      filters: {
        wordpress: "WordPress",
        design: "Дизайн",
        webdev: "Розробка",
        seo: "SEO",
      },
    },

    price: {
      eyebrow: "Price",
      title: "Скільки коштує сайт",
      lead: "Оберіть тип сайту, який вам потрібен, — ціна одразу зрозуміла. Точну суму назвемо після короткого brief.",
      cta: "Обрати",
      requestFor: "Заявка на тариф",
      thanksTitle: "Дякуємо!",
      thanksClose: "Закрити",
      tiers: [
        {
          name: "Лендінг / одна сторінка",
          forWhom: "Швидкий запуск, акція, перевірка ідеї",
          price: "від $800",
          features: [
            "1 сторінка під ключ",
            "Готовий дизайн",
            "Форма заявки",
            "Запуск за 1-2 тижні",
          ],
          featured: false,
        },
        {
          name: "Сайт на WordPress",
          forWhom: "Сайт-візитка чи кілька сторінок для бізнесу",
          price: "від $1 800",
          features: [
            "До 6-8 сторінок",
            "Зручна CMS - редагуєте самі",
            "Адаптив під телефони",
            "Базове SEO",
          ],
          featured: true,
          chip: "популярний",
        },
        {
          name: "Інтернет-магазин",
          forWhom: "Каталог товарів, оплата, доставка",
          price: "від $3 500",
          features: [
            "Каталог і картки товарів",
            "Оплата онлайн",
            "Кабінет клієнта",
            "Інтеграція з доставкою",
          ],
          featured: false,
        },
        {
          name: "Сайт на коді (без CMS)",
          forWhom: "Складна логіка, своя система, висока швидкість",
          price: "від $6 000",
          features: [
            "Кастомна розробка (React/Next.js)",
            "Будь-яка складність функціоналу",
            "Максимальна швидкість сайту",
            "Готовий до масштабування",
          ],
          featured: false,
        },
        {
          name: "Дизайн окремо",
          forWhom: "Якщо розробку робите самі або інша команда",
          price: "від $900",
          features: [
            "UI/UX дизайн усіх сторінок",
            "Адаптив для мобільних",
            "Готові макети для розробника",
          ],
          featured: false,
        },
        {
          name: "SEO та аналітика",
          forWhom: "Просування готового сайту, звітність",
          price: "від $500 / міс",
          features: [
            "Аудит та SEO-оптимізація",
            "Налаштування аналітики",
            "Щомісячний звіт",
          ],
          featured: false,
        },
      ],
    },

    calculator: {
      title: "Розрахунок вартості проєкту",
      stepPrefix: "Крок",
      stepOf: "з",
      back: "Назад",
      next: "Далі",
      stepTitles: [
        "Який тип сайту вам потрібен?",
        "Скільки сторінок чи секцій?",
        "Додаткові фічі",
        "Терміни виконання",
      ],
      siteTypes: [
        {
          name: "Лендінг / одна сторінка",
          desc: "Швидкий запуск, акція, перевірка ідеї",
          base: 800,
        },
        {
          name: "Сайт на WordPress",
          desc: "Сайт-візитка чи кілька сторінок для бізнесу",
          base: 1800,
        },
        {
          name: "Інтернет-магазин",
          desc: "Каталог товарів, оплата, доставка",
          base: 3500,
        },
        {
          name: "Сайт на коді (без CMS)",
          desc: "Складна логіка, своя система, висока швидкість",
          base: 6000,
        },
      ],
      pageCounts: [
        { name: "1-3 сторінки", add: 0 },
        { name: "4-7 сторінок", add: 300 },
        { name: "8-15 сторінок", add: 700 },
        { name: "15+ сторінок", add: 1500 },
      ],
      features: [
        { name: "Багатомовність (UA/EN)", add: 300 },
        { name: "CMS / адмінка для контенту", add: 400 },
        { name: "Анімації та інтерактив", add: 500 },
        { name: "Інтеграції (CRM, оплата)", add: 400 },
        { name: "SEO-пакет на старті", add: 300 },
      ],
      timelines: [
        { name: "Стандартні терміни (3-6 тижнів)", mult: 1 },
        { name: "Прискорені терміни (1-2 тижні)", mult: 1.25 },
      ],
      resultTitle: "Орієнтовна вартість проєкту",
      resultNote:
        "Це орієнтовний розрахунок. Точну суму назвемо після короткого brief.",
      submit: "Надіслати заявку",
      thanksTitle: "Дякуємо!",
      thanksText:
        "Ми звʼяжемося з вами протягом 24 годин з деталізованою пропозицією.",
      thanksClose: "Закрити",
    },

    blog: {
      titleLine1: "Думки",
      titleLine2: "та інсайти",
      all: "Усі статті",
      posts: [
        {
          slug: "website-price-lviv-2026",
          cat: "Business",
          date: "08.09.2026",
          title: "Скільки коштує сайт-візитка у Львові в 2026",
          link: "Читати →",
          img: "/images/blog-analytics.jpg",
        },
        {
          slug: "design-system-budget",
          cat: "Design",
          date: "12.05.2026",
          title: "Як дизайн-система економить бюджет продукту",
          link: "Читати →",
          img: "/images/blog-design.jpg",
        },
        {
          slug: "core-web-vitals-2026",
          cat: "Development",
          date: "28.04.2026",
          title: "Core Web Vitals: що впливає на конверсію у 2026",
          link: "Читати →",
          img: "/images/blog-development.jpg",
        },
      ],
    },

    newsPage: {
      eyebrow: "Blog",
      title: "Усі новини",
      lead: "Думки, інсайти та новини команди Boweb - все в одному місці.",
      back: "Усі новини",
      prevLabel: "Читати попередню",
      nextLabel: "Читати наступну",
      items: [
        {
          slug: "website-price-lviv-2026",
          cat: "Business",
          date: "08.09.2026",
          title: "Скільки коштує сайт-візитка у Львові в 2026",
          excerpt:
            "Реальні ціни на сайт-візитку у Львові: від шаблону за кілька тисяч до розробки під ключ, і чому дешевше не завжди дешевше.",
          img: "/images/blog-analytics.jpg",
          body: [
            "Ціна сайту-візитки у Львові починається з двох цифр, які важко порівняти між собою: шаблон на конструкторі за кілька тисяч гривень і розробка під ключ від $800. Різниця не в «накрутці» - а в тому, що саме входить у ціну і хто відповідає за результат після запуску.",
            "## З чого складається ціна сайту",
            "За сумою в комерційній пропозиції стоїть кілька окремих робіт. У дешевих рішеннях частину з них просто пропускають - тому й виходить дешевше.",
            "- Дизайн - структура сторінок, перший екран, вигляд на телефоні. Саме він відрізняє ваш сайт від сайту конкурента поруч у видачі.",
            "- Розробка - верстка, швидкість, форми заявки, підключення пошти й месенджерів.",
            "- Тексти й контент - без них навіть гарний сайт не продає. Фото робіт чи товарів зазвичай теж потрібні від вас.",
            "- Технічна база SEO - структура заголовків, мікророзмітка, sitemap, швидкість завантаження. Без неї сайт просто не буде видно в Google.",
            "- Домен і хостинг - 500-1500 грн на рік, це окремі витрати від розробки.",
            "- Підтримка після запуску - оновлення, дрібні правки, резервні копії.",
            "## Шаблон, конструктор чи розробка під ключ",
            "Шаблонний сайт - це готовий дизайн, у який вставляють ваш текст і фото. Швидко й дешево, але майже однаковий у половини конкурентів, і зазвичай повільний на мобільному - а швидкість прямо впливає на позиції в Google.",
            "Конструктор на кшталт Wix чи Tilda - нормальний варіант, щоб перевірити ідею або швидко зробити сторінку під акцію. Мінус у тому, що ви орендуєте платформу: щомісячна плата, обмеження в структурі й складнощі, коли бізнес переростає шаблон.",
            "Розробка під ключ - дизайн під ваш бізнес, ваша структура сторінок і керування контентом через адмінку. Дорожче на старті, але сайт лишається вашим і його можна розвивати роками.",
            "Просте правило: якщо сайт потрібен «щоб був» - вистачить конструктора. Якщо сайт має приводити клієнтів і конкурувати у видачі - потрібна розробка.",
            "## Скільки це коштує у нас",
            "- Лендінг або сайт-візитка на одну сторінку - від $800, запуск за 1-2 тижні.",
            "- Сайт на WordPress до 6-8 сторінок з адмінкою - від $1 800.",
            "- Інтернет-магазин з онлайн-оплатою й доставкою - від $3 500.",
            "- Сайт на коді без CMS (React/Next.js) - від $6 000.",
            "- Дизайн окремо, якщо розробку робить інша команда - від $900.",
            "- SEO та аналітика після запуску - від $500 на місяць.",
            "Це стартові суми. Точну називаємо після короткої розмови про задачу - зазвичай вистачає 15 хвилин, щоб зрозуміти обсяг робіт.",
            "## Що впливає на кінцеву суму",
            "- Кількість сторінок і унікальних шаблонів - десять однотипних карток товару дешевші за три різні сторінки.",
            "- Друга мова - це плюс приблизно третина роботи над контентом і перевіркою верстки.",
            "- Інтеграції: CRM, онлайн-оплата, каталог, бронювання, синхронізація з обліковою системою.",
            "- Готовність контенту - тексти й фото від вас чи писати й знімати треба нам.",
            "- Анімації та складність першого екрану.",
            "- Терміни: зробити «на вчора» завжди дорожче, ніж спокійно за графіком.",
            "## Скільки часу займає розробка",
            "Візитка - 1-2 тижні, сайт на WordPress - 3-5 тижнів, інтернет-магазин - від 6 тижнів. Найчастіше графік зсуває не розробка, а очікування текстів і фото від клієнта - тому ми просимо зібрати контент ще на старті.",
            "## Чи вигідно це вашому бізнесу",
            "Дешевше не завжди дешевше: сайт, який погано ранжується або не перетворює відвідувача на заявку, коштує бізнесу більше втраченими клієнтами, ніж різниця в ціні розробки.",
            "Порахуйте просто: скільки ви заробляєте з одного клієнта і скільки таких клієнтів потрібно, щоб сайт окупився. Для більшості послуг у Львові це 2-5 замовлень - тобто окупність за кілька місяців, а не років.",
            "Потрібна конкретна цифра під вашу задачу - напишіть нам через форму на сайті або пройдіть калькулятор вартості: він дає орієнтир за хвилину.",
          ],
        },
        {
          slug: "design-system-budget",
          cat: "Design",
          date: "12.05.2026",
          title: "Як дизайн-система економить бюджет продукту",
          excerpt:
            "Брендинг, UX/UI та візуальні системи, що виглядають дорого і працюють зрозуміло.",
          img: "/images/blog-design.jpg",
          body: [
            "Дизайн-система - це не файл зі стилями, а спільна мова між дизайном і розробкою. Коли кожен компонент описаний один раз і використовується скрізь, команда перестає винаходити кнопку заново на кожному екрані.",
            "На практиці це означає менше годин на узгодження дрібниць і більше часу на сам продукт. Брендинг, UX/UI та візуальні системи, що виглядають дорого, насправді економлять бюджет, бо рішення приймаються один раз, а не щотижня.",
            "Найбільший виграш помітний на масштабі: коли в продукті 20+ екранів, послідовність стає різницею між зрозумілим інтерфейсом і хаосом, який лякає нових користувачів.",
          ],
        },
        {
          slug: "core-web-vitals-2026",
          cat: "Development",
          date: "28.04.2026",
          title: "Core Web Vitals: що впливає на конверсію у 2026",
          excerpt:
            "Швидкість завантаження й стабільність верстки прямо впливають на те, скільки відвідувачів залишають заявку.",
          img: "/images/blog-development.jpg",
          body: [
            "Швидкість завантаження й стабільність верстки прямо впливають на те, скільки відвідувачів залишають заявку, а скільки йдуть до конкурента ще до того, як сторінка домалювалась.",
            "Найчастіша помилка - оптимізувати лише швидкість першого рендеру, ігноруючи зсуви макета під час завантаження шрифтів і картинок. Саме вони найбільше дратують користувачів на мобільному.",
            "Практичний мінімум: стиснені зображення сучасних форматів, шрифти з коректним fallback і явні розміри для медіа-блоків - це закриває більшість проблем без глибокого рефакторингу.",
          ],
        },
        {
          slug: "brand-metrics-that-matter",
          cat: "Analytics",
          date: "09.04.2026",
          title: "Метрики, які насправді варто відстежувати бренду",
          excerpt:
            "Аналітика та research: рішення на даних, а не на здогадках.",
          img: "/images/blog-analytics.jpg",
          body: [
            "Більшість дашбордів показують цифри, які приємно дивитись, але не допомагають приймати рішення. Перегляди сторінки - марнославна метрика, якщо вона не пов'язана з тим, що відвідувач робить далі.",
            "Аналітика та research цінні лише тоді, коли рішення на даних замінюють здогадки - наприклад, які кроки воронки реально втрачають клієнтів, а не просто скільки людей зайшло на сайт.",
            "Почніть з трьох метрик, які напряму пов'язані з грошима: вартість заявки, конверсія в клієнта і середній чек. Решта - контекст, а не ціль.",
          ],
        },
        {
          slug: "metrics-before-campaign-launch",
          cat: "SEO",
          date: "22.03.2026",
          title: "5 метрик, які варто перевірити перед запуском кампанії",
          excerpt:
            "SEO та performance marketing: трафік, що перетворюється на заявки та продажі.",
          img: "/images/blog-analytics.jpg",
          body: [
            "SEO та performance marketing працюють разом тільки тоді, коли трафік, що приходить, реально перетворюється на заявки та продажі - інакше це просто дорогі відвідування.",
            "Перед запуском кампанії варто перевірити: швидкість посадкової сторінки, коректність аналітичних подій, релевантність ключових слів аудиторії, налаштування ретаргетингу і чіткий call-to-action.",
            "Пропуск хоча б одного з цих пунктів зазвичай означає, що бюджет згорає на трафік, який ніколи не конвертується - і це видно лише за тиждень-два, коли вже пізно щось виправляти без втрат.",
          ],
        },
        {
          slug: "minimalism-sells-better",
          cat: "Design",
          date: "06.03.2026",
          title: "Чому мінімалізм продає краще за складний дизайн",
          excerpt:
            "Менше елементів - чіткіша ієрархія, і відвідувач швидше розуміє, що від нього хочуть.",
          img: "/images/blog-design.jpg",
          body: [
            "Складний дизайн часто сприймається як ознака серйозності бренду, але на практиці він просто розмиває увагу. Менше елементів - чіткіша ієрархія, і відвідувач швидше розуміє, що від нього хочуть.",
            "Мінімалізм не означає порожню сторінку - він означає, що кожен елемент має причину бути там. Зайва іконка чи третій банер відволікають від головної дії, яку має зробити користувач.",
            "У наших проєктах прибирання зайвого зазвичай піднімає конверсію більше, ніж додавання нових фіч - просто бо шлях до кнопки стає коротшим.",
          ],
        },
        {
          slug: "wordpress-or-custom-development",
          cat: "Development",
          date: "18.02.2026",
          title: "WordPress чи кастомна розробка: як обрати правильно",
          excerpt:
            "Кастомна розробка (React/Next.js): будь-яка складність функціоналу й максимальна швидкість сайту.",
          img: "/images/blog-development.jpg",
          body: [
            "WordPress підходить, коли потрібен сайт-візитка чи блог, який команда сама редагуватиме без розробника. Це швидше і дешевше для типових задач.",
            "Кастомна розробка (React/Next.js) виграє, коли потрібна будь-яка складність функціоналу й максимальна швидкість сайту - наприклад, складні інтеграції, нетипова логіка чи високе навантаження.",
            "Помилка - обирати стек заздалегідь, не описавши задачу. Спочатку формулюємо, що сайт має робити через рік, і вже під це підбираємо технологію, а не навпаки.",
          ],
        },
      ],
    },

    contacts: {
      titleLine1: "Маєте ідею?",
      titleLine2: "Давайте обговоримо",
      lead: "Розкажіть про задачу: відповімо протягом 24 годин і запропонуємо рішення.",
      location: "Львів · Україна / remote worldwide",
      nameLabel: "Ваше імʼя",
      emailLabel: "Email",
      budgetLabel: "Бюджет (необовʼязково)",
      messageLabel: "Розкажіть про проєкт",
      submit: "Надіслати заявку",
      note: "Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності.",
      success: "Дякуємо! Ми звʼяжемося з вами протягом 24 годин.",
      sending: "Надсилаємо…",
      error: "Не вдалося надіслати. Спробуйте ще раз або напишіть на hello@boweb.com.ua.",
      thanksTitle: "Дякуємо!",
      thanksClose: "Закрити",
    },

    footer: {
      tag: "Innovative digital agency for brands in products.",
      madeIn: "Зроблено з ❤ у Львові",
    },
  },

  en: {
    metaTitle: "Boweb — Web Design, Development & SEO Agency",
    metaDescription:
      "Full-cycle digital agency: website design and development, SEO and analytics. We build sites that bring in clients. Based in Lviv, working across Ukraine and worldwide.",
    skipLink: "Skip to content",
    cursorLabel: "view",

    notFound: {
      title: "Page not found",
      lead: "It may have been moved, or it never existed. Check the address or head back to the homepage.",
      cta: "Back home",
    },

    nav: {
      about: "About",
      services: "Services",
      cases: "Cases",
      price: "Price",
      blog: "Blog",
      contacts: "Contacts",
      openMenu: "Open menu",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
      homeLink: "Boweb, home",
      backToTop: "Boweb, back to top",
    },

    headerCta: "Calculate project",

    hero: {
      eyebrow: "Innovative digital agency",
      lineLeft: "digital",
      lineRight: "agency",
      lead: "A full cycle digital agency: design, web development, promotion and analysis. We make products that work for results.",
      ctaPrimary: "Calculate project",
      ctaSecondary: "View cases",
      figureAlt: "Boweb figure",
    },

    about: {
      words:
        "We are a full cycle digital agency. Design that brings clients. Code that holds the load. Marketing that counts the money. Analytics that turns guesses into decisions. One team that ships products which work for results.".split(
          " ",
        ),
    },

    stats: {
      items: [
        { target: 50, suffix: "+", label: "Projects delivered" },
        { target: 10, suffix: "", label: "Years of experience" },
        { target: 95, suffix: "%", label: "Happy clients" },
        { target: 30, suffix: "+", label: "Specialists on the team" },
      ],
    },

    services: {
      eyebrow: "Services",
      title: "What we do",
      sub: "Six directions, one result: your product grows.",
      list: [
        {
          idx: "01",
          name: "Design",
          desc: "Branding, UX/UI and visual systems that look premium and work clearly.",
          features: [
            "Branding and visual identity",
            "UX/UI interface design",
            "Design systems for scale",
            "Prototyping and testing",
          ],
        },
        {
          idx: "02",
          name: "Web development",
          desc: "Fast, reliable websites and products on a modern stack, ready to scale.",
          features: [
            "WordPress and custom-coded sites",
            "Online stores",
            "Integrations and APIs",
            "Performance optimization",
          ],
        },
        {
          idx: "03",
          name: "Promotion",
          desc: "SEO and performance marketing: traffic that turns into leads and sales.",
          features: [
            "SEO optimization",
            "Performance marketing (Google/Meta Ads)",
            "Content marketing",
            "Campaign analytics",
          ],
        },
        {
          idx: "04",
          name: "Analysis",
          desc: "Analytics and research: decisions based on data, not guesses.",
          features: [
            "Web analytics (GA4, Tag Manager)",
            "A/B testing",
            "User research",
            "Reports and dashboards",
          ],
        },
        {
          idx: "05",
          name: "Content",
          desc: "Copywriting, UX copy and content strategy that speak the client's language.",
          features: [
            "Website copywriting",
            "UX copy and microcopy",
            "Content strategy",
            "SEO copy",
          ],
        },
        {
          idx: "06",
          name: "Support",
          desc: "Post-launch support: updates, monitoring and continuous improvements.",
          features: [
            "Monitoring and updates",
            "Technical support",
            "Regular backups",
            "Ongoing improvements",
          ],
        },
      ],
    },

    cases: {
      eyebrow: "Cases",
      title: "Selected work",
      all: "All cases",
      items: [
        {
          slug: "nuelle-nue",
          url: "https://nuelle.com.ua/",
          img: "/images/case-nuelle.jpg",
          cat: "Design, WordPress, SEO",
          title: "Nuelle&Nue",
          alt: "Nuelle&Nue, lingerie online store built on WordPress",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress + WooCommerce",
          design: "In-house design",
          roles: ["Design", "Development", "SEO", "Deployment"],
          description:
            "Lingerie online store: a custom WordPress theme on WooCommerce, a catalogue of 300+ products, quick add-to-cart and a size guide. Design, build, SEO and launch.",
        },
        {
          slug: "bropicer",
          url: "https://bropicer.vercel.app",
          img: "/images/case-bropicer.jpg",
          cat: "Design, development",
          title: "BROPICER",
          alt: "BROPICER, craft brewery — website design and development",
          categories: ["design", "webdev"],
          platform: "Vanilla (HTML/CSS/JS)",
          design: "Custom design",
          roles: ["Design", "Development", "Deploy"],
          description:
            "Promo site for a craft brewery: black-and-white aesthetic, oversized typography and macro bottle shots. Design, build and deploy on Vercel.",
        },
        {
          slug: "ostero-gloves",
          url: "https://www.ostero-gloves.com/",
          img: "/images/case-2.png",
          cat: "Design, WordPress, SEO",
          title: "Ostero Gloves",
          alt: "Ostero Gloves, full-cycle WordPress build",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress",
          design: "In-house design",
          roles: ["Design", "Development", "SEO", "Deployment"],
          description:
            "Full project cycle: design, WordPress theme development, SEO and deployment - from idea to a live site.",
        },
        {
          slug: "sppes",
          url: "https://sppes.pl/",
          img: "/images/case-3.png",
          cat: "Design, WordPress, SEO",
          title: "SPPES",
          alt: "SPPES, full-cycle WordPress build",
          categories: ["wordpress", "design", "webdev", "seo"],
          platform: "WordPress",
          design: "In-house design",
          roles: ["Design", "Development", "SEO", "Deployment"],
          description:
            "Full project cycle: design, WordPress theme development, SEO and deployment - from idea to a live site.",
        },
        {
          slug: "rock-code",
          url: "https://www.figma.com/design/BlACsdo78Eh2C68vXPktUD/CODE-ROCK-%7C-BO-Team",
          img: "/images/case-8.png",
          cat: "Design, concept",
          title: "Rock Code",
          alt: "Rock Code, website design concept for a web studio",
          categories: ["design"],
          platform: "Figma (concept)",
          design: "In-house design",
          roles: ["Design"],
          description:
            "Website design concept for a web studio: brutalist typography, rock texture, and a black-and-white palette. Not yet built in code.",
        },
      ],
    },

    casesPage: {
      eyebrow: "Cases",
      title: "All cases",
      lead: "Filter by type of work to find a project similar to yours faster.",
      filterAll: "All",
      back: "All cases",
      visit: "Visit site",
      platformLabel: "Platform",
      designLabel: "Design",
      roleLabel: "Role",
      filters: {
        wordpress: "WordPress",
        design: "Design",
        webdev: "Development",
        seo: "SEO",
      },
    },

    price: {
      eyebrow: "Price",
      title: "How much does a website cost",
      lead: "Pick the type of website you need - the price is clear right away. We confirm the exact number after a short brief.",
      cta: "Choose",
      requestFor: "Request a plan",
      thanksTitle: "Thank you!",
      thanksClose: "Close",
      tiers: [
        {
          name: "Landing page / one-pager",
          forWhom: "Fast launch, a promo, testing an idea",
          price: "from $800",
          features: [
            "1 turnkey page",
            "Ready-made design",
            "Lead form",
            "Launch in 1-2 weeks",
          ],
          featured: false,
        },
        {
          name: "WordPress website",
          forWhom: "A business website with a few pages",
          price: "from $1,800",
          features: [
            "Up to 6-8 pages",
            "Easy CMS - edit it yourself",
            "Mobile-friendly",
            "Basic SEO",
          ],
          featured: true,
          chip: "popular",
        },
        {
          name: "Online store",
          forWhom: "Product catalog, payments, shipping",
          price: "from $3,500",
          features: [
            "Catalog and product pages",
            "Online payments",
            "Customer account",
            "Shipping integration",
          ],
          featured: false,
        },
        {
          name: "Custom-coded website",
          forWhom: "Complex logic, a custom system, maximum speed",
          price: "from $6,000",
          features: [
            "Custom build (React/Next.js)",
            "Any level of functionality",
            "Maximum site performance",
            "Built to scale",
          ],
          featured: false,
        },
        {
          name: "Design only",
          forWhom: "If you (or another team) handle the build",
          price: "from $900",
          features: [
            "UI/UX design for every page",
            "Mobile-ready layouts",
            "Dev-ready handoff files",
          ],
          featured: false,
        },
        {
          name: "SEO & analytics",
          forWhom: "Promoting an existing site, with reporting",
          price: "from $500 / mo",
          features: [
            "Audit and SEO optimization",
            "Analytics setup",
            "Monthly report",
          ],
          featured: false,
        },
      ],
    },

    calculator: {
      title: "Project cost calculator",
      stepPrefix: "Step",
      stepOf: "of",
      back: "Back",
      next: "Next",
      stepTitles: [
        "What type of website do you need?",
        "How many pages or sections?",
        "Extra features",
        "Timeline",
      ],
      siteTypes: [
        {
          name: "Landing page / one-pager",
          desc: "Fast launch, a promo, testing an idea",
          base: 800,
        },
        {
          name: "WordPress website",
          desc: "A business card site or a few pages for a business",
          base: 1800,
        },
        {
          name: "Online store",
          desc: "Product catalog, payments, delivery",
          base: 3500,
        },
        {
          name: "Custom-coded website (no CMS)",
          desc: "Complex logic, a custom system, top speed",
          base: 6000,
        },
      ],
      pageCounts: [
        { name: "1-3 pages", add: 0 },
        { name: "4-7 pages", add: 300 },
        { name: "8-15 pages", add: 700 },
        { name: "15+ pages", add: 1500 },
      ],
      features: [
        { name: "Multilingual (UA/EN)", add: 300 },
        { name: "CMS / content admin panel", add: 400 },
        { name: "Animation and interactivity", add: 500 },
        { name: "Integrations (CRM, payments)", add: 400 },
        { name: "SEO starter package", add: 300 },
      ],
      timelines: [
        { name: "Standard timeline (3-6 weeks)", mult: 1 },
        { name: "Rush timeline (1-2 weeks)", mult: 1.25 },
      ],
      resultTitle: "Estimated project cost",
      resultNote:
        "This is a ballpark estimate. We'll confirm the exact number after a short brief.",
      submit: "Send request",
      thanksTitle: "Thank you!",
      thanksText:
        "We'll get back to you within 24 hours with a detailed proposal.",
      thanksClose: "Close",
    },

    blog: {
      titleLine1: "Thoughts",
      titleLine2: "& insights",
      all: "All articles",
      posts: [
        {
          slug: "website-price-lviv-2026",
          cat: "Business",
          date: "08.09.2026",
          title: "How much does a business website cost in Lviv (2026)",
          link: "Read →",
          img: "/images/blog-analytics.jpg",
        },
        {
          slug: "design-system-budget",
          cat: "Design",
          date: "12.05.2026",
          title: "How a design system saves your product budget",
          link: "Read →",
          img: "/images/blog-design.jpg",
        },
        {
          slug: "core-web-vitals-2026",
          cat: "Development",
          date: "28.04.2026",
          title: "Core Web Vitals: what affects conversion in 2026",
          link: "Read →",
          img: "/images/blog-development.jpg",
        },
      ],
    },

    newsPage: {
      eyebrow: "Blog",
      title: "All news",
      lead: "Thoughts, insights and news from the Boweb team - all in one place.",
      back: "All news",
      prevLabel: "Read previous",
      nextLabel: "Read next",
      items: [
        {
          slug: "website-price-lviv-2026",
          cat: "Business",
          date: "08.09.2026",
          title: "How much does a business website cost in Lviv (2026)",
          excerpt:
            "Real pricing for a small business website in Lviv - from template builders to custom development, and why cheaper isn't always cheaper.",
          img: "/images/blog-analytics.jpg",
          body: [
            "The price of a small business website in Lviv starts at two numbers that are hard to compare: a template-builder site for a few thousand hryvnias, and a custom build from $800. The gap isn't markup - it's what's actually included, and who is responsible for the result after launch.",
            "## What the price is actually made of",
            "Behind the number in a proposal sits a set of separate jobs. Cheap offers simply skip some of them - that is where the lower price comes from.",
            "- Design - page structure, the first screen, how it looks on a phone. This is what separates your site from the competitor listed next to you.",
            "- Development - markup, speed, lead forms, email and messenger notifications.",
            "- Copy and content - without them even a beautiful site doesn't sell. Photos of your work or products are usually on you.",
            "- SEO foundations - heading structure, schema markup, sitemap, loading speed. Without them Google simply won't show the site.",
            "- Domain and hosting - roughly $15-40 a year, separate from the build.",
            "- Post-launch support - updates, small edits, backups.",
            "## Template, website builder, or custom build",
            "A template site is a ready-made design with your text and photos dropped in. Fast and cheap, but nearly identical to half your competitors, and usually slow on mobile - and speed directly affects your Google ranking.",
            "A builder like Wix or Tilda is a fair choice to validate an idea or launch a quick campaign page. The catch is that you rent the platform: a monthly fee, a fixed structure, and friction once the business outgrows the template.",
            "A custom build means a design made for your business, your page structure, and content you manage through an admin panel. More expensive up front, but the site stays yours and can grow for years.",
            "A simple rule: if you need a site just to exist, a builder is enough. If the site has to bring in clients and compete in search, you need a real build.",
            "## What it costs with us",
            "- A landing page or one-page business site - from $800, live in 1-2 weeks.",
            "- A WordPress site of up to 6-8 pages with an admin panel - from $1,800.",
            "- An online store with payments and delivery - from $3,500.",
            "- A coded site without a CMS (React/Next.js) - from $6,000.",
            "- Design only, when another team handles development - from $900.",
            "- SEO and analytics after launch - from $500 per month.",
            "These are starting figures. We confirm the exact number after a short conversation about the task - 15 minutes is usually enough to scope it.",
            "## What moves the final number",
            "- The number of pages and unique templates - ten similar product cards cost less than three different pages.",
            "- A second language - roughly a third more work on content and layout checks.",
            "- Integrations: CRM, online payments, catalogue, booking, accounting sync.",
            "- Content readiness - whether the copy and photos come from you or we produce them.",
            "- Animation and how complex the first screen is.",
            "- Timeline: needing it yesterday always costs more than a calm schedule.",
            "## How long it takes",
            "A business card site - 1-2 weeks, a WordPress site - 3-5 weeks, an online store - 6 weeks and up. What usually delays a project isn't development, it's waiting on copy and photos - which is why we ask for content at the start.",
            "## Does it pay off",
            "Cheaper isn't always cheaper: a site that ranks poorly or doesn't convert visitors into leads costs your business more in lost customers than the difference in build price.",
            "Do the simple math: what one client is worth to you, and how many of them it takes for the site to pay for itself. For most service businesses in Lviv that's 2-5 orders - months, not years.",
            "If you want a concrete number for your case, send us a message through the form or run the project calculator: it gives you a ballpark in a minute.",
          ],
        },
        {
          slug: "design-system-budget",
          cat: "Design",
          date: "12.05.2026",
          title: "How a design system saves your product budget",
          excerpt:
            "Branding, UX/UI and visual systems that look premium and work clearly.",
          img: "/images/blog-design.jpg",
          body: [
            "A design system isn't a file full of styles - it's a shared language between design and engineering. Once every component is defined once and reused everywhere, the team stops reinventing the same button on every screen.",
            "In practice that means fewer hours spent aligning on small details and more time on the actual product. Branding, UX/UI and visual systems that look premium actually save budget, because decisions get made once instead of every week.",
            "The payoff is biggest at scale: once a product has 20+ screens, consistency is the difference between an interface people understand and one that scares new users away.",
          ],
        },
        {
          slug: "core-web-vitals-2026",
          cat: "Development",
          date: "28.04.2026",
          title: "Core Web Vitals: what affects conversion in 2026",
          excerpt:
            "Load speed and layout stability directly affect how many visitors leave a request.",
          img: "/images/blog-development.jpg",
          body: [
            "Load speed and layout stability directly affect how many visitors leave a request - and how many leave for a competitor before the page even finishes rendering.",
            "The most common mistake is optimizing only for first render speed while ignoring layout shifts caused by fonts and images loading in. Those are exactly what annoys mobile users the most.",
            "A practical baseline: compressed modern image formats, fonts with a sane fallback, and explicit sizes for media blocks - that alone closes most of the gap without a deep rebuild.",
          ],
        },
        {
          slug: "brand-metrics-that-matter",
          cat: "Analytics",
          date: "09.04.2026",
          title: "Metrics a brand should actually track",
          excerpt:
            "Analytics and research: decisions based on data, not guesses.",
          img: "/images/blog-analytics.jpg",
          body: [
            "Most dashboards show numbers that are pleasant to look at but don't help anyone decide anything. Page views are a vanity metric unless they're tied to what the visitor does next.",
            "Analytics and research only matter when decisions based on data replace guesses - for example, which funnel steps are actually losing customers, not just how many people landed on the site.",
            "Start with three metrics tied directly to revenue: cost per lead, lead-to-customer conversion, and average order value. Everything else is context, not a target.",
          ],
        },
        {
          slug: "metrics-before-campaign-launch",
          cat: "SEO",
          date: "22.03.2026",
          title: "5 metrics worth checking before launching a campaign",
          excerpt:
            "SEO and performance marketing: traffic that turns into leads and sales.",
          img: "/images/blog-analytics.jpg",
          body: [
            "SEO and performance marketing only work together when the traffic that arrives actually turns into leads and sales - otherwise it's just an expensive set of visits.",
            "Before launching a campaign, check: landing page speed, correctly configured analytics events, keyword relevance to the audience, retargeting setup, and a clear call to action.",
            "Skipping even one of these usually means the budget burns on traffic that never converts - and that's only visible a week or two in, once it's too late to fix without losses.",
          ],
        },
        {
          slug: "minimalism-sells-better",
          cat: "Design",
          date: "06.03.2026",
          title: "Why minimalism sells better than complex design",
          excerpt:
            "Fewer elements means a clearer hierarchy, and visitors grasp what's being asked of them faster.",
          img: "/images/blog-design.jpg",
          body: [
            "Complex design is often read as a sign of a serious brand, but in practice it just dilutes attention. Fewer elements means a clearer hierarchy, and visitors grasp what's being asked of them faster.",
            "Minimalism doesn't mean an empty page - it means every element earns its place. An extra icon or a third banner pulls focus away from the one action the visitor is supposed to take.",
            "Across our projects, removing clutter usually lifts conversion more than adding new features does - simply because the path to the button gets shorter.",
          ],
        },
        {
          slug: "wordpress-or-custom-development",
          cat: "Development",
          date: "18.02.2026",
          title: "WordPress or custom development: how to choose right",
          excerpt:
            "Custom build (React/Next.js): any level of functionality and maximum site performance.",
          img: "/images/blog-development.jpg",
          body: [
            "WordPress is the right call when you need a brochure site or a blog that the team will edit themselves without a developer. It's faster and cheaper for typical needs.",
            "Custom development (React/Next.js) wins when you need any level of functionality and maximum site performance - complex integrations, unusual logic, or heavy load, for example.",
            "The mistake is picking the stack before the task is even defined. We start by describing what the site needs to do a year from now, then choose the technology to match - not the other way around.",
          ],
        },
      ],
    },

    contacts: {
      titleLine1: "Got an idea?",
      titleLine2: "Let's talk it through",
      lead: "Tell us about the task: we will reply within 24 hours with a solution.",
      location: "Lviv · Ukraine / remote worldwide",
      nameLabel: "Your name",
      emailLabel: "Email",
      budgetLabel: "Budget (optional)",
      messageLabel: "Tell us about the project",
      submit: "Send request",
      note: "By clicking the button you agree to the privacy policy.",
      success: "Thank you! We'll get back to you within 24 hours.",
      sending: "Sending…",
      error: "Could not send. Please try again or email hello@boweb.com.ua.",
      thanksTitle: "Thank you!",
      thanksClose: "Close",
    },

    footer: {
      tag: "Innovative digital agency for brands in products.",
      madeIn: "Made with ❤ in Lviv",
    },
  },
};

export type Dict = typeof translations.uk;
