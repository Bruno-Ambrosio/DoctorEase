export const isBlank = (text: string): boolean => {
    return text == '' || text == null || text == undefined;
};

export const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const isValidName = (name: string): boolean => {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    return regex.test(name);
};

export const isValidRole = (id: number): boolean => {
    return id > 0;
}