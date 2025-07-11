const API_BASE_URL = "http://localhost:8080/api";

export async function getClickData(userid) {
    try {
        const response = await fetch(`${API_BASE_URL}/click/${userid}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
export async function getStartData(userid) {
    try {
        const response = await fetch(`${API_BASE_URL}/click/${userid}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
