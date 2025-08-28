"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Truck,
  Ambulance,
  Car,
  MapPin,
  Route,
  Zap,
  Menu,
  X,
  TrendingUp,
  Activity,
  Hospital,
  AlertTriangle,
  Cloud,
} from "lucide-react"
import { PrivateSectorDashboard } from "@/components/private-sector-dashboard"
import { motion, AnimatePresence } from "framer-motion"

export default function FleetiqHome() {
  const [selectedService, setSelectedService] = useState<"public" | "private" | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const liveStats = {
    activeFleets: 247,
    fuelSavings: 23.5,
    timeSaved: 18.3,
  }

  const emergencyDemand = [
    { time: "00:00", demand: 12 },
    { time: "04:00", demand: 8 },
    { time: "08:00", demand: 25 },
    { time: "12:00", demand: 18 },
    { time: "16:00", demand: 32 },
    { time: "20:00", demand: 28 },
  ]

  const resetSelection = () => {
    setSelectedService(null)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-border/30 card-glow backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary glow-purple">
                <Truck className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white glow-text neon-text">Fleetiq</h1>
            </motion.div>
            <div className="flex items-center gap-2">
              {selectedService && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSelection}
                  className="hidden sm:inline-flex bg-white/10 border-white/20 text-white hover:bg-white/20 hover:glow"
                >
                  Back to Home
                </Button>
              )}
              {selectedService && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {mobileMenuOpen && selectedService && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 sm:hidden"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={resetSelection}
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Back to Home
              </Button>
            </motion.div>
          )}
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-6 sm:py-12">
        <AnimatePresence mode="wait">
          {!selectedService ? (
            // Landing Page
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <div className="mb-8 sm:mb-12">
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white glow-text neon-text text-balance"
                >
                  Fleetiq
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 text-lg sm:text-xl bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent font-semibold"
                >
                  AI-powered Fleet Optimization in Real Time
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="glassmorphic-card rounded-2xl p-6 sm:p-8 mx-auto max-w-3xl mb-8"
                >
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed text-pretty">
                    Fleetiq reallocates vehicles dynamically using live traffic, weather, and demand data to maximize
                    utilization, reduce costs, and improve customer satisfaction.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
                >
                  <div className="glassmorphic-card rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Activity className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{liveStats.activeFleets}</span>
                    </div>
                    <p className="text-xs text-white/70">Active Fleets</p>
                  </div>
                  <div className="glassmorphic-card rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{liveStats.fuelSavings.toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-white/70">Fuel Savings</p>
                  </div>
                  <div className="glassmorphic-card rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{liveStats.timeSaved.toFixed(1)}m</span>
                    </div>
                    <p className="text-xs text-white/70">Avg Time Saved</p>
                  </div>
                </motion.div>

                {/* Service Selection Cards */}
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="glassmorphic-card rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:glow-intense group"
                    onClick={() => setSelectedService("public")}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 glow-intense"
                      >
                        <Ambulance className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2 glow-text">
                        Public Service <span className="text-2xl">🚑</span>
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base mb-4">
                        Emergency response and public safety fleet management
                      </p>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="h-4 w-4" />
                        <span>Real-time emergency routing</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="glassmorphic-card rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:glow-intense group"
                    onClick={() => setSelectedService("private")}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        whileHover={{ rotate: -360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 glow-intense"
                      >
                        <Car className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2 glow-text">
                        Private Sector <span className="text-2xl">🚗</span>
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base mb-4">
                        Commercial fleet optimization and logistics management
                      </p>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Route className="h-4 w-4" />
                        <span>Smart route optimization</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Features Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="grid gap-4 sm:gap-6 md:grid-cols-3"
                >
                  {[
                    {
                      icon: Zap,
                      title: "Real-time Analytics",
                      desc: "Live traffic, weather, and demand data integration",
                      gradient: "from-yellow-400 to-orange-500",
                    },
                    {
                      icon: Route,
                      title: "Smart Routing",
                      desc: "AI-powered route optimization for maximum efficiency",
                      gradient: "from-green-400 to-emerald-500",
                    },
                    {
                      icon: MapPin,
                      title: "Dynamic Allocation",
                      desc: "Intelligent vehicle reallocation based on demand patterns",
                      gradient: "from-purple-400 to-pink-500",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.2 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="glassmorphic-card rounded-xl p-6 text-center hover:glow-intense transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} glow-intense`}
                      >
                        <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </motion.div>
                      <h3 className="mb-3 font-bold text-lg text-white glow-text">{feature.title}</h3>
                      <p className="text-sm text-white/80">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Emergency Demand Graph */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 glassmorphic-card rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 glow-text">Time vs Emergency Demand</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {emergencyDemand.map((item, index) => (
                    <motion.div
                      key={item.time}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.demand / 35) * 100}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                      className="flex-1 bg-gradient-to-t from-red-500 to-red-300 rounded-t-lg relative group hover:glow-intense"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.demand}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70">
                        {item.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : selectedService === "public" ? (
            <motion.div
              key="public"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-7xl"
            >
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl font-bold text-white glow-text neon-text">
                  Public Service (Ambulance Mode)
                </h2>
                <p className="text-sm sm:text-base text-white/80">Emergency response and public safety management</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Map Placeholder */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glassmorphic-card rounded-2xl p-8 text-center h-96 flex flex-col items-center justify-center"
                  >
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-2xl font-bold text-white mb-2 glow-text">Map Integration Coming Soon</h3>
                    <p className="text-white/70 mb-4">Add Google Maps API Key Here</p>
                    <div className="text-sm text-white/50">
                      Interactive Chennai heatmap with accident-prone zones will be displayed here
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Sidebar Cards */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02, glow: true }}
                    className="glassmorphic-card rounded-xl p-4 hover:glow-intense transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Hospital className="h-6 w-6 text-red-400" />
                      <h3 className="font-bold text-white">Nearest Hospitals</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>Apollo Hospital</span>
                        <span className="text-green-400">2.3km • 4min</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>MIOT Hospital</span>
                        <span className="text-yellow-400">3.7km • 7min</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Fortis Hospital</span>
                        <span className="text-red-400">5.1km • 12min</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, glow: true }}
                    className="glassmorphic-card rounded-xl p-4 hover:glow-intense transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="h-6 w-6 text-orange-400" />
                      <h3 className="font-bold text-white">Accident-prone Zones</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>OMR Junction</span>
                        <span className="text-red-400">Risk: 8.5/10</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Anna Salai</span>
                        <span className="text-orange-400">Risk: 6.2/10</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>ECR Highway</span>
                        <span className="text-yellow-400">Risk: 4.8/10</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, glow: true }}
                    className="glassmorphic-card rounded-xl p-4 hover:glow-intense transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Cloud className="h-6 w-6 text-blue-400" />
                      <h3 className="font-bold text-white">Weather Forecast</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>Current</span>
                        <span className="text-blue-400">28°C • Clear</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Next 2 hours</span>
                        <span className="text-yellow-400">30°C • Partly Cloudy</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Evening</span>
                        <span className="text-gray-400">26°C • Light Rain</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Private Sector Section
            <motion.div
              key="private"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-6xl"
            >
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="mb-2 sm:mb-4 text-2xl sm:text-3xl font-bold text-white glow-text neon-text">
                  Private Sector Fleet
                </h2>
                <p className="text-sm sm:text-base text-white/80">Commercial vehicle optimization and logistics</p>
              </div>

              <PrivateSectorDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        className="mt-16 border-t border-white/20 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-white/70">
              <motion.span whileHover={{ color: "#ffffff", scale: 1.1 }} className="cursor-pointer">
                About
              </motion.span>
              <motion.span whileHover={{ color: "#ffffff", scale: 1.1 }} className="cursor-pointer">
                APIs
              </motion.span>
              <motion.span whileHover={{ color: "#ffffff", scale: 1.1 }} className="cursor-pointer">
                Contact
              </motion.span>
            </div>
            <p className="text-sm text-white/70 text-center glow-text">Fleetiq – Smarter Fleets. Faster Cities.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
