module.exports = function cleanStrigns (str) {
    const noSpaces = str.split(' ').join('_');
    const noEspecialCharacters = noSpaces
        .replace(/[|&;$%@"<>()+,/]/g, '')
        .split(' ')
        .join('_');
    const noAccents = noEspecialCharacters
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    return noAccents;
}
