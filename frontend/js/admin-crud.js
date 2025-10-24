// ===========================
// ADMIN-CRUD.JS
// ===========================

// Verificar sesión y permisos
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("⚠️ No hay sesión activa. Inicia sesión nuevamente.");
  window.location.href = "login.html";
} else if (currentUser.role !== "ADMIN") {
  alert("🚫 No tienes permisos para acceder como este tipo de usuario.");
  window.location.href = "user-dashboard.html";
}

// ===========================
// Funciones CRUD de ADMIN
// ===========================

async function listarUsuarios() {
  try {
    const url = getServiceUrl("IDENTITY_SERVICE", "/users");
    const usuarios = await apiRequest(url, "GET");
    console.log("👥 Lista de usuarios:", usuarios);
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
  }
}

async function eliminarUsuario(id) {
  try {
    const url = getServiceUrl("IDENTITY_SERVICE", `/users/${id}`);
    await apiRequest(url, "DELETE");
    alert("🗑️ Usuario eliminado correctamente");
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
  }
}

// Inicializar automáticamente
listarUsuarios();
