import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  LayoutDashboard,
  Bell,
  User,
  Settings,
  LogOut,
  Activity,
  Coffee,
  Footprints,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import './Dashboard.css';
import { getEmail, getToken } from "../lib/localStorage";

// Mock components to replace Next.js specific components
const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const Link = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

// UI components
const Button = ({ children, className, variant = "default", size, onClick }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 hover:bg-gray-200 text-gray-900";
      case "outline":
        return "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-900";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  const getSizeClasses = () => {
    return size === "sm" ? "py-1 px-2 text-sm" : "py-2 px-4";
  };

  return (
    <button
      className={`${getVariantClasses()} ${getSizeClasses()} rounded-md font-medium transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm ${className}`}>{children}</div>
);

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");
  // calendarDate holds the currently viewed month and year
  const [calendarDate, setCalendarDate] = useState(new Date());
  const email = getEmail();
  const token=getToken();
  const navigate = useNavigate();

  // Fetch profile data from API on mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ email })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setProfile(data.user);
          // Set default selected date if available
          if (data.user.Days && data.user.Days.length > 0) {
            setSelectedDate(data.user.Days[0]);
            // Optionally update calendar view to match the default selected date
            const [year, month, day] = data.user.Days[0].split("-").map(Number);
            setCalendarDate(new Date(year, month - 1, day));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  // Helper to format day as two-digit string
  const formatDay = (day) => day.toString().padStart(2, "0");

  // Compute calendar values based on calendarDate state
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth(); // 0-indexed
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const totalCells = Math.ceil((startDay + totalDays) / 7) * 7;

  // Handlers for changing month
  const handlePrevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  // Handle day click on calendar
  const handleDayClick = (day) => {
    if (day > 0 && day <= totalDays) {
      const dateString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${formatDay(day)}`;
      setSelectedDate(dateString);
    }
  };
  const handleLogout = () => {
    navigate('/logout'); // Redirect to a login page
  };

  // Prepare chart data based on the selected date.
  const chartData =
    profile && selectedDate && profile.Days.includes(selectedDate)
      ? [
          {
            date: selectedDate,
            value: profile.count[profile.Days.indexOf(selectedDate)],
          },
        ]
      : [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sidebar - Do not change */}
      <motion.aside
        className="w-64 bg-gradient-to-b from-gray-100 to-gray-200 p-6 flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold mb-12">SafeDrive</div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/alerts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Bell className="h-5 w-5" />
            Alerts
          </Link>
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors">
            <User className="h-5 w-5" />
            Profile
          </Link>
        </nav>

        <div className="space-y-4 mt-auto">
        <Link href="/track">
  <Button className="w-full bg-blue-700 hover:bg-blue-800">Track driving</Button>
</Link>
          <Link href="/profile/edit" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-light mb-8">Dashboard</h1>

          {/* User Profile Section (one row) */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="User Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-2xl mb-1">
                    {profile ? profile.name : "User Profile"}
                  </h2>
                  <p className="text-gray-600">
                    {profile ? profile.email : "Email"}
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p>{profile ? profile.phone_number : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">License</p>
                  <p>{profile ? profile.license_number : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p>{profile ? profile.vehicle_number : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar and Progress Chart Section Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Calendar Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">{monthName} {year}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </div>
              {/* Responsive calendar with horizontal scroll */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 min-w-[320px]">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: totalCells }).map((_, i) => {
                    const day = i - startDay + 1;
                    const dayString = day > 0 && day <= totalDays
                      ? `${year}-${(month + 1).toString().padStart(2, "0")}-${formatDay(day)}`
                      : "";
                    return (
                      <div
                        key={i}
                        onClick={() => handleDayClick(day)}
                        className={`text-center py-2 rounded-lg cursor-pointer ${
                          day > 0 && day <= totalDays ? "hover:bg-gray-100" : "text-gray-300"
                        } ${selectedDate === dayString ? "bg-blue-100" : ""}`}
                      >
                        {day > 0 && day <= totalDays ? day : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Progress Chart Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">
                  Your Driving Progress {selectedDate ? `on ${selectedDate}` : ""}
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alerts</p>
                    <p className="text-xl">{chartData.date ? chartData.date : "42"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Distance Travelled</p>
                    <p className="text-xl text-red-500">-3.4%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Desired Distance Travelled</p>
                    <p className="text-xl">40%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {["Daily"].map((period) => (
                    <Button
                      key={period}
                      variant={activeTab === period.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab(period.toLowerCase())}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-64">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={[0, Math.max(...profile.count) + 10]}
                        tick={{ fontSize: 12 }}
                      />
                      <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No data for selected date.
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-sm"
            >
              <Activity className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-medium mb-2">Driving Activity</h3>
              <p className="text-green-600">All Good!</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-sm"
            >
              <Coffee className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="text-lg font-medium mb-2">Meals Consumed</h3>
              <p className="text-orange-600">Below Average</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-sm"
            >
              <Footprints className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-medium mb-2">Steps Taken</h3>
              <p className="text-blue-600">Above Average</p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;
