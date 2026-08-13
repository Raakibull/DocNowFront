import React, { useEffect, useState, } from 'react';
import { useParams, useSubmit } from 'react-router';
import defaultDoctor from '../material/doctor-s.png';
import { Link } from 'react-router';


const API_URL = import.meta.env.VITE_API_URL;

const DATES = ["5 August", "6 August", "7 August", "8 August"];
const TIMES = ["10 AM", "12 AM", "2 PM", "3 PM"];



const DocDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);
const canContinue = selectedDate !== null && selectedTime !== null;

const [patientName, setPatientName] = useState("");
const [patientPhone, setPatientPhone] = useState("");
const [patientEmail, setPatientEmail] = useState("");
const [reason, setReason] = useState("");

 const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const isValidName = (name) => /^[a-zA-Z\s.]{2,}$/.test(name.trim());

const canConfirm =
    isValidName(patientName) &&
    isValidPhone(patientPhone) &&
    isValidEmail(patientEmail);




  useEffect(() => {
    fetch(`${API_URL}/api/doctors/${id}`)
      .then(res => res.json())
      .then(data => { setDoctor(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!doctor) return <div className="text-center mt-20">Doctor not found.</div>;



  




  return (
    <div>
      <section className='bg-white mx-40 rounded-3xl p-18 max-[555px]:mx-0'>
        <div className="text-4xl j-exb text-center">Doctor's Profile Details</div>
        <div className="j-m text-[17px] text-center mt-4">
          {doctor.bio || "Experienced medical professional dedicated to patient care."}
        </div>
      </section>

      <section className='mx-40 bg-white rounded-3xl my-7 max-[555px]:mx-0'>
        <div className="flex p-9 max-[555px]:inline">
          <img
            className='m-7 h-90 max-[555px]:m-0 max-[555px]:h-full'
            
            src={doctor.photo ? `${API_URL}/${doctor.photo}` : defaultDoctor}
            alt={doctor.name}
          />
          <div className="my-7">
            <div className="j-exb text-4xl">{doctor.name}</div>
            <div className="text-[18px] j-m my-2 opacity-55">{doctor.specialty}</div>

            {doctor.experience && (
              <div className="text-[18px] j-m mt-3">
                {doctor.experience} years of experience
              </div>
            )}

            {doctor.phone && (
              <div className="text-[18px] j-m opacity-55 py-4 mt-4 border-b-2 border-dashed">
                Phone: {doctor.phone}
              </div>
            )}

            {doctor.email && (
              <div className="text-[18px] j-m opacity-55 py-2">
                Email: {doctor.email}
              </div>
            )}

            <div className="flex gap-4 mt-3">
              <div className="text-[16px] j-b">Status</div>
              <div className={`text-[14px] j-m p-1 rounded-3xl ${
                doctor.available
                  ? 'bg-green-100 text-green-500'
                  : 'bg-red-100 text-red-500'
              }`}>
                {doctor.available ? 'Available' : 'Not Available'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white mx-40 rounded-3xl p-8 mb-7 max-[555px]:mx-0'>
        <div className="text-center j-exb text-2xl mb-4">Book an Appointment</div>
        <div className="flex justify-between border-y-2 border-dashed py-4 mb-6">
          <div className="j-b text-[18px]">Availability</div>
          <div className={`j-m text-[16px] p-1 rounded-2xl ${
            doctor.available
              ? 'bg-green-100 text-green-400'
              : 'bg-red-100 text-red-400'
          }`}>
            {doctor.available ? 'Doctor Available Today' : 'Not Available Today'}
          </div>
        </div>
        
        <button className="btn btn-primary bg-blue-600 rounded-3xl w-full mt-8" onClick={()=>document.getElementById('DocBook').showModal()}>
          Book Appointment Now
        </button>
        
<dialog id="DocBook" className="modal backdrop-blur-sm">
  <div className="">
    <div className="flex p-5 justify-between bg-blue-600">
<img
            className='w-11 rounded-3xl'
            src={doctor.photo ? `${API_URL}/${doctor.photo}` : defaultDoctor}
            
            alt={doctor.name}
          />
      <div className="pt-2 text-white j-b ">{doctor.name}</div>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn  ">Close</button>
      </form>
    </div>

<div className="bg-white">
  <progress className="progress  w-full" value="50" max="100"></progress>
    <div className=" j-m text-gray-500 p-3">Choose a date</div>
    <div className="grid grid-cols-4 gap-2 j-m mx-2">
      
        {DATES.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-full text-sm j-m ${
              selectedDate === date
                ? "bg-blue-600 text-white"
                : "bg-white text-black border-2 border-blue-200"
            }`}
          >
            {date}
          </button>
        ))}
    </div>

    <div className=" j-m text-gray-500 p-3">Choose a time</div>
    <div className="grid grid-cols-4 gap-2 j-m mx-2">
      {TIMES.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-full text-sm j-m ${
              selectedTime === time
                ? "bg-blue-600 text-white"
                : "bg-white text-black border-2 border-blue-200"
            }`}
          >
            {time}
          </button>
        ))}
    </div>

<div className="flex justify-center">
    <div disabled={!canContinue}
        onClick={() => onContinue({ date: selectedDate, time: selectedTime })}
        onClick={()=>document.getElementById('PatDetail').showModal()}
        className="btn text-center my-5 px-10 rounded-2xl bg-blue-600 text-white ">
          Continue to patient detail
          </div></div>

</div>
  </div>
</dialog>
<dialog id="PatDetail" className="modal backdrop-blur-sm ">
<div className="">
  <div className="flex p-5 justify-between bg-blue-600 rounded-t-3xl gap-30">
<img
            className='w-11 rounded-3xl'
            
            src={doctor.photo ? `${API_URL}/${doctor.photo}` : defaultDoctor}
            alt={doctor.name}
          />
      <div className="pt-2 text-white j-b ">{doctor.name}</div>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn ">Close</button>
      </form>
    </div>
    <div className="bg-white rounded-b-3xl  "> 
      <progress className="progress  w-full" value="80" max="100"></progress>
    <form  className='py-5 px-5'>
      <div className="text-black j-b  ">Full Name</div>

      <input type='Text' 
      value={patientName}
  onChange={(e) => setPatientName(e.target.value)}
      placeholder='Name' 
      className='border border-blue-200  j-m w-full rounded'></input>

      <div className="text-black j-b mt-4">Phone Number</div>
      <input type="text" 
      inputmode="numeric" 
      pattern="[0-9]*" 
      placeholder="Enter number" 
      value={patientPhone}
    onChange={(e) => setPatientPhone(e.target.value)}
      className='border border-blue-200  j-m w-full rounded'></input>

      <div className="text-black j-b mt-4">Email address </div>
      <input type='email' 
      placeholder='Enter your email'
      value={patientEmail}
      onChange={(e) => setPatientEmail(e.target.value)}
      className='border border-blue-200  j-m w-full rounded'></input>

      <div className="text-black j-b mt-4">Reason for visit (optional)</div>
      <input type='text'
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      className='w-full border border-blue-200  j-m h-22 rounded'></input>
      <div className="flex justify-center mt-5">

      <button
      type="button"
       disabled={!canConfirm}
  onClick={() => document.getElementById('con').showModal()}
  className={`btn j-b ${
    canConfirm
      ? "hover:bg-blue-600 hover:text-white"
      : "opacity-40 cursor-not-allowed"
  }`}
      className='btn  hover:bg-blue-600 hover:text-white j-b '>
      Confirm</button>
      </div>``
    </form></div>
</div>

</dialog>

<dialog id='con' className='backdrop-blur-sm modal'>
  <div className="bg-white rounded-3xl p-8 max-w-md mx-auto text-center">
    
    {/* Checkmark icon */}
    <div className="flex justify-center mb-4">
      <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center">
        <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h2 className="j-exb text-2xl mb-2">You're all set!</h2>
    <p className="j-m text-gray-500 mb-1">{selectedDate} · {selectedTime}</p>
    <p className="j-m text-gray-500 mb-1">{doctor.location}</p>
    <p className="j-m text-gray-400 text-sm mb-6">
      A confirmation was sent to {patientEmail}
    </p>

    {/* Summary card */}
    <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6">
      <div className="j-b text-gray-400 text-xs mb-3 tracking-wide">APPOINTMENT SUMMARY</div>

      <div className="flex justify-between py-1">
        <span className="j-m text-gray-500">Doctor</span>
        <span className="j-b">{doctor.name}</span>
      </div>
      <div className="flex justify-between py-1">
        <span className="j-m text-gray-500">Specialty</span>
        <span className="j-b">{doctor.specialty}</span>
      </div>
      <div className="flex justify-between py-1">
        <span className="j-m text-gray-500">Date & Time</span>
        <span className="j-b">{selectedDate}, {selectedTime}</span>
      </div>
      <div className="flex justify-between py-1">
        <span className="j-m text-gray-500">Location</span>
        <span className="j-b">{doctor.location}</span>
      </div>
      {doctor.consultationFee && (
        <div className="flex justify-between py-1">
          <span className="j-m text-gray-500">Fee</span>
          <span className="j-b">${doctor.consultationFee}</span>
        </div>
      )}
    </div>

    <button
      type="button"
      onClick={() => {
        document.getElementById('con').close();
        document.getElementById('DocBook').close();
        document.getElementById('PatDetail').close();
      }}
      className="btn w-full rounded-2xl bg-blue-500 hover:bg-blue-600 text-white border-none j-b"
    >
      Done
    </button>

  </div>
</dialog>

      </section>
    </div>
  );
};

export default DocDetail;