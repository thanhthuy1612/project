export const removeUnnecessaryWhiteSpace = (string: string | undefined) => {
    if (!string) return undefined;
    const result = string.trim().replace(/ +/g, ' ');
    if (result === '') return undefined;
    return result;
};