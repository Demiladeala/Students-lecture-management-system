import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from './side-bar';
import { API } from './api';
import { MdDoNotDisturb } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const AddNoticePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails>({});

    useEffect(() => {
        // Retrieve userDetails from sessionStorage
        const storedUserDetails = sessionStorage.getItem("userDetails");
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API}/api/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to create notification');
            }

            // Optionally handle success
            alert('Notification created successfully!');
            navigate('/dashboard');
        } catch (error:any) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 || status === 404 || status === 403) {
                  // Display the error message from the API response
                  const errorMessage = data.message || data.error || data.detail || 'An error occurred. Please try again.';
                  toast.error(errorMessage);
                }
              } else {
                toast.error(error.message);
              } 
            }
            finally {
            setLoading(false);
        }
    };

    if (!userDetails.is_class_rep) {
        return <div className='w-full h-[70vh] lg:h-[85vh] flex flex-col items-center justify-center'>
                <div className='w-[90%] mx-auto relative flex flex-col gap-2'>
                    <MdDoNotDisturb size={150} className='mx-auto text-primary-black' />
                    <p className='text-center w-[90%] mx-auto'>You do not have permission to access this page.</p>
                </div>
            </div>
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <Toaster />
            <h1 className="text-2xl font-semibold mb-4">Add New Notice</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-lg text-white font-medium 
                        ${loading ? 'bg-gray-400' : 'bg-primary-black hover:bg-primary-black/80'}`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddNoticePage;