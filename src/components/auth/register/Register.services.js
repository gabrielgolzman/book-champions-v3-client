export const registerUrser = (name, email, password, onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/register`, {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
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