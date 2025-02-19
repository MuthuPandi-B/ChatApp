import { useState } from "react";
import Api from "../Api/api";
function ForgotPassword(){
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
            setMessage(response.data.message || 'Password reset link sent to your email');
        }catch(error){
            setError(error.response.data.error || 'Error resetting password');
        }
        setLoading(false);
    }
};
