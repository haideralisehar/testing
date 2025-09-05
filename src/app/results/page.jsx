"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import "./ResultsPage.css";

export default function ResultsPage() {
  const searchParams = useSearchParams();

  // ✅ Extract search query values
  const destination = searchParams.get("destination");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const rooms = JSON.parse(searchParams.get("rooms") || "[]");

  // ✅ Hotels data (same dataset you created)
  const hotelsData = {
    Islamabad: [
      {
        id: 1,
        name: "Islamabad Serena Hotel",
        location: "Khaliq Uz Zaman Road, Islamabad",
        price: 120,
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/269205507.jpg",
      },
      {
        id: 2,
        name: "Marriott Islamabad",
        location: "Agha Khan Road, Islamabad",
        price: 90,
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/181941619.jpg",
      },
      {
        id: 3,
        name: "Hotel One Super",
        location: "F-6, Islamabad",
        price: 75,
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/202712694.jpg",
      },
    ],
    Lahore: [
      {
        id: 1,
        name: "Pearl Continental Lahore",
        location: "Shahrah-e-Quaid-e-Azam, Lahore",
        price: 150,
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/254387321.jpg",
      },
      {
        id: 2,
        name: "Avari Lahore",
        location: "Mall Road, Lahore",
        price: 110,
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/205124707.jpg",
      },
    ],
  };

  // ✅ Filter hotels based on destination
  const results = hotelsData[destination] || [];

  return (
    <div className="results-container">
      <h2>
        {results.length > 0
          ? `Hotels in ${destination}`
          : `No hotels found in ${destination}`}
      </h2>
      <p>
        Check-in: <strong>{from?.slice(0, 10)}</strong> | Check-out:{" "}
        <strong>{to?.slice(0, 10)}</strong>
      </p>
      <p>
        Rooms: <strong>{rooms.length}</strong>
      </p>

      <div className="hotel-list">
        {results.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-img" />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p className="price">${hotel.price} / night</p>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
