import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import BookingsCard from "./BookingsCard";
import swal from 'sweetalert';

const Booking = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        {
            fetch(`http://localhost:5000/bookings?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setBookings(data))
        }

    }, [])

    const handleDelete = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "Delete"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                swal("Poof! Your imaginary file has been deleted!", {
                                    icon: "success",
                                });
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                        const remainingBooking = bookings.filter(booking => booking._id !== id);
                        setBookings(remainingBooking);     
                }
            })
    }

    const handleConfirmBooking = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:"put",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount>0){
                //update status
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm';
                const newBooking = [updated,...remaining];
                setBookings(newBooking);
            }
        })
    }

    return (
        <div>
            <h4>Total booking:{bookings.length}</h4>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Due Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingsCard key={booking._id} booking={booking} handleDelete={handleDelete} handleConfirmBooking={handleConfirmBooking}></BookingsCard>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Booking;

