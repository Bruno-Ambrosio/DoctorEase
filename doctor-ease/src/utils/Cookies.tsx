
export const getCookie = (name: string): string | null => {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart) {
            return lastPart.split(";").shift() || null;
        }
    }
    return null;
};

export const setCookie = (name: string, value: string, days = 7) => {
    const d: Date = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires: string = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
