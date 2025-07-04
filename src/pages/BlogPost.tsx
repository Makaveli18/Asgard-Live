import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const blogPosts = {
  "norse-symbols-tattoo-meanings": {
    title: "The Meaning Behind Norse Symbols in Tattoos — And Why They Belong on Your Skin",
    description: "Explore the ancient meanings of Norse symbols like Vegvisir, Helm of Awe, Valknut, and more. Find the one that speaks to your story — and wear it with pride.",
    image: "/images/Blog/vegvisir.jpg",
    date: "May 10, 2025",
    readTime: "8 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Some people get tattoos.<br />
          Others? They get marked.
        </p>

        <p className="mb-8">
          There's a difference. And if you're still reading this, chances are you already feel it in your bones.
        </p>

        <p className="mb-8">
          Because Norse symbols aren't just decorations — they're ancient signals.<br />
          Messages to the gods. Weapons of the spirit. Warnings to the weak.
        </p>

        <p className="mb-8">
          When you wear one, you're not just showing style.<br />
          You're declaring your story to the universe. And maybe to the afterlife.
        </p>

        <p className="mb-8">
          At Asgard Tattoo, we've seen these symbols change people.<br />
          Not just how they look — but how they walk.<br />
          How they stand.<br />
          How they carry themselves after choosing to wear meaning on their skin.
        </p>

        <p className="mb-12">
          So here they are: the sacred six. The real ones. The ones that belong to warriors, seers, and those who refuse to be ordinary.
        </p>

        <div className="my-16 space-y-16">
          <div>
            <img 
              src="/images/Blog/vegvisir.jpg" 
              alt="Vegvisir Norse compass symbol" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🧭 Vegvisir — The Norse Compass
            </h2>
            <p className="italic text-xl mb-4">"That which shows the way."</p>
            <p className="mb-4">
              The Viking symbol for direction through storms, both literal and emotional.
            </p>
            <p className="mb-4">
              If you've ever been lost — really lost — and clawed your way through it, Vegvisir is for you.
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              It says:<br />
              "I've been through hell. I didn't stay there."
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/HelmOfAwe.jpg" 
              alt="Helm of Awe protection symbol" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              ⚔️ Helm of Awe (Ægishjálmr) — The Fearbreaker
            </h2>
            <p className="mb-4">This is armor in ink.</p>
            <p className="mb-4">
              The Helm of Awe was carved into helmets, shields, and skin by warriors about to face death.<br />
              Not to bring them peace — but to strike fear into their enemies.
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              You wear this when you've faced fear… and made fear back down.
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/Yggdrasil.jpg" 
              alt="Yggdrasil world tree" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🌳 Yggdrasil — The Tree of Life
            </h2>
            <p className="mb-4">
              This is the backbone of Norse mythology.<br />
              It connects all worlds. Life. Death. The divine.
            </p>
            <p className="mb-4">
              If your story has roots — family, struggle, rebirth — Yggdrasil isn't just a symbol. It's your lineage.
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              Ink it when you want to show:<br />
              "I've grown. I've lost. I've endured. And I'm still rising."
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/Fenrir.jpg" 
              alt="Fenrir wolf illustration" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🐺 Fenrir — The Wolf Who Broke His Chains
            </h2>
            <p className="mb-4">
              Bound by gods. Feared by all.<br />
              And in the end? Unleashed.
            </p>
            <p className="mb-4">
              Fenrir didn't play by their rules. He tore the sky open when they pushed too far.
            </p>
            <p className="mb-4">
              If you've ever been silenced, underestimated, restrained — and fought your way out?
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              You are Fenrir. And this is your rebellion.
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/Valknut.png" 
              alt="Valknut symbol" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🧠 Valknut — The Knot of the Slain
            </h2>
            <p className="mb-4">
              Three interlocking triangles. Sacred geometry for warriors who live by a code.<br />
              The Valknut is tied to Odin's chosen — those who die with honor, in battle, in life, in principle.
            </p>
            <p className="mb-4">
              It's not just about dying well.<br />
              It's about living like you're already part of something eternal.
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              It says:<br />
              "Remember me. I mattered. I fought. I didn't bend."
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/Skaldenmet.jpg" 
              alt="Skaldenmet mead symbol" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🍻 Skaldenmet — The Mead of Poets & Visionaries
            </h2>
            <p className="mb-4">Not all warriors carry blades. Some carry truth.</p>
            <p className="mb-4">
              Skaldenmet is the divine mead stolen by Odin and given to those worthy of inspiration — the poets, the bards, the rebels with vision.
            </p>
            <p className="mb-8">
              If you see the world differently…<br />
              If you speak what others stay quiet about…<br />
              If your soul burns with creativity or chaos?
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">This ink is for you.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Why These Symbols Mean More at Asgard Tattoo
        </h2>
        <p className="mb-4">
          Because we don't just tattoo them.<br />
          We honor them.
        </p>
        <p className="mb-8">
          Each piece is custom-built from your story — not Pinterest.<br />
          Each design is crafted through conversation, consultation, and intention.
        </p>
        <p className="mb-12">
          Because these aren't just tattoos.<br />
          They're transformation.<br />
          They're belonging.
        </p>
        <p className="mb-16">
          And when you step through our doors, you don't just get inked.<br />
          You join a tribe.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Truth Is... You're Already One of Us
          </h2>
          <p className="mb-4">
            If your pulse picked up while reading this...<br />
            If your skin is begging for that mark of meaning...<br />
            Then you already know.
          </p>
          <p className="text-xl font-semibold text-[#D4AF37]">
            You're meant for this.<br />
            You're meant to wear your story.
          </p>
        </div>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-2xl font-bold text-[#D4AF37] mb-4">
            🛡️ Asgard Tattoo – Where Warriors, Creators, and Legends Get Marked.
          </p>
          <p className="text-xl text-[#D4AF37]">
            🔥 Only 3 Booking Slots Left This Month. Claim Your Spot Among the Chosen.
          </p>
        </div>
      </div>
    )
  },
  "how-to-choose-the-right-tattoo-artist-landshut": {
    title: "How to Choose the Right Tattoo Artist (Without Getting Ink You'll Regret)",
    description: "Learn how to find the best tattoo artist in Landshut. Avoid rookie mistakes and walk away with body art you'll love for life.",
    image: "/images/Imre-Portrait.png",
    date: "May 3, 2025",
    readTime: "8 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          You don't just wake up and decide to let someone etch your skin for life without doing your homework — or at least, you shouldn't.
        </p>

        <p className="mb-8">
          We've seen too many people roll into Asgard with a faded mess from some backroom "artist" down the street, asking if we can "fix it." And while we're damn good at coverups, we'd rather save you the pain (and extra euros) before that mistake happens.
        </p>

        <p className="mb-8">
          So here's the real talk — how do you actually choose the right tattoo artist?
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. Stalk Their Portfolio Like Your Life Depends on It (Because Your Skin Kind of Does)
        </h2>
        <p className="mb-8">
          Scroll. Zoom. Zoom again.<br />
          Don't just look at the fresh ink — you want to see healed tattoos. Any artist can make something look dope for 24 hours. But will it still hold its lines, contrast, and color three months from now?<br /><br />
          At Asgard, we pride ourselves on showing before-and-after healing comparisons so you see the truth, not the hype.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          2. Look for Style, Not Just Skill
        </h2>
        <p className="mb-4">
          This is like dating.<br />
          You might meet a great person… but if your vibes don't match, it's not going to work. Same goes for tattoos.
        </p>
        <p className="mb-4">Whether you want:</p>
        <ul className="list-none mb-8 space-y-2">
          <li>⚔️ A Norse-inspired sleeve</li>
          <li>🐺 A wolf howling into the abyss</li>
          <li>🎭 A meaningful black-and-grey portrait</li>
        </ul>
        <p className="mb-8">
          ...you need an artist who lives and breathes that style.<br />
          Every Asgard artist has their specialty. And when the style matches the story? That's when the magic happens.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          3. Read the Reviews (Then Read Between the Lines)
        </h2>
        <p className="mb-4">
          Five stars are nice, but what do people actually say?<br />
          Look for words like:
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>"They actually listened to me"</li>
          <li>"Felt zero judgment even as a first-timer"</li>
          <li>"Made me feel confident in my idea"</li>
        </ul>
        <p className="mb-8">If you don't feel seen and respected, walk out. Simple.</p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          4. Vibe Check the Studio
        </h2>
        <p className="mb-4">When you walk in, what do you feel?</p>
        <ul className="list-none mb-8 space-y-2">
          <li>❌ Cold? Judgy? Like you're intruding?</li>
          <li>✅ Or warm, buzzing with creativity, and greeted like a guest of honor?</li>
        </ul>
        <p className="mb-8">
          At Asgard, we blast rock. We hang Viking artwork. We ask questions before we ever touch a stencil. It's a f*cking experience, not just an appointment.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          5. Ask Questions — Smart Artists Love Smart Clients
        </h2>
        <p className="mb-8">
          If your artist can't explain needle depth, ink quality, or placement advice? Red flag.<br />
          A true pro loves when clients care, because it shows you're serious.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Bottom Line?</h2>
        <p className="mb-8">
          Don't rush the most permanent decision you'll ever make.<br />
          Explore, ask, compare — and when you find the artist who gets you, you'll know.
        </p>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-2">
            And if you're in Landshut?
          </p>
          <p className="text-xl text-[#D4AF37]">
            🛡️ Asgard Tattoo isn't just another studio — we're the fortress of local ink legends.
          </p>
        </div>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-4">
            🔥 Want a Viking-Inspired Masterpiece?
          </p>
          <p className="text-lg text-[#D4AF37]">
            Book Your Session Today. Only 3 Spots Left This Month!
          </p>
        </div>
      </div>
    )
  },
  "best-custom-tattoo-artists-landshut": {
    title: "Best Custom Tattoo Artists Near Me? Landshut's #1 Studio Breaks the Mold",
    description: "Searching for the best custom tattoo artists near Landshut? Discover why Asgard Tattoo stands at the top with jaw-dropping, story-driven ink.",
    image: "/images/IMG_20250305_124656.jpg",
    date: "May 5, 2025",
    readTime: "7 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Let's get something straight — not all tattoo artists are created equal.
        </p>

        <p className="mb-8">
          There are tattoo technicians… and then there are tattoo architects. Artists who listen. Design. Execute like maniacs.
          You want a custom piece? Then you don't settle for the "guy with the walk-in sign."
        </p>

        <p className="mb-8">
          You go to the ones who build legacies, not just slap ink on skin.
        </p>

        <p className="mb-8">
          Welcome to Asgard.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Why Custom Work Requires a Different Breed of Artist
        </h2>
        <p className="mb-8">
          Custom tattoos aren't just designs. They're stories — yours. And they deserve to be told in a way that hits hard and heals right.
        </p>

        <p className="mb-8">
          Here's what separates the amateurs from the Asgard elite:
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. They Ask More Questions Than You Do
        </h2>
        <p className="mb-4">
          The best artists don't just draw. They extract your vision — even if it's still foggy in your own head.
        </p>
        <p className="mb-8">
          At Asgard, our consults are like a creative therapy session:
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>What does the piece mean to you?</li>
          <li>Where do you want it?</li>
          <li>How do you want it to feel when you see it in the mirror?</li>
        </ul>
        <p className="mb-8">
          You'll leave your consult thinking, "Damn, they get it."
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          2. They Know Skin Like a Canvas
        </h2>
        <p className="mb-4">
          Tattooing isn't digital art. It's three-dimensional, human, and alive.
          A true pro knows how a design will look:
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>On muscle curves</li>
          <li>As it ages and fades</li>
          <li>Under your skin tone</li>
        </ul>
        <p className="mb-8">
          They're not just drawing. They're sculpting with ink.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          3. They Don't Copy Pinterest
        </h2>
        <p className="mb-8">
          Your body deserves more than a design 9,000 other people already have.
          Asgard artists don't recycle flash. We design from scratch.
        </p>
        <p className="mb-8">
          Want Odin's face tearing through a storm? Or a serpent wrapping around your spine with ancient Norse runes trailing into your ribs?
        </p>
        <p className="mb-8">
          We'll build that. For you. Only you.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          4. Their Portfolio Feels Like a Comic Book Saga
        </h2>
        <p className="mb-4">
          You ever look at an artist's Instagram and get lost in their feed like it's a graphic novel?
        </p>
        <p className="mb-8">
          That's how it feels at Asgard. Every healed piece tells a story:
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>A warrior's journey.</li>
          <li>A sacred tribute to someone lost.</li>
          <li>A triumph inked in black and blood-red.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          5. The Studio Experience Feels Like a Ritual
        </h2>
        <p className="mb-4">
          From the second you walk in, Asgard doesn't feel like a shop.
          It feels like a temple for inked transformation.
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>Viking art on the walls</li>
          <li>Rock music pulsing through the air</li>
          <li>Artists who treat you like a brother or sister in arms</li>
        </ul>
        <p className="mb-8">
          You're not just getting tattooed. You're entering the hall of the gods.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          So, Who's the Best Custom Tattoo Artist Near You?
        </h2>
        <p className="mb-8">
          If you're in Landshut, that answer isn't up for debate.
        </p>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-4">
            🛡️ Asgard Tattoo = Custom Masterpieces. Real Stories. Ink That Hits Different.
          </p>
          <p className="text-lg text-[#D4AF37]">
            🔥 Only 3 Spots Left This Month – Book Your Consultation Today Before They're Gone.
          </p>
        </div>
      </div>
    )
  },
  "tattoo-aftercare-mistakes": {
    title: "Tattoo Aftercare: 7 Mistakes That Can Ruin Your Ink (Don't Be That Guy)",
    description: "Don't let your new tattoo fade, blur, or get infected. Here are the 7 biggest aftercare mistakes and how to avoid them.",
    image: "/images/Infected-tattoo.jpg",
    date: "May 7, 2025",
    readTime: "6 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          You just sat through the pain, paid good money, and got a piece of art stamped onto your skin.
          The hard part's over, right?
        </p>

        <p className="mb-8">
          Wrong.
        </p>

        <p className="mb-8">
          Because what you do in the next 7–10 days literally decides how that tattoo looks for life.
          We've seen flawless work get wrecked because someone decided to "just wing it."
        </p>

        <p className="mb-8">
          Here are the 7 biggest mistakes that'll screw up your ink — and how to avoid them.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. Peeling It Like a Sunburn (You Monster)
        </h2>
        <p className="mb-8">
          Yes, it itches. Yes, it flakes. But if you start picking at scabs or peeling skin?<br /><br />
          Say goodbye to those crisp lines.<br /><br />
          Let the skin do its thing. Moisturize. Be patient. If it flakes, it flakes. If you pick, it scars.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          2. Using the Wrong Lotion
        </h2>
        <p className="mb-8">
          No, your coconut-scented beach cream won't help.
          Some lotions clog pores or contain perfumes that irritate the healing skin.<br /><br />
          Stick to unscented, tattoo-specific balms — or get our aftercare guide with every session at Asgard.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          3. Overwashing or Underwashing
        </h2>
        <p className="mb-4">
          There's a sweet spot here.
        </p>
        <ul className="list-none mb-8 space-y-2">
          <li>🚿 Too much scrubbing? You're damaging the healing skin.</li>
          <li>😬 Too little cleaning? Bacteria move in like squatters.</li>
        </ul>
        <p className="mb-8">
          Use lukewarm water. Mild, fragrance-free soap. Pat dry. Don't rub. Wash 2–3 times a day max.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          4. Letting the Tattoo "Breathe" Too Much
        </h2>
        <p className="mb-8">
          We get it. Your tattoo looks badass and you want the world to see it.<br /><br />
          But if you're walking around with it uncovered, rubbing on your clothes, exposed to sun and dirt?<br /><br />
          That's infection central.<br /><br />
          Wrap it when needed. Follow your artist's instructions. Trust us, there's a reason.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          5. Hitting the Gym or the Pool Too Soon
        </h2>
        <p className="mb-8">
          Sweating buckets on your fresh ink? Bad idea.
          Soaking it in chlorinated water at the pool? Even worse.<br /><br />
          Wait at least 10 days before diving back into beast mode. Your tattoo is an open wound. Treat it like one.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          6. Listening to "That One Guy"
        </h2>
        <p className="mb-8">
          We all know him.
          "That one guy" with 12 tattoos and zero clue.<br /><br />
          He'll tell you to use Vaseline, or rub it with whiskey, or let your dog lick it for "natural healing enzymes."<br />
          Block that advice. And maybe block him too.<br /><br />
          Follow your artist's instructions — not your cousin Steve.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          7. Ignoring Touch-Up Advice
        </h2>
        <p className="mb-8">
          A touch-up isn't a failure — it's a fine-tune.
          Sometimes, even when you do everything right, your body doesn't hold the ink 100%.<br /><br />
          That's why we offer free touch-up support at Asgard when you follow the aftercare guide.
          Because your art deserves to shine — always.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Bottom Line?</h2>
        <p className="mb-8">
          Your ink is a story. Don't blur the pages by being careless.
          Take care of it, and it'll look fresh for years.
        </p>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-4">
            💀 Want tattoos that heal right AND look legendary?
          </p>
          <p className="text-lg text-[#D4AF37]">
            Asgard Tattoo gives you pro aftercare, step-by-step — and we're always here for questions after the needle's down.
          </p>
        </div>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37]">
            🔥 Book your consult today. We don't just ink — we make your story last.
          </p>
        </div>
      </div>
    )
  }
};

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[slug];

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return null;
  }

  const BlogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "Asgard Tattoo"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asgard Tattoo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://asgardtattoo.com/logo.png"
      }
    },
    "datePublished": "2025-05-05T08:00:00+01:00",
    "dateModified": "2025-05-05T08:00:00+01:00"
  };

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .map(([key, post]) => ({
      title: post.title,
      slug: key,
      image: post.image
    }));

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5]">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogPostSchema) }}
      />

      <nav className="bg-viking-navy/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-metallic-gold hover:text-firebrick transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
            <Link to="/blog" className="text-metallic-gold hover:text-firebrick transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
            <span className="text-[#F5F5F5]">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 mb-8 text-[#F5F5F5]">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime} read</span>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
              {post.content()}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-[#D4AF37] mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link 
                      key={index}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <div className="aspect-video overflow-hidden rounded-lg mb-3">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-[#D4AF37] group-hover:text-firebrick transition-colors">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-[#D4AF37] mb-4">
                  Ready for Your Next Piece?
                </h3>
                <p className="text-[#F5F5F5] mb-6">
                  Book your consultation today and let's create something legendary together.
                </p>
                <Link
                  to="/booking#booking"
                  className="cta-button bg-firebrick text-white font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center w-full"
                >
                  <span>Book Your Session</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 border-t border-metallic-gold/30 transform transition-transform duration-300 lg:hidden">
        <Link
          to="/booking#booking"
          className="cta-button bg-firebrick text-white font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center w-full"
        >
          <span>Book Your Session Now</span>
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default BlogPost;