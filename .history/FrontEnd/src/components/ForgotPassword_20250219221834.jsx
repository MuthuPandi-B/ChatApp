import { useState } from "react";
import Api from "../Api/api";
import { useNavigate } from "react-router-dom";
function ForgotPassword(){
    const navigate=useNavigate
    const[email,setEmail]=useState('');
    const[error,setError]=useState('');
    const[message,setMessage]=useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try{
            const response=await Api.post('/api/users/forgot-Password',{email});
            setMessage(response.message || 'Password reset link sent to your email');
            navigate("/")
        }catch(error){
            setError(error.response.data.error || 'Error resetting password');
        }
        setLoading(false);
    }

return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
            <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>    
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-500 text-sm">{message}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none hover:bg-blue-600">
                    {loading? 'Sending Email...':'Reset Password'}</button>
            </form>
        </div>
    </div>
)
};
export default ForgotPassword;