// auth.js - SOLO localStorage
console.log('✅ auth.js cargado');

// Inicializar datos por defecto
function initializeDefaultData() {
    console.log('🔄 Inicializando datos por defecto...');
    
    // Usuarios por defecto
    if (!localStorage.getItem('elementioUsers')) {
        console.log('👥 Creando usuarios por defecto...');
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                type: 'admin',
                fullName: 'Administrador Principal',
                email: 'admin@uis.edu.co'
            },
            {
                id: 2,
                username: 'usuario',
                password: 'user123',
                type: 'user',
                fullName: 'Usuario',
                email: 'usuario@uis.edu.co'
            }
        ];
        localStorage.setItem('elementioUsers', JSON.stringify(defaultUsers));
        console.log('✅ Usuarios creados:', defaultUsers);
    }
    
    // Combos por defecto
    if (!localStorage.getItem('elementioCombos')) {
        console.log('🍱 Creando combos por defecto...');
        const defaultCombos = [
            {
                id: 1,
                nombre: 'Combo Saludable',
                descripcion: 'Plato principal + ensalada + bebida + postre',
                precioDiario: 5500,
                precioMensual: 77400,
                disponibles: 180,
                activo: true,
                creadoPor: 'admin',
                fechaCreacion: new Date().toISOString()
            }
        ];
        localStorage.setItem('elementioCombos', JSON.stringify(defaultCombos));
        console.log('✅ Combos creados:', defaultCombos);
    }
    
    // Pedidos vacíos
    if (!localStorage.getItem('elementioPedidos')) {
        localStorage.setItem('elementioPedidos', JSON.stringify([]));
        console.log('✅ Pedidos inicializados');
    }
    
    console.log('🎉 Datos inicializados correctamente');
}

// Obtener usuarios
function getUsers() {
    const users = JSON.parse(localStorage.getItem('elementioUsers') || '[]');
    console.log('👥 Usuarios en sistema:', users);
    return users;
}

// Guardar usuarios
function saveUsers(users) {
    localStorage.setItem('elementioUsers', JSON.stringify(users));
}

// Función de login - CORREGIDA
function login(username, password, userType) {
    console.log('🔐 Intentando login...', { username, password, userType });
    
    if (!username || !password) {
        return { success: false, message: 'Por favor completa todos los campos' };
    }

    const users = getUsers();
    console.log('🔍 Buscando usuario en:', users);
    
    const user = users.find(u => u.username === username && u.password === password);
    
    console.log('👤 Usuario encontrado:', user);
    
    if (!user) {
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    if (userType && user.type !== userType) {
        return { success: false, message: 'No tienes permisos para acceder como este tipo de usuario' };
    }

    // Guardar sesión
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    
    console.log('✅ Login exitoso, redirigiendo...', user.username);

    return { 
        success: true, 
        message: 'Inicio de sesión exitoso',
        user: user
    };
}

// Función de registro
function register(userData) {
    const { fullName, email, username, password, confirmPassword, userType } = userData;

    if (!fullName || !email || !username || !password || !confirmPassword || !userType) {
        return { success: false, message: 'Por favor completa todos los campos' };
    }

    if (password !== confirmPassword) {
        return { success: false, message: 'Las contraseñas no coinciden' };
    }

    const users = getUsers();
    const existingUser = users.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
        return { success: false, message: 'El usuario o correo ya está registrado' };
    }

    const newUser = {
        id: Date.now(),
        username,
        password,
        type: userType,
        fullName,
        email,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    
    console.log('✅ Usuario registrado:', newUser.username);

    return { 
        success: true, 
        message: 'Usuario registrado exitosamente',
        user: newUser
    };
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    return { isLoggedIn: isLoggedIn === 'true', currentUser };
}

function redirectUser(user) {
    console.log('🔄 Redirigiendo a:', user.type);
    if (user.type === 'admin') {
        window.location.href = 'dashboard-admin.html';
    } else {
        window.location.href = 'user.html';
    }
}

function protectRoute(requiredType = null) {
    const auth = checkAuth();
    
    if (!auth.isLoggedIn || !auth.currentUser) {
        window.location.href = 'login.html';
        return false;
    }

    if (requiredType && auth.currentUser.type !== requiredType) {
        window.location.href = 'login.html';
        return false;
    }

    return auth.currentUser;
}

// Debug: mostrar datos actuales
function debugAuth() {
    console.log('🐛 DEBUG AUTH:');
    console.log('- Usuarios:', getUsers());
    console.log('- Current User:', localStorage.getItem('currentUser'));
    console.log('- Is Logged In:', localStorage.getItem('isLoggedIn'));
}

// Inicializar datos al cargar
initializeDefaultData();
debugAuth();

console.log('✅ auth.js completamente cargado');