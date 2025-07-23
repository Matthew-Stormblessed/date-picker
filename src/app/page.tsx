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
    <div className="relative min-h-screen w-full bg-purple-900 font-sans overflow-hidden">

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        {/* Not Selected Screen */}
        {datePickerStatus === DatePickerStatus.NotSelected && (
          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md w-full mx-2 animate-fade-in">
            <h1 className="text-3xl font-bold text-center text-pink-700 drop-shadow">Hello my love!<br />Would you like to go on a date with me?</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
              <button onClick={() => { setDatePickerStatus(DatePickerStatus.PickLocationOptions); setDatePayload("Megan would like to go on a date with you!"); }} className="bg-gradient-to-r from-pink-400 to-blue-400 w-full sm:w-auto text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
                Yes, I would love to!
              </button>
              <button onClick={() => setDatePickerStatus(DatePickerStatus.Rejected)} className="bg-gradient-to-r from-gray-400 to-red-400 w-full sm:w-auto text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
                No, thank you.
              </button>
            </div>
          </div>
        )}
        {/* Pick Location Screen */}
        {datePickerStatus === DatePickerStatus.PickLocationOptions && (() => {
          const locations = ["Bagels", "Escape Room", "New Restaurant", "Movie Theater"];
          return (
            <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md w-full mx-2 animate-fade-in">
              <h1 className="text-3xl font-bold text-center text-blue-700">Great! Where would you like to go?</h1>
              <div className="grid grid-cols-2 gap-4 w-full">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => { setDatePickerStatus(DatePickerStatus.PickTime); setDatePayload(datePayload + '\n' + location); }}
                    className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-4 py-6 rounded-xl font-semibold shadow hover:scale-105 transition text-lg"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        {/* Pick Time Screen */}
        {datePickerStatus === DatePickerStatus.PickTime && (() => {
          const locations = ["Friday 6:30PM", "Saturday 7:00PM", "Sunday 5:00PM", "Tuesday 6:30PM"];
          return (
            <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md w-full mx-2 animate-fade-in">
              <h1 className="text-3xl font-bold text-center text-blue-700">Great! What time works for you?</h1>
              <div className="grid grid-cols-2 gap-4 w-full">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => { setDatePickerStatus(DatePickerStatus.Confirmed); setDatePayload(datePayload + '\n' + location); }}
                    className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-4 py-6 rounded-xl font-semibold shadow hover:scale-105 transition text-lg"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        {/* Confirmed Screen */}
        {datePickerStatus === DatePickerStatus.Confirmed && (
          <div className="flex items-center justify-center min-h-screen absolute inset-0 z-10">
            <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 max-w-xs w-full mx-4 animate-fade-in">
              <img
                src="/your-photo.jpg" // Place your image in the public folder and use the filename here
                alt="Couple"
                className="w-32 h-32 rounded-full border-4 border-pink-400 shadow-lg object-cover mb-2 animate-bounce-slow"
              />
              <h1 className="text-2xl font-bold text-center text-pink-700 drop-shadow">Yay! I can't wait for our date!</h1>
              <button onClick={GenerateCompliment} className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full hover:scale-105 transition font-semibold shadow">Click here for a compliment!</button>
              {compliment && <h2 className="text-lg text-center text-gray-700 italic mt-2">{compliment}</h2>}
            </div>
          </div>
        )}
        {/* Rejected Screen */}
        {datePickerStatus === DatePickerStatus.Rejected && (
          <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md w-full mx-2 animate-fade-in">
            <h1 className="text-3xl font-bold text-center text-gray-700">That's okay, maybe another time!</h1>
          </div>
        )}
      </main>
    </div>
  );
}
