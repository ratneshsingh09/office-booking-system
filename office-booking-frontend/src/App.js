import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

axios.interceptors.request.use(config => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})

function App() {
  const [user, setUser] = useState(null)
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [workspaceId, setWorkspaceId] = useState("");
  const [date, setDate] = useState("");

  const [bookings, setBookings] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {
      try {

        const payload = JSON.parse(atob(token.split(".")[1]))

        setUser({
          username: payload.sub,
          role: payload.role
        })

      } catch (err) {
        localStorage.removeItem("token")
      }
    }

  }, [])

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:8080/api/bookings");
    setBookings(res.data);
  };

  const fetchWorkspaces = async () => {
    const res = await axios.get("http://localhost:8080/api/workspaces");
    setWorkspaces(res.data);
  };
  useEffect(() => {
    fetchWorkspaces();
    fetchBookings();
  }, []);

  const addWorkspace = async () => {

    await axios.post("http://localhost:8080/api/workspaces", {
      name,
      type
    })
    setName("");
    setType("");

    fetchWorkspaces();
  }

  const bookWorkspace = async () => {

    try {

      await axios.post("http://localhost:8080/api/bookings", {
        workspaceId,
        userName: user.username,
        date,
        startTime,
        endTime
      })

      alert("Workspace booked successfully!")

      setWorkspaceId("")
      setDate("")
      setStartTime("")
      setEndTime("")

      fetchBookings()

    }
    catch (err) {

      alert("This time slot is already booked!")

    }

  }
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const cancelBooking = async (id) => {
    await axios.delete(`http://localhost:8080/api/bookings/${id}`);
    fetchBookings();
  };
  if (!user) {
    return <Login setUser={setUser} />
  }

  return (

<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <div className="bg-white shadow p-4 mb-10 flex justify-between">

        <h1 className="text-xl font-bold">
          Office Booking
        </h1>

        <div className="flex gap-4 items-center">

          <span className="text-gray-600">
            {user.username}
          </span>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
      {user.role === "ADMIN" && (

        <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Add Workspace
          </h2>



          <div className="flex gap-2">

            <input
              className="border p-2 flex-1 rounded"
              placeholder="Workspace Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-2 flex-1 rounded"
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={addWorkspace}
            >
              Add
            </button>

          </div>

        </div>

      )}
<div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Workspaces
        </h2>

       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

{workspaces.map(w => (

  <div
    key={w.id}
    className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
  >

    <div className="text-lg font-semibold">
      {w.name}
    </div>

    <div className="text-gray-500 text-sm mb-3">
      {w.type}
    </div>

    <button
      className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
      onClick={() => setWorkspaceId(w.id)}
    >
      Book
    </button>

  </div>

))}

</div>

      </div>
      <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Book Workspace
        </h2>

        <div className="flex flex-col gap-3">

          <select
            className="border p-2 rounded"
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
          >

            <option value="">Select Workspace</option>

            {workspaces.map(w => (

              <option key={w.id} value={w.id}>
                {w.name} ({w.type})
              </option>

            ))}

          </select>


          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="text-sm text-gray-600">
            Start Time
          </label>

          <input
            type="time"
            className="border p-2 rounded"
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label className="text-sm text-gray-600">
            End Time
          </label>

          <input
            type="time"
            className="border p-2 rounded"
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            disabled={!workspaceId || !date || !startTime || !endTime}
            onClick={bookWorkspace}
          >
            Book Workspace
          </button>

        </div>
      </div>

      <div className="max-w-xl mx-auto mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Bookings
        </h2>

        {bookings.map(b => {

          const workspace = workspaces.find(w => w.id === b.workspaceId)

          return (

            <div
              key={b.id}
              className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
            >

              <div>

                <span className="font-medium">
                  {workspace?.name}
                </span>

                <div className="text-gray-500 text-sm">
                  {b.userName}
                </div>

                <div className="text-gray-400 text-sm">
                  {b.date}
                </div>

                <div className="text-blue-500 text-sm">
                  {b.startTime} - {b.endTime}
                </div>

              </div>

              {(b.userName === user.username || user.role === "ADMIN") && (

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel
                </button>

              )}

            </div>
          )
        })}

      </div>


    </div>


  )
}

export default App;