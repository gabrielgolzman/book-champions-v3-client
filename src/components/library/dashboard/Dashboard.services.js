import { TOKEN_NAME } from "../../../services/consts";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL

export const getBooks = (onSuccess, onError) => {
    fetch(`${baseUrl}/books`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(TOKEN_NAME)}`
        }
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Algo ha salido mal");

            }

            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
}

export const addBook = (newBook, onSuccess, onError) => {
    fetch(`${baseUrl}/books`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(TOKEN_NAME)}`

        },
        method: "POST",
        body: JSON.stringify(newBook)
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Algo ha salido mal");

            }

            return res.json();
        })
        .then(onSuccess)
        .catch(onError)
}

export const deleteBook = (bookId, onSuccess, onError) => {
    fetch(`${baseUrl}/books/${bookId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(TOKEN_NAME)}`

        }
    })
        .then(onSuccess)
        .catch(onError)
}   