import random
import math
from dataclasses import dataclass, field
from flask import Flask, jsonify

# --- 1. DATA MODELS ---
# Using dataclasses for clean and simple object representation.

@dataclass
class Location:
    """Represents a geographical coordinate."""
    lat: float
    lon: float

@dataclass
class Vehicle:
    """Represents a single vehicle in the fleet."""
    id: int
    location: Location
    status: str = 'idle'  # idle, en_route_to_pickup, en_route_to_dropoff
    assigned_request_id: int | None = None
    trip_ends_at: float = 0.0 # Simulation timestamp when the trip completes

@dataclass
class RideRequest:
    """Represents a customer demand for a ride."""
    id: int
    pickup_location: Location
    dropoff_location: Location
    status: str = 'unassigned' # unassigned, assigned, completed

# --- 2. MOCKED API & UTILITY FUNCTIONS ---
# These functions simulate external data sources like Google Maps and OpenWeather.

def haversine_distance(loc1: Location, loc2: Location) -> float:
    """Calculate the distance between two points in km."""
    R = 6371  # Radius of Earth in kilometers
    lat1, lon1 = math.radians(loc1.lat), math.radians(loc1.lon)
    lat2, lon2 = math.radians(loc2.lat), math.radians(loc2.lon)
    
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c

def get_travel_time(start_loc: Location, end_loc: Location) -> float:
    """
    MOCK FUNCTION: Simulates a call to Google Maps Distance Matrix API.
    In a real system, this would make an HTTP request.
    It factors in simulated traffic and weather.
    """
    base_speed_kmh = 40.0
    
    # 1. Weather Effect Simulation (like OpenWeather API)
    # 1.0 = clear, > 1.0 = bad weather slows down traffic
    weather_multiplier = random.uniform(1.0, 1.5) # Simulating light to heavy rain
    
    # 2. Traffic Effect Simulation (like Google Maps "duration_in_traffic")
    # 1.0 = no traffic, > 1.0 = congestion
    traffic_multiplier = random.uniform(1.0, 2.0)
    
    distance_km = haversine_distance(start_loc, end_loc)
    effective_speed_kmh = base_speed_kmh / (weather_multiplier * traffic_multiplier)
    
    time_hours = distance_km / effective_speed_kmh
    return time_hours * 3600  # Convert to seconds

# --- 3. SIMULATION ENGINE ---

class FleetSimulator:
    """Manages the state and logic of the fleet simulation."""
    def __init__(self, num_vehicles: int, city_bounds: dict):
        self.city_bounds = city_bounds
        self.vehicles = self._initialize_vehicles(num_vehicles)
        self.requests: list[RideRequest] = []
        self.simulation_time = 0.0
        self.request_id_counter = 0
        self.log = []

    def _initialize_vehicles(self, num_vehicles: int) -> list[Vehicle]:
        """Create vehicles at random starting locations."""
        vehicles = []
        for i in range(num_vehicles):
            loc = self._get_random_location()
            vehicles.append(Vehicle(id=i, location=loc))
        return vehicles

    def _get_random_location(self) -> Location:
        """Generates a random location within the defined city boundaries."""
        lat = random.uniform(self.city_bounds['min_lat'], self.city_bounds['max_lat'])
        lon = random.uniform(self.city_bounds['min_lon'], self.city_bounds['max_lon'])
        return Location(lat, lon)

    def _generate_demand(self):
        """Generates a new ride request and adds it to the list."""
        self.request_id_counter += 1
        pickup = self._get_random_location()
        dropoff = self._get_random_location()
        request = RideRequest(id=self.request_id_counter, pickup_location=pickup, dropoff_location=dropoff)
        self.requests.append(request)
        self.log.append(f"[T={int(self.simulation_time)}s] New Demand (ID {request.id}) from {request.pickup_location} to {request.dropoff_location}")

    def _update_vehicle_states(self, time_step: float):
        """Checks for completed trips and updates vehicle status."""
        for v in self.vehicles:
            if v.status != 'idle' and self.simulation_time >= v.trip_ends_at:
                # Find the completed request
                completed_request = next((r for r in self.requests if r.id == v.assigned_request_id), None)
                if completed_request:
                    v.location = completed_request.dropoff_location
                    completed_request.status = 'completed'
                    self.log.append(f"[T={int(self.simulation_time)}s] Vehicle {v.id} COMPLETED trip for Request {v.assigned_request_id}. Now idle at {v.location}.")
                
                v.status = 'idle'
                v.assigned_request_id = None

    def _assign_unassigned_requests(self):
        """
        THE CORE AI AGENT LOGIC.
        Finds the best vehicle for each unassigned request.
        """
        idle_vehicles = [v for v in self.vehicles if v.status == 'idle']
        
        for req in self.requests:
            if req.status == 'unassigned':
                if not idle_vehicles:
                    self.log.append(f"[T={int(self.simulation_time)}s] Request {req.id} has no available vehicles.")
                    break # No idle vehicles left to check
                
                # --- Find the optimal vehicle (Greedy Approach) ---
                best_vehicle = None
                min_pickup_time = float('inf')
                
                for vehicle in idle_vehicles:
                    time_to_pickup = get_travel_time(vehicle.location, req.pickup_location)
                    if time_to_pickup < min_pickup_time:
                        min_pickup_time = time_to_pickup
                        best_vehicle = vehicle
                
                # --- Assign the vehicle and update states ---
                if best_vehicle:
                    # Calculate total trip time
                    time_from_pickup_to_dropoff = get_travel_time(req.pickup_location, req.dropoff_location)
                    total_trip_duration = min_pickup_time + time_from_pickup_to_dropoff
                    
                    # Update states
                    best_vehicle.status = 'en_route_to_pickup' # Can be refined further
                    best_vehicle.assigned_request_id = req.id
                    best_vehicle.trip_ends_at = self.simulation_time + total_trip_duration
                    
                    req.status = 'assigned'
                    
                    # Remove the assigned vehicle from the available pool for this tick
                    idle_vehicles.remove(best_vehicle)
                    
                    self.log.append(
                        f"[T={int(self.simulation_time)}s] Vehicle {best_vehicle.id} ASSIGNED to Request {req.id}. "
                        f"ETA to pickup: {int(min_pickup_time)}s. Total trip: {int(total_trip_duration)}s."
                    )

    def run_step(self, time_step: float, demand_chance: float):
        """Runs a single step of the simulation."""
        self.simulation_time += time_step
        
        # 1. Update vehicle states (check for finished trips)
        self._update_vehicle_states(time_step)
        
        # 2. Randomly generate new demand
        if random.random() < demand_chance:
            self._generate_demand()
            
        # 3. Run the allocation logic
        self._assign_unassigned_requests()

# --- 4. FLASK API ENDPOINT ---
app = Flask(__name__)

@app.route('/run_simulation', methods=['GET'])
def run_simulation_endpoint():
    """
    Endpoint to run the simulation and get the results.
    """
    # Define simulation parameters
    SIMULATION_STEPS = 100         # How many "ticks" the simulation runs for
    TIME_STEP_SECONDS = 30         # Each tick represents 30 seconds
    DEMAND_CHANCE_PER_STEP = 0.5   # 50% chance of a new ride request each tick
    NUM_VEHICLES = 10
    
    # Bounding box for a city (e.g., San Francisco)
    CITY_BOUNDS = {
        "min_lat": 37.70, "max_lat": 37.80,
        "min_lon": -122.50, "max_lon": -122.38
    }
    
    # Initialize and run the simulator
    simulator = FleetSimulator(num_vehicles=NUM_VEHICLES, city_bounds=CITY_BOUNDS)
    
    for _ in range(SIMULATION_STEPS):
        simulator.run_step(time_step=TIME_STEP_SECONDS, demand_chance=DEMAND_CHANCE_PER_STEP)
        
    final_state = {
        'simulation_log': simulator.log,
        'final_vehicle_states': [v.__dict__ for v in simulator.vehicles]
    }
    
    return jsonify(final_state)

if __name__ == '__main__':
    app.run(debug=True)