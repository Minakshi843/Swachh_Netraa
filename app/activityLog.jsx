import { ArrowLeft, Clock, Filter, Mail, MapPin, Phone, Plus, Search, Truck, User, Users } from 'lucide-react';
import { useState } from 'react';

const ActivityLogApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [userType, setUserType] = useState('all');

  // Sample data
  const workers = [
    {
      id: 1,
      name: 'Fo Lambert',
      role: 'Driver',
      avatar: '/api/placeholder/80/80',
      completed: 12,
      active: 2,
      phone: '+1 (555) 123-4567',
      email: 'fo.lambert@company.com',
      location: 'San Francisco, CA',
      deliveries: [
        { type: 'Drop-off', address: '3601 Lyon St, San Francisco, CA', time: '10:30 AM', status: 'completed' },
        { type: 'Pickup', address: '506 Clement St, San Francisco, CA', time: '2:15 PM', status: 'completed' },
        { type: 'Pickup', address: '506 Clement St, San Francisco, CA', time: '3:45 PM', status: 'active' },
        { type: 'Drop-off', address: '1254 Irving St, San Francisco, CA', time: '4:30 PM', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'Helper',
      avatar: '/api/placeholder/80/80',
      completed: 8,
      active: 1,
      phone: '+1 (555) 987-6543',
      email: 'maria.rodriguez@company.com',
      location: 'Oakland, CA',
      deliveries: [
        { type: 'Pickup', address: '892 Broadway, Oakland, CA', time: '9:00 AM', status: 'completed' },
        { type: 'Drop-off', address: '1456 Telegraph Ave, Oakland, CA', time: '11:30 AM', status: 'active' }
      ]
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Supervisor',
      avatar: '/api/placeholder/80/80',
      completed: 25,
      active: 3,
      phone: '+1 (555) 456-7890',
      email: 'james.wilson@company.com',
      location: 'Berkeley, CA',
      deliveries: []
    }
  ];

  const vehicles = [
    {
      id: 'VH-001',
      driver: 'Fo Lambert',
      trips: [
        { name: 'October 11', type: 'Pickup', summary: 'Full Day of Deliveries', status: 'completed', startTime: '8:00 AM', endTime: '6:00 PM' },
        { name: 'October 11', type: 'Drop-off', summary: '4 Simple deliveries', status: 'completed', startTime: '9:00 AM', endTime: '2:00 PM' },
        { name: 'October 12', type: 'Pickup', summary: 'SF City Center', status: 'active', startTime: '10:00 AM', endTime: 'Ongoing' },
        { name: 'October 12', type: 'Drop-off', summary: '5 Local Deliveries', status: 'pending', startTime: '2:00 PM', endTime: 'Scheduled' },
        { name: 'October 15', type: 'Pickup', summary: 'Full Day of Collections', status: 'scheduled', startTime: '8:00 AM', endTime: 'Scheduled' }
      ]
    }
  ];

  const filteredWorkers = userType === 'all' ? workers : workers.filter(worker => 
    worker.role.toLowerCase() === userType.toLowerCase()
  );

  const Dashboard = () => (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-teal-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Activity Monitor</h1>
          <div className="text-sm">9:41</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {['all', 'driver', 'helper', 'supervisor'].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium capitalize transition-colors ${
                userType === type
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {type === 'all' ? 'All Users' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Workers List */}
      <div className="p-4 space-y-3">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            onClick={() => {
              setSelectedPerson(worker);
              setCurrentView('profile');
            }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                <p className="text-sm text-gray-600">{worker.role}</p>
                <p className="text-xs text-gray-500">{worker.location}</p>
              </div>
              <div className="text-right">
                <div className="flex space-x-4 text-sm">
                  <div>
                    <span className="font-semibold text-2xl text-gray-900">{worker.completed}</span>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div>
                    <span className="font-semibold text-2xl text-teal-600">{worker.active}</span>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicle History Button */}
      <div className="p-4">
        <button
          onClick={() => {
            setSelectedVehicle(vehicles[0]);
            setCurrentView('trips');
          }}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-teal-600 transition-colors"
        >
          <Truck className="w-5 h-5" />
          <span>View Vehicle History</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-teal-500">
            <Users className="w-5 h-5" />
            <span className="text-xs">First One</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <Mail className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Drivers</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-teal-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setCurrentView('dashboard')}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{selectedPerson?.role}</h1>
          </div>
          <div className="text-sm">9:41</div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4 bg-white">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedPerson?.name}</h2>
                <p className="text-sm text-gray-600 uppercase tracking-wide">{selectedPerson?.role}</p>
              </div>
              <button className="p-2">
                <div className="w-1 h-5 bg-gray-400 rounded-full"></div>
              </button>
            </div>
            <div className="flex space-x-4 mt-3">
              <button className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Email</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          <button className="text-teal-500 text-sm">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-gray-900">{selectedPerson?.completed}</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-3xl font-bold text-teal-600">{selectedPerson?.active}</p>
          </div>
        </div>
      </div>

      {/* Deliveries */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deliveries</h3>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Delivery List Headers */}
        <div className="flex text-xs text-gray-500 uppercase tracking-wide mb-2 px-2">
          <div className="w-20">TYPE</div>
          <div className="flex-1">ADDRESS</div>
        </div>

        {/* Delivery Items */}
        <div className="space-y-3">
          {selectedPerson?.deliveries.map((delivery, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                {delivery.type === 'Drop-off' ? (
                  <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{delivery.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    delivery.status === 'completed' ? 'bg-green-100 text-green-800' :
                    delivery.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{delivery.address}</p>
                <p className="text-xs text-gray-500">{delivery.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-teal-500">
            <Users className="w-5 h-5" />
            <span className="text-xs">First One</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <Mail className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Drivers</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );

  const TripsView = () => (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setCurrentView('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Delivery</h1>
          </div>
          <div className="text-sm text-gray-600">9:41</div>
        </div>
      </div>

      {/* Map Area */}
      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">Map View</p>
            <p className="text-xs">Berkeley • Oakland • Alameda</p>
          </div>
        </div>
        {/* Mock map pins */}
        <div className="absolute top-12 left-16 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-16 left-12 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Trips Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Trips</h3>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-teal-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add trip</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Trip List Headers */}
        <div className="flex text-xs text-gray-500 uppercase tracking-wide mb-2 px-2">
          <div className="w-24">NAME</div>
          <div className="w-20">TYPE</div>
          <div className="flex-1">SUMMARY</div>
        </div>

        {/* Trip Items */}
        <div className="space-y-3">
          {selectedVehicle?.trips.map((trip, index) => (
            <div key={index} className="flex items-center space-x-3 py-3 border-b border-gray-100">
              <div className="w-8 h-8 flex items-center justify-center">
                {trip.status === 'completed' ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : trip.status === 'active' ? (
                  <Clock className="w-6 h-6 text-orange-500" />
                ) : trip.type === 'Pickup' ? (
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-4 h-4 text-gray-600" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900 w-20">{trip.name}</span>
                      <span className="text-sm text-gray-600 w-16">{trip.type}</span>
                      <span className="text-sm text-gray-800 flex-1">{trip.summary}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{trip.startTime} - {trip.endTime}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                        trip.status === 'active' ? 'bg-orange-100 text-orange-800' :
                        trip.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-teal-500">
            <Users className="w-5 h-5" />
            <span className="text-xs">First One</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <Mail className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Drivers</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Render based on current view
  return (
    <div className="max-w-sm mx-auto bg-gray-100 min-h-screen">
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'trips' && <TripsView />}
    </div>
  );
};

export default ActivityLogApp;

