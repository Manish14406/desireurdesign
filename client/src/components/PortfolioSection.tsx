const completedProjects = [
  { title: "Luxury Living Room", location: "Whitefield", image: "/images/luxury_living_room.webp", year: "2025", tag: "Living Room" },
  { title: "Master Bedroom Suite", location: "Koramangala", image: "/images/luxury_bedroom.webp", year: "2025", tag: "Bedroom" },
  { title: "Modular Kitchen", location: "Indiranagar", image: "/images/Modular_kitchen1.webp", year: "2024", tag: "Kitchen" },
  { title: "False Ceiling Design", location: "HSR Layout", image: "/images/luxury_false_ceiling.webp", year: "2025", tag: "Ceiling" },
  { title: "Complete Home Interior", location: "Jayanagar", image: "/images/complete_home_interior.webp", year: "2024", tag: "Full Home" },
  { title: "Royal Bedroom", location: "Hebbal", image: "/images/bedroom_royal.webp", year: "2025", tag: "Bedroom" },
  { title: "Contemporary Living", location: "Electronic City", image: "/images/living_room_contemporary.webp", year: "2024", tag: "Living Room" },
  { title: "Walk-in Wardrobe", location: "Bannerghatta Rd", image: "/images/wardrobes2.webp", year: "2025", tag: "Wardrobe" },
  { title: "Island Kitchen", location: "Sarjapur Rd", image: "/images/island_kitchen.webp", year: "2024", tag: "Kitchen" },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#F8F5F0] border-t border-[#E9E3D8]"
      aria-label="Portfolio"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Work
          </p>
          <h2 className="cinema-heading mb-4">Featured<br />Portfolio</h2>
          <div className="cinema-accent-line" />
          <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-xl">
            A curated selection of our finest interior transformations across Bengaluru.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {completedProjects.map((project, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden border border-[#E9E3D8] bg-white cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(200,169,106,0.18)] hover:border-[#C8A96A]/30 transition-all duration-500 ${idx === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Image */}
              <div className={`overflow-hidden ${idx === 0 ? "h-64 sm:h-80" : "h-52 sm:h-60"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Info */}
              <div className="p-5 flex justify-between items-end">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C8A96A] block mb-1">
                    {project.tag}
                  </span>
                  <h3
                    className="text-base sm:text-lg font-black uppercase tracking-tight text-[#2B2B2B]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#999] mt-0.5">{project.location}</p>
                </div>
                <span className="text-xs font-bold text-[#999] uppercase tracking-widest hidden sm:block">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
