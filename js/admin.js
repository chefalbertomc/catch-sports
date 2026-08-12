// Element references
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const loginError = document.getElementById('loginError');
const uploadStatus = document.getElementById('uploadStatus');
const imagePreview = document.getElementById('imagePreview');

// Handle Auth State
auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = 'none';
    adminSection.style.display = 'block';
    document.getElementById('manageSection').style.display = 'block';
    populateTeams();
    loadAdminProducts();
  } else {
    loginSection.style.display = 'block';
    adminSection.style.display = 'none';
    document.getElementById('manageSection').style.display = 'none';
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
    document.getElementById('btnLogin').textContent = 'Entrar';
  }
});

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
  auth.signOut();
});

// Populate Teams Select
function populateTeams() {
  const select = document.getElementById('prodTeam');
  select.innerHTML = '<option value="">Selecciona una opción...</option>';
  
  if (typeof SPORTS_CATALOG === 'undefined') return;
  
  SPORTS_CATALOG.forEach(league => {
    const group = document.createElement('optgroup');
    group.label = league.league;
    
    league.teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = team.name;
      group.appendChild(option);
    });
    
    select.appendChild(group);
  });
}

// Load and manage products
function loadAdminProducts() {
  const list = document.getElementById('adminProductList');
  
  db.collection('products').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    list.innerHTML = '';
    
    if (snapshot.empty) {
      list.innerHTML = '<p class="text-secondary">No tienes productos publicados.</p>';
      return;
    }
    
    snapshot.forEach(doc => {
      const product = doc.data();
      const id = doc.id;
      
      const item = document.createElement('div');
      item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid var(--border-color);';
      
      // Get friendly team name
      const teamName = typeof getTeamName !== 'undefined' ? getTeamName(product.team) : product.team;
      
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${product.imageUrl}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px;">
          <div>
            <div style="font-weight: bold; color: var(--text-color);">${product.name}</div>
            <div style="font-size: 12px; color: var(--accent-color);">${teamName} - $${product.price}</div>
          </div>
        </div>
        <button class="btn btn-outline" style="border-color: #ff6b6b; color: #ff6b6b; padding: 6px 12px; font-size: 12px;" onclick="deleteProduct('${id}')">Eliminar</button>
      `;
      
      list.appendChild(item);
    });
  }, error => {
    console.error("Error cargando productos de admin:", error);
    // Ignore index error on admin panel so it still loads if no index exists
    if (error.message.includes('index')) {
       // Fallback without ordering
       db.collection('products').onSnapshot(fallbackSnapshot => {
         list.innerHTML = '';
         fallbackSnapshot.forEach(doc => {
           // Same render logic...
           const product = doc.data();
           const id = doc.id;
           const item = document.createElement('div');
           item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid var(--border-color);';
           const teamName = typeof getTeamName !== 'undefined' ? getTeamName(product.team) : product.team;
           item.innerHTML = \`
             <div style="display: flex; align-items: center; gap: 12px;">
               <img src="\${product.imageUrl}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px;">
               <div>
                 <div style="font-weight: bold; color: var(--text-color);">\${product.name}</div>
                 <div style="font-size: 12px; color: var(--accent-color);">\${teamName} - $\${product.price}</div>
               </div>
             </div>
             <button class="btn btn-outline" style="border-color: #ff6b6b; color: #ff6b6b; padding: 6px 12px; font-size: 12px;" onclick="deleteProduct('\${id}')">Eliminar</button>
           \`;
           list.appendChild(item);
         });
       });
    }
  });
}

// Delete product
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

// Image Preview
let selectedFile = null;
document.getElementById('prodImage').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }
});

// Helper function to resize and convert image to Base64
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
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Submit Form
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!selectedFile) {
    alert("Por favor selecciona una imagen");
    return;
  }
  
  const btnSubmit = document.getElementById('btnSubmit');
  const originalText = btnSubmit.textContent;
  
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Subiendo...';
  uploadStatus.style.color = '#fff';
  uploadStatus.textContent = 'Procesando imagen...';
  
  try {
    const name = document.getElementById('prodName').value.trim();
    const team = document.getElementById('prodTeam').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const desc = document.getElementById('prodDesc').value.trim();
    
    // Resize image and convert to Base64 to bypass Firebase Storage CORS entirely
    const base64Image = await resizeImage(selectedFile, 800, 800);
    
    uploadStatus.textContent = 'Guardando producto...';
    
    // Save to Firestore directly
    await db.collection('products').add({
      name,
      team,
      price,
      description: desc,
      imageUrl: base64Image,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Success
    uploadStatus.style.color = '#4ade80'; // green
    uploadStatus.textContent = '¡Producto subido exitosamente!';
    
    // Reset form
    document.getElementById('productForm').reset();
    imagePreview.style.display = 'none';
    selectedFile = null;
    
    setTimeout(() => {
      uploadStatus.textContent = '';
    }, 4000);
    
  } catch (error) {
    console.error('Error adding product:', error);
    uploadStatus.style.color = '#ff6b6b';
    uploadStatus.textContent = 'Error al subir producto. Intenta de nuevo.';
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = originalText;
  }
});
