"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

const translations = {
  nav: {
    menu:    { es: "Menú",     en: "Menu" },
    story:   { es: "Historia", en: "Story" },
    lunchbox:{ es: "Lunchbox", en: "Lunchbox" },
    chutneys:{ es: "Chutneys", en: "Chutneys" },
    order:   { es: "Ordenar",  en: "Order" },
  },
  story: {
    label:   { es: "Nuestra historia",    en: "Our story" },
    heading: { es: "Hecho con\nel alma.", en: "Made with\nthe soul." },
    accentWord: { es: "el alma.",         en: "the soul." },
    quote:   { es: '"Una samosa no es solo comida. Es memoria, calidez y el amor de quienes la hicieron — doblado en cada esquina."', en: '"A samosa is not just food. It is memory, warmth and the love of those who made it — folded in every corner."' },
    quoteAuthor: { es: "— Samosa King, Est. 2020", en: "— Samosa King, Est. 2020" },
    steps: [
      {
        num: "01",
        heading: { es: "Nacido en la India,\nhecho en México.", en: "Born in India,\nmade in Mexico." },
        body: { es: "Cada samosa comienza con una receta transmitida de generación en generación — especias seleccionadas a mano, masa amasada cada mañana, y el cariño que solo una cocina familiar puede dar.", en: "Every samosa starts with a recipe passed down through generations — hand-selected spices, dough kneaded every morning, and the care that only a family kitchen can provide." },
      },
      {
        num: "02",
        heading: { es: "Las especias\nlo son todo.", en: "The spices\nare everything." },
        body: { es: "Nuestro blend de garam masala se muele fresco cada día. Comino, cilantro, jengibre, cúrcuma — cada especia elegida con intención, nunca por accidente.", en: "Our garam masala blend is freshly ground every day. Cumin, coriander, ginger, turmeric — each spice chosen with intention, never by accident." },
      },
      {
        num: "03",
        heading: { es: "Doblada a mano.\nCada vez.", en: "Folded by hand.\nEvery time." },
        body: { es: "No hay máquinas. Cada samosa es doblada a mano por nuestro equipo siguiendo la técnica tradicional — la misma forma triangular perfecta desde hace siglos.", en: "No machines. Every samosa is hand-folded by our team following the traditional technique — the same perfect triangular shape for centuries." },
      },
    ],
    stats: [
      { n: "6",    label: { es: "Sabores",       en: "Flavors"    }, sub: { es: "Cada uno único",   en: "Each one unique"   } },
      { n: "100%", label: { es: "Fresco diario",  en: "Fresh daily" }, sub: { es: "Sin congelados",   en: "Never frozen"      } },
      { n: "2020", label: { es: "Fundación",      en: "Founded"    }, sub: { es: "Guadalajara, Mx",  en: "Guadalajara, Mx"   } },
    ],
  },
  menu: {
    label:    { es: "Hecho a mano · Cada día",                         en: "Handcrafted · Every day" },
    heading:  { es: "El Menú.",                                         en: "The Menu." },
    hint:     { es: "Pasa el cursor sobre cada samosa para ver qué lleva dentro.", en: "Hover each samosa to reveal what's inside." },
    heat:     { es: "Calor",   en: "Heat"  },
    add:      { es: "Agregar", en: "Add"   },
    full:     { es: "Ver Menú Completo", en: "View Full Menu" },
    note:     { es: "Todas las samosas preparadas al momento. Pregunta por los especiales de temporada.", en: "All samosas made fresh to order. Ask about seasonal specials." },
    items: [
      { id: "beef",    name: "Royal Beef",     tagline: { es: "La Elección del Rey",    en: "The King's Choice"   }, description: { es: "Res marinada lentamente con hierbas aromáticas envuelta en nuestra masa dorada.", en: "Slow-marinated prime beef with aromatic herbs folded into our signature golden pastry." }, filling: { es: "Res & hierbas", en: "Beef & herbs" } },
      { id: "chicken", name: "Masala Chicken", tagline: { es: "Realeza Callejera",       en: "Street Food Royalty" }, description: { es: "Pollo deshebrado en masala molido a mano con verduras frescas y especias chaat.", en: "Shredded chicken in hand-ground masala with fresh vegetables and chaat spices." }, filling: { es: "Pollo & masala", en: "Chicken & masala" } },
      { id: "veggie",  name: "Garden Veggie",  tagline: { es: "Puro & Vibrante",         en: "Pure & Vibrant"      }, description: { es: "Papa y chícharo especiado con cúrcuma y especias cálidas. La más amada.", en: "Spiced potato and green pea with turmeric and warming spices. Our most beloved." }, filling: { es: "Papa & chícharo", en: "Potato & peas" } },
      { id: "paneer",  name: "Spiced Paneer",  tagline: { es: "Favorita del Chef",       en: "Chef's Favourite"    }, description: { es: "Paneer suave en masala de tomate y cebolla con pimientos y hierbas frescas.", en: "Soft paneer in tomato-onion masala with bell peppers and fresh herbs." }, filling: { es: "Paneer & tomate", en: "Paneer & tomato" } },
      { id: "lamb",    name: "Keema Lamb",     tagline: { es: "Una Delicia Real",        en: "A Royal Delicacy"    }, description: { es: "Cordero molido con cebolla caramelizada, pasta de jengibre y especias enteras.", en: "Minced lamb with caramelized onion, ginger paste and whole spices. Rich and warming." }, filling: { es: "Cordero keema", en: "Lamb keema" } },
      { id: "sweet",   name: "Sweet Potato",   tagline: { es: "Sorprendentemente Bold",  en: "Surprisingly Bold"   }, description: { es: "Camote asado con coco, hojuelas de chile y piloncillo. Dulce se encuentra picante.", en: "Roasted sweet potato with coconut, chilli flakes and jaggery. Sweet meets heat." }, filling: { es: "Camote & coco", en: "Sweet potato & coconut" } },
    ],
  },
  lunchbox: {
    heading: { es: "Royal Lunchboxes", en: "Royal Lunchboxes" },
    note:    { es: "🥟 Mezcla cualquier sabor · 🫙 Elige tus chutneys · ☕ Chai caliente o frío", en: "🥟 Mix any samosa flavor · 🫙 Choose your chutneys · ☕ Hot or iced chai" },
    boxes: [
      { tagline: { es: "El Solo Real",  en: "The Solo Royal" }, size: { es: "Lunchbox para 1", en: "Lunchbox for 1" }, btn: { es: "Ordenar Lunchbox", en: "Order Lunchbox" } },
      { tagline: { es: "El Festín Real", en: "The Royal Feast" }, size: { es: "Lunchbox para 2", en: "Lunchbox for 2" }, btn: { es: "Ordenar Ahora — Mejor Precio", en: "Order Now — Best Deal" } },
    ],
    items: [
      { icon: "🥟", label: { es: "2 Samosas a Elegir",    en: "2 Samosas of Choice"  } },
      { icon: "🫙", label: { es: "1 Chutney a Elegir",    en: "1 Chutney of Choice"  } },
      { icon: "🥔", label: { es: "Papas Masala",          en: "Masala Chips"         } },
      { icon: "☕", label: { es: "1 Chai — Caliente o Frío", en: "1 Chai Tea — Hot or Iced" } },
    ],
    items2: [
      { icon: "🥟", label: { es: "4 Samosas a Elegir",    en: "4 Samosas of Choice"  } },
      { icon: "🫙", label: { es: "2 Chutneys a Elegir",   en: "2 Chutneys of Choice" } },
      { icon: "🥔", label: { es: "Papas Masala",          en: "Masala Chips"         } },
      { icon: "☕", label: { es: "2 Chais — Caliente o Frío", en: "2 Chai Teas — Hot or Iced" } },
    ],
  },
  chutneys: {
    label:   { es: "Hecho en casa · Cada día", en: "House-Made Daily" },
    heading: { es: "Los Chutneys",             en: "The Chutneys"     },
    hint:    { es: "Haz clic para explorar cada salsa.", en: "Click to explore each sauce." },
    heat:    { es: "Calor",    en: "Heat"       },
    texture: { es: "textura",  en: "texture"    },
    ingredients: { es: "Ingredientes", en: "Ingredients" },
  },
  footer: {
    tagline: { es: '"Empanadas de la India"', en: '"Empanadas de la India"' },
    desc:    { es: "Samosas artesanales hechas con especias reales y la calidez de la hospitalidad india.", en: "Artisan samosas made with royal spices and the warmth of Indian hospitality." },
    hours:   { es: "Horario", en: "Hours" },
    hoursVal:{ es: "Lun–Vie 11–20h · Sáb–Dom 10–21h", en: "Mon–Fri 11am–8pm · Sat–Sun 10am–9pm" },
    phone:   { es: "Teléfono", en: "Phone" },
    order:   { es: "Ordenar Online →", en: "Order Online →" },
    copy:    { es: "© 2024 The Samosa King · Hecho con amor y especias reales", en: "© 2024 The Samosa King · Made with love and royal spices" },
    links: {
      Menu:    { es: "Menú",    en: "Menu"    },
      Visit:   { es: "Visita",  en: "Visit"   },
      Connect: { es: "Conecta", en: "Connect" },
    },
  },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations;
}>({ lang: "es", setLang: () => {}, t: translations });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
