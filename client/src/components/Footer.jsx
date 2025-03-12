import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white p-4 fixed bottom-0 w-full'>
            <div className='container mx-auto text-center'>
                <p>&copy; {new Date().getFullYear()} E-Dashboard. All rights reserved.</p>
                <p>
                    <a href='/privacy' className='text-gray-300 hover:text-white'>
                        Privacy Policy
                    </a>{' '}
                    |{' '}
                    <a href='/terms' className='text-gray-300 hover:text-white'>
                        Terms of Service
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;