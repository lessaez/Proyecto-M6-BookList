const DEFAULT_BOOK_PRICE = 12990
const PURCHASES_STORAGE_KEY = 'compras'

function readStoredPurchases() {
  try {
    const rawPurchases = localStorage.getItem(PURCHASES_STORAGE_KEY)
    return rawPurchases ? JSON.parse(rawPurchases) : []
  } catch {
    return []
  }
}

export function resolveBookPrice(price) {
  const numericPrice = Number(price)

  if (Number.isFinite(numericPrice) && numericPrice > 0) {
    return numericPrice
  }

  return DEFAULT_BOOK_PRICE
}

export function formatBookPrice(price) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(resolveBookPrice(price))
}

export function hasPurchasedBook(bookId) {
  return readStoredPurchases().some((book) => String(book.id) === String(bookId))
}

export function purchaseBook(book) {
  const purchases = readStoredPurchases().filter(
    (storedBook) => String(storedBook.id) !== String(book.id)
  )

  const purchasedBook = {
    id: book.id ?? Date.now(),
    titulo: book.titulo || 'Sin titulo',
    autor: book.autor || 'Autor no indicado',
    imagen: book.imagen || '',
    precio: resolveBookPrice(book.precio),
    purchasedAt: new Date().toISOString()
  }

  purchases.unshift(purchasedBook)
  localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(purchases))
  window.dispatchEvent(new Event('compras-actualizadas'))

  return purchasedBook
}
