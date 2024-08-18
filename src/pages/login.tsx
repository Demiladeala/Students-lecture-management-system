import { ChangeEvent, FormEvent, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

type FormData = {
  email: string;
  password: string;
};

type Errors = {
  email?: string;
  password?: string;
};

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
      });
      const [errors, setErrors] = useState<Errors>({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate();
    
      const validate = (): Errors => {
        const errors: Errors = {};
        if (!formData.email) {
          errors.email = "Matric no is required.";
        } 
        if (!formData.password) {
          errors.password = "Password is required.";
        }
        return errors;
      };
    
      const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
          setErrors(validationErrors);
          return;
        }
    
        setIsSubmitting(true);
    
        try {
        //    await axios.post('/auth/token', {
        //     username: formData.email,
        //     password: formData.password,
        //   });
    
            toast.success("Login successful!");
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000)
            
        }  catch (error: any) {
        //   if (error.response) {
        //     const { status, data } = error.response;
        //     if (status === 400 || status === 404) {
        //       // Display the error message from the API response
        //       const errorMessage = data.detail || 'An error occurred. Please try again.';
        //       toast.error(errorMessage);
        //     } else {
        //       // Handle other errors
        //       toast.error('Failed to Login. Please try again.');
        //     }
        //   } else {
        //     // Handle cases where there is no response from the server
        //     toast.error('An unexpected error occurred. Please try again.');
        //   }
        }
        finally {
          setIsSubmitting(false);
        }
      };
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <div className="relative container w-full h-screen overflow-y-auto mx-auto max-w-[2800px] scroll-smooth">
        <Toaster/>
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/50"></div>
            <img src="/login-bg.png" 
            alt="login bg" 
            className="w-full h-full object-cover bg-no-repeat"/>
        </div>

        <div className="z-[1] relative w-[90%] lg:w-[95%] h-full overflow-y-auto mx-auto 
        flex flex-col lg:flex-row items-center lg:justify-between lg:gap-10">
            <div className="w-full basis-[50%] max-lg:hidden">
            {/* <img src="/login.svg" alt="login" /> */}
            </div>

            <div className="w-full lg:basis-[50%] bg-white py-4 text-primary-darkblue rounded-md max-lg:my-auto">
            <div className="w-[95%] md:w-[90%] mx-auto px-2">
                <h3 className="poppins bg-primary-black text-gray-200 p-2 
                mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">CSC</h3>
                <h4 className="mt-1 px-2 text-lg md:text-xl font-medium text-gray-500">Lecture Management System</h4>

                <p className="poppins mt-9 lg:mt-16 text-primary-gray2">Login to your account!</p>

                <form onSubmit={handleLogin} className="mt-4 text-primary-gray text-lg">
                    <div className="mt-4">
                        <label>Matric Number</label>
                        <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`outline-none w-full p-3 border border-primary-gray rounded-lg 
                          ${errors.email && 'border-red-500'}`}
                        />
                        <div className="h-4">
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label>Password</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`outline-none w-full p-3 border border-primary-gray rounded-lg 
                          ${errors.password && 'border-red-500'}`}
                        />
                        <div className="h-4">
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full py-3 bg-primary-black text-white flex items-center justify-center rounded transition-colors duration-300 hover:bg-opacity-80"
                    >
                        {isSubmitting ? <RiLoader4Fill size={20} className="text-white animate-spin" /> : "Login"}
                    </button>
                </form>
            </div>
            </div>

        <div className="max-lg:mt-4"></div>
      </div>
    </div>
  )
}

export default Login