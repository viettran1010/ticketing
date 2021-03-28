import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const NewTicket = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/tickets",
        method: "post",
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push("/"),
    });

    const onBlur = () => {
        const value = parseFloat(price);
        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>New Ticket</h1>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    ></input>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        onBlur={onBlur} // callled whenever out of focus
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    ></input>
                </div>
                {errors}
            </form>
            <button onClick={() => doRequest()} className="btn btn-primary">
                Submit
            </button>
        </div>
    );
};

export default NewTicket;
