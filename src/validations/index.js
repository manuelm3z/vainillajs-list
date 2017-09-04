export function formatFile(file, formats = []) {
    return formats.indexOf(file.type) >= 0;
}

export function notEmpty(value) {
    return value.length > 0;
}

export function maxLength(value, long) {
    return value.length < long;
}