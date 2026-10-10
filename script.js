/* =========================================================
   Adega Bordô — lógica da vitrine e do carrinho (CRUD)
   ---------------------------------------------------------
   Fluxo geral:
   1. PRODUCTS guarda os 50 vinhos (fonte única de dados).
   2. renderProducts() desenha a vitrine aplicando filtro, busca e ordenação.
   3. O estado do carrinho vive em `cart` (array de { id, qty }).
      Toda alteração passa por uma função CRUD (addToCart, updateQty,
      removeFromCart, clearCart) que, no fim, chama commit().
   4. commit() salva no localStorage e re-renderiza carrinho e badge,
      garantindo que a interface sempre reflita o estado.
   5. checkout() gera o número do pedido, mostra o resumo e limpa o carrinho.
   ========================================================= */

/* ---------- 1. Dados dos produtos ---------- */
// type: tinto | branco | rose | espumante (usado no filtro e na cor da garrafa)
const PRODUCTS = [
  { id: 1,  producer: "Miolo",               name: "Reserva Malbec",                               vintage: 2022, price: 67,     type: "tinto" },
  { id: 2,  producer: "Casa Valduga",        name: "Terroir Cabernet Sauvignon",                   vintage: 2022, price: 99,     type: "tinto" },
  { id: 3,  producer: "Casa Valduga",        name: "Terroir Exclusivo Tannat",                     vintage: 2020, price: 149,    type: "tinto" },
  { id: 4,  producer: "Salton",              name: "Talento Corte Único",                          vintage: 2020, price: 125,    type: "tinto" },
  { id: 5,  producer: "Segredos da Adega",   name: "Gran Reserva Cabernet Sauvignon",              vintage: 2017, price: 189,    type: "tinto" },
  { id: 6,  producer: "Segredos da Adega",   name: "Corte Gran Reserva Tinto",                     vintage: 2017, price: 210,    type: "tinto" },
  { id: 7,  producer: "Casa Marques Pereira",name: "Reserva Malbec",                               vintage: 2022, price: 110,    type: "tinto" },
  { id: 8,  producer: "Casa Marques Pereira",name: "Reserva Tannat",                               vintage: 2022, price: 115,    type: "tinto" },
  { id: 9,  producer: "Guaspari",            name: "Vista da Serra Syrah",                         vintage: 2021, price: 298,    type: "tinto" },
  { id: 10, producer: "Guaspari",            name: "Vista da Mata Cabernet Franc/Cabernet Sauvignon", vintage: 2021, price: 268, type: "tinto" },
  { id: 11, producer: "Vale da Pedra",       name: "Tinto",                                        vintage: 2021, price: 178,    type: "tinto" },
  { id: 12, producer: "Cerro de Pedra",      name: "Gran Reserva Merlot",                          vintage: 2022, price: 230,    type: "tinto" },
  { id: 13, producer: "Cultura",             name: "Tannat",                                       vintage: 2022, price: 165,    type: "tinto" },
  { id: 14, producer: "Seu Claudino",        name: "Syrah",                                        vintage: 2021, price: 228,    type: "tinto" },
  { id: 15, producer: "Seu Claudino",        name: "Superiore Syrah",                              vintage: 2021, price: 345,    type: "tinto" },
  { id: 16, producer: "Davo",                name: "Gran Reserva Syrah",                           vintage: 2021, price: 380,    type: "tinto" },
  { id: 17, producer: "Maximo Boschi",       name: "Biografia Merlot",                             vintage: 2015, price: 395,    type: "tinto" },
  { id: 18, producer: "Maximo Boschi",       name: "Biografia Cabernet Sauvignon",                 vintage: 2015, price: 431,    type: "tinto" },
  { id: 19, producer: "Viapiana",            name: "VIA1986 Blend",                                vintage: 2019, price: 385,    type: "tinto" },
  { id: 20, producer: "Salton",              name: "Vinhedo da Lebre Cabernet Sauvignon",          vintage: 2022, price: 299,    type: "tinto" },
  { id: 21, producer: "Miolo",               name: "Seleção Cabernet Sauvignon & Merlot",          vintage: 2025, price: 39.90,  type: "tinto" },
  { id: 22, producer: "Miolo",               name: "Seleção Chardonnay & Viognier",                vintage: 2026, price: 39.90,  type: "branco" },
  { id: 23, producer: "Miolo",               name: "Reserva Sauvignon Blanc",                      vintage: 2026, price: 59.90,  type: "branco" },
  { id: 24, producer: "Miolo",               name: "Reserva Malbec",                               vintage: 2025, price: 59.90,  type: "tinto" },
  { id: 25, producer: "Miolo",               name: "Single Vineyard Pinot Noir",                   vintage: 2025, price: 69.90,  type: "tinto" },
  { id: 26, producer: "Miolo",               name: "Reserva Merlot",                               vintage: 2024, price: 59.90,  type: "tinto" },
  { id: 27, producer: "Aurora",              name: "Reserva Cabernet Sauvignon",                   vintage: 2024, price: 49.90,  type: "tinto" },
  { id: 28, producer: "Aurora",              name: "Varietal Rebo",                                vintage: 2025, price: 33.90,  type: "tinto" },
  { id: 29, producer: "Aurora",              name: "Varietal Malvasia Aromática",                  vintage: 2026, price: 33.90,  type: "branco" },
  { id: 30, producer: "Salton",              name: "Intenso Malbec",                               vintage: 2025, price: 32.90,  type: "tinto" },
  { id: 31, producer: "Salton",              name: "Paradoxo Corte Vermelho",                      vintage: 2023, price: 59.90,  type: "tinto" },
  { id: 32, producer: "Salton",              name: "Paradoxo Corte Azul",                          vintage: 2022, price: 59.90,  type: "tinto" },
  { id: 33, producer: "Casa Perini",         name: "Solidário Branco",                             vintage: 2025, price: 48.90,  type: "branco" },
  { id: 34, producer: "Casa Valduga",        name: "Arte Tinto Fruité Blend",                      vintage: 2025, price: 49.90,  type: "tinto" },
  { id: 35, producer: "Casa Valduga",        name: "Arte Branco Blend 3",                          vintage: 2026, price: 49.90,  type: "branco" },
  { id: 36, producer: "Casa Valduga",        name: "Origem Rosé",                                  vintage: 2023, price: 52.90,  type: "rose" },
  { id: 37, producer: "Casa Perini",         name: "Vintage Espumante Nature",                     vintage: 2023, price: 79.90,  type: "espumante" },
  { id: 38, producer: "Casa Perini",         name: "Vintage Espumante Brut Barricado",             vintage: 2023, price: 79.90,  type: "espumante" },
  { id: 39, producer: "Casa Perini",         name: "Fração Única Pinot Noir",                      vintage: 2023, price: 76.90,  type: "tinto" },
  { id: 40, producer: "Amitié",              name: "Pinot Noir",                                   vintage: 2026, price: 87.99,  type: "tinto" },
  { id: 41, producer: "Boscato",             name: "Cave Pinot Noir",                              vintage: 2025, price: 79.90,  type: "tinto" },
  { id: 42, producer: "Miolo",               name: "Wild Trebbiano",                               vintage: 2025, price: 65.90,  type: "branco" },
  { id: 43, producer: "Casa Silva",          name: "Reserva Sauvignon Blanc",                      vintage: 2025, price: 79.90,  type: "branco" },
  { id: 44, producer: "Norton",              name: "Reserva Malbec",                               vintage: 2024, price: 99.90,  type: "tinto" },
  { id: 45, producer: "Pata Negra",          name: "Reserva Cepas Viejas",                         vintage: 2019, price: 89.90,  type: "tinto" },
  { id: 46, producer: "Carlos Montes",       name: "Tannat",                                       vintage: 2023, price: 119.90, type: "tinto" },
  { id: 47, producer: "Volantin",            name: "Carménère",                                    vintage: 2024, price: 49.90,  type: "tinto" },
  { id: 48, producer: "Mapuche",             name: "Carménère",                                    vintage: 2024, price: 45.90,  type: "tinto" },
  { id: 49, producer: "Adega de Pegões",     name: "Touriga Nacional",                             vintage: 2022, price: 169.90, type: "tinto" },
  { id: 50, producer: "Miolo",               name: "Seleção Rosé Cabernet Sauvignon & Tempranillo", vintage: 2025, price: 39.90, type: "rose" },
];

// Fotos reais em img/vinho-XX.jpg (600x800, fundo branco). Origem de cada uma em img/fontes.json.
// Vinhos sem foto encontrada usam a garrafa ilustrada em SVG.
const NO_PHOTO = new Set();
PRODUCTS.forEach((p) => {
  if (!NO_PHOTO.has(p.id)) p.img = `img/vinho-${String(p.id).padStart(2, "0")}.jpg`;
});

/* ---------- 1b. Avaliações ----------
   Três critérios separados, que não se misturam:
   - ADEGA: pontos de críticos (escala 100) da Revista ADEGA, SÓ quando a safra avaliada
     é a mesma vendida aqui. Formato: id: [pontos, página na ADEGA].
   - VIVINO: média de consumidores (1 a 5 estrelas). Formato: id: [estrelas, nº de avaliações, safra?]
     safra = true → média da safra vendida; false → o Vivino só tem a média geral do rótulo.
   - SENSORY: perfil sensorial do estilo (descrição da loja, não é pontuação).
   Coletado em 10/2026. Rótulos sem dado confiável ficam sem selo. */
const ADEGA_BASE = "https://revistaadega.uol.com.br/vinho/";
const ADEGA = {
  1: [90, "miolo-reserva-malbec-2022_19885.html"],
  2: [89, "casa-valduga-terroir-cabernet-sauvignon-2022_22252.html"],
  3: [90, "casa-valduga-terroir-exclusivo-tannat-2020_19861.html"],
  4: [91, "salton-talento-corte-unico-2020_19909.html"],
  5: [90, "segredos-da-adega-gran-reserva-cabernet-sauvignon-2017_23460.html"],
  6: [91, "segredos-da-adega-corte-gran-reserva-tinto-2017_23461.html"],
  7: [90, "casa-marques-pereira-reserva-malbec-2022_23451.html"],
  8: [91, "casa-marques-pereira-reserva-tannat-2022_23453.html"],
  9: [92, "guaspari-vista-da-serra-syrah-2021_22265.html"],
  10: [91, "guaspari-vista-da-mata-cabernet-franc-cabernet-sauvignon-2021_22266.html"],
  11: [91, "guaspari-vale-da-pedra-tinto-2021_19942.html"],
  12: [91, "cerro-de-pedra-gran-reserva-merlot-2022_19747.html"],
  13: [90, "cultura-tannat-2022_22257.html"],
  14: [93, "villa-triacca-seu-claudino-syrah-2021_22423.html"],
  15: [91, "seu-claudino-superiore-syrah-2021_22424.html"],
  16: [91, "davo-gran-reserva-syrah-2021_22973.html"],
  17: [90, "maximo-boschi-biografia-merlot-2015_22284.html"],
  18: [90, "maximo-boschi-biografia-cabernet-sauvignon-2015_22282.html"],
  19: [92, "viapiana-via1986-blend-2019-2019_19680.html"],
  20: [91, "salton-vinhedo-da-lebre-cabernet-sauvignon-2022_19532.html"],
  31: [90, "salton-paradoxo-corte-merlot-cabernet-franc-marselan-2023_21866.html"],
  32: [90, "salton-paradoxo-corte-cabernet-sauvignon-merlot-tannat-2022_21865.html"],
  37: [91, "casa-perini-vintage-blend-chardonnay-e-pinot-noir-nature-2023_21842.html"],
  38: [89, "casa-perini-vintage-barricado-chardonnay-brut-2023_22060.html"],
  44: [91, "norton-reserva-blend-de-terroirs-malbec-2024_23048.html"],
};

const VIVINO = {
  1: [3.8, 301, true],    2: [3.8, 285, true],    3: [4.1, 301, true],    4: [3.9, 383, true],
  5: [4.0, 48, true],     7: [3.8, 989, false],   8: [3.8, 29, true],     9: [4.2, 271, true],
  10: [4.2, 258, true],   12: [4.0, 57, true],    13: [3.9, 197, true],   14: [4.1, 40, true],
  15: [4.3, 45, true],    17: [4.1, 100, true],   18: [4.2, 97, true],    20: [4.1, 90, true],
  21: [3.2, 14813, false], 22: [3.4, 8195, false], 23: [3.5, 1371, false], 24: [3.6, 32, true],
  25: [3.8, 39, true],    26: [3.7, 122, true],   27: [3.4, 11120, false], 28: [3.8, 65, true],
  29: [3.7, 150, false],  30: [3.5, 786, false],  33: [3.7, 110, true],   34: [3.7, 3125, false],
  35: [3.6, 964, false],  36: [3.7, 44, true],    37: [4.0, 263, false],  38: [4.1, 102, true],
  39: [3.8, 3028, false], 40: [3.8, 40, true],    41: [3.5, 654, false],  42: [3.7, 61, true],
  43: [3.5, 319, false],  44: [3.9, 201, true],   45: [3.7, 29, true],    46: [3.9, 32, true],
  47: [3.8, 238, false],  48: [3.5, 33, true],    49: [4.0, 39, true],    50: [3.7, 114, true],
};

// [corpo, acidez, taninos, aromas]
const SENSORY = {
  1: ["Médio", "Média-alta", "Finos", "Ameixa, amora, violeta e especiarias doces"],
  2: ["Encorpado", "Média", "Firmes", "Cassis, pimentão, tabaco e baunilha"],
  3: ["Encorpado", "Média-alta", "Intensos", "Amora, chocolate amargo, café e couro"],
  4: ["Encorpado", "Média", "Firmes e redondos", "Frutas negras maduras, especiarias e tostado"],
  5: ["Encorpado", "Média", "Firmes", "Cassis, cedro, tabaco e notas de evolução"],
  6: ["Encorpado", "Média", "Macios", "Frutas negras em compota, especiarias e couro"],
  7: ["Médio", "Média", "Macios", "Ameixa, cereja e violeta"],
  8: ["Encorpado", "Média-alta", "Intensos", "Amora, ameixa preta e cacau"],
  9: ["Encorpado", "Alta", "Finos", "Pimenta-preta, amora, azeitona e defumado"],
  10: ["Médio a encorpado", "Média-alta", "Firmes", "Cassis, folha de tabaco, ervas e grafite"],
  11: ["Médio", "Média-alta", "Macios", "Frutas vermelhas, pimenta e ervas"],
  12: ["Médio a encorpado", "Média", "Aveludados", "Ameixa, cereja preta, chocolate e baunilha"],
  13: ["Encorpado", "Média-alta", "Intensos", "Amora, especiarias e ervas secas"],
  14: ["Encorpado", "Alta", "Finos", "Amora, pimenta-preta, violeta e defumado"],
  15: ["Encorpado", "Alta", "Finos e densos", "Frutas negras, especiarias, grafite e carvalho"],
  16: ["Encorpado", "Média-alta", "Firmes", "Frutas negras, pimenta e tostado"],
  17: ["Médio a encorpado", "Média", "Aveludados", "Ameixa seca, chocolate, couro e especiarias"],
  18: ["Encorpado", "Média", "Firmes e maduros", "Cassis, cedro, tabaco e couro"],
  19: ["Encorpado", "Média-alta", "Firmes", "Frutas negras, especiarias e notas de evolução"],
  20: ["Encorpado", "Média", "Firmes", "Cassis, cereja preta, menta e tostado"],
  21: ["Leve a médio", "Média", "Macios", "Frutas vermelhas frescas e toque herbáceo"],
  22: ["Leve", "Média", "Ausentes", "Pêssego, abacaxi e flores brancas"],
  23: ["Leve", "Alta", "Ausentes", "Maracujá, limão e capim-limão"],
  24: ["Médio", "Média", "Macios", "Ameixa, amora e violeta"],
  25: ["Leve a médio", "Alta", "Delicados", "Cereja, morango, cogumelos e especiarias"],
  26: ["Médio", "Média", "Macios", "Ameixa, cereja e baunilha"],
  27: ["Médio", "Média", "Firmes", "Cassis, pimentão e especiarias"],
  28: ["Leve a médio", "Média-alta", "Macios", "Framboesa, frutas vermelhas e floral"],
  29: ["Leve", "Média", "Ausentes", "Flores brancas, lichia e uva fresca"],
  30: ["Médio", "Média", "Macios", "Ameixa madura e frutas vermelhas"],
  31: ["Médio", "Média", "Macios", "Frutas vermelhas e negras, ervas e especiarias"],
  32: ["Médio a encorpado", "Média", "Firmes", "Cassis, amora e cacau"],
  33: ["Leve", "Alta", "Ausentes", "Frutas cítricas, maracujá e ervas"],
  34: ["Leve a médio", "Média", "Macios", "Frutas vermelhas frescas e floral"],
  35: ["Leve", "Média-alta", "Ausentes", "Frutas tropicais, cítricos e flores"],
  36: ["Leve", "Alta", "Ausentes", "Morango, framboesa e pétalas de rosa"],
  37: ["Leve a médio", "Alta", "Ausentes", "Maçã verde, cítricos, brioche e perlage fino"],
  38: ["Médio", "Média-alta", "Ausentes", "Frutas amarelas, brioche, baunilha e avelã"],
  39: ["Leve a médio", "Alta", "Delicados", "Cereja, framboesa e notas terrosas"],
  40: ["Leve a médio", "Alta", "Delicados", "Frutas vermelhas, floral e especiarias suaves"],
  41: ["Médio", "Média-alta", "Macios", "Cereja, frutas vermelhas maduras e tostado leve"],
  42: ["Leve", "Alta", "Ausentes", "Maçã, pera, cítricos e notas de levedura"],
  43: ["Leve", "Alta", "Ausentes", "Limão, maracujá, grama e mineral"],
  44: ["Médio a encorpado", "Média", "Macios", "Ameixa, amora, violeta e baunilha"],
  45: ["Médio", "Média", "Macios", "Cereja madura, baunilha e coco"],
  46: ["Encorpado", "Média-alta", "Intensos", "Amora, ameixa e especiarias"],
  47: ["Médio", "Média", "Macios", "Frutas negras, pimentão e pimenta"],
  48: ["Médio", "Média", "Macios", "Ameixa, pimenta e notas herbáceas"],
  49: ["Encorpado", "Média", "Firmes", "Violeta, bergamota, amora e esteva"],
  50: ["Leve", "Média-alta", "Ausentes", "Morango, cereja e romã"],
};

// Anexa as avaliações a cada produto para facilitar renderização e ordenação
PRODUCTS.forEach((p) => {
  if (ADEGA[p.id]) p.adega = { pts: ADEGA[p.id][0], url: ADEGA_BASE + ADEGA[p.id][1] };
  if (VIVINO[p.id]) {
    const [stars, count, sameVintage] = VIVINO[p.id];
    p.vivino = { stars, count, sameVintage };
  }
  const [body, acidity, tannins, aromas] = SENSORY[p.id];
  p.sensory = { body, acidity, tannins, aromas };
});

const TYPE_LABEL = { tinto: "Tinto", branco: "Branco", rose: "Rosé", espumante: "Espumante" };
const FREE_SHIPPING = 299;   // frete grátis a partir deste valor
const SHIPPING_FEE = 24.90;  // frete fixo abaixo do mínimo
const STORAGE_KEY = "adegaBordo.cart";

/* ---------- 2. Utilitários ---------- */
const $ = (sel) => document.querySelector(sel);
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (v) => brl.format(v);
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const fullName = (p) => `${p.producer} ${p.name}`;

/* Garrafa ilustrada em SVG.
   Substitui o antigo Unsplash Source (desativado), garantindo imagem
   consistente e offline. A cor do vidro/líquido muda conforme o tipo
   e a cor do rótulo varia por produto. */
let svgUid = 0;
const GLASS = {
  tinto:     { glass: "#2b0a12", shine: "#6b1424" },
  branco:    { glass: "#4a5a2a", shine: "#9fb065" },
  rose:      { glass: "#e9a4a8", shine: "#f8d5d6" },
  espumante: { glass: "#1f3326", shine: "#4e7a5c" },
};
const LABELS = ["#f7efdc", "#ffffff", "#efe3cf", "#f3e6e8", "#e9e4da"];

function bottleSVG(p) {
  const g = GLASS[p.type];
  const label = LABELS[p.id % LABELS.length];
  const foil = p.type === "espumante" ? "#c9a24b" : p.id % 2 ? "#8e1f33" : "#c9a24b";
  const uid = `b${++svgUid}`;
  return `
  <svg viewBox="0 0 120 400" role="img" aria-label="Garrafa de ${fullName(p)}">
    <defs>
      <linearGradient id="${uid}" x1="0" x2="1">
        <stop offset="0" stop-color="${g.glass}"/>
        <stop offset=".35" stop-color="${g.shine}"/>
        <stop offset=".6" stop-color="${g.glass}"/>
        <stop offset="1" stop-color="${g.glass}"/>
      </linearGradient>
    </defs>
    <path d="M48 20h24v80c0 22 34 38 34 78v200a14 14 0 0 1-14 14H28a14 14 0 0 1-14-14V178c0-40 34-56 34-78Z" fill="url(#${uid})"/>
    <rect x="46" y="10" width="28" height="${p.type === "espumante" ? 90 : 60}" rx="4" fill="${foil}"/>
    <rect x="22" y="215" width="76" height="110" rx="4" fill="${label}"/>
    <rect x="28" y="221" width="64" height="98" rx="2" fill="none" stroke="${foil}" stroke-width="1"/>
    <text x="60" y="252" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#3d0a15" letter-spacing="1">${p.producer.toUpperCase().slice(0, 14)}</text>
    <line x1="42" y1="262" x2="78" y2="262" stroke="${foil}" stroke-width="1"/>
    <text x="60" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="${foil}">${p.vintage}</text>
    <text x="60" y="308" text-anchor="middle" font-family="Georgia, serif" font-size="7" fill="#6f6a6b" letter-spacing="1.5">${TYPE_LABEL[p.type].toUpperCase()}</text>
    <path d="M30 130c6-20 18-30 18-30v40c-8 10-14 40-14 70H26c0-30 2-60 4-80Z" fill="#fff" opacity=".12"/>
  </svg>`;
}

// Foto real do produto quando existir; senão, a garrafa ilustrada
function productImage(p) {
  return p.img
    ? `<img src="${p.img}" alt="Garrafa de ${fullName(p)}" width="600" height="800" loading="lazy">`
    : bottleSVG(p);
}

/* ---------- 3. Estado ---------- */
// Carrinho: [{ id, qty }]. Carregado do localStorage para sobreviver a recarregamentos.
let cart = loadCart();
// Estado da vitrine (filtro, busca e ordenação)
const view = { type: "todos", query: "", sort: "destaque" };

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // Valida os dados salvos: só mantém produtos que ainda existem
    return Array.isArray(saved) ? saved.filter((i) => findProduct(i.id) && i.qty > 0) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* armazenamento indisponível */ }
}

/* ---------- 4. CRUD do carrinho ---------- */

// CREATE — adiciona produto (ou soma +1 se já existir)
function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  commit();
  toast(`${fullName(findProduct(id))} adicionado ao carrinho`);
}

// UPDATE — altera a quantidade em +delta/-delta; se chegar a 0, remove
function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  commit();
}

// DELETE — remove um produto do carrinho
function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  commit();
}

// DELETE (todos) — esvazia o carrinho
function clearCart() {
  cart = [];
  commit();
}

// READ — calcula itens, subtotal, frete e total a partir do estado
function getTotals() {
  const items = cart.map((i) => ({ ...findProduct(i.id), qty: i.qty }));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  return { items, count, subtotal, shipping, total: subtotal + shipping };
}

// Ponto único de sincronização: persiste e atualiza toda a UI dependente do carrinho
function commit() {
  saveCart();
  renderCart();
}

/* ---------- 5. Renderização da vitrine ---------- */
function getVisibleProducts() {
  const q = view.query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) =>
    (view.type === "todos" || p.type === view.type) &&
    (!q || fullName(p).toLowerCase().includes(q))
  );

  const sorters = {
    menor: (a, b) => a.price - b.price,
    maior: (a, b) => b.price - a.price,
    safra: (a, b) => a.vintage - b.vintage,
    nome:  (a, b) => fullName(a).localeCompare(fullName(b), "pt-BR"),
    // Sem avaliação vai para o fim; empate desempata pelo menor preço
    adega:  (a, b) => (b.adega?.pts ?? 0) - (a.adega?.pts ?? 0) || a.price - b.price,
    vivino: (a, b) => (b.vivino?.stars ?? 0) - (a.vivino?.stars ?? 0) || (b.vivino?.count ?? 0) - (a.vivino?.count ?? 0),
  };
  if (sorters[view.sort]) list = [...list].sort(sorters[view.sort]);
  return list;
}

// Ordem e textos das seções de categoria da vitrine
const CATEGORIES = [
  { type: "tinto",     title: "Tintos",     desc: "Encorpados e marcantes, para carnes, massas e boas conversas." },
  { type: "rose",      title: "Rosés",      desc: "Frescos e versáteis, perfeitos para dias quentes." },
  { type: "branco",    title: "Brancos",    desc: "Leves e aromáticos, ideais com peixes, saladas e queijos." },
  { type: "espumante", title: "Espumantes", desc: "Borbulhas finas para brindar qualquer ocasião." },
];

function renderProducts() {
  const container = $("#productGrid");
  const list = getVisibleProducts();

  $("#results").textContent = `${list.length} ${list.length === 1 ? "vinho encontrado" : "vinhos encontrados"}`;

  if (!list.length) {
    container.innerHTML = `<p class="empty">Nenhum vinho encontrado. Tente outro termo ou filtro.</p>`;
    return;
  }

  // Agrupa a lista já filtrada/ordenada em uma seção por categoria (seções vazias são omitidas)
  container.innerHTML = CATEGORIES.map((cat) => {
    const items = list.filter((p) => p.type === cat.type);
    if (!items.length) return "";
    return `
    <section class="category" id="cat-${cat.type}" aria-labelledby="cat-${cat.type}-title">
      <header class="category__head">
        <div>
          <h3 class="category__title" id="cat-${cat.type}-title">${cat.title}</h3>
          <p class="category__desc">${cat.desc}</p>
        </div>
        <span class="category__count">${items.length} ${items.length === 1 ? "rótulo" : "rótulos"}</span>
      </header>
      <div class="grid">${items.map(productCard).join("")}</div>
    </section>`;
  }).join("");
}

function productCard(p) {
  return `
    <article class="card">
      <div class="card__media">
        <span class="card__tag">${TYPE_LABEL[p.type]}</span>
        <span class="card__vintage">${p.vintage}</span>
        ${productImage(p)}
      </div>
      <div class="card__body">
        <p class="card__producer">${p.producer}</p>
        <h3 class="card__name">${p.name}</h3>
        ${ratingsHTML(p)}
        ${sensoryHTML(p)}
        <div class="card__foot">
          <p class="card__price">${money(p.price)}<small>ou 3x de ${money(p.price / 3)}</small></p>
          <button class="add-btn" data-add="${p.id}" aria-label="Adicionar ${fullName(p)} ao carrinho">+</button>
        </div>
      </div>
    </article>`;
}

const decimal = (n) => n.toFixed(1).replace(".", ",");

// Selos de avaliação: pontos da crítica (ADEGA) e estrelas de consumidores (Vivino), sempre separados
function ratingsHTML(p) {
  const adega = p.adega
    ? `<a class="badge badge--adega" href="${p.adega.url}" target="_blank" rel="noopener"
          title="Nota da Revista ADEGA para a safra ${p.vintage}">
         <strong>${p.adega.pts}</strong> pts <span>ADEGA</span>
       </a>`
    : "";
  const vivino = p.vivino
    ? `<span class="badge badge--stars"
          title="Média de ${p.vivino.count.toLocaleString("pt-BR")} avaliações no Vivino (${p.vivino.sameVintage ? `safra ${p.vintage}` : "todas as safras"})">
         <span class="stars" style="--rating:${p.vivino.stars}" aria-hidden="true">★★★★★</span>
         <strong>${decimal(p.vivino.stars)}</strong>
         <small>(${p.vivino.count.toLocaleString("pt-BR")})${p.vivino.sameVintage ? "" : " · geral"}</small>
       </span>`
    : "";
  if (!adega && !vivino) return `<div class="ratings ratings--empty">Ainda sem avaliações publicadas</div>`;
  return `<div class="ratings">${adega}${vivino}</div>`;
}

// Perfil sensorial (texto descritivo, não é pontuação)
function sensoryHTML(p) {
  const s = p.sensory;
  return `
    <details class="sensory">
      <summary>Perfil sensorial</summary>
      <dl>
        <div><dt>Corpo</dt><dd>${s.body}</dd></div>
        <div><dt>Acidez</dt><dd>${s.acidity}</dd></div>
        <div><dt>Taninos</dt><dd>${s.tannins}</dd></div>
        <div class="sensory__aromas"><dt>Aromas</dt><dd>${s.aromas}</dd></div>
      </dl>
    </details>`;
}

/* ---------- 6. Renderização do carrinho ---------- */
function renderCart() {
  const { items, count, subtotal, shipping, total } = getTotals();

  // Badge do header (com animação a cada mudança)
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.classList.remove("bump");
  void badge.offsetWidth; // reinicia a animação
  badge.classList.add("bump");

  const body = $("#cartItems");
  $("#cartFoot").hidden = items.length === 0;

  if (!items.length) {
    body.innerHTML = `
      <div class="drawer__empty">
        <span>🍷</span>
        <p>Seu carrinho está vazio.</p>
        <a href="#vitrine" class="btn btn--gold" data-close>Ver vinhos</a>
      </div>`;
    return;
  }

  body.innerHTML = items.map((i) => `
    <div class="cart-item">
      <div class="cart-item__thumb">${productImage(i)}</div>
      <div>
        <p class="cart-item__name">${fullName(i)}</p>
        <p class="cart-item__meta">${TYPE_LABEL[i.type]} · ${i.vintage} · ${money(i.price)}</p>
        <div class="qty">
          <button data-dec="${i.id}" aria-label="Diminuir quantidade">−</button>
          <span aria-live="polite">${i.qty}</span>
          <button data-inc="${i.id}" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <div class="cart-item__right">
        <span class="cart-item__total">${money(i.price * i.qty)}</span>
        <button class="remove-btn" data-remove="${i.id}">Remover</button>
      </div>
    </div>`).join("");

  // Barra de progresso do frete grátis
  const missing = FREE_SHIPPING - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  $("#shippingBar").innerHTML = `
    ${missing > 0 ? `Faltam <strong>${money(missing)}</strong> para frete grátis` : "🎉 Você ganhou <strong>frete grátis</strong>!"}
    <div class="shipping__bar"><i style="width:${pct}%"></i></div>`;

  $("#subtotal").textContent = money(subtotal);
  $("#shipping").textContent = shipping ? money(shipping) : "Grátis";
  $("#total").textContent = money(total);
}

/* ---------- 7. Drawer (abrir/fechar) ---------- */
function openCart() {
  $("#cartDrawer").classList.add("is-open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#cartOpen").setAttribute("aria-expanded", "true");
  $("#overlay").hidden = false;
  document.body.classList.add("no-scroll");
}

function closeCart() {
  $("#cartDrawer").classList.remove("is-open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#cartOpen").setAttribute("aria-expanded", "false");
  $("#overlay").hidden = true;
  document.body.classList.remove("no-scroll");
}

/* ---------- 8. Checkout ---------- */
// Gera número no formato AB-AAAAMMDD-XXXX
function generateOrderNumber() {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AB-${date}-${rand}`;
}

function checkout() {
  const { items, subtotal, shipping, total } = getTotals();
  if (!items.length) return;

  // Monta o resumo ANTES de limpar o carrinho
  $("#orderNumber").textContent = generateOrderNumber();
  $("#orderSummary").innerHTML = `
    ${items.map((i) => `<div><span>${i.qty}× ${fullName(i)}</span><span>${money(i.price * i.qty)}</span></div>`).join("")}
    <div><span>Frete</span><span>${shipping ? money(shipping) : "Grátis"}</span></div>
    <div class="grand"><span>Total pago</span><span>${money(total)}</span></div>`;

  closeCart();
  clearCart(); // pedido gerado → carrinho zerado
  $("#checkoutModal").hidden = false;
  document.body.classList.add("no-scroll");
  $("#modalClose").focus();
}

function closeModal() {
  $("#checkoutModal").hidden = true;
  document.body.classList.remove("no-scroll");
}

/* ---------- 9. Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- 10. Eventos ---------- */
// Delegação de eventos: um listener por container, mesmo após re-render
function bindEvents() {
  // Vitrine: botão "+"
  $("#productGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    addToCart(Number(btn.dataset.add));
    btn.classList.add("added");
    btn.textContent = "✓";
    setTimeout(() => { btn.classList.remove("added"); btn.textContent = "+"; }, 900);
  });

  // Carrinho: +, −, remover, link "ver vinhos"
  $("#cartItems").addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.dataset.inc) updateQty(Number(t.dataset.inc), +1);
    if (t.dataset.dec) updateQty(Number(t.dataset.dec), -1);
    if (t.dataset.remove) removeFromCart(Number(t.dataset.remove));
    if (t.hasAttribute("data-close")) closeCart();
  });

  // Filtros por tipo
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-selected", c === chip);
    });
    view.type = chip.dataset.type;
    renderProducts();
  });

  // Busca e ordenação
  $("#search").addEventListener("input", (e) => { view.query = e.target.value; renderProducts(); });
  $("#sort").addEventListener("change", (e) => { view.sort = e.target.value; renderProducts(); });

  // Drawer e modal
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", checkout);
  $("#clearCart").addEventListener("click", () => {
    if (confirm("Deseja esvaziar o carrinho?")) clearCart();
  });
  $("#modalClose").addEventListener("click", closeModal);
  $("#checkoutModal").addEventListener("click", (e) => { if (e.target.id === "checkoutModal") closeModal(); });

  // ESC fecha drawer/modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!$("#checkoutModal").hidden) closeModal();
    else closeCart();
  });

  // Newsletter (simulada)
  $("#newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Cupom BEMVINDO10 enviado para o seu e-mail!");
  });
}

/* ---------- 11. Inicialização ---------- */
function init() {
  // Arte do hero: três garrafas de tipos diferentes
  $("#heroArt").innerHTML = [findProduct(37), findProduct(18), findProduct(23)].map(bottleSVG).join("");
  renderProducts();
  renderCart();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
