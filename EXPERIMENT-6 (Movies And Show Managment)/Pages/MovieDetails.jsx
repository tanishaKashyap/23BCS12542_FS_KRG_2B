import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'

// Fix icon conflict
import { StarIcon as HeroStar } from '@heroicons/react/24/solid'
import BlurCircle from '../Components/BlurCircle'
import { Heart, PlayCircleIcon } from 'lucide-react'
import DateSelect from '../Components/DateSelect'
import MovieCard from '../Components/MovieCard'
import Loading from '../Components/Loading'  // <-- Import Loading

// Helper function for runtime formatting
const timeFormat = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)

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

  // Show the Loading component until data is ready
  if (!show) return <Loading />

  return (
    <div className="px-6 md:px-16 lg:px-40 py-10 md:py-16 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Poster Image */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-[26rem] max-w-[17rem] object-cover"
        />

        {/* Movie Details Section */}
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-red-500 font-semibold tracking-wide uppercase">ENGLISH</p>

          <h1 className="text-4xl font-semibold max-w-96 text-balance">{show.movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <HeroStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{show.movie.overview}</p>

          <p className="text-gray-300 text-sm mt-3">
            {timeFormat(show.movie.runtime)} · {show.movie.genres.map(g => g.name).join(", ")} · {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Buy Tickets
            </a>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
      <div className='overflow-x-auto mt-8 pb-4 hide-scrollbar'>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0,12).map((cast,index)=>(
            <div key={index} className='flex flex-col items-center text-center'> 
              <img src={cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover'/>
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <DateSelect dateTime={show.dateTime} id={id}/>

      {/* Recommendations Section */}
      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.slice(0,4).map((movie,index)=>(
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      {/* Show More Button (Red) */}
      <div className='flex justify-center mt-20'>
        <button
          onClick={() => navigate('/movies')}
          className='px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-md font-medium cursor-pointer text-white'
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default MovieDetails
