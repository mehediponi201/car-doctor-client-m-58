

const BookingsCard = ({ booking,handleDelete,handleConfirmBooking }) => {

    const { _id, customerName, email, date, dueAmount, img,status } = booking;

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </th>
            <td>
                <div className="avatar">
                    <div className="w-24 h-24 rounded-xl">
                        <img src={img} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>

            <td>{customerName}</td>
            <td>{dueAmount}</td>
            <td>{date}</td>
            <th>
               { 
                 status === 'confirm' ? <span className="font-bold text-primary">Confirm</span> 
                 : <button onClick={()=>handleConfirmBooking(_id)} className="btn btn-active btn-neutral">Confirm</button>
               }
            </th>
            <td>{email}</td>
        </tr>
    );
};

export default BookingsCard;