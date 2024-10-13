import { useLoaderData } from "react-router-dom";
import checkout from '../assets/images/checkout/checkout.png';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import swal from 'sweetalert';

const CheckOut = () => {

    const servicesParts = useLoaderData();
    const {title,img} = servicesParts;
    
    const { user} = useContext(AuthContext);

    const handleCheckOut = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const dueAmount = form.amount.value;
        
        
        const booking ={
        customerName:name,
        email,
        date,
        dueAmount,
        title,
        img
        } 
        console.log(booking);

        fetch('http://localhost:5000/bookings',{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId)
            {
                swal({
                    title: "Good job!",
                    text: "You successfully booked!",
                    icon: "success",
                  });
            }
        })
          
    }

    return (
        <div>
            <h4 className="text-center text-4xl mb-4">Checkout Order</h4>
            <div>
                <img className="pl-14 w-[1240px]" src={checkout} alt="" />
            </div>
            <h4 className="text-center text-4xl mt-4">Service:{servicesParts.title}</h4>
            <div>
                <form className="card-body" onSubmit={handleCheckOut}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="number" name="amount" defaultValue={servicesParts.price} className="input input-bordered" required />
                    </div>      
                    </div>
                    <div className="form-control mt-6">
                     <button className="btn btn-success btn-block">Confirm Order</button>
                    </div>    
                </form>
            </div>
        </div>
    );
};

export default CheckOut;