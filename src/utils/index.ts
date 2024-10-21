export const extractPath = (input: string): string => {
    const startIndex: number = input.indexOf('/') + 1;
    let result: string = input.substring(startIndex);

    result = encodeURIComponent(result);
    const prefix = '%20%1B%5D8%3B';
    const prefIndex = result.indexOf(prefix);

    if (prefIndex !== -1) {
        return result.substring(0, prefIndex);
    }

    return result;
};
