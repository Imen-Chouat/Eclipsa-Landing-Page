const AGENDA = [
  {
    day: "day 1 : Thursday 3rd December",
    items: [
      { time: "17:00", title: "Check-in" },
      { time: "18:00", title: "Opening Ceremony" },
      { time: "19:00", title: "Start of Action" },
      { time: "21:00", title: "Dinner Break" },
    ],
  },
  {
    day: "day 2 : Friday 4th December",
    items: [
      { time: "9:00", title: "Breakfest" },
      { time: "11:30", title: "Lunch break" },
      { time: "12:30", title: "Prayer break" },
      { time: "17:00", title: "Coffee break" },
    ],
  },
  {
  day: "day 3 : Saturday 5th December",
    items: [
      { time: "9:00", title: "Submission of work" },
      { time: "10:00", title: "Breakfest" },
      { time: "11:00", title: "Presentation and pitching of projects " },
      { time: "14:00", title: "Announcement of winners and closing ceremony " },
    ],
  },
];

export default function Agenda() {
  return (
    <section id="agenda" className="w-full">
      <div className="mx-auto max-w-[1100px] px-6 py-24 sm:px-10">
        <h2 className="font-playfair text-3xl font-semibold text-white sm:text-4xl">
          Agenda of the event
        </h2>

        <p className="mt-2 pl-4 font-nasalization text-base text-white/80 sm:text-lg">
          {AGENDA[0].day}
        </p>

        <div className="mt-8">
          {AGENDA.map((group, groupIndex) => (
            <div key={group.day}>
              {groupIndex > 0 && (
                <p className="mb-6 mt-10 pl-4 font-nasalization text-base text-white/80 sm:text-lg">
                  {group.day}
                </p>
              )}

              <div className="relative">
                {/* Rail runs from the first dot to the last dot of this day */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-7 left-[6px] top-7 w-[2px] rounded-full bg-white/80"
                />

                <ol className="space-y-5">
                  {group.items.map((item, index) => (
                    <li
                      key={`${group.day}-${index}`}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white"
                      />

                      <div className="flex items-center gap-4 rounded-[20px] bg-gradient-to-r from-[#4A1D79]/70 via-[#42176D]/70 to-[#3A1263]/70 px-5 py-[14px] ring-1 ring-white/5 sm:gap-6 sm:px-6">
                        <span className="w-[92px] shrink-0 font-glacial text-lg text-white sm:w-[118px] sm:text-xl">
                          {item.time}
                        </span>
                        <span className="font-playfair text-base font-medium text-white">
                          {item.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
