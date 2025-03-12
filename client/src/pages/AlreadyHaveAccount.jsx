import { Link } from 'react-router-dom';

const AlreadyHaveAccount = () => {
    return (
        <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default AlreadyHaveAccount;
