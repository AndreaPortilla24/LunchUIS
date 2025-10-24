// ===========================
// STUDENT-DASHBOARD.JS
// ===========================

let currentUser = null;
let combos = [];
let cart = [];
let orders = [];

document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Inicializando dashboard de estudiante...");
  await initializeAuth();
  initializeNavigation();
  initializeEvents();
  await loadInitialData();
});

// ===========================
// Autenticación
// ===========================
async function initializeAuth() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ No hay sesión activa. Inicia sesión nuevamente.");
    window.location.href = "login.html";
    return;
  }

  // Normalizar el rol
  currentUser.role = currentUser.role.toUpperCase();

  if (currentUser.role !== "STUDENT") {
    alert("🚫 No tienes permisos para acceder como estudiante.");
    window.location.href = "dashboard-admin.html";
    return;
  }

  document.getElementById("userName").textContent = currentUser.fullName || "Usuario";
  document.getElementById("userCode").textContent = `Código: ${currentUser.username || "N/A"}`;

  document.getElementById("logoutBtn")?.addEventListener("click", () =>
    showConfirmModal("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión?", logout)
  );

  console.log("✅ Usuario autenticado:", currentUser);
}

// ===========================
// Navegación
// ===========================
function initializeNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add("active");
  document.getElementById(`${tabName}-tab`)?.classList.add("active");

  switch (tabName) {
    case "combos": loadCombos(); break;
    case "carrito": loadCart(); break;
    case "pedidos": loadOrders(); break;
    case "perfil": loadProfile(); break;
  }
}

// ===========================
// Carga inicial
// ===========================
async function loadInitialData() {
  try {
    await Promise.all([loadCombos(), loadCart(), loadOrders(), loadProfile()]);
    updateStats();
  } catch (error) {
    console.error("❌ Error cargando datos iniciales:", error);
  }
}

// (Aquí continúan todas tus funciones: displayCombos, addToCart, loadOrders, processCheckout, showToast, etc. — no se modifican porque funcionan correctamente)
