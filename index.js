const menuToggle = document.querySelector('.menu-icon');
const menuLinks = document.querySelectorAll('.nav a');

document.querySelectorAll('.nav a, .lang-switch button').forEach(el => {;

    el.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

const text = "GN PHOTO STUDIO";
const heroText = document.getElementById("hero-text");

heroText.innerHTML = "";

text.split("").forEach((char, index) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.opacity = 0;
  span.style.transition = `opacity 0.6s ease ${index * 0.1}s`;
  heroText.appendChild(span);
  setTimeout(() => {
    span.style.opacity = 1;
  }, 50);
});

new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    speed: 1500,
});

const toast = document.querySelector(".toast");
let toastTimer = null;

function showToast(msg) {
    toast.textContent = msg;
    toast.style.opacity = "1";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.opacity = "0.75";
    }, 1600);
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    }
}

const strength = 10;
document.querySelectorAll(".chip").forEach((btn) => {
    let rect = null;

    btn.addEventListener(
        "pointerenter",
        () => (rect = btn.getBoundingClientRect())
    );
    btn.addEventListener("pointermove", (e) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tx = (x / (rect.width / 2)) * strength;
        const ty = (y / (rect.height / 2)) * strength;
        btn.style.transform = `translate3d(${tx}px, ${ty}px, 0) translateY(-2px)`;
    });
    btn.addEventListener("pointerleave", () => {
        rect = null;
        btn.style.transform = "";
    });
});

function setupPills() {
    const pills = document.querySelectorAll(".pill");
    pills.forEach((pill) => {
        const icon = pill.querySelector(".pill__icon");
        const content = pill.querySelector(".pill__content");

        const iconW = icon.getBoundingClientRect().width || 56;

        const measure = () => {
            const prev = content.style.opacity;
            content.style.opacity = "1";

            const contentW = content.scrollWidth;
            const pad = 14; 
            const finalW = Math.ceil(iconW + contentW + pad + 6); 
            content.style.opacity = prev;

            pill.style.setProperty("--wExpanded", `${finalW}px`);
        };

        pill.style.setProperty("--w", `${iconW}px`);
        measure();

        pill.addEventListener("mouseenter", () => {
            measure();
            pill.style.setProperty(
                "--w",
                pill.style.getPropertyValue("--wExpanded")
            );
        });

        pill.addEventListener("mouseleave", () => {
            pill.style.setProperty("--w", `${iconW}px`);
        });

        window.addEventListener("resize", () => {
            pill.style.setProperty("--w", `${iconW}px`);
            measure();
        });
    });
}

setupPills();

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.40
  }
);

reveals.forEach(el => observer.observe(el));

const buttons = document.querySelectorAll('.lang-switch button');
const texts = document.querySelectorAll('[data-am]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;

    texts.forEach(el => {
      el.textContent = el.dataset[lang];
    });
  });
});

const translations = {
    hy: {
        nav_home: "Գլխավոր",
        nav_about: "Մեր մասին",
        nav_book: "Ամրագրել",
        nav_contact: "Կապ մեզ հետ",
        nav_works: "Մեր աշխատանքները",
        GN: "Ստեղծիր քո պատմությունը",
        hero_btn: "Ամրագրել",
        banner_data: "GN photo studio.\nՔո ժպիտը՝ մեր լույսի ներքո",
        text_content: "Մեր մասին",
        data_text: "Բարի գալուստ GN PHOTO STUDIO՝ ստեղծագործական մի անկյուն, որտեղ յուրաքանչյուր այցելու դառնումէ գլխավոր հերոս: Մեր ստուդիան հիմնադրվել է մեկ պարզ նպատակով՝ ցույց տալ աշխարհին, որյուրաքանչյուր մարդ, յուրաքանչյուր հայացք և յուրաքանչյուր ժպիտ ունի իր յուրահատուկ լույսը:Մենք մասնագիտացած ենք պրոֆեսիոնալ դիմանկարների, նորաձևության (fashion), ընտանեկան ևանհատական ֆոտոշարքերի մեջ: Օգտագործելով լավագույն տեխնիկան և ստեղծելով հարմարավետ միջավայր՝մենք օգնում ենք ձեզ լինել բնական, ազատ և ինքնավստահ: GN PHOTO STUDIO-ն այն վայրն է, որտեղձեր երազանքի կերպարները դառնում են իրականություն",
        bron_data: "Ընտրիր քո պատմության վայրը",
        title_data: "GN Studio: Երևանյան սրահ",
        subititle_data: "Արժեքը սկսած՝ 12000 ֏",
        description_data: "Ժամանակակից ստուդիա մայրաքաղաքի սրտում՝ պրոֆեսիոնալ լուսավորությամբ և էսթետիկ դիզայնով ձեր յուրաքանչյուր կադրի համար:",
        panel_data: "Կապ մեզ հետ",
        p_data: "հարցերի դեպքում կապվեք մեզ հետ ձեզ հարմար տարբերակով.",
        private_data: "© 2026 GN Photo Studio — Բոլոր իրավունքները պաշտպանված են",
        info: "GN Photo Studio. Տեսնելու արվեստը և պահի հավերժությունը Արագ փոփոխվող այս աշխարհում, որտեղ ամեն ինչ անցողիկ է, միայն հիշողություններն են մնու անփոփոխ: G Photo Studio-ն այն վայրն է, որտեղ ժամանակը կանգ է առնում՝ թույլ տալով մեզ որսալ պահի իրակա էությունը, մարդկային հոգու գեղեցկությունը և զգացմունքների անկեղծություն Սա պարզապես պրոֆեսիոնալ լույսերով և ժամանակակից սարքավորումներով հագեցած տարածք չէ: Սա մ ստեղծագործական արվեստանոց է, որտեղ լույսն ու ստվերը միախառնվում են՝ ստեղծելով իսկակա պատմություններ: Մեր փիլիսոփայությունը պարզ է. մենք չենք անում պարզապես լուսանկարներ, մեն ստեղծու ենք տեսողական ժառանգությու Յուրաքանչյուր կադրում մենք փնտրում ենք այն ներդաշնակությունը, որը սովորական լուսանկար վերածում  արվեստի գործի: Լինի դա նրբագեղ դիմանկար, նորաձևության (fashion) նկարահանում, թե ջեր ընտանեկա պատմություն՝ մեր նպատակն է փոխանցել մթնոլորտը և յուրաքանչյուր հերոսի անհատակա բնավորությունը:",
        root: "Ինչու՞ մենք",
        why_1_title: "Էսթետիկա և ոճ",
        why_1_desc: "Յուրահատուկ ինտերիեր՝ ստեղծված ոգեշնչման և կատարյալ կադրերի համար:",
        why_2_title: "Ուշադրություն դետալներին",
        why_2_desc: "Մենք մտածել ենք ամեն մանրուքի մասին՝ լուսավորությունից մինչև դեկորի հյուսվածքը:",
        why_3_title: "Պրեմիում հարմարավետություն",
        why_3_desc: "Ընդարձակ դիմահարդարման սենյակ, հանգստի գոտի և ամեն ինչ Ձեր հարմարության համար:",
        why_4_title: "Պրոֆեսիոնալ լույս",
        why_4_desc: "Profoto լավագույն սարքավորումներ և գլխիկների լայն ընտրություն ցանկացած խնդրի համար:",
        why_5_title: "Թափանցիկ պայմաններ",
        why_5_desc: "Ոչ մի թաքնված վճար: Դուք վճարում եք միայն այն ամենի համար, ինչ օգտագործում եք:",
        why_6_title: "Ակնթարթային ամրագրում",
        why_6_desc: "Հարմար առցանց օրացույց. ամրագրեք ստուդիան ընդամենը մի քանի քլիքով 24/7:",
    },

    ru: {
        nav_home: "Главная",
        nav_about: "О нас",
        nav_book: "Забронировать",
        nav_contact: "Контакты",
        nav_works: "Наши работы",
        GN: "Создай свою историю",
        hero_btn: "Забронировать",
        banner_data: "GN photo studio.\nТвоя улыбка — в нашем свете",
        text_content: "О нас",
        data_text: "Добро пожаловать в GN PHOTO STUDIO — творческий уголок, где каждый посетитель становится главным героем. Наша студия была основана с одной простой целью: показать миру, что каждый человек, каждый взгляд и каждая улыбка имеют свой уникальный свет. Мы специализируемся на профессиональных портретах, модельной (fashion), семейной и индивидуальной фотосъемке. Используя лучшее оборудование и создавая комфортную атмосферу, мы помогаем вам быть естественными, свободными и уверенными в себе. GN PHOTO STUDIO — это место, где образы вашей мечты становятся реальностью.",
        bron_data: "Выбери место для своей истории",
        title_data: "GN Studio: Ереванский зал",
        subititle_data: "Цена от: 12000 ֏",
        description_data: "Современная студия в самом сердце столицы с профессиональным освещением и эстетичным дизайном для каждого вашего кадра.",
        panel_data: "Свяжитесь с нами",
        p_data: "В случае возникновения вопросов свяжитесь с нами удобным для вас способом.",
        private_data: "© 2026 GN Photo Studio — Все права защищены",
        info: "GN Photo Studio. Искусство видеть и вечность мгновения. В этом быстро меняющемся мире, где всё мимолётно, только воспоминания остаются неизменными. GN Photo Studio — это место, где время останавливается, позволяя нам уловить истинную суть момента, красоту человеческой души и искренность чувств. Это не просто пространство, оснащенное профессиональным светом и современным оборудованием. Это творческая мастерская, где свет и тень переплетаются, создавая настоящие истории. Наша философия проста: мы не просто делаем фотографии, мы создаем визуальное наследие. В каждом кадре мы ищем ту гармонию, которая превращает обычный снимок в произведение искусства. Будь то изысканный портрет, модная (fashion) съемка или теплая семейная история — наша цель передать атмосферу и индивидуальный характер каждого героя.",
        root: "Почему мы?",
        why_1_title: "Эстетика и стиль",
        why_1_desc: "Уникальный интерьер, созданный для вдохновения и идеальных кадров.",
        why_2_title: "Внимание к деталям",
        why_2_desc: "Мы продумали каждую мелочь: от освещения до текстуры декора.",
        why_3_title: "Премиальный комфорт",
        why_3_desc: "Просторная гримерка, зона отдыха и всё необходимое для вашего удобства.",
        why_4_title: "Профессиональный свет",
        why_4_desc: "Топовое оборудование Profoto и большой выбор насадок для любых задач.",
        why_5_title: "Прозрачные условия",
        why_5_desc: "Никаких скрытых доплат. Вы платите только за то, что используете.",
        why_6_title: "Мгновенное бронирование",
        why_6_desc: "Удобный онлайн-календарь: бронируйте студию в пару кликов 24/7.",
    },
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_book: "Book Now",
        nav_contact: "Contact Us",
        nav_works: "Our Works",
        GN: "Create Your Story",
        hero_btn: "Book Now",
        banner_data: "GN photo studio.\nYour smile, in our light",
        text_content: "About Us",
        data_text: "Welcome to GN PHOTO STUDIO—a creative corner where every visitor becomes the main hero. Our studio was founded with one simple goal: to show the world that every person, every look, and every smile has its own unique light. We specialize in professional portraits, fashion, family, and individual photo shoots. Using the best equipment and creating a comfortable environment, we help you be natural, free, and confident. GN PHOTO STUDIO is the place where your dream images become reality.",
        bron_data: "Choose the location for your story",
        title_data: "GN Studio: Yerevan Hall",
        subititle_data: "Price starting from: 12000 ֏",
        description_data: "A modern studio in the heart of the capital with professional lighting and aesthetic design for your every shot.",
        panel_data: "Contact Us",
        p_data: "In case of any questions, contact us in a way convenient for you.",
        private_data: "© 2026 GN Photo Studio — All rights reserved",
        info: "GN Photo Studio. The art of seeing and the eternity of a moment. In this fast-changing world where everything is transient, only memories remain unchanged. GN Photo Studio is the place where time stands still, allowing us to capture the true essence of the moment, the beauty of the human soul, and the sincerity of emotions. This is not just a space equipped with professional lights and modern equipment. It is a creative workshop where light and shadow blend to create real stories. Our philosophy is simple: we don't just take photos, we create a visual legacy. In every frame, we look for the harmony that turns an ordinary photograph into a work of art. Whether it's an elegant portrait, a fashion shoot, or a warm family story—our goal is to convey the atmosphere and the unique character of every hero.",
        root: "Why us?",
        why_1_title: "Aesthetics & Style",
        why_1_desc: "Unique interior design crafted for inspiration and picture-perfect shots.",
        why_2_title: "Attention to Detail",
        why_2_desc: "Every detail has been carefully curated, from lighting to decor textures.",
        why_3_title: "Premium Comfort",
        why_3_desc: "Spacious dressing room, lounge area, and everything you need for a smooth workflow.",
        why_4_title: "Professional Lighting",
        why_4_desc: "Top-tier Profoto equipment and a wide variety of modifiers for any creative task.",
        why_5_title: "Transparent Terms",
        why_5_desc: "No hidden fees. You only pay for what you actually use.",
        why_6_title: "Instant Booking",
        why_6_desc: "Easy-to-use online calendar: book the studio in just a few clicks 24/7.",
    }
};

function changeLanguage(lang) {
    localStorage.setItem('lang', lang); // Сохраняем язык
    
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Если это перенос строки (\n), заменяем его на <br>
            if (key === 'banner_text') {
                el.innerHTML = translations[lang][key].replace('\n', '<br>');
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'hy';
    changeLanguage(savedLang);
});

var demoButtons;

function start () {
  
  // Add event "click" to "demo buttons"
  demoButtons = document.querySelectorAll ('.js-modify');
  for (var i = 0; i < demoButtons.length; i++) {
    demoButtons[i].addEventListener ('click', toggleEffect);
  }
  
  // Add event "click" to "save buttons"
  var saveButtons = document.querySelectorAll ('.js-save');
  for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener ('click', toggleActive);
  }
  
}

// Toggle "effect" classes
function toggleEffect () {
  var target = document.querySelector (this.dataset.target);
      target.dataset.effect = this.dataset.effect;
  
  for (var i= 0; i < demoButtons.length; i++) {
    demoButtons[i].classList.remove ('active');
  }
  
  toggleActive.call (this);
}

// Toggle "active" class
function toggleActive () {
  this.classList.toggle ('active');
}

// Invoke "start ()" function
window.addEventListener ('load', start);