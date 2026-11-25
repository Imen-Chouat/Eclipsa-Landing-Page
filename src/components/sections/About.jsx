import AboutCard from "./AboutCard";

export default function About() {
  const aboutCards = [
    {
      title: "Astronomy themed hackathon",
      align: "right",
      content:
        "Eclipsa is the first astronomy themed hackathon for students, it will be hosted on the 3rd of December in ESI (ex INI) Algiers. \nit features multiple development challenges for intermediate developers, and aims to help them learn how to apply their skills in a real astronomy field.",
    },
    {
      title: "Teams and Winners",
      align: "left",
      content:
        "Eclipsa will last for 3 days and 2 nights, participants will be in teams of 4 , the team members are registered together in one entry of the registration form. \n they’re expected to develop solution for the challenges provided, and pitch them. at the end 3 winner teams will be selected",
    },
  ];

  return (
    <section
      id="about"
      className="relative max-w-6xl mx-auto px-6 md:px-12 pt-2 pb-12 md:pt-4 md:pb-20"
    >
      <div className="flex flex-col gap-10 md:gap-14">
        {aboutCards.map((card, index) => (
          <AboutCard
            key={index}
            title={card.title}
            content={card.content}
            align={card.align}
          />
        ))}
      </div>
    </section>
  );
}
