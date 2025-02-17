export const loginUser = (email, password, onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/login`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
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