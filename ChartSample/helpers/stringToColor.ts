
export function stringToColor(str: string): string {
    let hash = 0;

    // Create a hash from the string
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert hash to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += value.toString(16).padStart(2, '0');
    }
    return color;
}