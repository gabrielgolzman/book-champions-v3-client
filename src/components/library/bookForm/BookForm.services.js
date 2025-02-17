export const editBook = (id, bookUpdated, onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/books/${id}`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(bookUpdated)
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