export const initializeLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User from localStorage:', user);

    if (!user) {
        const defaultUser = { id: 1, name: 'Default User' };
        localStorage.setItem('user', JSON.stringify(defaultUser));
        console.log('Default user added to localStorage:', defaultUser);
    } else {
        console.log('User already exists in localStorage:', JSON.parse(user));
    }
};
