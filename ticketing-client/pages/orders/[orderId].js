import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/payments/",
        method: "post",
        body: {
            orderId: order.id,
        },
        onSuccess: (payment) => Router.push("/orders"),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }

    return (
        <div>
            {timeLeft} seconds until order expiration
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })} // send payment request with token
                stripeKey="pk_test_51IZe0ILreXzGifrDUP2MWcgsp1tPfOjMncSR7NUjhU7RqXkJaZEthjmaiXl8o7oc6Hlu10vv23MiY2GG1TtWEu5v00KHnvfaET"
                amount={order.ticket.price * 100}
                email={currentUser.email}
            ></StripeCheckout>
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;
