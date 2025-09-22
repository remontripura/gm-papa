// components/Logout.tsx
"use client"

import { handleLogout } from "@/lib/logout/logout";
import { useEffect, useState } from "react";

const LogoutComponent = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        const performLogout = async () => {
            await handleLogout();
            setIsLoggingOut(false);
        };
        performLogout();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {isLoggingOut ? (
                <>
                    <p>Logging you out...</p>
                    {/* এখানে একটি স্পিনার বা লোডিং আইকন ব্যবহার করতে পারেন */}
                </>
            ) : (
                <p>You have been logged out.</p>
            )}
        </div>
    );
};
export default LogoutComponent;