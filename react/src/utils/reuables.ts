export function capitalizeFLetter(word: string): string {
    return word[0]?.toUpperCase() + word?.slice(1);
}

export function testJSON(text: any) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}
