import '@testing-library/jest-dom';

// Mocking localStorage
const localStorageMock = (function () {
    let store: { [key: string]: string } = {};

    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value;
        },
        removeItem(key: string) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});