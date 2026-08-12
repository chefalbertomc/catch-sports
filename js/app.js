// Parse URL parameters to filter by team
const urlParams = new URLSearchParams(window.location.search);
const teamFilter = urlParams.get('team') || 'all';

// Element references
const productGrid = document.getElementById('productGrid');
const loader = document.getElementById('loader');
const storeTitle = document.getElementById('storeTitle');
const storeSubtitle = document.getElementById('storeSubtitle');

// Theme and text updates based on team
function setupTheme() {
  if (teamFilter === 'all') {
    storeTitle.textContent = 'Catálogo Completo';
    storeSubtitle.textContent = 'Todos nuestros artículos deportivos';
  } else {
    // Attempt to use the teams.js catalog if available
    if (typeof getTeamName !== 'undefined') {
      const friendlyName = getTeamName(teamFilter);
      const leagueName = getLeagueByTeam(teamFilter);
      
      storeTitle.innerHTML = `COLECCIÓN <span style="color: var(--accent-color); text-transform: uppercase;">${friendlyName}</span>`;
      storeSubtitle.textContent = `Artículos oficiales de ${leagueName}`;
    } else {
      storeTitle.innerHTML = `COLECCIÓN <span style="color: var(--accent-color); text-transform: uppercase;">${teamFilter}</span>`;
    }
    
    // Add specific CSS classes for legacy support
    if (teamFilter === 'steelers') document.body.classList.add('theme-steelers');
    if (teamFilter === 'patriots') document.body.classList.add('theme-patriots');
  }
}

// Format price to currency
function formatPrice(price) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
}

// Render product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-badge">${product.team.toUpperCase()}</div>
    <div class="product-image-container">
      <img src="${product.imageUrl}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
    </div>
    <div class="product-info">
      <div class="product-category">Oficial Merchandise</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <div class="product-price">${formatPrice(product.price)}</div>
        <a href="https://wa.me/524423376955?text=Hola,%20me%20interesa%20comprar%20el%20producto:%20${encodeURIComponent(product.name)}%20por%20${encodeURIComponent(formatPrice(product.price))}" target="_blank" class="btn" style="text-decoration: none; text-align: center;">Comprar</a>
      </div>
    </div>
  `;
  return card;
}

// Fetch products from Firebase Firestore
async function loadProducts() {
  try {
    let queryRef = db.collection('products');
    
    // Apply filter if not 'all'
    if (teamFilter !== 'all') {
      queryRef = queryRef.where('team', '==', teamFilter.toLowerCase());
    }
    
    // orderBy removed to avoid Firestore index error without manual configuration

    const snapshot = await queryRef.get();
    loader.style.display = 'none';

    if (snapshot.empty) {
      productGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🛒</div>
          <h2>No hay productos disponibles</h2>
          <p>Próximamente agregaremos más artículos a esta colección.</p>
        </div>
      `;
      return;
    }

    // Render cards
    snapshot.forEach(doc => {
      const product = doc.data();
      const card = createProductCard(product);
      productGrid.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    loader.style.display = 'none';
    
    // Fallback error UI
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; color: #ff6b6b;">
        <div class="empty-state-icon">⚠️</div>
        <h2>Error al cargar la tienda</h2>
        <p>No pudimos conectar con el catálogo en este momento. Intenta de nuevo más tarde.</p>
      </div>
    `;
  }
}

// Initialize
setupTheme();
loadProducts();
