import { useState, useEffect } from "react";
import { X, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  tag: string;
  content: string;
}

const articles: Article[] = [
  {
    title: "Top 10 Vastu Tips for New Homes in Bangalore",
    excerpt: "Discover how ancient Vastu Shastra principles can enhance prosperity, health, and harmony in your new home.",
    image: "/images/blog_vastu.png",
    date: "Jun 2025",
    readTime: "5 min read",
    tag: "Vastu",
    content: `
      <p>Building or moving into a new home is a major milestone. In a fast-paced city like Bangalore, aligning your living space with the natural elements according to Vastu Shastra can bring immense peace, health, and prosperity. Vastu Shastra is the ancient Indian science of architecture that harmonizes energy flow within built environments.</p>

      <h3>1. The Auspicious Main Entrance</h3>
      <p>The main door is the gateway for energy. For optimum prosperity, position your main entrance facing <strong>North, East, or Northeast</strong>. Avoid Southwest entrances as they attract heavy, stagnant energies. Keep the entrance well-lit, clean, and decorated with positive symbols like a Swastika or Toran.</p>

      <h3>2. Kitchen Location (The Fire Element)</h3>
      <p>The kitchen represents health and nutrition. The ideal zone for the kitchen is the <strong>Southeast quadrant (Agni corner)</strong> of your home. If that is unavailable, Northwest is the next best alternative. Never position the kitchen in the Northeast, as this causes family disputes and financial stress.</p>

      <h3>3. Master Bedroom for Stability</h3>
      <p>For the head of the family, the master bedroom must be situated in the <strong>Southwest quadrant</strong>. This direction represents earth and provides stability, power, and long life. Position the bed so that your head points South while sleeping to align with the Earth's magnetic field.</p>

      <h3>4. Pooja Room (Spiritual Hearth)</h3>
      <p>The Northeast corner of the house is called the <em>Ishan corner</em> and is governed by water and spiritual energy. Place your pooja room or meditation altar here. Face East or North while praying to attract maximum cosmic vibes.</p>

      <h3>5. Water Elements and Sumps</h3>
      <p>Underground water tanks, borewells, and sumps should ideally be positioned in the <strong>Northeast or North</strong>. Conversely, overhead tanks must reside in the <strong>Southwest</strong> to balance weight distribution and flow.</p>

      <h3>6. Living Room Seating Dynamics</h3>
      <p>The living room should face North or East. Arrange heavy furniture (sofas, cabinets) in the South or West, while electronic items like televisions should go in the Southeast corner.</p>

      <h3>7. Soothing Colors and Lighting</h3>
      <p>Use light, soothing neutrals like white, cream, soft beige, or light blue. Avoid dark red, dark brown, or black in bedrooms, as they raise stress levels and block light reflection.</p>

      <h3>8. Mirror Placements</h3>
      <p>Place mirrors on the North or East walls of rooms. Never place a mirror directly opposite the bed, as reflecting the body while sleeping is believed to invite health issues.</p>

      <h3>9. Heavy Furniture Balance</h3>
      <p>To maintain balance, keep the Northeast quadrant as light, open, and clean as possible. Keep heavy wardrobes, beds, and bookshelves against the South and West walls.</p>

      <h3>10. Balconies and Windows</h3>
      <p>Ensure large windows and balconies face East or North. This allows the healing morning sunlight to enter your home while blocking the harsh late-afternoon sun from the West.</p>
    `,
  },
  {
    title: "Modular Kitchen Trends in Bangalore 2025",
    excerpt: "From handle-less designs to integrated appliances, explore the hottest modular kitchen trends this year.",
    image: "/images/Modular_kitchen1.webp",
    date: "May 2025",
    readTime: "4 min read",
    tag: "Kitchen",
    content: `
      <p>In 2025, modular kitchens in Bangalore are no longer just functional cooking areas—they are the social hubs of the home. Modern apartments focus heavily on open-plan layouts that blend the kitchen, dining, and living spaces seamlessly. Here are the hottest trends dominating kitchen design this year.</p>

      <h3>1. Gola Profiles and Handle-less Cabinetry</h3>
      <p>Clean lines and flat-front cabinetry remain the gold standard. Homeowners are opting for handle-less doors using <strong>Gola profile channels</strong>, J-pull doors, or sleek push-to-open magnetic latches. This reduces visual clutter and prevents clothes from snagging in tight kitchen pathways.</p>

      <h3>2. Anti-Fingerprint Matte Finishes</h3>
      <p>While high-gloss cabinets were popular in previous years, 2025 is all about subtle luxury. Super-matte acrylics and thermal-fused laminates with anti-fingerprint technology are highly sought after. They offer a velvety texture and are incredibly easy to wipe clean, resisting greasy smudges.</p>

      <h3>3. Smart Drawer Systems and Corner Pullouts</h3>
      <p>Storage efficiency has reached new heights. Standard cabinets are being replaced by deep soft-close tandem drawers with custom cutlery dividers, plate holders, and spice racks. Hard-to-reach corner spaces are optimized using premium hardware like <strong>Magic Corners</strong>, LeMans corner units, and carousel trays.</p>

      <h3>4. Integrated LED Task Lighting</h3>
      <p>Lighting is no longer just a ceiling affair. Recessed LED profile light strips are installed under wall-mounted cabinets to illuminate countertops directly without casting shadows. Drawers and tall pantries also feature automatic sensor lights that turn on when opened.</p>

      <h3>5. Engineered Quartz Countertops</h3>
      <p>Granite is taking a back seat to engineered quartz. Quartz is non-porous, highly scratch-resistant, and does not require periodic sealing like natural marble or granite. Popular choices include quartz slabs with bold marble-like grey or gold veining.</p>

      <h3>6. Appliance Garages</h3>
      <p>To keep countertops completely clear of clutter, designers are creating dedicated 'appliance garages'—cabinets with rolling shutter doors or lift-up doors where toasters, blenders, and coffee makers are stored and plugged in, ready to use.</p>
    `,
  },
  {
    title: "Best Wardrobe Designs for Indian Homes",
    excerpt: "Sliding, hinged or walk-in? Explore the best wardrobe designs that maximise space and add luxury.",
    image: "/images/wardrobes2.webp",
    date: "Apr 2025",
    readTime: "4 min read",
    tag: "Wardrobe",
    content: `
      <p>Indian households have unique storage needs—from heavy festive wear and multiple linen sets to jewelry safes and everyday accessories. Selecting the right wardrobe configuration is essential for keeping your bedroom organized and visually spacious.</p>

      <h3>1. Sliding Wardrobes: The Space Savers</h3>
      <p>For modern apartments where floor space is limited, sliding wardrobes are the ideal choice. Since the doors slide horizontally on tracks, they do not require extra clearance space in front. Opt for floor-to-ceiling sliding wardrobes with tinted glass or mirror panels to make your bedroom appear twice its actual size.</p>

      <h3>2. Hinged Wardrobes: The Timeless Choice</h3>
      <p>If space is not a constraint, hinged wardrobes remain a highly functional choice. They allow you to open all doors simultaneously, giving you a complete view of your closet. Hinged doors also allow you to utilize the inside of the door panels for mounting tie racks, belts, or full-length mirrors.</p>

      <h3>3. Walk-In Closets: The Ultimate Luxury</h3>
      <p>If you have an adjacent spare room or a large master bathroom vestibule, converting it into a walk-in closet adds incredible luxury and value to your home. Use glass partitions, warm internal LED strip lighting, and open shelving to display your wardrobe collection like a premium boutique.</p>

      <h3>4. Material Integrity: Core and Finishes</h3>
      <p>Always prioritize durability when building wardrobes in India. Use <strong>Boiling Water Resistant (BWR) plywood</strong> or high-density fiberboard (HDF) as the core material to withstand humidity. For finishes, choose premium laminates, PU paints, or wood veneers for a high-end look.</p>

      <h3>5. Internal Layout Optimization</h3>
      <p>A good wardrobe design focuses on internal organization:
      <ul>
        <li><strong>Double Hanging Rods</strong>: Great for utilizing vertical space to hang shirts and trousers.</li>
        <li><strong>Accessory Drawers</strong>: Felt-lined drawers with compartments for watches, jewelry, and cuffs.</li>
        <li><strong>Digital Safe Compartment</strong>: A concealed locker built directly into the plywood framework for security.</li>
      </ul>
      </p>
    `,
  },
  {
    title: "5 Interior Design Mistakes to Avoid",
    excerpt: "Most homeowners make these costly mistakes — learn how to avoid them before you begin your project.",
    image: "/images/blog_mistakes.png",
    date: "Mar 2025",
    readTime: "3 min read",
    tag: "Tips",
    content: `
      <p>Designing a home is a rewarding journey, but it is also filled with potential pitfalls that can lead to high modification costs and functional frustration. Here are the 5 most common interior design mistakes homeowners make and how to avoid them.</p>

      <h3>1. Relying on a Single Source of Light</h3>
      <p>Using only a single, bright fluorescent ceiling bulb or LED panel makes a room feel flat, cold, and sterile. Professional designers use <strong>layered lighting</strong>. Always combine three types of light:
      <ul>
        <li><strong>Ambient</strong>: Overall ceiling downlights or cove lights.</li>
        <li><strong>Task</strong>: Bright focused lights for reading, cooking, or study.</li>
        <li><strong>Accent</strong>: Warm spotlighting to highlight wall textures, paintings, or decor.</li>
      </ul>
      </p>

      <h3>2. Choosing the Wrong Rug Size</h3>
      <p>A rug that is too small acts like a postage stamp, making the entire living room feel disjointed and cramped. Ideally, a living room rug should be large enough so that the front legs of all major seating furniture (sofas, accent chairs) rest comfortably on it. This visually binds the seating cluster together.</p>

      <h3>3. Ignoring Traffic Flow and Circulation</h3>
      <p>It is easy to fall in love with large furniture pieces in a spacious showroom, only to find they block pathways at home. Always measure your rooms and leave at least <strong>3 feet of clearance</strong> in major walking passages. Ensure bedroom wardrobe doors and kitchen cabinets have ample room to open fully without hitting walls or other furniture.</p>

      <h3>4. Over-matching Everything</h3>
      <p>Buying matching furniture sets (sofa, coffee table, and side tables all from the same collection) can make your home look like a generic furniture catalog. Instead, curate your space by mixing different textures, materials, and styles. Blend wood with metal accents, and pair solid upholstery with patterned throw cushions to add personality.</p>

      <h3>5. Sacrificing Storage for Pure Aesthetics</h3>
      <p>Minimalist, floating TV units and open display shelves look beautiful in pictures, but they are impractical for daily living. In Indian homes, dust accumulation is high, and storage needs are vast. Always prioritize closed storage cabinets (crockery units, wardrobes, vanity units) to keep daily clutter hidden from sight.</p>
    `,
  },
  {
    title: "Small Bedroom Design Ideas That Feel Luxurious",
    excerpt: "Limited space doesn't mean limited luxury. These design techniques transform even the smallest bedrooms.",
    image: "/images/bedroom_minimal.webp",
    date: "Feb 2025",
    readTime: "5 min read",
    tag: "Bedroom",
    content: `
      <p>A small bedroom does not mean you have to sacrifice luxury. With strategic space planning, clever custom furniture, and the right color selection, you can transform a compact room into a cozy, premium sanctuary resembling a high-end boutique hotel suite.</p>

      <h3>1. Emphasize Vertical Space</h3>
      <p>When floor space is limited, look upward. Extend your wardrobe cabinets all the way to the ceiling. This provides valuable extra loft storage for seasonal items and visually elongates the walls, making the ceiling feel higher.</p>

      <h3>2. The Power of a Monochromatic Palette</h3>
      <p>Using multiple contrasting colors chop up a small room visually, making it feel smaller. Opt for a warm monochromatic neutral palette—shades of off-white, soft cream, warm grey, or champagne. Use different textures (linen curtains, a velvet headboard, and a textured rug) in the same color tone to create depth.</p>

      <h3>3. Floating Bedside Tables and Wall Sconces</h3>
      <p>Keep the floor space around the bed completely clear to create an airy feel. Install floating bedside shelves instead of bulky nightstands. Replace table lamps with wall-mounted swivel sconces, which frees up bedside table space for books and phone chargers.</p>

      <h3>4. Mirror Panelling and Reflective Accents</h3>
      <p>Mirrors are a classic tool for small spaces. Place a large mirror opposite a window to reflect natural light and views, visually doubling the size of the room. You can also use mirror panels on wardrobe shutters or incorporate metallic brass trims to add a touch of glamour.</p>

      <h3>5. Hydraulic Storage Beds</h3>
      <p>A custom bed frame with a gas-lift hydraulic mechanism is a lifesaver for small bedrooms. It turns the entire footprint of your bed into a clean, dust-free storage area for heavy blankets, suitcases, and extra pillows, eliminating the need for extra storage chests.</p>
    `,
  },
  {
    title: "Vastu Tips for Apartments in Bangalore",
    excerpt: "How to apply practical Vastu principles to modern apartments without structural changes.",
    image: "/images/living_room_contemporary.webp",
    date: "Jan 2025",
    readTime: "6 min read",
    tag: "Vastu",
    content: `
      <p>Unlike independent bungalows, apartments in Bangalore are constructed in large blocks, meaning you cannot change the position of walls, plumbing, or doors. However, you can still balance the energies in your flat using non-structural remedies and interior elements.</p>

      <h3>1. Correcting Entrance Anomalies</h3>
      <p>If your apartment main entrance is in an unfavorable direction (like Southwest), you can neutralize it by placing a <strong>Brass Helix or Vastu Pyramids</strong> above the door frame. Ensure the entrance threshold is slightly raised (a small wooden or marble strip) to block negative energy from entering along the floor.</p>

      <h3>2. Kitchen Fire and Water Balance</h3>
      <p>In compact apartment kitchens, the cooking hob (fire) and the sink (water) are often placed next to each other. This causes energy conflicts. To remedy this, place a small wooden partition, a plant, or a crystal bowl between the stove and the sink to act as a barrier between the elements.</p>

      <h3>3. Promoting Air Quality and Positive Energy</h3>
      <p>Place indoor air-purifying plants like Money Plants, Snake Plants, or Holy Basil (Tulsi) in the North or East balconies. These plants attract growth and positive energy while filtering out city pollutants.</p>

      <h3>4. The Sea Salt Remedy</h3>
      <p>To absorb negative energies that gather in enclosed spaces, place a small ceramic bowl filled with unrefined rock salt in your bathroom corners. Replace this salt once a week, flushing the old salt down the drain. Salt is a natural cleanser that neutralizes negative vibrations.</p>

      <h3>5. Pooja Altar Placement</h3>
      <p>Even if you live in a small flat, avoid placing your pooja unit inside the bedroom or directly sharing a wall with a bathroom. If space is tight, create a small, wall-mounted pooja cabinet in the Northeast corner of the living room, ensuring it has doors that can be closed when not in use.</p>
    `,
  },
];

const tagColors: Record<string, string> = {
  Vastu: "bg-amber-50 text-amber-700 border-amber-200",
  Kitchen: "bg-orange-50 text-orange-700 border-orange-200",
  Wardrobe: "bg-purple-50 text-purple-700 border-purple-200",
  Tips: "bg-blue-50 text-blue-700 border-blue-200",
  Bedroom: "bg-pink-50 text-pink-700 border-pink-200",
};

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Prevent scroll when article modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  return (
    <section
      id="blog"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#F8F5F0] border-t border-[#E9E3D8]"
      aria-label="Blog"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            Insights &amp; Ideas
          </p>
          <h2 className="cinema-heading mb-4">Design<br />Journal</h2>
          <div className="cinema-accent-line" />
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <article
              key={idx}
              onClick={() => setSelectedArticle(article)}
              className="group rounded-2xl overflow-hidden border border-[#E9E3D8] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(200,169,106,0.14)] hover:border-[#C8A96A]/30 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="h-52 sm:h-56 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${tagColors[article.tag] || "bg-[#F8F5F0] text-[#C8A96A] border-[#C8A96A]/20"}`}
                >
                  {article.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[10px] text-[#999] uppercase tracking-widest font-medium mb-3">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D4C4A8]" />
                  <span>{article.readTime}</span>
                </div>

                <h3
                  className="text-base sm:text-lg font-black tracking-tight text-[#2B2B2B] mb-3 leading-snug group-hover:text-[#C8A96A] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {article.title}
                </h3>

                <p className="text-[#999] text-sm font-light leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8A96A] group-hover:text-[#2B2B2B] transition-colors">
                  Read Article <BookOpen size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedArticle(null)}
          />

          {/* Modal Content Card */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col">
            {/* Sticky Header with Close Button */}
            <div className="sticky top-0 right-0 p-4 sm:p-5 bg-white border-b border-[#E9E3D8] flex items-center justify-between z-20">
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${tagColors[selectedArticle.tag] || "bg-[#F8F5F0] text-[#C8A96A]"}`}>
                {selectedArticle.tag}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full border border-[#E9E3D8] flex items-center justify-center text-[#999] hover:text-[#2B2B2B] hover:border-[#2B2B2B] transition-all"
                aria-label="Close article"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="p-6 sm:p-10 md:p-14 space-y-6">
              {/* Image banner */}
              <div className="rounded-2xl overflow-hidden aspect-[21/9] w-full shadow-inner bg-[#F8F5F0] border border-[#E9E3D8]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta details */}
              <div className="flex items-center gap-3 text-xs text-[#999] uppercase tracking-widest font-semibold">
                <Calendar size={14} /> <span>{selectedArticle.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                <Clock size={14} /> <span>{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h1
                id="article-modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2B2B2B] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {selectedArticle.title}
              </h1>

              <div className="w-16 h-1 bg-[#C8A96A] rounded-full" />

              {/* Html content rendering */}
              <div
                className="prose prose-stone max-w-none text-[#555] font-light leading-relaxed text-sm sm:text-base space-y-5
                  prose-headings:font-black prose-headings:text-[#2B2B2B] prose-headings:font-serif prose-headings:mt-8 prose-headings:mb-4
                  prose-h3:text-lg prose-h3:sm:text-xl
                  prose-strong:font-bold prose-strong:text-[#2B2B2B]
                  prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1.5
                  prose-li:marker:text-[#C8A96A]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Footer CTA */}
              <div className="border-t border-[#E9E3D8] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-sm font-black text-[#2B2B2B] uppercase tracking-widest mb-1">
                    Interested in applying this to your space?
                  </h4>
                  <p className="text-xs text-[#999] font-light">
                    Speak with our designers and get a complimentary consult customized for your layout.
                  </p>
                </div>
                <a
                  href={`https://wa.me/919739570009?text=${encodeURIComponent(`Hi Design Ur Desire, I read your journal article on "${selectedArticle.title}" and would love to get a consultation for my home.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-submit inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-xl hover:scale-105 transition-transform"
                >
                  Discuss With Designer <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
