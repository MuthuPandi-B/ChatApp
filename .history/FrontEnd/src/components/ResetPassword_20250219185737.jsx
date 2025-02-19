import { useState } from "react";
import Api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setNewConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { restToken } = useParams();
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
    
        if (!newPassword || !confirmNewPassword) {
        setError("Please fill all fields");
        return;
        }
    
        if (newPassword !== confirmNewPassword) {
        setError("Passwords do not match");
        return;
        }
    
        try {
        const response = await Api.post("/api/users/reset-password", {
            newPassword,
            token,
        });
        setSuccess(response.data.message);
        } catch (error) {
        setError(error.response.data.message);
        }
    };
    
    return (
        <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
            <form
            className="space-y-4"
            onSubmit={handleResetPassword}
            >
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div>
                <label htmlFor="password" className="block">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block">Confirm Password</label>
                <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Reset Password
            </button>
            </form>
        </div>
        </div>
    );
    };
    export default ResetPassword;
