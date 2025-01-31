import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { router } from '@inertiajs/react';

const stripePromise = loadStripe('pk_test_51NWlr6AzL9iukNDh153e16WWlQRmG1hlW3wyDwnXeJdbDZHsdg5Tiz4Y0PdvQrmlnafQcAJlngFtdyhI1EUodbvl00EjPEf45z');

const CheckoutButton = ({ courseId, courseName, coursePrice, text, styles }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Call Laravel backend to create a Checkout Session
        const response = router.post('/create-checkout-session', {
            course_id: courseId,
            course_name: courseName,
            course_price: coursePrice,
        });

        const sessionId = response.data.id;

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <button onClick={handleCheckout} className={styles}>
            {text}
        </button>
    );
};

export default CheckoutButton;
