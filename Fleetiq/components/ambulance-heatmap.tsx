"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Clock,
  AlertTriangle,
  Route,
  Zap,
  Activity,
  TrendingUp,
  Cloud,
  Sun,
  CloudRain,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface AccidentZone {
  id: string
  name: string
  severity: "high" | "medium" | "low"
  incidents: number
  distance: string
  coordinates: { x: number; y: number }
}

interface AmbulanceUnit {
  id: string
  location: string
  status: "available" | "busy" | "maintenance"
  eta: string
  coordinates: { x: number; y: number }
}

const accidentZones: AccidentZone[] = [
  {
    id: "1",
    name: "Mount Road Junction",
    severity: "high",
    incidents: 45,
    distance: "2.3 km",
    coordinates: { x: 45, y: 35 },
  },
  { id: "2", name: "Anna Salai", severity: "high", incidents: 38, distance: "1.8 km", coordinates: { x: 60, y: 50 } },
  {
    id: "3",
    name: "T. Nagar Signal",
    severity: "medium",
    incidents: 28,
    distance: "3.1 km",
    coordinates: { x: 35, y: 60 },
  },
  { id: "4", name: "Vadapalani", severity: "medium", incidents: 22, distance: "4.2 km", coordinates: { x: 25, y: 40 } },
  { id: "5", name: "Porur Toll", severity: "low", incidents: 15, distance: "6.8 km", coordinates: { x: 15, y: 25 } },
]

const ambulanceUnits: AmbulanceUnit[] = [
  { id: "AMB-001", location: "General Hospital", status: "available", eta: "3 min", coordinates: { x: 50, y: 45 } },
  { id: "AMB-002", location: "Apollo Hospital", status: "available", eta: "5 min", coordinates: { x: 40, y: 55 } },
  { id: "AMB-003", location: "MIOT Hospital", status: "busy", eta: "12 min", coordinates: { x: 30, y: 35 } },
  { id: "AMB-004", location: "Fortis Hospital", status: "available", eta: "7 min", coordinates: { x: 65, y: 30 } },
]

const demandData = [
  { time: "6AM", calls: 12, weather: "clear" },
  { time: "8AM", calls: 28, weather: "clear" },
  { time: "10AM", calls: 35, weather: "clear" },
  { time: "12PM", calls: 42, weather: "rain" },
  { time: "2PM", calls: 38, weather: "rain" },
  { time: "4PM", calls: 55, weather: "clear" },
  { time: "6PM", calls: 68, weather: "clear" },
  { time: "8PM", calls: 45, weather: "fog" },
  { time: "10PM", calls: 32, weather: "clear" },
]

export function AmbulanceHeatmap() {
  const [selectedZone, setSelectedZone] = useState<AccidentZone | null>(null)
  const [selectedAmbulance, setSelectedAmbulance] = useState<AmbulanceUnit | null>(null)
  const [liveStats, setLiveStats] = useState({
    totalCalls: 247,
    avgResponseTime: 4.2,
    activeUnits: 12,
    weatherImpact: 15,
  })
  const [currentWeather, setCurrentWeather] = useState<"clear" | "rain" | "fog">("clear")

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 3),
        avgResponseTime: Math.max(3.0, prev.avgResponseTime + (Math.random() * 0.4 - 0.2)),
        activeUnits: Math.max(8, Math.min(15, prev.activeUnits + Math.floor(Math.random() * 3 - 1))),
        weatherImpact: Math.max(0, Math.min(30, prev.weatherImpact + Math.floor(Math.random() * 6 - 3))),
      }))

      // Simulate weather changes
      const weathers: ("clear" | "rain" | "fog")[] = ["clear", "rain", "fog"]
      if (Math.random() < 0.1) {
        setCurrentWeather(weathers[Math.floor(Math.random() * weathers.length)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "maintenance":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "rain":
        return <CloudRain className="h-4 w-4 text-blue-400" />
      case "fog":
        return <Cloud className="h-4 w-4 text-gray-400" />
      default:
        return <Sun className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4 sm:space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="glassmorphic-card rounded-xl p-4 text-center pulse-glow">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-2xl font-bold text-white">{liveStats.totalCalls}</span>
          </div>
          <p className="text-xs text-white/70">Emergency Calls Today</p>
        </div>
        <div className="glassmorphic-card rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-2xl font-bold text-white">{liveStats.avgResponseTime.toFixed(1)}m</span>
          </div>
          <p className="text-xs text-white/70">Avg Response Time</p>
        </div>
        <div className="glassmorphic-card rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Navigation className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">{liveStats.activeUnits}</span>
          </div>
          <p className="text-xs text-white/70">Active Units</p>
        </div>
        <div className="glassmorphic-card rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            {getWeatherIcon(currentWeather)}
            <span className="text-2xl font-bold text-white">{liveStats.weatherImpact}%</span>
          </div>
          <p className="text-xs text-white/70">Weather Impact</p>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
        <div className="glassmorphic-card rounded-2xl p-6 hover:glow-intense transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white glow-text mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-400" />
              Chennai Emergency Heatmap - Live
            </h3>
            <p className="text-white/80 text-sm">Real-time accident-prone zones with weather overlay</p>
          </div>

          <div className="relative aspect-video rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/20 overflow-hidden">
            {/* Map Background with weather overlay */}
            <div className="absolute inset-0">
              <div
                className={`absolute inset-0 transition-all duration-1000 ${
                  currentWeather === "rain"
                    ? "bg-blue-900/20"
                    : currentWeather === "fog"
                      ? "bg-gray-900/30"
                      : "bg-transparent"
                }`}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`h-${i}`} className="absolute w-full h-px bg-white/30" style={{ top: `${i * 10}%` }} />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={`v-${i}`} className="absolute h-full w-px bg-white/30" style={{ left: `${i * 10}%` }} />
                  ))}
                </div>

                {/* Chennai label with weather */}
                <div className="absolute top-4 left-4 glassmorphic-card px-3 py-2 rounded-md text-sm font-medium text-white flex items-center gap-2">
                  Chennai, Tamil Nadu
                  {getWeatherIcon(currentWeather)}
                </div>
              </div>
            </div>

            {/* Accident Zones with enhanced animations */}
            {accidentZones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.3, opacity: 1 }}
                className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all ${getSeverityColor(zone.severity)} glow-intense`}
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedZone(zone)}
              >
                <div
                  className={`absolute inset-0 rounded-full animate-ping ${getSeverityColor(zone.severity)} opacity-40`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}

            {/* Ambulance Units with enhanced styling */}
            {ambulanceUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                className={`absolute w-6 h-6 rounded cursor-pointer transition-all ${getStatusColor(unit.status)} glow`}
                style={{
                  left: `${unit.coordinates.x}%`,
                  top: `${unit.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedAmbulance(unit)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="h-3 w-3 text-white" />
                </div>
              </motion.div>
            ))}

            {/* Enhanced Route Lines */}
            {selectedZone && selectedAmbulance && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <line
                  x1={`${selectedAmbulance.coordinates.x}%`}
                  y1={`${selectedAmbulance.coordinates.y}%`}
                  x2={`${selectedZone.coordinates.x}%`}
                  y2={`${selectedZone.coordinates.y}%`}
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  strokeDasharray="8,4"
                  className="animate-pulse glow-intense"
                />
              </motion.svg>
            )}
          </div>

          {/* Enhanced Map Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {[
              { color: "bg-red-500", label: "High Risk Zones" },
              { color: "bg-orange-500", label: "Medium Risk" },
              { color: "bg-yellow-500", label: "Low Risk" },
              { color: "bg-green-500", label: "Available Units" },
              { color: "bg-red-500", label: "Busy Units" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center gap-2 text-white/80"
              >
                <div className={`w-3 h-3 rounded-full ${item.color} glow`} />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glassmorphic-card rounded-2xl p-6 hover:glow-intense transition-all duration-300"
      >
        <h3 className="text-xl font-bold text-white glow-text mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Live Emergency Demand vs Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandData}>
              <defs>
                <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Area type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={3} fill="url(#demandGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Information Panels with enhanced styling */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Accident Zones List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="glassmorphic-card rounded-2xl p-6 hover:glow-intense transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-white glow-text mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            Nearest Areas - Interactive
          </h3>
          <p className="text-white/80 text-sm mb-4">Click cards to highlight locations and view routes</p>
          <div className="space-y-3">
            {accidentZones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`glassmorphic-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedZone?.id === zone.id ? "glow-intense border-purple-400" : "hover:glow"
                }`}
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{zone.name}</div>
                    <div className="text-sm text-white/70 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {zone.distance} away
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${
                        zone.severity === "high"
                          ? "bg-red-500/80 text-white"
                          : zone.severity === "medium"
                            ? "bg-orange-500/80 text-white"
                            : "bg-yellow-500/80 text-black"
                      } glow`}
                    >
                      {zone.incidents} incidents
                    </Badge>
                    <div className="text-xs text-white/60 mt-1">Risk: {zone.severity}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ambulance Fleet */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="glassmorphic-card rounded-2xl p-6 hover:glow-intense transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-white glow-text mb-4 flex items-center gap-2">
            <Navigation className="h-5 w-5 text-green-400" />
            Fleet Status - Live Updates
          </h3>
          <p className="text-white/80 text-sm mb-4">Real-time ambulance positioning and availability</p>
          <div className="space-y-3">
            {ambulanceUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`glassmorphic-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedAmbulance?.id === unit.id ? "glow-intense border-blue-400" : "hover:glow"
                }`}
                onClick={() => setSelectedAmbulance(unit)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{unit.id}</div>
                    <div className="text-sm text-white/70">{unit.location}</div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${
                        unit.status === "available"
                          ? "bg-green-500/80 text-white"
                          : unit.status === "busy"
                            ? "bg-red-500/80 text-white"
                            : "bg-gray-500/80 text-white"
                      } glow`}
                    >
                      {unit.status}
                    </Badge>
                    <div className="text-sm text-white/70 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ETA: {unit.eta}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Route Planning */}
      <AnimatePresence>
        {selectedZone && selectedAmbulance && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glassmorphic-card rounded-2xl p-6 glow-intense"
          >
            <h3 className="text-xl font-bold text-white glow-text mb-4 flex items-center gap-2">
              <Route className="h-5 w-5 text-cyan-400" />
              AI-Optimized Route Planning
            </h3>
            <p className="text-white/80 text-sm mb-6">
              Route from {selectedAmbulance.location} to {selectedZone.name} with live traffic analysis
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="glassmorphic-card rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-green-400 glow-text">🚀 Recommended Route</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { road: "Anna Salai", status: "Clear", color: "bg-green-500" },
                    { road: "Gemini Flyover", status: "Free Flow", color: "bg-green-500" },
                    { road: "Mount Road", status: "Moderate", color: "bg-orange-500" },
                  ].map((segment, index) => (
                    <motion.div
                      key={segment.road}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <div className={`w-2 h-2 rounded-full ${segment.color} glow`} />
                      <span>
                        {segment.road} - {segment.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span>Estimated Time: 8 minutes</span>
                  </div>
                </div>
              </div>

              <div className="glassmorphic-card rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-orange-400 glow-text">⚡ Alternative Route</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { road: "Poonamallee Road", status: "Moderate", color: "bg-orange-500" },
                    { road: "T. Nagar", status: "Heavy Traffic", color: "bg-red-500" },
                    { road: "Usman Road", status: "Clear", color: "bg-green-500" },
                  ].map((segment, index) => (
                    <motion.div
                      key={segment.road}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <div className={`w-2 h-2 rounded-full ${segment.color} glow`} />
                      <span>
                        {segment.road} - {segment.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span>Estimated Time: 12 minutes</span>
                  </div>
                </div>
              </div>

              <div className="glassmorphic-card rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-white glow-text">🎯 Quick Actions</h4>
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 glow-intense">
                      <Zap className="h-4 w-4 mr-2" />
                      Dispatch Now
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full glassmorphic-card border-white/30 text-white hover:glow bg-transparent"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Send GPS Route
                    </Button>
                  </motion.div>
                </div>
                <div className="pt-3 border-t border-white/20 text-xs text-white/70">
                  Weather Impact: {liveStats.weatherImpact}% delay expected
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
