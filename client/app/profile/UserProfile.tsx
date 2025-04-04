import { useEffect, useState } from "react";

// Define user data type
interface UserProfile {
    name: string;
    email: string;
    profilePhoto?: string;
}

const UserProfile = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const res = await fetch("http://localhost:5000/api/user/profile", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        setError("Session expired. Please log in again.");
                        localStorage.removeItem("token"); // Clear invalid token
                        return;
                    } else if (res.status === 404) {
                        setError("User not found.");
                        return;
                    } else {
                        throw new Error("Something went wrong. Try again later.");
                    }
                }

                const data: UserProfile = await res.json();
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <img 
                src={user?.profilePhoto || "https://via.placeholder.com/100"} 
                alt="Profile" 
                style={{ width: 100, height: 100, borderRadius: "50%" }} 
            />
        </div>
    );
};

export default UserProfile;
