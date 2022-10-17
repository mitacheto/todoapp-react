export const handleErrors = async (response) => {
    if (!response.ok) {
        const { msg } = await response.json();
        throw Error(msg);
    }
    return response.json();
};
