'use client'

import { useEffect, useState } from 'react'

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

function ClearSky() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="clearSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2740"/>
          <stop offset="100%" stopColor="#2d6a9f"/>
        </linearGradient>
        <filter id="grain-c">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#clearSky)"/>
      <circle cx="300" cy="80" r="45" fill="#f5c842" opacity="0.9"/>
      <circle cx="300" cy="80" r="38" fill="#f7d460"/>
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line key={i}
          x1={300 + Math.cos(angle * Math.PI/180) * 52}
          y1={80 + Math.sin(angle * Math.PI/180) * 52}
          x2={300 + Math.cos(angle * Math.PI/180) * 65}
          y2={80 + Math.sin(angle * Math.PI/180) * 65}
          stroke="#f7d460" strokeWidth="3" strokeLinecap="round" opacity="0.7"
        />
      ))}
      <rect y="250" width="400" height="150" fill="#1a4a2e"/>
      <ellipse cx="100" cy="260" rx="160" ry="50" fill="#1e5c38"/>
      <ellipse cx="320" cy="270" rx="140" ry="45" fill="#195230"/>
      {[60,100,140,260,300,340].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},${220-i%2*10} ${x-12},${250-i%2*10} ${x+12},${250-i%2*10}`} fill="#0f3d1e"/>
          <polygon points={`${x},${230-i%2*10} ${x-15},${265-i%2*10} ${x+15},${265-i%2*10}`} fill="#133d22"/>
        </g>
      ))}
      <rect x="120" y="300" width="160" height="40" fill="#1a3a5c" opacity="0.6" rx="4"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-c)" opacity="0.25"/>
    </svg>
  )
}

function CloudySky() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="cloudySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3f4a"/>
          <stop offset="100%" stopColor="#5a6070"/>
        </linearGradient>
        <filter id="grain-cl">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#cloudySky)"/>
      <ellipse cx="80" cy="80" rx="70" ry="35" fill="#7a8090" opacity="0.8"/>
      <ellipse cx="130" cy="65" rx="60" ry="30" fill="#8a90a0" opacity="0.9"/>
      <ellipse cx="260" cy="100" rx="80" ry="38" fill="#6a7080" opacity="0.85"/>
      <ellipse cx="320" cy="85" rx="60" ry="28" fill="#7a8090" opacity="0.8"/>
      <ellipse cx="180" cy="130" rx="90" ry="40" fill="#5a6070" opacity="0.7"/>
      <polygon points="0,300 80,150 160,300" fill="#2a2f38"/>
      <polygon points="60,300 160,130 260,300" fill="#323740"/>
      <polygon points="150,300 260,110 370,300" fill="#2a2f38"/>
      <polygon points="250,300 340,155 430,300" fill="#1e2228"/>
      <rect y="295" width="400" height="105" fill="#1a1e25"/>
      {[30,70,100,290,330,370].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},${250-i%2*8} ${x-10},${275-i%2*8} ${x+10},${275-i%2*8}`} fill="#151920"/>
          <polygon points={`${x},${260-i%2*8} ${x-13},${288-i%2*8} ${x+13},${288-i%2*8}`} fill="#1a1f28"/>
        </g>
      ))}
      <rect x="100" y="310" width="200" height="30" fill="#2a3040" opacity="0.7" rx="2"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-cl)" opacity="0.3"/>
    </svg>
  )
}

function RainySky() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="rainySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2030"/>
          <stop offset="100%" stopColor="#2a3545"/>
        </linearGradient>
        <filter id="grain-r">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#rainySky)"/>
      <ellipse cx="60" cy="70" rx="80" ry="45" fill="#3a4050" opacity="0.9"/>
      <ellipse cx="180" cy="50" rx="100" ry="50" fill="#303848" opacity="0.95"/>
      <ellipse cx="320" cy="75" rx="90" ry="45" fill="#383e4e" opacity="0.9"/>
      <ellipse cx="230" cy="90" rx="120" ry="55" fill="#282e3c" opacity="0.85"/>
      {Array.from({length: 30}, (_, i) => (
        <line key={i} x1={20+i*13} y1={120+(i%5)*20} x2={10+i*13} y2={160+(i%5)*20} stroke="#5a7090" strokeWidth="1" opacity="0.5"/>
      ))}
      {Array.from({length: 25}, (_, i) => (
        <line key={i} x1={30+i*15} y1={180+(i%4)*15} x2={20+i*15} y2={220+(i%4)*15} stroke="#4a6080" strokeWidth="1" opacity="0.4"/>
      ))}
      <polygon points="0,310 90,160 180,310" fill="#1a1e28"/>
      <polygon points="70,310 180,140 290,310" fill="#1e2230"/>
      <polygon points="180,310 290,155 400,310" fill="#181c25"/>
      <rect y="305" width="400" height="95" fill="#141820"/>
      {[40,80,320,360].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},255 ${x-9},278 ${x+9},278`} fill="#0f1318"/>
          <polygon points={`${x},265 ${x-12},292 ${x+12},292`} fill="#131720"/>
        </g>
      ))}
      <rect x="80" y="318" width="240" height="20" fill="#1e2a3a" opacity="0.8" rx="3"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-r)" opacity="0.35"/>
    </svg>
  )
}

function StormySky() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="stormySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1018"/>
          <stop offset="100%" stopColor="#1a1e28"/>
        </linearGradient>
        <filter id="grain-st">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#stormySky)"/>
      <ellipse cx="100" cy="60" rx="100" ry="55" fill="#252830" opacity="0.95"/>
      <ellipse cx="260" cy="50" rx="120" ry="60" fill="#1e2028" opacity="0.98"/>
      <ellipse cx="180" cy="90" rx="150" ry="65" fill="#181a22" opacity="0.9"/>
      <polyline points="220,90 205,140 218,140 200,195" stroke="#ffe066" strokeWidth="2.5" fill="none" opacity="0.9"/>
      <polyline points="220,90 205,140 218,140 200,195" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
      {Array.from({length: 35}, (_, i) => (
        <line key={i} x1={10+i*11} y1={130+(i%6)*18} x2={-2+i*11} y2={178+(i%6)*18} stroke="#3a5070" strokeWidth="1.2" opacity="0.55"/>
      ))}
      {Array.from({length: 30}, (_, i) => (
        <line key={i} x1={15+i*13} y1={200+(i%5)*15} x2={3+i*13} y2={245+(i%5)*15} stroke="#304060" strokeWidth="1" opacity="0.4"/>
      ))}
      <polygon points="0,320 100,160 200,320" fill="#0f1218"/>
      <polygon points="80,320 200,135 320,320" fill="#131620"/>
      <polygon points="200,320 310,160 420,320" fill="#0d1015"/>
      <rect y="315" width="400" height="85" fill="#0a0c12"/>
      <rect x="60" y="325" width="280" height="25" fill="#1a2030" opacity="0.85" rx="3"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-st)" opacity="0.4"/>
    </svg>
  )
}

function SnowyScene() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="snowySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3045"/>
          <stop offset="100%" stopColor="#4a5570"/>
        </linearGradient>
        <filter id="grain-sn">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#snowySky)"/>
      <ellipse cx="80" cy="80" rx="90" ry="45" fill="#6a7590" opacity="0.8"/>
      <ellipse cx="230" cy="65" rx="110" ry="50" fill="#7a8598" opacity="0.85"/>
      <ellipse cx="360" cy="90" rx="80" ry="40" fill="#6a7590" opacity="0.8"/>
      {Array.from({length: 40}, (_, i) => (
        <circle key={i} cx={10+(i*47)%390} cy={110+(i*73)%230} r={1+(i%3)*0.7} fill="white" opacity={0.4+(i%4)*0.1}/>
      ))}
      <polygon points="0,300 90,140 180,300" fill="#3a3f50"/>
      <polygon points="70,300 180,120 290,300" fill="#353a48"/>
      <polygon points="180,300 300,145 420,300" fill="#303540"/>
      <polygon points="90,140 65,195 115,195" fill="white" opacity="0.85"/>
      <polygon points="180,120 150,185 210,185" fill="white" opacity="0.85"/>
      <polygon points="300,145 275,200 325,200" fill="white" opacity="0.85"/>
      <rect y="295" width="400" height="105" fill="#d8e0ee"/>
      <ellipse cx="200" cy="297" rx="220" ry="20" fill="#e0e8f5"/>
      {[50,90,300,345].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},245 ${x-11},272 ${x+11},272`} fill="#2a3040"/>
          <polygon points={`${x},235 ${x-8},252 ${x+8},252`} fill="white" opacity="0.8"/>
          <polygon points={`${x},258 ${x-14},290 ${x+14},290`} fill="#252a38"/>
          <polygon points={`${x},248 ${x-10},268 ${x+10},268`} fill="white" opacity="0.75"/>
        </g>
      ))}
      <ellipse cx="200" cy="325" rx="130" ry="18" fill="#b8c8e0" opacity="0.7"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-sn)" opacity="0.3"/>
    </svg>
  )
}

function FoggySky() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="foggySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5060"/>
          <stop offset="100%" stopColor="#7a8090"/>
        </linearGradient>
        <filter id="grain-f">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#foggySky)"/>
      <polygon points="0,290 100,170 200,290" fill="#5a6070" opacity="0.5"/>
      <polygon points="80,290 200,155 320,290" fill="#606870" opacity="0.4"/>
      <polygon points="200,290 310,175 420,290" fill="#585e6a" opacity="0.45"/>
      <rect x="-20" y="200" width="450" height="60" fill="#9aa0b0" opacity="0.5" rx="30"/>
      <rect x="-20" y="230" width="450" height="70" fill="#aab0c0" opacity="0.45" rx="30"/>
      <rect x="-20" y="260" width="450" height="80" fill="#b0b8c8" opacity="0.4" rx="30"/>
      <rect y="290" width="400" height="110" fill="#5a6070"/>
      {[60,110,280,330].map((x, i) => (
        <g key={i} opacity="0.5">
          <polygon points={`${x},248 ${x-10},272 ${x+10},272`} fill="#3a4050"/>
          <polygon points={`${x},258 ${x-13},288 ${x+13},288`} fill="#404858"/>
        </g>
      ))}
      <rect x="-20" y="295" width="450" height="60" fill="#9098a8" opacity="0.6" rx="20"/>
      <rect x="-20" y="330" width="450" height="70" fill="#a0a8b8" opacity="0.55" rx="20"/>
      <rect width="400" height="400" fill="transparent" filter="url(#grain-f)" opacity="0.35"/>
    </svg>
  )
}

const illustrations: Record<Condition, React.FC> = {
  clear: ClearSky,
  cloudy: CloudySky,
  rainy: RainySky,
  stormy: StormySky,
  snowy: SnowyScene,
  foggy: FoggySky,
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

  const Illustration = weather ? illustrations[weather.condition] : CloudySky

  return (
    <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-8">
      <div className="relative w-[380px] h-[380px] rounded-3xl overflow-hidden shadow-2xl">
        <Illustration />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

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
