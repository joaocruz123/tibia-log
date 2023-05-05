export const setItemSession = ({ key, value }) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getItemSession = (key) => {
    const item = sessionStorage.getItem(key);
    const selectedItem = JSON.parse(item) || null;

    return selectedItem ? selectedItem : null;


}