// ===========================
// AUTH.JS - Sistema LunchUIS
// ===========================

console.log("✅ auth.js cargado - modo backend");

// Configuración general del sistema
const API_CONFIG = {
  IDENTITY_SERVICE: "http://localhost:8081/api/v1",
  BUY_SERVICE: "http://localhost:8082/api/v1",
  NOTIFICATION_SERVICE: "http://localhost:8083/api/v1",
  REPORT_SERVICE: "http://localhost:8084/api/v1",
  QRCODE_SERVICE: "http://localhost:8085/api/v1",
};

// Función para construir URLs dinámicas
function getServiceUrl(service, endpoint) {
  return `${API_CONFIG[service]}${endpoint}`;
}

// ===========================
// Manejo de Token (JWT)
// ===========================
function saveToken(token) {
  localStorage.setItem("jwtToken", token);
}

function getToken() {
  return localStorage.getItem("jwtToken");
}

function clearToken() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("currentUser");
}

// ===========================
// Peticiones a la API
// ===========================
async function apiRequest(url, method = "GET", data = null) {
  const token = getToken();

  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) options.body = JSON.stringify(data);

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Error API:", errorText);

    if (!window.location.pathname.includes("login.html")) {
      alert("⚠️ No tienes permisos o tu sesión expiró.");
    }
    throw new Error(errorText);
  }

  return response.json();
}

// ===========================
// Funciones de Autenticación
// ===========================
async function login(email, password) {
  try {
    const institutionalCode = parseInt(email);
    if (isNaN(institutionalCode)) {
      alert("⚠️ El código institucional debe ser numérico");
      return;
    }

    const response = await apiRequest(
      getServiceUrl("IDENTITY_SERVICE", "/auth/login"),
      "POST",
      { institutionalCode, password }
    );

    if (response && response.token && response.user) {
      saveToken(response.token);

      // Asegurar que role esté en mayúsculas
      response.user.role = response.user.role.toUpperCase();
      localStorage.setItem("currentUser", JSON.stringify(response.user));

      alert("✅ Inicio de sesión exitoso");

      if (response.user.role === "ADMIN") {
        window.location.href = "dashboard-admin.html";
      } else {
        window.location.href = "user-dashboard.html";
      }
    } else {
      alert("⚠️ Error al iniciar sesión: token no recibido");
    }
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    alert("❌ Credenciales incorrectas o servidor no disponible");
  }
}

function logout() {
  clearToken();
  alert("👋 Sesión cerrada correctamente");
  window.location.href = "login.html";
}
