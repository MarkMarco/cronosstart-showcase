// Carrinho, favoritos e comparação demonstrativos da Nexora Tech —
// persistidos em localStorage neste navegador. Nenhum dado é enviado a um
// servidor; o botão de checkout apenas monta uma mensagem para o WhatsApp.
const CART_KEY = "nexora-tech-cart-v1";
const FAV_KEY = "nexora-tech-favorites-v1";
const COMPARE_KEY = "nexora-tech-compare-v1";
const RECENTLY_VIEWED_KEY = "nexora-tech-recently-viewed-v1";
const RECENTLY_VIEWED_LIMIT = 8;

export interface CartItem {
  slug: string;
  quantity: number;
  variation?: string;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage indisponível — alterações não persistem nesta sessão
  }
}

export function getCart(): CartItem[] {
  return read<CartItem[]>(CART_KEY, []);
}

export function saveCart(items: CartItem[]) {
  write(CART_KEY, items);
  window.dispatchEvent(new CustomEvent("nx:cart-updated"));
}

export function addToCart(slug: string, quantity = 1, variation?: string) {
  const cart = getCart();
  const existing = cart.find((i) => i.slug === slug && i.variation === variation);
  if (existing) existing.quantity += quantity;
  else cart.push({ slug, quantity, variation });
  saveCart(cart);
}

export function updateCartQuantity(slug: string, quantity: number, variation?: string) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((i) => !(i.slug === slug && i.variation === variation));
  } else {
    const item = cart.find((i) => i.slug === slug && i.variation === variation);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
}

export function removeFromCart(slug: string, variation?: string) {
  saveCart(getCart().filter((i) => !(i.slug === slug && i.variation === variation)));
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function getFavorites(): string[] {
  return read<string[]>(FAV_KEY, []);
}

export function saveFavorites(list: string[]) {
  write(FAV_KEY, list);
  window.dispatchEvent(new CustomEvent("nx:favorites-updated"));
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(slug);
  if (idx >= 0) {
    favs.splice(idx, 1);
    saveFavorites(favs);
    return false;
  }
  favs.push(slug);
  saveFavorites(favs);
  return true;
}

export function removeFavorite(slug: string) {
  saveFavorites(getFavorites().filter((s) => s !== slug));
}

/** Comparador: até 4 produtos, todos da mesma categoria (checado por quem chama). */
const COMPARE_LIMIT = 4;

export function getCompareList(): string[] {
  return read<string[]>(COMPARE_KEY, []);
}

export function saveCompareList(list: string[]) {
  write(COMPARE_KEY, list);
  window.dispatchEvent(new CustomEvent("nx:compare-updated"));
}

export function isInCompare(slug: string): boolean {
  return getCompareList().includes(slug);
}

export interface CompareToggleResult {
  added: boolean;
  reason?: "limit" | "category";
}

/**
 * Alterna um produto na lista de comparação. `category` é usada para
 * recusar a adição quando a categoria diverge dos itens já selecionados —
 * a checagem de compatibilidade em si fica a cargo de quem chama (o
 * componente já sabe a categoria de cada produto), esta função só aplica a
 * regra de limite e persiste o resultado.
 */
export function toggleCompare(slug: string): CompareToggleResult {
  const list = getCompareList();
  const idx = list.indexOf(slug);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveCompareList(list);
    return { added: false };
  }
  if (list.length >= COMPARE_LIMIT) {
    return { added: false, reason: "limit" };
  }
  list.push(slug);
  saveCompareList(list);
  return { added: true };
}

export function removeFromCompare(slug: string) {
  saveCompareList(getCompareList().filter((s) => s !== slug));
}

export function clearCompare() {
  saveCompareList([]);
}

/** Histórico local de produtos abertos, mais recente primeiro — usado pela seção "Vistos recentemente". */
export function getRecentlyViewed(): string[] {
  return read<string[]>(RECENTLY_VIEWED_KEY, []);
}

export function trackRecentlyViewed(slug: string) {
  const list = getRecentlyViewed().filter((s) => s !== slug);
  list.unshift(slug);
  write(RECENTLY_VIEWED_KEY, list.slice(0, RECENTLY_VIEWED_LIMIT));
  window.dispatchEvent(new CustomEvent("nx:recently-viewed-updated"));
}
