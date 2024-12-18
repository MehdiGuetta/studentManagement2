export const login = (user) => ({
    type: 'LOGIN',
    payload: user
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const updateColor = (color) => ({
    type: 'UPDATE_COLOR',
    payload: color
});