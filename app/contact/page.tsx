import React from 'react';

export default function Contact() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-900">
            <div className="container  ">
                <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
                <p className="text-center mb-4">We would love to hear from you! Please reach out with any questions or feedback.</p>
                <div className="flex flex-col items-center">
                    {/* <div className="mb-4">
                        <h2 className="text-xl font-semibold">Email</h2>
                        <p>contact@ritter-veiculos.com</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Phone</h2>
                        <p>(123) 456-7890</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Address</h2>
                        <p>123 Main Street, Anytown, USA</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
