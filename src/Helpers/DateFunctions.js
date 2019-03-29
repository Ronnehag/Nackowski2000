

export function getCurrentDate() {
    return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
}