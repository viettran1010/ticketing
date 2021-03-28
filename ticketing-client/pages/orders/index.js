import Link from "next/link";

const OrdersPage = ({ currentUser, orders }) => {
    const orderList = orders.map((order) => {
        return (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                    {order.ticket.title} - {order.status}
                </td>
            </tr>
        );
    });
    return (
        <div>
            <h1>orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{orderList}</tbody>
            </table>
        </div>
    );
};

OrdersPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get("/api/orders");
    return { orders: data };
};

export default OrdersPage;
