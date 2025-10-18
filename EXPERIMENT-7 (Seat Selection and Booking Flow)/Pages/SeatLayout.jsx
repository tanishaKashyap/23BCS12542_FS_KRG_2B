import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClockIcon } from 'lucide-react'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import isoTimeFormat from '../lib/isoTimeFormat'
import { toast } from 'react-hot-toast'
import Loading from '../Components/Loading'
import BlurCircle from '../Components/BlurCircle'

const SeatLayout = () => {
  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  // fetch show data
  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id)
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  // handle time selection
  const handleTimeSelect = (item) => {
    setSelectedTime(item)
    setSelectedSeats([]) // clear seats when time changes
  }

  // handle seat selection
  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      toast.error('Please select time first!')
      return
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      toast.error('You can only select up to 5 seats!')
      return
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    )
  }

  // render seats row by row
  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2 justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`
        const isSelected = selectedSeats.includes(seatId)
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded-md border border-red-500 cursor-pointer transition-all ${
              isSelected
                ? 'bg-red-500 text-white'
                : 'hover:bg-red-200 text-gray-700'
            }`}
          >
            {seatId}
          </button>
        )
      })}
    </div>
  )

  // proceed to checkout (store in localStorage)
  const handleCheckout = () => {
    if (!selectedTime) return toast.error('Please select time before checkout!')
    if (selectedSeats.length === 0)
      return toast.error('Please select at least one seat!')

    const booking = {
      show: {
        movie: show.movie,
        showDateTime: selectedTime.time,
      },
      bookedSeats: selectedSeats,
      amount: selectedSeats.length * 150, // ticket price
      isPaid: false,
    }

    const currentBookings = JSON.parse(localStorage.getItem('myBookings')) || []
    currentBookings.push(booking)
    localStorage.setItem('myBookings', JSON.stringify(currentBookings))

    navigate('/my-bookings')
  }

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-16 gap-10">
      {/* Available Timings */}
      <div className="w-60 border border-red-200 rounded-lg py-6 h-max md:sticky md:top-10">
        <p className="text-lg font-semibold px-6 text-red-700">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTimeSelect(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? 'text-white bg-red-500 rounded-md'
                  : 'text-red-700 hover:text-white hover:bg-red-400 rounded-md'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4 text-red-600">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-10 bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition shadow-lg"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout
