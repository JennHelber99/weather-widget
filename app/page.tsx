'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Condition = 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy'

interface WeatherData {
  temp: number
  feelsLike: number
  uvIndex: number
  condition: Condition
}

function getCondition(code: number): Condition {
  if (code <= 1) return 'clear'
  if (code <= 3) return 'cloudy'
  if (code <= 49) return 'foggy'
  if (code <= 67) return 'rainy'
  if (code <= 77) return 'snowy'
  if (code <= 82) return 'rainy'
  return 'stormy'
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

const conditionTint: Record<Condition, string> = {
  clear:   'bg-amber-400/20',
  cloudy:  'bg-slate-500/30',
  rainy:   'bg-blue-900/40',
  stormy:  'bg-indigo-950/60',
  snowy:   'bg-sky-200/30',
  foggy:   'bg-slate-300/40',
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.8456&longitude=-86.3903&current=temperature_2m,apparent_temperature,weathercode,uv_index&temperature_unit=fahrenheit&timezone=America%2FChicago')
      .then(r => r.json())
      .then(data => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          uvIndex: Math.round(data.current.uv_index),
          condition: getCondition(data.current.weathercode),
        })
      })
      .catch(() => setError(true))
  }, [])

  const tint = weather ? conditionTint[weather.condition] : conditionTint.cloudy

  return (
    <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-8">
      <div className="relative w-[380px] h-[380px] rounded-3xl overflow-hidden shadow-2xl">

        {/* City photo */}
        <Image
          src="https://source.unsplash.com/400x400/?murfreesboro,tennessee"
          alt="Murfreesboro, Tennessee"
          fill
          className="object-cover"
          unoptimized
        />

        {/* Condition tint */}
        <div className={`absolute inset-0 ${tint}`} />

        {/* Consistent dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/70 text-sm">couldn&apos;t load weather</p>
          </div>
        ) : !weather ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-semibold text-lg leading-tight drop-shadow">Today</p>
                <p className="text-white/80 text-sm drop-shadow">{formatTime(now)}</p>
              </div>
              <p className="text-white font-bold text-6xl leading-none drop-shadow-lg">{weather.temp}°</p>
            </div>
            <div>
              <p className="text-white font-semibold text-xl leading-tight drop-shadow">Murfreesboro</p>
              <p className="text-white/80 text-base drop-shadow">Tennessee</p>
              <p className="text-white/60 text-xs mt-1 drop-shadow">
                Feels like {weather.feelsLike}°&nbsp;&nbsp;·&nbsp;&nbsp;UV {weather.uvIndex}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
