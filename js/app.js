// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Wizard Navigation Flow State
let currentWizardStep = 1; // 1: Deporte, 2: Liga, 3: Equipo
let wizardSportObj = null;
let wizardLeagueObj = null;
let wizardTeamObj = null;

let activeGenderFilter = urlParams.get('gender') || 'all';
let activeSportFilter = urlParams.get('sport') || 'all';
let activeCategoryFilter = urlParams.get('category') || 'all';
let activeTeamFilter = urlParams.get('team') || 'all';
let activePromoFilter = urlParams.get('promo') || 'all';
let searchQuery = '';

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('catch_sports_cart') || '[]');
let allProducts = [];

// DOM References
const productGrid = document.getElementById('productGrid');
const loader = document.getElementById('loader');
const storeTitle = document.getElementById('storeTitle');
const storeSubtitle = document.getElementById('storeSubtitle');
const searchInput = document.getElementById('searchInput');
const teamFilterSelect = document.getElementById('teamFilterSelect');

// Format price to currency
function formatPrice(price) {
  if (isNaN(price)) return '$0.00 MXN';
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
}

// ============================================
// STEP-BY-STEP GUIDED WIZARD NAVIGATION FLOW
// ============================================
function initWizardNavigation() {
  if (urlParams.get('team')) {
    const teamId = urlParams.get('team');
    for (const s of SPORTS_CATALOG) {
      for (const l of s.leagues) {
        const t = l.teams.find(item => item.id === teamId);
        if (t) {
          wizardSportObj = s;
          wizardLeagueObj = l;
          wizardTeamObj = t;
          currentWizardStep = 3;
          activeTeamFilter = t.id;
          break;
        }
      }
    }
  }
  renderWizardStep();
}

function renderWizardStep() {
  const container = document.getElementById('flowWizardContainer');
  const cardsGrid = document.getElementById('wizardCardsGrid');
  const titleEl = document.getElementById('wizardTitle');
  const subTitleEl = document.getElementById('wizardSubtitle');
  const pill1 = document.getElementById('pillStep1');
  const pill2 = document.getElementById('pillStep2');
  const pill3 = document.getElementById('pillStep3');
  const btnReset = document.getElementById('btnResetWizard');

  if (!cardsGrid || typeof SPORTS_CATALOG === 'undefined') return;

  // Update Breadcrumb Pills
  pill1.className = `wizard-step-pill ${currentWizardStep === 1 ? 'active' : (wizardSportObj ? 'completed' : '')}`;
  pill2.className = `wizard-step-pill ${currentWizardStep === 2 ? 'active' : (wizardLeagueObj ? 'completed' : '')}`;
  pill3.className = `wizard-step-pill ${currentWizardStep === 3 ? 'active' : (wizardTeamObj ? 'completed' : '')}`;

  document.getElementById('selectedSportLabel').textContent = wizardSportObj ? `: ${wizardSportObj.sport}` : '';
  document.getElementById('selectedLeagueLabel').textContent = wizardLeagueObj ? `: ${wizardLeagueObj.league}` : '';
  document.getElementById('selectedTeamLabel').textContent = wizardTeamObj ? `: ${wizardTeamObj.name}` : '';

  if (btnReset) btnReset.style.display = (wizardSportObj || wizardLeagueObj || wizardTeamObj) ? 'inline-block' : 'none';

  // STEP 1: SELECT SPORT
  if (currentWizardStep === 1) {
    titleEl.textContent = 'PASO 1: SELECCIONA EL DEPORTE';
    subTitleEl.textContent = 'Elige la disciplina deportiva que deseas explorar';

    cardsGrid.innerHTML = SPORTS_CATALOG.map(s => `
      <div class="wizard-card" onclick="selectWizardSport('${s.sportKey}')">
        <div class="wizard-card-icon">${s.icon}</div>
        <div class="wizard-card-label">${s.sport}</div>
        <div class="wizard-card-sublabel">${s.leagues.length} ${s.leagues.length === 1 ? 'Liga' : 'Ligas'}</div>
      </div>
    `).join('');
  }
  
  // STEP 2: SELECT LEAGUE
  else if (currentWizardStep === 2) {
    titleEl.textContent = `PASO 2: SELECCIONA LA LIGA (${wizardSportObj.sport.toUpperCase()})`;
    subTitleEl.textContent = `Haz clic en la liga o torneo de ${wizardSportObj.sport}`;

    cardsGrid.innerHTML = wizardSportObj.leagues.map(l => {
      const totalTeams = l.teams.length;
      const logoHtml = l.leagueLogo ? `<img src="${l.leagueLogo}" class="wizard-card-img" onerror="this.src='assets/catch_sports_logo.png'"/>` : `<div class="wizard-card-icon">${wizardSportObj.icon}</div>`;
      return `
        <div class="wizard-card" onclick="selectWizardLeague('${l.league}')">
          ${logoHtml}
          <div class="wizard-card-label">${l.league}</div>
          <div class="wizard-card-sublabel">${totalTeams} Equipos</div>
        </div>
      `;
    }).join('');
  }

  // STEP 3: SELECT TEAM
  else if (currentWizardStep === 3) {
    titleEl.textContent = `PASO 3: SELECCIONA TU EQUIPO (${wizardLeagueObj.league})`;
    subTitleEl.textContent = `Explora los artículos oficiales de tu franquicia favorita`;

    cardsGrid.innerHTML = wizardLeagueObj.teams.map(t => {
      const logoHtml = t.logo ? `<img src="${t.logo}" class="wizard-card-img" onerror="this.src='assets/catch_sports_logo.png'"/>` : `<div class="wizard-card-icon">🛡️</div>`;
      const isSelected = wizardTeamObj && wizardTeamObj.id === t.id;
      return `
        <div class="wizard-card ${isSelected ? 'selected-card' : ''}" style="${isSelected ? 'border-color: var(--accent-color); background: #222;' : ''}" onclick="selectWizardTeam('${t.id}')">
          ${logoHtml}
          <div class="wizard-card-label">${t.name}</div>
          <div class="wizard-card-sublabel">Ver Colección →</div>
        </div>
      `;
    }).join('');
  }
}

window.goToWizardStep = function(step) {
  if (step === 1) {
    resetWizardToStep1();
  } else if (step === 2 && wizardSportObj) {
    currentWizardStep = 2;
    wizardTeamObj = null;
    renderWizardStep();
  } else if (step === 3 && wizardLeagueObj) {
    currentWizardStep = 3;
    renderWizardStep();
  }
};

window.selectWizardSport = function(sportKey) {
  wizardSportObj = SPORTS_CATALOG.find(s => s.sportKey === sportKey);
  wizardLeagueObj = null;
  wizardTeamObj = null;
  
  if (!wizardSportObj) return;

  // If sport has only 1 league (e.g. NFL, NBA, MLB), automatically select it for user ease!
  if (wizardSportObj.leagues.length === 1) {
    wizardLeagueObj = wizardSportObj.leagues[0];
    currentWizardStep = 3; // Go directly to teams!
  } else {
    currentWizardStep = 2;
  }
  
  activeSportFilter = sportKey;
  activeTeamFilter = 'all';
  renderWizardStep();
  updateStoreHeader();
  renderProducts();
};

window.selectWizardLeague = function(leagueName) {
  if (!wizardSportObj) return;
  wizardLeagueObj = wizardSportObj.leagues.find(l => l.league === leagueName);
  wizardTeamObj = null;
  currentWizardStep = 3;
  
  renderWizardStep();
  updateStoreHeader();
  renderProducts();
};

window.selectWizardTeam = function(teamId) {
  for (const s of SPORTS_CATALOG) {
    for (const l of s.leagues) {
      const t = l.teams.find(item => item.id === teamId);
      if (t) {
        wizardSportObj = s;
        wizardLeagueObj = l;
        wizardTeamObj = t;
        break;
      }
    }
  }
  
  activeTeamFilter = teamId;
  activeSportFilter = 'all';
  activeCategoryFilter = 'all';
  if (teamFilterSelect) teamFilterSelect.value = teamId;
  
  renderWizardStep();
  updateStoreHeader();
  renderProducts();
  
  // Smooth scroll to product catalog
  document.getElementById('catalogToolbar')?.scrollIntoView({ behavior: 'smooth' });
};

window.resetWizardToStep1 = function() {
  currentWizardStep = 1;
  wizardSportObj = null;
  wizardLeagueObj = null;
  wizardTeamObj = null;
  activeTeamFilter = 'all';
  activeSportFilter = 'all';
  activeCategoryFilter = 'all';
  if (teamFilterSelect) teamFilterSelect.value = 'all';
  
  renderWizardStep();
  updateStoreHeader();
  renderProducts();
};

window.showAllProductsDirectly = function() {
  activeTeamFilter = 'all';
  activeSportFilter = 'all';
  activeCategoryFilter = 'all';
  activeGenderFilter = 'all';
  if (teamFilterSelect) teamFilterSelect.value = 'all';
  
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  updateStoreHeader();
  renderProducts();
  document.getElementById('catalogToolbar')?.scrollIntoView({ behavior: 'smooth' });
};

// Setup Team Dropdown Select (Structured by Sport > League > Team)
function populateTeamFilterSelect() {
  if (!teamFilterSelect || typeof SPORTS_CATALOG === 'undefined') return;
  
  teamFilterSelect.innerHTML = '<option value="all">🏆 Todos los Deportes y Equipos</option>';
  
  SPORTS_CATALOG.forEach(s => {
    s.leagues.forEach(l => {
      const group = document.createElement('optgroup');
      group.label = `${s.icon} ${s.sport} — ${l.league}`;
      
      l.teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        if (team.id === activeTeamFilter) option.selected = true;
        group.appendChild(option);
      });
      
      teamFilterSelect.appendChild(group);
    });
  });
}

function onTeamSelectChange() {
  const selectedId = teamFilterSelect.value;
  if (selectedId === 'all') {
    resetWizardToStep1();
  } else {
    selectWizardTeam(selectedId);
  }
}

// Filters
window.setGenderFilter = function(genderKey, btnEl) {
  activeGenderFilter = genderKey;
  document.querySelectorAll('.gender-nav-strip .filter-pill').forEach(p => p.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  
  updateStoreHeader();
  renderProducts();
};

// Search Listener
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

// Store Title Header Updates
function updateStoreHeader() {
  if (wizardTeamObj) {
    const tax = typeof getFullTaxonomy !== 'undefined' ? getFullTaxonomy(wizardTeamObj.id) : { team: wizardTeamObj.name };
    const logoImg = tax.teamLogo ? `<img src="${tax.teamLogo}" style="height: 38px; vertical-align: middle; margin-right: 8px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.8));"/>` : '';
    storeTitle.innerHTML = `${logoImg}COLECCIÓN <span style="color: var(--accent-color);">${tax.team.toUpperCase()}</span>`;
    storeSubtitle.textContent = `${tax.icon} ${tax.sport} — Liga ${tax.league}`;
  } else if (wizardSportObj) {
    storeTitle.innerHTML = `DEPORTE <span style="color: var(--accent-color);">${wizardSportObj.sport.toUpperCase()}</span>`;
    storeSubtitle.textContent = `Catálogo especializado de ${wizardSportObj.sport}`;
  } else if (activeGenderFilter !== 'all') {
    const gLabel = typeof getGenderLabel !== 'undefined' ? getGenderLabel(activeGenderFilter) : activeGenderFilter;
    storeTitle.innerHTML = `DEPARTAMENTO <span style="color: var(--accent-color);">${gLabel.toUpperCase()}</span>`;
    storeSubtitle.textContent = `Catálogo especializado de tallas para ${gLabel}`;
  } else {
    storeTitle.innerHTML = `CATÁLOGO <span style="color: var(--accent-color);">OFICIAL</span>`;
    storeSubtitle.textContent = `Artículos deportivos clasificados por Deporte, Liga, Equipo y Departamento`;
  }
}

// Render Product Card with Taxonomy Breadcrumbs & Official Team Logo Badge
function createProductCard(product, id) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  const tax = typeof getFullTaxonomy !== 'undefined' ? getFullTaxonomy(product.team) : { sport: 'Deportes', icon: '🏆', league: 'Oficial', team: product.team, teamLogo: 'assets/catch_sports_logo.png' };
  const genderLabel = typeof getGenderLabel !== 'undefined' ? getGenderLabel(product.gender) : '👨 Caballero';
  const categoryLabel = typeof getCategoryLabel !== 'undefined' ? getCategoryLabel(product.category) : '👕 Artículo';
  
  const sizes = product.sizes || ["M", "L"];
  const defaultSize = sizes[0] || 'M';
  
  // Custom Badge HTML
  let badgeHtml = '';
  if (product.badge && product.badge !== 'ninguno' && typeof PROMO_BADGES !== 'undefined') {
    const badgeObj = PROMO_BADGES.find(b => b.id === product.badge);
    if (badgeObj) {
      badgeHtml = `<div class="product-badge-custom" style="background: ${badgeObj.color}; color: #fff;">${badgeObj.label}</div>`;
    }
  }

  // Discount Badge Calculation
  let discountHtml = '';
  if (product.originalPrice && product.originalPrice > product.price) {
    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discountHtml = `<div class="discount-badge">-${pct}% OFF</div>`;
  }
  
  const originalPriceHtml = product.originalPrice ? `<div class="original-price">${formatPrice(product.originalPrice)}</div>` : '';

  const teamLogoHtml = tax.teamLogo 
    ? `<img src="${tax.teamLogo}" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle; margin-right: 4px;" onerror="this.style.display='none'"/>` 
    : '';

  card.innerHTML = `
    ${badgeHtml}
    ${discountHtml}
    <div class="product-image-container">
      <img src="${product.imageUrl}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Catch+Sports'">
    </div>
    <div class="product-info">
      
      <!-- Taxonomy Breadcrumb Header: Deporte > Liga > Equipo (with official logo) -->
      <div class="product-taxonomy" style="display: flex; align-items: center; gap: 4px;">
        <span class="tax-sport">${tax.icon} ${tax.sport}</span>
        <span class="tax-sep">›</span>
        <span class="tax-league">${tax.league}</span>
        <span class="tax-sep">›</span>
        <span class="tax-team" style="display: inline-flex; align-items: center;">${teamLogoHtml}${tax.team}</span>
      </div>

      <h3 class="product-title">${product.name}</h3>
      
      <div class="product-meta-row">
        <span class="tag-department">${genderLabel}</span>
        <span class="tag-category">${categoryLabel}</span>
      </div>

      <p class="product-desc">${product.description || 'Artículo deportivo oficial de alta calidad.'}</p>
      
      <!-- Size chips -->
      <div style="font-size: 11px; color: #888; margin-bottom: 4px; font-weight: bold;">TALLA SELECCIONADA:</div>
      <div class="sizes-container" id="sizesFor_${id}">
        ${sizes.map((s, idx) => `
          <button type="button" class="size-chip ${idx === 0 ? 'selected' : ''}" onclick="selectCardSize('${id}', '${s}', this)">${s}</button>
        `).join('')}
      </div>

      <div class="product-footer">
        <div class="price-box">
          <div class="product-price">${formatPrice(product.price)}</div>
          ${originalPriceHtml}
        </div>
        <button onclick="addToCartFromCard('${id}', '${defaultSize}')" class="btn" id="btnCart_${id}">
          🛒 Agregar
        </button>
      </div>
    </div>
  `;
  return card;
}

window.selectedSizesState = {};

window.selectCardSize = function(productId, size, btnEl) {
  window.selectedSizesState[productId] = size;
  const container = document.getElementById(`sizesFor_${productId}`);
  if (container) {
    container.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
    if (btnEl) btnEl.classList.add('selected');
  }
  
  const btnCart = document.getElementById(`btnCart_${productId}`);
  if (btnCart) {
    btnCart.setAttribute('onclick', `addToCartFromCard('${productId}', '${size}')`);
  }
};

window.addToCartFromCard = function(productId, defaultSize) {
  const prod = allProducts.find(p => p.id === productId);
  if (!prod) return;
  
  const size = window.selectedSizesState[productId] || defaultSize || 'M';
  addToCart(prod, size);
};

// Filter & Render Products
function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = '';
  
  const filtered = allProducts.filter(product => {
    const tax = typeof getFullTaxonomy !== 'undefined' ? getFullTaxonomy(product.team) : {};
    
    // Search query filter
    if (searchQuery) {
      const nameMatch = (product.name || '').toLowerCase().includes(searchQuery);
      const teamMatch = (tax.team || '').toLowerCase().includes(searchQuery);
      const leagueMatch = (tax.league || '').toLowerCase().includes(searchQuery);
      const sportMatch = (tax.sport || '').toLowerCase().includes(searchQuery);
      const descMatch = (product.description || '').toLowerCase().includes(searchQuery);
      const genderMatch = (product.gender || '').toLowerCase().includes(searchQuery);
      if (!nameMatch && !teamMatch && !leagueMatch && !sportMatch && !descMatch && !genderMatch) return false;
    }

    // Step-by-step wizard team filter
    if (activeTeamFilter !== 'all' && (product.team || '').toLowerCase() !== activeTeamFilter.toLowerCase()) {
      return false;
    }

    // Sport filter
    if (wizardSportObj && activeTeamFilter === 'all') {
      if ((tax.sport || '').toLowerCase() !== wizardSportObj.sport.toLowerCase()) return false;
    }

    // Gender filter
    if (activeGenderFilter !== 'all' && (product.gender || 'caballero').toLowerCase() !== activeGenderFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🏈</div>
        <h2>No encontramos artículos</h2>
        <p>Intenta cambiar el departamento (Caballero, Dama, Niño) o el equipo seleccionado.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const card = createProductCard(p, p.id);
    productGrid.appendChild(card);
  });
}

// Fetch products from Firebase Firestore
async function loadProducts() {
  try {
    const snapshot = await db.collection('products').get();
    if (loader) loader.style.display = 'none';

    allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    updateStoreHeader();
    renderProducts();

  } catch (error) {
    console.error('Error fetching products:', error);
    if (loader) loader.style.display = 'none';
    if (productGrid) {
      productGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; color: #ff6b6b;">
          <div class="empty-state-icon">⚠️</div>
          <h2>Error al cargar catálogo</h2>
          <p>Verifica tu conexión a internet o intenta recargar la página.</p>
        </div>
      `;
    }
  }
}

// ============================================
// SHOPPING CART & CHECKOUT LOGIC
// ============================================
function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const itemsContainer = document.getElementById('cartItemsContainer');
  const totalPriceEl = document.getElementById('cartTotalPrice');
  
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  if (badge) badge.textContent = totalCount;
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(totalPrice);
  
  localStorage.setItem('catch_sports_cart', JSON.stringify(cart));

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-state" style="padding: 40px 10px;">
        <div class="empty-state-icon">🛒</div>
        <div style="font-weight: bold; color: #fff;">Tu carrito está vacío</div>
        <div style="font-size: 12px; margin-top: 4px;">¡Agrega artículos deportivos oficiales!</div>
      </div>`;
    return;
  }

  itemsContainer.innerHTML = cart.map((item, index) => {
    const genderLabel = typeof getGenderLabel !== 'undefined' ? getGenderLabel(item.gender) : '';
    return `
      <div class="cart-item">
        <img src="${item.imageUrl}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/100'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">${genderLabel} — Talla: <strong>${item.size}</strong> — ${formatPrice(item.price)}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateItemQty(${index}, -1)">-</button>
            <span style="font-size: 13px; font-weight: bold; color: #fff; min-width: 18px; text-align: center;">${item.qty}</span>
            <button class="qty-btn" onclick="updateItemQty(${index}, 1)">+</button>
            <button onclick="removeFromCart(${index})" style="background: transparent; border: none; color: #ef4444; font-size: 12px; margin-left: auto; cursor: pointer;">🗑️ Quitar</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.addToCart = function(product, size) {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      gender: product.gender || 'caballero',
      size: size,
      qty: 1
    });
  }
  
  updateCartUI();
  toggleCartDrawer(true);
};

window.updateItemQty = function(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
  }
};

window.removeFromCart = function(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    updateCartUI();
  }
};

window.toggleCartDrawer = function(forceOpen) {
  const drawer = document.getElementById('cartDrawerOverlay');
  if (!drawer) return;
  
  if (forceOpen === true) {
    drawer.classList.add('active');
  } else {
    drawer.classList.toggle('active');
  }
};

// Checkout SPEI Modal & WhatsApp Submission
window.openCheckoutModal = function() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega artículos primero.");
    return;
  }
  
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('active');
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
};

window.copyClabeToClipboard = function() {
  const clabe = STORE_BANK_DETAILS.clabe;
  navigator.clipboard.writeText(clabe).then(() => {
    alert("✅ CLABE bancaria copiada al portapapeles: " + clabe);
  }).catch(() => {
    alert("CLABE: " + clabe);
  });
};

// Screenshot Preview Converter
let transferProofBase64 = null;
const proofInput = document.getElementById('transferProofFile');
if (proofInput) {
  proofInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        transferProofBase64 = e.target.result;
        const previewImg = document.getElementById('proofPreviewImg');
        const previewBox = document.getElementById('transferProofPreview');
        if (previewImg) previewImg.src = e.target.result;
        if (previewBox) previewBox.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
}

window.submitCheckoutOrder = async function(event) {
  event.preventDefault();
  
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const delivery = document.getElementById('custDeliveryMethod').value;
  const address = document.getElementById('custAddress').value.trim();
  
  if (!name || !phone || !address) {
    alert("Por favor completa todos los campos marcados con *");
    return;
  }
  
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryText = delivery === 'domicilio' ? '🚚 Envío a Domicilio' : '🏪 Entrega en Sucursal QRO';
  
  // Format WhatsApp Order Message
  let itemsListText = cart.map(item => {
    const gLabel = typeof getGenderLabel !== 'undefined' ? getGenderLabel(item.gender) : '';
    return `• ${item.qty}x ${item.name} (${gLabel} — Talla: ${item.size}) - ${formatPrice(item.price * item.qty)}`;
  }).join('\n');
  
  const whatsappMessage = 
`🏆 *NUEVO PEDIDO - CATCH SPORTS* 🏆
----------------------------------
👤 *Cliente:* ${name}
📱 *Teléfono:* ${phone}
📍 *Entrega:* ${deliveryText}
🏠 *Dirección/Notas:* ${address}
----------------------------------
📦 *PRODUCTOS:*
${itemsListText}

💰 *TOTAL A PAGAR:* ${formatPrice(totalAmount)}
----------------------------------
💳 *MÉTODO DE PAGO:* Transferencia SPEI (${STORE_BANK_DETAILS.bank})
📸 *Comprobante Adjunto:* ${transferProofBase64 ? 'Si (Captura lista)' : 'Pendiente por WhatsApp'}
----------------------------------
¡Hola! Ya envié mi orden de compra. Quedo atento a la confirmación de envío. 🏈🔥`;

  // Try saving order doc to Firestore `orders` collection
  try {
    await db.collection('orders').add({
      customerName: name,
      customerPhone: phone,
      deliveryMethod: delivery,
      address: address,
      items: cart,
      totalAmount: totalAmount,
      transferProof: transferProofBase64 || null,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) {
    console.log('Order saved offline/guest:', e);
  }

  // Clear Cart
  cart = [];
  updateCartUI();
  closeCheckoutModal();
  toggleCartDrawer(false);

  // Open WhatsApp
  const waUrl = `https://wa.me/${STORE_BANK_DETAILS.phoneWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(waUrl, '_blank');
};

// Initialize
initWizardNavigation();
populateTeamFilterSelect();
updateCartUI();
loadProducts();
