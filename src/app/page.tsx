"use client";
import React, { useEffect } from "react";
// Twilio logic moved to API route

export default function Home() {

  enum DatePickerStatus {
    NotSelected = "NotSelected",
    PickLocationOptions = "PickLocationOptions",
    PickTime = "PickTime",
    Confirmed = "Confirmed",
    Rejected = "Rejected",
  }



  const [datePickerStatus, setDatePickerStatus] = React.useState<DatePickerStatus>(DatePickerStatus.NotSelected);
  const [datePayload, setDatePayload] = React.useState<string | null>(null);
  const [compliment, setCompliment] = React.useState<string>("");

  useEffect(() => {
    if (datePickerStatus === DatePickerStatus.Confirmed && datePayload) {
      fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: `${datePayload}`,
          to: '3852434677@vtext.com', // Replace with the recipient's phone number
        }),
      });
    }
  }, [datePickerStatus, datePayload]);

  const GenerateCompliment = () => {
    const complimentList = [
      "You are so good at REPO!",
      "You give the best snuggles!",
      "You are unironically very funny, I laugh so much with you!",
      "You are insanely attractive!",
      "You are so good at making me feel better!",
      "You are so beautiful, I often just stare at you!",
      "You are so good at puzzles, I am literally jealous sometimes!",
      "You are so generous, you always do stuff for me without me asking!",
      "You are so loving, you always make me feel so loved!",
      "You are so adaptable and thoughtful, I feel so seen with you!",
    ];
    const randomIndex = Math.floor(Math.random() * complimentList.length);
    setCompliment(complimentList[randomIndex]);
  }

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden">

      {/* Main content */}
      <main className="relative z-10 flex flex-col gap-[32px] row-start-2 items-center sm:items-start min-h-screen p-8 pb-20 sm:p-20">
        <>{datePickerStatus === DatePickerStatus.NotSelected && (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Hello my love! Would you like to go on a date with me?</h1>

            <div className="text-4xl text-gray-600 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <button onClick={() => { setDatePickerStatus(DatePickerStatus.PickLocationOptions); setDatePayload("Megan would like to go on a date with you!"); }} className="bg-blue-500 w-50 h-50 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Yes, I would love to!
              </button>
              <button onClick={() => setDatePickerStatus(DatePickerStatus.Rejected)} className="bg-red-500 w-50 h-50 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                No, thank you.
              </button>
            </div>
          </div>
        )}
          {datePickerStatus === DatePickerStatus.PickLocationOptions && (() => {
            const locations = ["Bagels", "Escape Room", "New Restaurant", "Movie Theater"];
            return (
              <>
                <h1 className="text-3xl font-bold">Great! Where would you like to go?</h1>
                <div className="grid grid-cols-2 gap-4">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => { setDatePickerStatus(DatePickerStatus.PickTime); setDatePayload(datePayload + '\n' + location); }}
                      className="bg-blue-500 w-40 h-40 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </>
            );
          })()}
          {datePickerStatus === DatePickerStatus.PickTime && (() => {
            const locations = ["Friday 6:30PM", "Saturday 7:00PM", "Sunday 5:00PM", "Tuesday 6:30PM"];
            return (
              <>
                <h1 className="text-3xl font-bold">Great! What time works for you?</h1>
                <div className="grid grid-cols-2 gap-4">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => { setDatePickerStatus(DatePickerStatus.Confirmed); setDatePayload(datePayload + '\n' + location); }}
                      className="bg-blue-500 w-40 h-40 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </>
            );
          })()}
          {datePickerStatus === DatePickerStatus.Confirmed && (
            <>
              {/* Background image */}
              <div className="absolute inset-0 z-0 gap-4">
                <h1 className="text-3xl font-bold">Yay! I can't wait for our date!</h1>
                <img
                  src="your-photo.jpg" // Place your image in the public folder and use the filename here
                  alt="Couple background"
                  className=""
                />
                {/* Overlay for readability */}

                <button onClick={GenerateCompliment} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Click here for a compliment!</button>
                <h1 className="text-3xl font-bold">{compliment}</h1>

              </div>

            </>
          )}
          {datePickerStatus === DatePickerStatus.Rejected && (
            <h1 className="text-3xl font-bold">That's okay, maybe another time!</h1>
          )}
        </>
      </main>
    </div>
  );
}
