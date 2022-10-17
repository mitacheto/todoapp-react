export const getUserInfo = async () => {
    return fetch('http://localhost:4000/user/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.token}`,
        },
    });
};
