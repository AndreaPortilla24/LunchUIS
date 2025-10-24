// ===========================
// USER-CRUD.JS
// ===========================

// Obtener usuario actual
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Verificar sesión
if (!currentUser) {
  alert("⚠️ No hay sesión activa. Inicia sesión nuevamente.");
  window.location.href = "login.html";
} else if (currentUser.role.toUpperCase() !== "STUDENT") {
  alert("🚫 No tienes permisos para acceder como este tipo de usuario.");
  window.location.href = "dashboard-admin.html";
}

// ===========================
// Funciones CRUD de USUARIO
// ===========================
async function listarCompras() {
  try {
    const url = getServiceUrl("BUY_SERVICE", `/buy/user/${currentUser.id}`);
    const compras = await apiRequest(url, "GET");
    console.log("🛒 Compras del usuario:", compras);
  } catch (error) {
    console.error("❌ Error al listar compras:", error);
  }
}

async function crearCompra(productoId) {
  try {
    const url = getServiceUrl("BUY_SERVICE", "/buy");
    const data = { userId: currentUser.id, productoId };
    await apiRequest(url, "POST", data);
    alert("✅ Compra realizada con éxito");
  } catch (error) {
    console.error("❌ Error al crear compra:", error);
  }
}

// Inicializar automáticamente
listarCompras();
