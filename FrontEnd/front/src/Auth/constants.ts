const API_BASE_URL = 'http://localhost:5000/api/login';

export const getUserInfo = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Token no encontrado');

    const response = await fetch(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Error al obtener datos del usuario');
    }

    return response.json();
};
