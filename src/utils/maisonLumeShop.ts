// Carrinho e favoritos demonstrativos da Maison Lume — persistidos em
// localStorage neste navegador. Nenhum dado é enviado a um servidor; o botão
// de checkout apenas monta uma mensagem para o WhatsApp.
const CART_KEY = "maison-lume-cart-v1";
const FAV_KEY = "maison-lume-favorites-v1";

export interface CartItem {
  slug: string;
  quantity: number;
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
  window.dispatchEvent(new CustomEvent("ml:cart-updated"));
}

export function addToCart(slug: string, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.slug === slug);
  if (existing) existing.quantity += quantity;
  else cart.push({ slug, quantity });
  saveCart(cart);
}

export function updateCartQuantity(slug: string, quantity: number) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((i) => i.slug !== slug);
  } else {
    const item = cart.find((i) => i.slug === slug);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
}

export function removeFromCart(slug: string) {
  saveCart(getCart().filter((i) => i.slug !== slug));
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
  window.dispatchEvent(new CustomEvent("ml:favorites-updated"));
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
