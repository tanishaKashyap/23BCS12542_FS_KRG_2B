import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import BlurCircle from '../Components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    const storedBookings = JSON.parse(localStorage.getItem('myBookings')) || []
    const combinedBookings = [...dummyBookingData, ...storedBookings]
    setBookings(combinedBookings)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  if (isLoading) {
    return (
      <div
        className="relative px-6 md:px-16 lg:px-40 xl:px-44 pt-10 min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#09090B' }}
      >
        <p className="text-lg text-white text-center w-full">Loading...</p>

        {/* Large Red Blurry Circles */}
        <BlurCircle top="-10rem" left="-12rem" color="255,72,101" size="32rem" opacity={0.25} />
        <BlurCircle top="15rem" right="-20rem" color="255,72,101" size="40rem" opacity={0.2} />
        <BlurCircle bottom="-12rem" left="10rem" color="255,72,101" size="28rem" opacity={0.15} />
        <BlurCircle bottom="8rem" right="5rem" color="255,72,101" size="24rem" opacity={0.2} />
      </div>
    )
  }

  return (
    <div
      className="relative px-6 md:px-16 lg:px-40 xl:px-44 pt-10 min-h-[80vh] overflow-hidden"
      style={{ backgroundColor: '#09090B' }}
    >
      {/* Cinematic Red Blurry Circles */}
      <BlurCircle top="-10rem" left="-12rem" color="255,72,101" size="32rem" opacity={0.25} />
      <BlurCircle top="15rem" right="-20rem" color="255,72,101" size="40rem" opacity={0.2} />
      <BlurCircle bottom="-12rem" left="10rem" color="255,72,101" size="28rem" opacity={0.15} />
      <BlurCircle bottom="8rem" right="5rem" color="255,72,101" size="24rem" opacity={0.2} />

      <h1 className="text-lg font-medium my-4 text-white">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-gray-400 text-center my-10">
          No bookings available
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-[#09090B] border border-red-600 rounded-lg p-4 shadow-md max-w-3xl"
            >
              {/* Movie Poster */}
              <img
                src={item.show.movie.poster_path || '/placeholder.png'}
                alt={item.show.movie.title || 'Movie Poster'}
                className="md:w-44 aspect-video h-auto object-cover object-bottom rounded"
              />

              {/* Movie Info */}
              <div className="flex flex-col p-4 flex-1">
                <p className="text-white text-lg font-semibold">
                  {item.show.movie.title || 'Unknown Title'}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.show.movie.runtime
                    ? timeFormat(item.show.movie.runtime)
                    : 'Unknown Duration'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {item.show.showDateTime
                    ? dateFormat(item.show.showDateTime)
                    : 'Unknown Date'}
                </p>
              </div>

              {/* Right side: Amount, Pay Now, Total Tickets & Seats */}
              <div className="flex flex-col justify-between items-end p-4 text-right">
                <p className="text-2xl font-semibold mb-2">₹{item.amount}</p>
                {!item.isPaid && (
                  <button className="bg-red-600 px-4 py-1.5 mb-2 text-sm rounded-full font-medium cursor-pointer">
                    Pay Now
                  </button>
                )}
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400">Total Tickets:</span>{' '}
                  {item.bookedSeats.length}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400">Seat Number:</span>{' '}
                  {item.bookedSeats.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
