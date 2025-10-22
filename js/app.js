// app.js
console.log('✅ app.js cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado - Inicializando aplicación...');
    
    // Verificar si estamos en la página de login
    if (document.getElementById('loginForm')) {
        console.log('🔍 Inicializando login...');
        initializeLogin();
    }
});

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    console.log('📝 Formulario login encontrado:', !!loginForm);
    
    // Inicializar selector de tipo de usuario
    initializeUserTypeSelector();
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('🎯 Formulario enviado');
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.querySelector('.user-type.active')?.dataset.type;
        
        console.log('📨 Datos del login:', { username, password, userType });
        
        const result = login(username, password, userType);
        
        console.log('📨 Resultado del login:', result);
        
        showMessage(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            console.log('✅ Login exitoso, redirigiendo en 1 segundo...');
            setTimeout(() => {
                redirectUser(result.user);
            }, 1000);
        }
    });
}

function initializeUserTypeSelector() {
    const userTypes = document.querySelectorAll('.user-type');
    console.log('🎯 Selector de tipo de usuario:', userTypes.length);
    
    userTypes.forEach(type => {
        type.addEventListener('click', function() {
            userTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            console.log('✅ Tipo seleccionado:', this.dataset.type);
        });
    });
}

function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    if (!messageEl) return;
    
    messageEl.textContent = text;
    messageEl.className = 'message ' + type;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}