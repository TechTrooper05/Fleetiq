"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Bike,
  Bus,
  MapPin,
  Zap,
  Route,
  Cloud,
  Sun,
  CloudRain,
  TrendingUp,
  TrendingDown,
  Navigation,
  BarChart3,
  PieChart,
  Activity,
  Target,
} from "lucide-react"

interface VehicleType {
  id: string
  name: string
  icon: any
  variants: string[]
  capacity: string
  fuelType: string[]
  description: string
}

interface DensityArea {
  id: string
  name: string
  type: "high" | "low"
  distance: string
  demand: number
  coordinates: { x: number; y: number }
  weather: string
  temperature: string
  demandScore: string
  aiTip: string
}

interface ChargingStation {
  id: string
  name: string
  type: "fast" | "standard"
  distance: string
  availability: number
  coordinates: { x: number; y: number }
}

const vehicleTypes: VehicleType[] = [
  {
    id: "car",
    name: "Car",
    icon: Car,
    variants: ["4-seater", "6-seater", "10-seater mini-van"],
    capacity: "4-10 passengers",
    fuelType: ["Petrol", "Diesel", "Electric"],
    description: "Versatile passenger transport for urban and suburban routes",
  },
  {
    id: "bike",
    name: "Bike",
    icon: Bike,
    variants: ["Single seat", "Pillion"],
    capacity: "1-2 passengers",
    fuelType: ["Petrol", "Electric"],
    description: "Efficient for narrow roads and quick deliveries",
  },
  {
    id: "bus",
    name: "Bus",
    icon: Bus,
    variants: ["Mini Bus", "Standard Bus", "Luxury Coach"],
    capacity: "20-50 passengers",
    fuelType: ["Diesel", "CNG", "Electric"],
    description: "High capacity transport for mass transit",
  },
]

const enhancedDensityAreas = [
  {
    id: "1",
    name: "T. Nagar",
    type: "high",
    distance: "2.3 km",
    demand: 85,
    coordinates: { x: 45, y: 35 },
    weather: "clear",
    temperature: "28°C",
    demandScore: "High demand zone",
    aiTip: "Take inner ring road to save 10% fuel",
  },
  {
    id: "2",
    name: "Anna Nagar",
    type: "low",
    distance: "4.1 km",
    demand: 35,
    coordinates: { x: 30, y: 50 },
    weather: "rain",
    temperature: "24°C",
    demandScore: "Moderate demand zone",
    aiTip: "Shift allocation of 6-seaters here to balance demand",
  },
  {
    id: "3",
    name: "Velachery",
    type: "high",
    distance: "6.8 km",
    demand: 78,
    coordinates: { x: 60, y: 65 },
    weather: "clear",
    temperature: "29°C",
    demandScore: "High demand zone",
    aiTip: "Avoid this area for bikes due to high congestion",
  },
  {
    id: "4",
    name: "Adyar",
    type: "low",
    distance: "3.5 km",
    demand: 42,
    coordinates: { x: 55, y: 45 },
    weather: "fog",
    temperature: "22°C",
    demandScore: "Low demand zone",
    aiTip: "Optimal for electric vehicles - charging stations nearby",
  },
  {
    id: "5",
    name: "Mylapore",
    type: "high",
    distance: "1.9 km",
    demand: 92,
    coordinates: { x: 50, y: 55 },
    weather: "clear",
    temperature: "27°C",
    demandScore: "Very high demand zone",
    aiTip: "Peak hours: Deploy more vehicles between 8-10 AM",
  },
]

const chargingStations = [
  {
    id: "cs1",
    name: "Charging Station 1",
    type: "fast",
    distance: "1.5 km",
    availability: 10,
    coordinates: { x: 40, y: 40 },
  },
  {
    id: "cs2",
    name: "Charging Station 2",
    type: "standard",
    distance: "3.0 km",
    availability: 5,
    coordinates: { x: 60, y: 60 },
  },
]

export function PrivateSectorDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null)
  const [selectedArea, setSelectedArea] = useState<any>(null)
  const [weatherCondition, setWeatherCondition] = useState<"clear" | "rain" | "fog">("clear")

  const liveTrafficData = 65
  const liveDemandData = 78
  const [aiRecommendation, setAiRecommendation] = useState<any>(null)
  const trafficTimeData = [65, 45, 78, 92, 56, 73, 88, 34, 67, 81]
  const demandTimeData = [78, 56, 89, 67, 92, 45, 73, 88, 54, 76]
  const optimizationBefore = 67
  const optimizationAfter = 89

  useEffect(() => {
    if (selectedVehicle && selectedArea) {
      setAiRecommendation({
        vehicleType: selectedVehicle.name,
        route: "Inner Ring Road → Local Roads",
        eta: "12 minutes",
        fuelSavings: "15% vs alternatives",
        demandServed: "85%",
        confidence: "High",
      })
    }
  }, [selectedVehicle, selectedArea])

  const getAreaColor = (type: string) => {
    return type === "high" ? "bg-purple-500" : "bg-pink-500"
  }

  const getWeatherIcon = (weather?: string) => {
    const condition = weather || weatherCondition
    switch (condition) {
      case "clear":
        return <Sun className="h-4 w-4" />
      case "rain":
        return <CloudRain className="h-4 w-4" />
      case "fog":
        return <Cloud className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const generateProsAndCons = () => {
    if (!selectedVehicle || !selectedArea) return null

    const pros = []
    const cons = []

    // Vehicle-specific pros/cons
    if (selectedVehicle.id === "bike") {
      pros.push("Quick navigation through traffic", "Low fuel consumption", "Easy parking")
      cons.push("Weather dependent", "Limited passenger capacity")
    } else if (selectedVehicle.id === "car") {
      pros.push("Comfortable for passengers", "Weather protection", "Moderate fuel efficiency")
      cons.push("Traffic congestion impact", "Parking challenges in dense areas")
    } else if (selectedVehicle.id === "bus") {
      pros.push("High passenger capacity", "Cost-effective per passenger", "Dedicated bus lanes")
      cons.push("Fixed route constraints", "Higher fuel consumption")
    }

    // Area-specific pros/cons
    if (selectedArea.type === "high") {
      pros.push("High demand area", "Multiple route options")
      cons.push("Heavy traffic", "Parking limitations")
    } else {
      pros.push("Less congested routes", "Easy parking")
      cons.push("Lower demand", "Longer distances between pickups")
    }

    // Weather-specific pros/cons
    if (weatherCondition === "rain") {
      pros.push("Higher demand for transport")
      cons.push("Reduced visibility", "Slower speeds", "Traffic delays")
    } else if (weatherCondition === "clear") {
      pros.push("Optimal driving conditions", "Predictable travel times")
    }

    return { pros, cons }
  }

  const handleAreaClick = (area: any) => {
    setSelectedArea(area)
    // Open optimization details in new window/tab
    const optimizationData = {
      area: area.name,
      vehicle: selectedVehicle?.name || "Not selected",
      weather: area.weather,
      demand: area.demand,
      aiTip: area.aiTip,
      fuelSavings: "15-22%",
      timeReduction: "8-12 minutes",
      demandIncrease: "+25-35 requests",
      routeOptimization: "Inner Ring Road → Local Roads",
      trafficAvoidance: "3 congested zones bypassed",
      weatherImpact: area.weather === "rain" ? "Slower speeds, +20% demand" : "Optimal conditions",
    }

    // Create detailed optimization view
    const newWindow = window.open("", "_blank", "width=800,height=600")
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Optimization Details - ${area.name}</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
              .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; margin: 10px 0; }
              .metric { display: flex; justify-content: space-between; margin: 8px 0; }
              .value { font-weight: bold; color: #60a5fa; }
              h1, h2 { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
            </style>
          </head>
          <body>
            <h1>🎯 AI Optimization Details</h1>
            <div class="card">
              <h2>📍 ${optimizationData.area} - ${optimizationData.vehicle}</h2>
              <div class="metric"><span>Weather Condition:</span><span class="value">${optimizationData.weather} - ${optimizationData.weatherImpact}</span></div>
              <div class="metric"><span>Current Demand:</span><span class="value">${optimizationData.demand}%</span></div>
            </div>
            <div class="card">
              <h2>⚡ Optimization Results</h2>
              <div class="metric"><span>Fuel Savings:</span><span class="value">${optimizationData.fuelSavings}</span></div>
              <div class="metric"><span>Time Reduction:</span><span class="value">${optimizationData.timeReduction}</span></div>
              <div class="metric"><span>Demand Increase:</span><span class="value">${optimizationData.demandIncrease}</span></div>
              <div class="metric"><span>Route Optimization:</span><span class="value">${optimizationData.routeOptimization}</span></div>
              <div class="metric"><span>Traffic Avoidance:</span><span class="value">${optimizationData.trafficAvoidance}</span></div>
            </div>
            <div class="card">
              <h2>💡 AI Recommendation</h2>
              <p>${optimizationData.aiTip}</p>
            </div>
          </body>
        </html>
      `)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Vehicle Selection */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {vehicleTypes.map((vehicle) => {
          const IconComponent = vehicle.icon
          return (
            <Card
              key={vehicle.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 glassmorphic ${
                selectedVehicle?.id === vehicle.id ? "border-accent bg-accent/5 shadow-md glow-border" : ""
              }`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-accent">
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <CardTitle className="text-lg sm:text-xl neon-text">{vehicle.name}</CardTitle>
                <CardDescription className="text-sm">{vehicle.capacity}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <strong>Variants:</strong> {vehicle.variants.join(", ")}
                  </div>
                  <div>
                    <strong>Fuel:</strong> {vehicle.fuelType.join(", ")}
                  </div>
                  <p className="text-muted-foreground">{vehicle.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedVehicle && (
        <>
          {/* Main Dashboard */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <Card className="glassmorphic">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl neon-text">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                        Chennai Fleet Map
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Live traffic density: <span className="text-accent font-medium">{liveTrafficData}%</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        variant={weatherCondition === "clear" ? "default" : "outline"}
                        onClick={() => setWeatherCondition("clear")}
                        className="px-2 sm:px-3 glow-button"
                      >
                        <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">Clear</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={weatherCondition === "rain" ? "default" : "outline"}
                        onClick={() => setWeatherCondition("rain")}
                        className="px-2 sm:px-3 glow-button"
                      >
                        <CloudRain className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">Rain</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={weatherCondition === "fog" ? "default" : "outline"}
                        onClick={() => setWeatherCondition("fog")}
                        className="px-2 sm:px-3 glow-button"
                      >
                        <Cloud className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline ml-1">Fog</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg bg-slate-100 border overflow-hidden touch-pan-x touch-pan-y">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200">
                      {/* Grid lines */}
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={`h-${i}`}
                            className="absolute w-full h-px bg-slate-400"
                            style={{ top: `${i * 10}%` }}
                          />
                        ))}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={`v-${i}`}
                            className="absolute h-full w-px bg-slate-400"
                            style={{ left: `${i * 10}%` }}
                          />
                        ))}
                      </div>

                      {/* Weather overlay */}
                      {weatherCondition === "rain" && <div className="absolute inset-0 bg-blue-500/10" />}
                      {weatherCondition === "fog" && <div className="absolute inset-0 bg-gray-500/20" />}

                      {/* Chennai label */}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2">
                        Chennai, Tamil Nadu
                        {getWeatherIcon()}
                        <span className="text-xs capitalize">{weatherCondition}</span>
                      </div>
                    </div>

                    {/* Density Areas */}
                    {enhancedDensityAreas.map((area) => (
                      <div
                        key={area.id}
                        className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-125 ${getAreaColor(area.type)} opacity-60 hover:opacity-100 glow-element`}
                        style={{
                          left: `${area.coordinates.x}%`,
                          top: `${area.coordinates.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handleAreaClick(area)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          {area.demand}
                        </div>
                      </div>
                    ))}

                    {/* EV Charging Stations */}
                    {selectedVehicle.fuelType.includes("Electric") &&
                      chargingStations.map((station) => (
                        <div
                          key={station.id}
                          className="absolute w-4 h-4 rounded cursor-pointer transition-all hover:scale-125 bg-green-500 glow-element"
                          style={{
                            left: `${station.coordinates.x}%`,
                            top: `${station.coordinates.y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Zap className="w-2 h-2 text-white" />
                          </div>
                        </div>
                      ))}

                    {/* Traffic simulation lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#ef4444" strokeWidth="3" opacity="0.7" />
                      <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#f97316" strokeWidth="3" opacity="0.7" />
                      <line x1="15%" y1="70%" x2="85%" y2="70%" stroke="#22c55e" strokeWidth="3" opacity="0.7" />
                    </svg>
                  </div>

                  {/* Map Legend */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span>High Density Areas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-pink-500" />
                        <span>Low Density Areas</span>
                      </div>
                      {selectedVehicle.fuelType.includes("Electric") && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-green-500" />
                          <span>EV Charging Stations</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-red-500" />
                        <span>Heavy Traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-orange-500" />
                        <span>Moderate Traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-green-500" />
                        <span>Free Flow</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar Information */}
            <div className="space-y-3 sm:space-y-4">
              <Card className="glassmorphic">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 neon-text font-semibold tracking-wide">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 drop-shadow-sm" />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Live Analytics
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traffic Density</span>
                    <span className="text-sm font-medium text-accent">{liveTrafficData}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${liveTrafficData}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Demand</span>
                    <span className="text-sm font-medium text-accent">{liveDemandData}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${liveDemandData}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphic">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base flex items-center gap-2 neon-text">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                    Live Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traffic Density</span>
                    <span className="text-sm font-medium text-accent">{liveTrafficData}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${liveTrafficData}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Demand</span>
                    <span className="text-sm font-medium text-accent">{liveDemandData}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${liveDemandData}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* ... existing EV charging card ... */}
              {selectedVehicle.fuelType.includes("Electric") && (
                <Card className="glassmorphic">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base flex items-center gap-2 neon-text">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                      EV Charging Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {chargingStations.map((station) => (
                        <div key={station.id} className="flex justify-between text-sm sm:text-base">
                          <div>
                            <div className="font-medium">{station.name}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{station.distance}</div>
                          </div>
                          <div className="text-right">
                            <Badge variant={station.availability > 5 ? "default" : "secondary"}>
                              {station.availability} slots
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {aiRecommendation && (
            <Card className="glassmorphic glow-border-blue">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl neon-text-blue">
                  <Target className="h-5 w-5 text-blue-400" />
                  Best Route Chosen by AI
                </CardTitle>
                <CardDescription>AI-optimized recommendation for your fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{aiRecommendation.vehicleType}</div>
                    <div className="text-sm text-muted-foreground">Selected Vehicle</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{aiRecommendation.eta}</div>
                    <div className="text-sm text-muted-foreground">ETA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{aiRecommendation.fuelSavings}</div>
                    <div className="text-sm text-muted-foreground">Fuel Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{aiRecommendation.demandServed}</div>
                    <div className="text-sm text-muted-foreground">Demand Served</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="h-4 w-4 text-blue-400" />
                    <span className="font-medium">Recommended Route:</span>
                    <span>{aiRecommendation.route}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 neon-text">
                  <BarChart3 className="h-5 w-5" />
                  Traffic vs Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-end justify-between gap-1">
                  {trafficTimeData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div
                        className="w-4 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-xs">{index + 6}AM</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 neon-text">
                  <Activity className="h-5 w-5" />
                  Service Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-end justify-between gap-1">
                  {demandTimeData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div
                        className="w-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-xs">{index + 6}AM</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 neon-text">
                  <PieChart className="h-5 w-5" />
                  Optimization Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Before AI</span>
                    <span className="text-sm text-red-400">{optimizationBefore}% efficiency</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: `${optimizationBefore}%` }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">After AI</span>
                    <span className="text-sm text-green-400">{optimizationAfter}% efficiency</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: `${optimizationAfter}%` }} />
                  </div>
                  <div className="text-center text-accent font-medium">
                    +{(optimizationAfter - optimizationBefore).toFixed(0)}% improvement
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedArea && (
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl neon-text">
                    <Route className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    Route Analysis to {selectedArea.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Optimized for {selectedVehicle.name} - {selectedArea.distance} away
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="fastest" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                      <TabsTrigger value="fastest">Fastest</TabsTrigger>
                      <TabsTrigger value="fuel">Fuel Efficient</TabsTrigger>
                      <TabsTrigger value="demand">High Demand</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fastest" className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>Inner Ring Road - Clear</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>Poonamallee Road - Moderate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>Local roads - Clear</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t space-y-1">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>ETA:</span>
                          <span className="font-medium">12 minutes</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Fuel Consumption:</span>
                          <span className="font-medium">2.1L</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Demand Impact:</span>
                          <span className="font-medium text-accent">+15 requests served</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="fuel" className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>Avoid stop-go zones</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>Maintain steady 45 km/h</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t space-y-1">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>ETA:</span>
                          <span className="font-medium">18 minutes</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Fuel Consumption:</span>
                          <span className="font-medium text-green-500">1.8L (-15%)</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Demand Impact:</span>
                          <span className="font-medium text-accent">+12 requests served</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="demand" className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>High demand corridor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Multiple pickup points</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t space-y-1">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>ETA:</span>
                          <span className="font-medium">15 minutes</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Fuel Consumption:</span>
                          <span className="font-medium">2.3L</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span>Demand Impact:</span>
                          <span className="font-medium text-accent">+28 requests served</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* ... existing pros and cons code ... */}
              {(() => {
                const prosAndCons = generateProsAndCons()
                return prosAndCons ? (
                  <Card className="glassmorphic">
                    <CardHeader>
                      <CardTitle className="neon-text">Route Analysis</CardTitle>
                      <CardDescription>
                        Pros and cons for {selectedVehicle.name} to {selectedArea.name} in {selectedArea.weather}{" "}
                        weather
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                            Advantages
                          </h4>
                          <ul className="space-y-1 text-sm sm:text-base">
                            {prosAndCons.pros.map((pro, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />
                            Considerations
                          </h4>
                          <ul className="space-y-1 text-sm sm:text-base">
                            {prosAndCons.cons.map((con, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-orange-500" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : null
              })()}
            </div>
          )}
        </>
      )}
    </div>
  )
}
