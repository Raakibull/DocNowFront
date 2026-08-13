import React, { useEffect, useState } from 'react';
import defaultDoctor from '../material/doctor-ss.png';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/doctors`)
      .then(res => res.json())
      .then(data => { setDoctors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="j-exb text-5xl text-center mt-5">Our Best Doctor</div>
      <div className="j-r text-[16px] text-center opacity-65 mt-1.5 mb-7">
        Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's<br />
        a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.
      </div>

      {loading ? (
        <div className="text-center text-[18px] j-m opacity-60 my-20">Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div className="text-center text-[18px] j-m opacity-60 my-20">No doctors available yet.</div>
      ) : (
        <section className='grid grid-cols-3 gap-5 mx-40 max-[555px]:mx-0 max-[555px]:gap-1 max-[555px]:grid-cols-1'>
          {doctors.map(doc => (
            <div key={doc._id} className="bg-white rounded-3xl">
              <div className="m-12 max-[555px]:m-0">

                <div className='w-full h-100 rounded-3xl overflow-hidden'>
                  <img
                    className='w-full h-full rounded-3xl object-top object-cover'
                    src={doc.photo ? `${API_URL}/${doc.photo}` : defaultDoctor}
                    alt={doc.name}
                  />
                </div>

                <div>
                  <div className="flex gap-4 mt-2">
                    <div className={`j-m text-[15px] p-1 rounded-2xl ${doc.available ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                      {doc.available ? 'Available' : 'Unavailable'}
                    </div>
                    {doc.experience && (
                      <div className="text-blue-600 j-m text-[15px] bg-blue-100 p-1 rounded-2xl">
                        {doc.experience}+ Years Experience
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="j-exb text-2xl mt-2">{doc.name}</div>
                    <div className="j-m mt-2 text-[18px] opacity-55 border-b-2 border-dotted pb-2">{doc.specialty}</div>
                    {doc.phone && (
                      <div className="j-m mt-2 text-[18px] opacity-55">{doc.phone}</div>
                    )}
                  </div>

                  <Link to={`/doctor/${doc._id}`}>
                    <div className="mt-2">
                      <button className="btn btn-outline btn-primary w-full rounded-3xl text-blue-600 border-b-blue-600">
                        View Detail
                      </button>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Doctor;