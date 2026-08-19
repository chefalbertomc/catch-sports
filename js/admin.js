// Element references
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const loginError = document.getElementById('loginError');
const uploadStatus = document.getElementById('uploadStatus');
const imagePreview = document.getElementById('imagePreview');
const btnLogout = document.getElementById('btnLogout');

let selectedSizes = [];
let selectedFile = null;
let currentProducts = [];

// Handle Auth State
auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = 'none';
    adminSection.style.display = 'block';
    document.getElementById('manageSection').style.display = 'block';
    if (btnLogout) btnLogout.style.display = 'inline-block';
    
    initAdminForm();
    loadAdminProducts();
  } else {
    loginSection.style.display = 'block';
    adminSection.style.display = 'none';
    document.getElementById('manageSection').style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';
  }
});

// Login
document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('adminEmail').value.trim();
  const pw = document.getElementById('adminPassword').value;
  
  if (!email || !pw) {
    loginError.textContent = 'Completa ambos campos';
    loginError.style.display = 'block';
    return;
  }
  
  try {
    document.getElementById('btnLogin').textContent = 'Entrando...';
    await auth.signInWithEmailAndPassword(email, pw);
  } catch (error) {
    console.error('Error logging in:', error);
    loginError.textContent = 'Credenciales incorrectas';
    loginError.style.display = 'block';
    document.getElementById('btnLogin').textContent = 'Entrar al Panel →';
  }
});

// Logout
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    auth.signOut();
  });
}

// Populate Admin Select Inputs
function initAdminForm() {
  populateTeamsSelect();
  populateGenderSelect();
  populateCategoriesSelect();
  populateBadgesSelect();
  onGenderSelectChange();
}

function populateTeamsSelect() {
  const select = document.getElementById('prodTeam');
  if (!select || typeof SPORTS_CATALOG === 'undefined') return;
  select.innerHTML = '<option value="">Selecciona Deporte / Liga / Equipo...</option>';
  
  SPORTS_CATALOG.forEach(s => {
    s.leagues.forEach(l => {
      const group = document.createElement('optgroup');
      group.label = `${s.icon} ${s.sport} — ${l.league}`;
      
      l.teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        group.appendChild(option);
      });
      
      select.appendChild(group);
    });
  });
}

function populateGenderSelect() {
  const select = document.getElementById('prodGender');
  const editSelect = document.getElementById('editProdGender');
  if (typeof GENDER_DEPARTMENTS === 'undefined') return;
  
  const optionsHtml = GENDER_DEPARTMENTS.map(g => `<option value="${g.id}">${g.label}</option>`).join('');
  if (select) select.innerHTML = optionsHtml;
  if (editSelect) editSelect.innerHTML = optionsHtml;
}

function populateCategoriesSelect() {
  const select = document.getElementById('prodCategory');
  if (!select || typeof PRODUCT_CATEGORIES === 'undefined') return;
  select.innerHTML = PRODUCT_CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
}

function populateBadgesSelect() {
  const select = document.getElementById('prodBadge');
  const editSelect = document.getElementById('editProdBadge');
  if (typeof PROMO_BADGES === 'undefined') return;
  
  const optionsHtml = PROMO_BADGES.map(b => `<option value="${b.id}">${b.label}</option>`).join('');
  if (select) select.innerHTML = optionsHtml;
  if (editSelect) editSelect.innerHTML = optionsHtml;
}

window.onGenderSelectChange = function() {
  const genderId = document.getElementById('prodGender')?.value || 'caballero';
  const gObj = (typeof GENDER_DEPARTMENTS !== 'undefined') ? GENDER_DEPARTMENTS.find(g => g.id === genderId) : null;
  
  const sizesToRender = gObj ? gObj.sizes : ["S", "M", "L", "XL"];
  selectedSizes = [sizesToRender[1] || sizesToRender[0]];
  
  renderSizeChips(sizesToRender);
};

function renderSizeChips(sizesToRender) {
  const container = document.getElementById('sizeChipsContainer');
  if (!container) return;
  
  container.innerHTML = sizesToRender.map(size => {
    const isSelected = selectedSizes.includes(size);
    return `<button type="button" class="size-chip ${isSelected ? 'selected' : ''}" onclick="toggleSize('${size}')">${size}</button>`;
  }).join('');
}

window.toggleSize = function(size) {
  if (selectedSizes.includes(size)) {
    selectedSizes = selectedSizes.filter(s => s !== size);
  } else {
    selectedSizes.push(size);
  }
  
  const genderId = document.getElementById('prodGender')?.value || 'caballero';
  const gObj = GENDER_DEPARTMENTS.find(g => g.id === genderId);
  renderSizeChips(gObj ? gObj.sizes : []);
};

// Image Preview & Base64 Converter
document.getElementById('prodImage').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile = file;
    document.getElementById('prodImageUrlInput').value = '';
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('prodImageUrlInput').addEventListener('input', (e) => {
  const url = e.target.value.trim();
  if (url) {
    selectedFile = null;
    imagePreview.src = url;
    imagePreview.style.display = 'inline-block';
  }
});

function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Load & Search Products
function loadAdminProducts() {
  const list = document.getElementById('adminProductList');
  const countEl = document.getElementById('adminProdCount');
  
  db.collection('products').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    currentProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (countEl) countEl.textContent = currentProducts.length;
    renderAdminProductsList(currentProducts);
  }, error => {
    console.error("Error loading products:", error);
    db.collection('products').onSnapshot(fallbackSnap => {
      currentProducts = fallbackSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (countEl) countEl.textContent = currentProducts.length;
      renderAdminProductsList(currentProducts);
    });
  });
}

function renderAdminProductsList(products) {
  const list = document.getElementById('adminProductList');
  const query = (document.getElementById('adminSearchInput')?.value || '').toLowerCase().trim();
  
  const filtered = products.filter(p => (p.name || '').toLowerCase().includes(query) || (p.team || '').toLowerCase().includes(query));
  
  if (filtered.length === 0) {
    list.innerHTML = '<p class="text-secondary" style="padding: 12px; text-align: center;">No hay productos que coincidan.</p>';
    return;
  }
  
  list.innerHTML = filtered.map(product => {
    const teamName = typeof getTeamName !== 'undefined' ? getTeamName(product.team) : product.team;
    const genderLabel = typeof getGenderLabel !== 'undefined' ? getGenderLabel(product.gender) : '👨 Caballero';
    const priceStr = `$${product.price}`;
    const origPriceStr = product.originalPrice ? `<span style="text-decoration: line-through; color: #888; margin-left: 6px; font-size: 11px;">$${product.originalPrice}</span>` : '';
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid var(--border-color); flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="${product.imageUrl}" style="width: 52px; height: 52px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-gold);" onerror="this.src='https://via.placeholder.com/100'">
          <div>
            <div style="font-weight: bold; color: #fff; font-size: 15px;">${product.name}</div>
            <div style="font-size: 12px; color: var(--accent-color); font-weight: 700;">
              ${genderLabel} — ${teamName} — ${priceStr} ${origPriceStr}
            </div>
            <div style="font-size: 11px; color: #aaa; margin-top: 2px;">
              Tallas: ${(product.sizes || []).join(', ') || 'N/A'}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline" style="padding: 6px 12px; font-size: 12px; border-color: var(--accent-color); color: var(--accent-color);" onclick="openEditModal('${product.id}')">✏️ Editar</button>
          <button class="btn btn-outline" style="border-color: #ff6b6b; color: #ff6b6b; padding: 6px 12px; font-size: 12px;" onclick="deleteProduct('${product.id}')">🗑️ Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('adminSearchInput')?.addEventListener('input', () => {
  renderAdminProductsList(currentProducts);
});

// Edit Product Modal
window.openEditModal = function(id) {
  const prod = currentProducts.find(p => p.id === id);
  if (!prod) return;
  
  document.getElementById('editProdId').value = prod.id;
  document.getElementById('editProdName').value = prod.name || '';
  document.getElementById('editProdGender').value = prod.gender || 'caballero';
  document.getElementById('editProdPrice').value = prod.price || '';
  document.getElementById('editProdOriginalPrice').value = prod.originalPrice || '';
  document.getElementById('editProdBadge').value = prod.badge || 'ninguno';
  document.getElementById('editProdDesc').value = prod.description || '';
  
  document.getElementById('editProductModal').classList.add('active');
};

window.closeEditModal = function() {
  document.getElementById('editProductModal').classList.remove('active');
};

document.getElementById('editProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editProdId').value;
  const name = document.getElementById('editProdName').value.trim();
  const gender = document.getElementById('editProdGender').value;
  const price = parseFloat(document.getElementById('editProdPrice').value);
  const origPriceVal = document.getElementById('editProdOriginalPrice').value;
  const originalPrice = origPriceVal ? parseFloat(origPriceVal) : null;
  const badge = document.getElementById('editProdBadge').value;
  const desc = document.getElementById('editProdDesc').value.trim();
  
  try {
    await db.collection('products').doc(id).update({
      name, gender, price, originalPrice, badge, description: desc
    });
    alert('✅ Producto actualizado exitosamente');
    closeEditModal();
  } catch(e) {
    alert('Error al actualizar: ' + e.message);
  }
});

// Delete Product
window.deleteProduct = async function(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    try {
      await db.collection('products').doc(id).delete();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Hubo un error al eliminar. Intenta de nuevo.");
    }
  }
};

// Submit Product Form
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const urlInput = document.getElementById('prodImageUrlInput').value.trim();
  
  if (!selectedFile && !urlInput) {
    alert("Por favor selecciona un archivo de imagen o ingresa una URL");
    return;
  }
  
  const btnSubmit = document.getElementById('btnSubmit');
  const originalText = btnSubmit.textContent;
  
  btnSubmit.disabled = true;
  btnSubmit.textContent = '⏳ Publicando...';
  uploadStatus.style.color = '#fff';
  uploadStatus.textContent = 'Procesando producto...';
  
  try {
    const name = document.getElementById('prodName').value.trim();
    const team = document.getElementById('prodTeam').value;
    const gender = document.getElementById('prodGender').value;
    const category = document.getElementById('prodCategory').value;
    const badge = document.getElementById('prodBadge').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const origPriceVal = document.getElementById('prodOriginalPrice').value;
    const originalPrice = origPriceVal ? parseFloat(origPriceVal) : null;
    const desc = document.getElementById('prodDesc').value.trim();
    
    let imageUrl = urlInput;
    if (selectedFile) {
      uploadStatus.textContent = 'Optimizando imagen...';
      imageUrl = await resizeImage(selectedFile, 800, 800);
    }
    
    uploadStatus.textContent = 'Guardando en catálogo...';
    
    await db.collection('products').add({
      name,
      team,
      gender,
      category,
      badge,
      price,
      originalPrice,
      sizes: selectedSizes,
      description: desc,
      imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    uploadStatus.style.color = '#4ade80';
    uploadStatus.textContent = '✅ ¡Producto publicado exitosamente!';
    
    // Reset Form
    document.getElementById('productForm').reset();
    imagePreview.style.display = 'none';
    selectedFile = null;
    onGenderSelectChange();
    
    setTimeout(() => {
      uploadStatus.textContent = '';
      btnSubmit.disabled = false;
      btnSubmit.textContent = originalText;
    }, 3000);
    
  } catch (error) {
    console.error('Error adding product:', error);
    uploadStatus.style.color = '#ff6b6b';
    uploadStatus.textContent = '❌ Error al publicar: ' + error.message;
    btnSubmit.disabled = false;
    btnSubmit.textContent = originalText;
  }
});
