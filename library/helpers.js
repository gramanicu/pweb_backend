export const capitalize = s => {
    return s && s[0].toUpperCase() + s.slice(1);
};

export const parseServiceType = s => {
    s = s.replace('_', ' ').toLowerCase();
    s = s.split(' ').map(capitalize).join(' ');
    return s;
};
