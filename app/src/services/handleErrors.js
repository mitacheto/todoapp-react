export const handleErrors = async (response) => {
    if (!response.ok) {
        const { message } = await response.json();
        throw Error(message);
    }
    return response.json();
}