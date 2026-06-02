import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../i18n';

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
          Because Norse symbols aren't just decorations - they're ancient signals.<br />
          Messages to the gods. Weapons of the spirit. Warnings to the weak.
        </p>

        <p className="mb-8">
          When you wear one, you're not just showing style.<br />
          You're declaring your story to the universe. And maybe to the afterlife.
        </p>

        <p className="mb-8">
          At Asgard Tattoo, we've seen these symbols change people.<br />
          Not just how they look - but how they walk.<br />
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
              🧭 Vegvisir - The Norse Compass
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
              ⚔️ Helm of Awe (Ægishjálmr) - The Fearbreaker
            </h2>
            <p className="mb-4">This is armor in ink.</p>
            <p className="mb-4">
              The Helm of Awe was carved into helmets, shields, and skin by warriors about to face death.<br />
              Not to bring them peace - but to strike fear into their enemies.
            </p>
            <p className="text-xl font-semibold text-[#D4AF37]">
              You wear this when you've faced fear... and made fear back down.
            </p>
          </div>

          <div>
            <img 
              src="/images/Blog/Yggdrasil.jpg" 
              alt="Yggdrasil world tree" 
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              🌳 Yggdrasil - The Tree of Life
            </h2>
            <p className="mb-4">
              This is the backbone of Norse mythology.<br />
              It connects all worlds. Life. Death. The divine.
            </p>
            <p className="mb-4">
              If your story has roots - family, struggle, rebirth - Yggdrasil isn't just a symbol. It's your lineage.
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
              🐺 Fenrir - The Wolf Who Broke His Chains
            </h2>
            <p className="mb-4">
              Bound by gods. Feared by all.<br />
              And in the end? Unleashed.
            </p>
            <p className="mb-4">
              Fenrir didn't play by their rules. He tore the sky open when they pushed too far.
            </p>
            <p className="mb-4">
              If you've ever been silenced, underestimated, restrained - and fought your way out?
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
              🧠 Valknut - The Knot of the Slain
            </h2>
            <p className="mb-4">
              Three interlocking triangles. Sacred geometry for warriors who live by a code.<br />
              The Valknut is tied to Odin's chosen - those who die with honor, in battle, in life, in principle.
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
              🍻 Skaldenmet - The Mead of Poets & Visionaries
            </h2>
            <p className="mb-4">Not all warriors carry blades. Some carry truth.</p>
            <p className="mb-4">
              Skaldenmet is the divine mead stolen by Odin and given to those worthy of inspiration - the poets, the bards, the rebels with vision.
            </p>
            <p className="mb-8">
              If you see the world differently...<br />
              If you speak what others stay quiet about...<br />
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
          Each piece is custom-built from your story - not Pinterest.<br />
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
            🛡️ Asgard Tattoo - Where Warriors, Creators, and Legends Get Marked.
          </p>
          <p className="text-xl text-[#D4AF37]">
            🔥 Only 6 Booking Slots Left This Month. Claim Your Spot Among the Chosen.
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
          You don't just wake up and decide to let someone etch your skin for life without doing your homework - or at least, you shouldn't.
        </p>

        <p className="mb-8">
          We've seen too many people roll into Asgard with a faded mess from some backroom "artist" down the street, asking if we can "fix it." And while we're damn good at coverups, we'd rather save you the pain (and extra euros) before that mistake happens.
        </p>

        <p className="mb-8">
          So here's the real talk - how do you actually choose the right tattoo artist?
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. Stalk Their Portfolio Like Your Life Depends on It (Because Your Skin Kind of Does)
        </h2>
        <p className="mb-8">
          Scroll. Zoom. Zoom again.<br />
          Don't just look at the fresh ink - you want to see healed tattoos. Any artist can make something look dope for 24 hours. But will it still hold its lines, contrast, and color three months from now?<br /><br />
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
          5. Ask Questions - Smart Artists Love Smart Clients
        </h2>
        <p className="mb-8">
          If your artist can't explain needle depth, ink quality, or placement advice? Red flag.<br />
          A true pro loves when clients care, because it shows you're serious.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Bottom Line?</h2>
        <p className="mb-8">
          Don't rush the most permanent decision you'll ever make.<br />
          Explore, ask, compare - and when you find the artist who gets you, you'll know.
        </p>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-2">
            And if you're in Landshut?
          </p>
          <p className="text-xl text-[#D4AF37]">
            🛡️ Asgard Tattoo isn't just another studio - we're the fortress of local ink legends.
          </p>
        </div>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37] mb-4">
            🔥 Want a Viking-Inspired Masterpiece?
          </p>
          <p className="text-lg text-[#D4AF37]">
            Book Your Session Today. Only 6 Spots Left This Month!
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
          Let's get something straight - not all tattoo artists are created equal.
        </p>

        <p className="mb-8">
          There are tattoo technicians... and then there are tattoo architects. Artists who listen. Design. Execute like maniacs.
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
          Custom tattoos aren't just designs. They're stories - yours. And they deserve to be told in a way that hits hard and heals right.
        </p>

        <p className="mb-8">
          Here's what separates the amateurs from the Asgard elite:
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. They Ask More Questions Than You Do
        </h2>
        <p className="mb-4">
          The best artists don't just draw. They extract your vision - even if it's still foggy in your own head.
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
            🔥 Only 6 Spots Left This Month - Book Your Consultation Today Before They're Gone.
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
          Here are the 7 biggest mistakes that'll screw up your ink - and how to avoid them.
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
          Stick to unscented, tattoo-specific balms - or get our aftercare guide with every session at Asgard.
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
          Follow your artist's instructions - not your cousin Steve.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          7. Ignoring Touch-Up Advice
        </h2>
        <p className="mb-8">
          A touch-up isn't a failure - it's a fine-tune.
          Sometimes, even when you do everything right, your body doesn't hold the ink 100%.<br /><br />
          That's why we offer free touch-up support at Asgard when you follow the aftercare guide.
          Because your art deserves to shine - always.
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
            Asgard Tattoo gives you pro aftercare, step-by-step - and we're always here for questions after the needle's down.
          </p>
        </div>

        <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30 my-8">
          <p className="text-xl text-[#D4AF37]">
            🔥 Book your consult today. We don't just ink - we make your story last.
          </p>
        </div>
      </div>
    )
  },
  "was-kostet-ein-tattoo-landshut": {
    title: "What Does a Tattoo Cost in Landshut? Prices, Hourly Rates & What You Actually Pay For",
    titleDe: "Was kostet ein Tattoo in Landshut? Preise, Stundensatze & was du wirklich bezahlst",
    description: "Transparent breakdown of tattoo pricing in Landshut. From small motifs starting at 100 EUR to full-day sessions. Learn what determines cost and why cheap tattoos always cost more.",
    descriptionDe: "Transparenter Einblick in Tattoo-Preise in Landshut. Von kleinen Motiven ab 100 EUR bis Ganztags-Sessions. Erfahre, was den Preis bestimmt und warum billige Tattoos am Ende teurer sind.",
    image: "/images/Blog/WhatsApp_Image_2026-05-14_at_3.26.51_PM.jpeg",
    date: "June 3, 2026",
    dateDe: "3. Juni 2026",
    readTime: "9 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Let's address the question you've been Googling for 20 minutes:<br />
          "How much is this going to cost me?"
        </p>

        <p className="mb-8">
          Fair question. And unlike most studios that dodge it with "it depends" and leave you guessing, we're going to give you real numbers, real context, and the honest truth about what separates a 100 EUR tattoo from a 2000 EUR piece.
        </p>

        <p className="mb-12">
          Because the answer isn't just about size. It's about what you're actually paying for when you sit in that chair.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          The Real Numbers: What Tattoos Cost in Landshut
        </h2>
        <p className="mb-4">
          Here's a straightforward breakdown based on what you'll typically see at a professional studio in Landshut:
        </p>
        <ul className="list-none mb-8 space-y-3">
          <li><strong className="text-[#D4AF37]">Small motifs</strong> (wrist, finger, ankle - 3-8 cm): from 100 EUR</li>
          <li><strong className="text-[#D4AF37]">Medium pieces</strong> (forearm, calf, shoulder - palm-sized to A5): 200 - 450 EUR</li>
          <li><strong className="text-[#D4AF37]">Large work</strong> (half-sleeve, thigh, back panel): 500 - 1500 EUR</li>
          <li><strong className="text-[#D4AF37]">Full-day sessions</strong> (6-8 hours, large custom projects): from 600 EUR</li>
          <li><strong className="text-[#D4AF37]">Multi-session projects</strong> (full sleeves, back pieces): 1500 - 4000+ EUR</li>
        </ul>
        <p className="mb-12">
          These are ballpark figures. Every body is different, every design is different, and that's exactly why a personal consultation exists.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          What Actually Determines the Price?
        </h2>
        <p className="mb-4">
          When your artist quotes you, they're calculating based on these factors:
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Size & Placement</h3>
        <p className="mb-6">
          A coin-sized symbol on your wrist takes 30 minutes. A full-back Norse mythology scene takes 30 hours across multiple sessions. The time difference alone tells the story. Placement matters too - ribcage, neck, and hands require slower, more precise work due to pain sensitivity and skin texture.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Detail & Complexity</h3>
        <p className="mb-6">
          A solid black geometric shape versus a photorealistic portrait of your grandmother - these are wildly different skill demands. Fine-line floral work, realistic shading, color blending, ornamental dotwork - each technique adds time and expertise to the equation.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Custom Design Time</h3>
        <p className="mb-6">
          A flash design off the wall? Minimal prep. A fully custom piece built from your story, your references, and three rounds of sketching? That's hours of creative work before the needle even touches your skin. At Asgard, design consultation is always free - but it's still a factor in the overall value you receive.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Artist Experience</h3>
        <p className="mb-8">
          A 15-year veteran with international convention experience charges differently than someone who picked up a machine last year. You're not just paying for the hour in the chair - you're paying for the 10,000 hours of practice that make that hour count.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            The "Cheap Tattoo" Tax
          </h2>
          <p className="mb-4">
            Here's what nobody tells you until it's too late:
          </p>
          <p className="mb-4">
            That 50 EUR tattoo from the walk-in shop? In two years, you'll spend 300 EUR covering it up. Or 800 EUR on laser removal sessions. Or you'll just live with faded lines, blown-out shading, and a story you're embarrassed to tell.
          </p>
          <p className="mb-4">
            We've seen it hundreds of times. Someone walks in with a "deal" they got somewhere else, asking if we can save it.
          </p>
          <p className="text-xl font-semibold text-[#D4AF37]">
            The cheapest tattoo is the one you only pay for once.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          What's Included When You Book at Asgard
        </h2>
        <p className="mb-4">Your quote isn't just "needle time." Here's what you get:</p>
        <ul className="list-none mb-8 space-y-3">
          <li>Free personal consultation (in-studio or via WhatsApp)</li>
          <li>Custom design work - drawn specifically for your body and vision</li>
          <li>Revision rounds until the design feels right</li>
          <li>Premium inks and single-use, hospital-grade equipment</li>
          <li>Aftercare guidance and ongoing support</li>
          <li>Free touch-up within the healing period if needed</li>
        </ul>
        <p className="mb-12">
          No hidden fees. No surprise charges. The price we quote is the price you pay.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          How to Get Your Personal Quote
        </h2>
        <p className="mb-4">
          Every piece is different, which is why we don't publish a fixed price list. Instead, here's how it works:
        </p>
        <ul className="list-none mb-8 space-y-3">
          <li><strong className="text-[#D4AF37]">1.</strong> Send us your idea - a description, reference images, or even a rough sketch</li>
          <li><strong className="text-[#D4AF37]">2.</strong> We'll discuss size, placement, and style preferences</li>
          <li><strong className="text-[#D4AF37]">3.</strong> You receive a clear quote within 24 hours - no obligation, no pressure</li>
        </ul>
        <p className="mb-12">
          If the quote works for you, we schedule your session. If not, no hard feelings. That's it.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            Get Your Personal Quote - Zero Obligation
          </p>
          <p className="mb-4">
            Tell us your idea. We'll tell you what it takes. No commitment, no sales pressure - just honest numbers from artists who respect your budget and your skin.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Response within 24 hours. Consultation always free.
          </p>
        </div>
      </div>
    ),
    contentDe: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Lass uns die Frage beantworten, die du seit 20 Minuten googelst:<br />
          "Was wird mich das kosten?"
        </p>

        <p className="mb-8">
          Berechtigte Frage. Und im Gegensatz zu den meisten Studios, die mit "kommt drauf an" ausweichen und dich im Dunkeln lassen, geben wir dir echte Zahlen, echten Kontext und die ehrliche Wahrheit daruber, was ein 100-Euro-Tattoo von einem 2000-Euro-Stuck unterscheidet.
        </p>

        <p className="mb-12">
          Denn die Antwort dreht sich nicht nur um die Grosse. Es geht darum, wofur du wirklich bezahlst, wenn du dich in den Stuhl setzt.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Die echten Zahlen: Was Tattoos in Landshut kosten
        </h2>
        <p className="mb-4">
          Hier eine klare Ubersicht, was du in einem professionellen Studio in Landshut erwarten kannst:
        </p>
        <ul className="list-none mb-8 space-y-3">
          <li><strong className="text-[#D4AF37]">Kleine Motive</strong> (Handgelenk, Finger, Knochel - 3-8 cm): ab 100 EUR</li>
          <li><strong className="text-[#D4AF37]">Mittlere Stucke</strong> (Unterarm, Wade, Schulter - handflachengross bis A5): 200 - 450 EUR</li>
          <li><strong className="text-[#D4AF37]">Grosse Arbeiten</strong> (Half-Sleeve, Oberschenkel, Ruckenpanel): 500 - 1500 EUR</li>
          <li><strong className="text-[#D4AF37]">Ganztags-Sessions</strong> (6-8 Stunden, grosse Custom-Projekte): ab 600 EUR</li>
          <li><strong className="text-[#D4AF37]">Mehrfach-Sessions</strong> (Full Sleeves, Ruckenstucke): 1500 - 4000+ EUR</li>
        </ul>
        <p className="mb-12">
          Das sind Richtwerte. Jeder Korper ist anders, jedes Design ist anders - und genau dafur gibt es die personliche Beratung.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Was bestimmt den Preis wirklich?
        </h2>
        <p className="mb-4">
          Wenn dein Kunstler dir ein Angebot macht, berechnet er auf Basis dieser Faktoren:
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Grosse & Platzierung</h3>
        <p className="mb-6">
          Ein munzgrosses Symbol am Handgelenk dauert 30 Minuten. Eine komplette nordische Mythologie-Szene auf dem Rucken braucht 30 Stunden uber mehrere Sessions. Der Zeitunterschied allein erzahlt die Geschichte. Die Platzierung spielt auch eine Rolle - Rippen, Hals und Hande erfordern langsamere, prazisere Arbeit wegen der Schmerzempfindlichkeit und Hautbeschaffenheit.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Detail & Komplexitat</h3>
        <p className="mb-6">
          Eine solide schwarze geometrische Form im Vergleich zu einem fotorealistischen Portrait deiner Grossmutter - das sind vollig unterschiedliche Anforderungen an das Konnen. Fine-Line-Floral, realistische Schattierung, Farbverlaufe, ornamentale Dotwork-Technik - jede Technik addiert Zeit und Expertise zur Gleichung.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Custom-Design-Zeit</h3>
        <p className="mb-6">
          Ein Flash-Design von der Wand? Minimale Vorbereitung. Ein komplett individuelles Stuck, aufgebaut aus deiner Geschichte, deinen Referenzen und drei Runden Skizzenarbeit? Das sind Stunden kreativer Arbeit, bevor die Nadel deine Haut uberhaupt beruhrt. Bei Asgard ist die Design-Beratung immer kostenlos - aber sie ist trotzdem ein Faktor im Gesamtwert, den du bekommst.
        </p>

        <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Erfahrung des Kunstlers</h3>
        <p className="mb-8">
          Ein Veteran mit 15 Jahren Erfahrung und internationaler Convention-Prasenz kalkuliert anders als jemand, der letztes Jahr seine erste Maschine in die Hand genommen hat. Du zahlst nicht nur fur die Stunde im Stuhl - du zahlst fur die 10.000 Stunden Ubung, die diese eine Stunde so wertvoll machen.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Die "Billig-Tattoo-Steuer"
          </h2>
          <p className="mb-4">
            Hier ist, was dir niemand sagt, bis es zu spat ist:
          </p>
          <p className="mb-4">
            Das 50-Euro-Tattoo aus dem Walk-in-Laden? In zwei Jahren gibst du 300 EUR fur ein Cover-Up aus. Oder 800 EUR fur Laser-Entfernung. Oder du lebst einfach mit verblassten Linien, verlaufener Schattierung und einer Geschichte, die dir peinlich ist.
          </p>
          <p className="mb-4">
            Wir haben das hunderte Male gesehen. Jemand kommt rein mit einem "Schnappchen" von woanders und fragt, ob wir es retten konnen.
          </p>
          <p className="text-xl font-semibold text-[#D4AF37]">
            Das gunstigste Tattoo ist das, fur das du nur einmal bezahlst.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Was bei einer Buchung bei Asgard inklusive ist
        </h2>
        <p className="mb-4">Dein Angebot ist nicht nur "Nadelzeit." Das bekommst du:</p>
        <ul className="list-none mb-8 space-y-3">
          <li>Kostenlose personliche Beratung (im Studio oder per WhatsApp)</li>
          <li>Custom-Design - speziell fur deinen Korper und deine Vision gezeichnet</li>
          <li>Anpassungsrunden, bis das Design sich richtig anfuhlt</li>
          <li>Premium-Tinten und Einweg-Equipment in Krankenhausqualitat</li>
          <li>Pflegeberatung und laufende Unterstutzung nach dem Termin</li>
          <li>Kostenloses Touch-Up innerhalb der Heilungsphase bei Bedarf</li>
        </ul>
        <p className="mb-12">
          Keine versteckten Gebuhren. Keine Uberraschungs-Aufschlage. Der Preis, den wir nennen, ist der Preis, den du zahlst.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          So bekommst du dein personliches Angebot
        </h2>
        <p className="mb-4">
          Jedes Stuck ist anders - deshalb veroffentlichen wir keine fixe Preisliste. Stattdessen lauft es so:
        </p>
        <ul className="list-none mb-8 space-y-3">
          <li><strong className="text-[#D4AF37]">1.</strong> Schick uns deine Idee - eine Beschreibung, Referenzbilder oder sogar eine grobe Skizze</li>
          <li><strong className="text-[#D4AF37]">2.</strong> Wir besprechen Grosse, Platzierung und Stil-Praferenzen</li>
          <li><strong className="text-[#D4AF37]">3.</strong> Du erhaltst ein klares Angebot innerhalb von 24 Stunden - unverbindlich, ohne Druck</li>
        </ul>
        <p className="mb-12">
          Wenn das Angebot fur dich passt, planen wir deinen Termin. Wenn nicht, kein Problem. So einfach ist das.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            Hol dir dein personliches Angebot - komplett unverbindlich
          </p>
          <p className="mb-4">
            Sag uns deine Idee. Wir sagen dir, was es braucht. Kein Commitment, kein Verkaufsdruck - nur ehrliche Zahlen von Kunstlern, die dein Budget und deine Haut respektieren.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Antwort innerhalb von 24 Stunden. Beratung immer kostenlos.
          </p>
        </div>
      </div>
    )
  },
  "tattoo-stile-vergleich-welcher-passt-zu-dir": {
    title: "Tattoo Styles Compared: Realism, Blackwork, Nordic & More - Which One Fits You?",
    titleDe: "Tattoo-Stile im Vergleich: Realism, Blackwork, Nordic & mehr - Welcher passt zu dir?",
    description: "The definitive guide to tattoo styles. Compare Realism, Blackwork, Fine Line, Norse, Neo-Traditional and more. Find the style that matches your personality and vision.",
    descriptionDe: "Der ultimative Guide zu Tattoo-Stilen. Vergleiche Realism, Blackwork, Fine Line, Norse, Neo-Traditional und mehr. Finde den Stil, der zu deiner Personlichkeit und Vision passt.",
    image: "/images/Portfolio/realism/animals/realism-gorilla-sleeve-tattoo-with-geometry.jpg",
    date: "June 10, 2026",
    dateDe: "10. Juni 2026",
    readTime: "10 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Your tattoo style isn't what's trending on Instagram right now.<br />
          It's what still makes you feel something when you catch it in the mirror ten years from now.
        </p>

        <p className="mb-8">
          But with dozens of styles out there - all blending, overlapping, evolving - how do you know which one is actually yours?
        </p>

        <p className="mb-12">
          This guide breaks down the major styles we work with at Asgard, who each one suits, and what to consider before you commit. No fluff. Just clarity.
        </p>

        <div className="my-16 space-y-16">
          <div>
            <img
              src="/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg"
              alt="Hyperrealistic portrait sleeve tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Realism - When Your Skin Becomes a Photograph
            </h2>
            <p className="mb-4">
              Photorealistic tattoos capture light, shadow, and texture with surgical precision. Portraits of loved ones, animals with fur you can almost feel, landscapes that breathe.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You want to immortalize something real - a face, a memory, a moment frozen in time. You appreciate technical mastery and are willing to invest in larger pieces that give the artist room to work.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Realism demands an experienced artist with a proven portfolio in this exact style. Small mistakes are immediately visible. It also requires adequate size - trying to cram realism into a tiny space kills the detail.
            </p>
            <p className="text-lg text-[#D4AF37]">
              At Asgard, Imre is our realism specialist with 15+ years of portrait and photorealistic work.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/blackwork/dark-surreal-winged-skeleton-shoulder-tattoo.jpg"
              alt="Dark surreal blackwork shoulder tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Blackwork - Bold, Unapologetic, Built to Last
            </h2>
            <p className="mb-4">
              Pure black ink. High contrast. Geometric precision or raw organic shapes. Blackwork doesn't whisper - it declares.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You're drawn to strong visual statements. You want something that ages gracefully without fading into gray mush. You appreciate architectural thinking in design.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Blackwork is incredibly versatile - from delicate geometric patterns to heavy tribal fills to surreal illustrative pieces. It tends to age better than most styles because solid black holds its contrast over decades.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Both artists at Asgard handle blackwork across the spectrum, from geometric minimalism to dark illustrative.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg"
              alt="Norse Viking god Odin realism sleeve tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Norse & Viking - Mythology Meets Skin Art
            </h2>
            <p className="mb-4">
              This is Asgard's DNA. Runes, gods, sacred geometry, Vegvisir compasses, Yggdrasil trees, Fenrir wolves, Odin's ravens. Mythology that carries meaning across centuries, inked onto warriors who carry it forward.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You connect with Norse mythology on a spiritual or ancestral level. You want symbols that carry weight, history, and intention. You see your tattoo as armor, not decoration.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Norse work can blend with multiple techniques - realistic portraits of gods, geometric knotwork, blackwork runes, or ornamental compositions. The best Norse tattoos aren't copied from Google - they're custom-built from the mythology that resonates with YOUR story.
            </p>
            <p className="text-lg text-[#D4AF37]">
              This is what built Asgard's reputation. We live and breathe this style.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/fine line/floral/fineline-floral-forearm-blackwork1.jpg"
              alt="Fine line floral forearm tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Fine Line - Elegance in Every Stroke
            </h2>
            <p className="mb-4">
              Thin, delicate lines. Minimal shading. Maximum elegance. Fine line tattoos look like pen drawings on skin - botanical illustrations, symbolic icons, portraits rendered with whisper-thin precision.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You prefer subtlety over loudness. You want something that's beautiful up close and discreet from a distance. You appreciate minimalist aesthetics.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Fine line work requires an exceptionally steady hand. Not every artist can pull this off - the margin for error is zero. Also worth noting: very thin lines can fade slightly faster than bolder work, so placement and aftercare matter more here.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Eszter specializes in fine line florals and symbolic pieces at Asgard.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/neo-traditional/neo-traditional-female-portrait-floral-sleeve-tattoo.jpg"
              alt="Neo-traditional female portrait floral sleeve"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Neo-Traditional - Old School Roots, Modern Mastery
            </h2>
            <p className="mb-4">
              Bold outlines. Rich color palettes (or striking black-and-grey). Illustrative depth that traditional tattoos never had. Neo-traditional takes the durability of old school and injects it with artistic ambition.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You want artwork that's visually striking from across the room. You appreciate bold composition, vibrant imagery, and tattoos that look like they belong in a gallery. You value longevity - these age beautifully.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Neo-trad works brilliantly for animals, portraits, mythological figures, and pop culture subjects. The bold outlines protect the integrity of the design over time, while the interior detail gives you the wow factor.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/ornamental/mandala/lotus-mandala-sacred-geometry-back-tattoo.jpg"
              alt="Ornamental mandala sacred geometry back tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Ornamental & Dotwork - Sacred Geometry on Skin
            </h2>
            <p className="mb-4">
              Mandalas, sacred geometry, flowing ornamental compositions. Dotwork builds texture and depth through thousands of individual points rather than solid fills - creating a meditative, almost spiritual visual effect.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Best for you if:</strong> You're drawn to symmetry, patterns, and spiritual symbolism. You want a piece that feels meditative to look at. You appreciate the patience and precision required to execute these designs.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">What to know:</strong> Ornamental pieces work incredibly well as standalone statements or as framing elements around other tattoos. They're also excellent for connecting existing pieces into cohesive compositions.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Still Not Sure? Here's the Honest Truth.
        </h2>
        <p className="mb-4">
          Most people don't fit neatly into one box. The best custom tattoos blend elements from multiple styles - a realistic portrait with ornamental framing, a Norse symbol rendered in dotwork, a fine-line composition with blackwork accents.
        </p>
        <p className="mb-12">
          That's exactly what a consultation is for. You bring the feeling. We translate it into a style that works for YOUR skin, YOUR story, and YOUR long-term vision.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            Book a Free Style Consultation
          </p>
          <p className="mb-4">
            Not sure which direction to go? That's literally what we're here for. Bring your ideas, your mood, your references - or come with nothing but a feeling. We'll help you find your aesthetic.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Zero pressure. Zero cost. Just clarity about your next piece.
          </p>
        </div>
      </div>
    ),
    contentDe: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Dein Tattoo-Stil ist nicht das, was gerade auf Instagram trendet.<br />
          Es ist das, was dich in zehn Jahren immer noch etwas fuhlen lasst, wenn du es im Spiegel siehst.
        </p>

        <p className="mb-8">
          Aber bei Dutzenden von Stilen da draussen - alle ineinander fliessend, sich uberschneidend, sich weiterentwickelnd - woher weisst du, welcher wirklich deiner ist?
        </p>

        <p className="mb-12">
          Dieser Guide schlusselt die wichtigsten Stile auf, mit denen wir bei Asgard arbeiten: fur wen sie passen und was du bedenken solltest, bevor du dich entscheidest. Kein Geschwurbel. Nur Klarheit.
        </p>

        <div className="my-16 space-y-16">
          <div>
            <img
              src="/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg"
              alt="Hyperrealistisches Portrait Sleeve Tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Realism - Wenn deine Haut zum Foto wird
            </h2>
            <p className="mb-4">
              Fotorealistische Tattoos fangen Licht, Schatten und Textur mit chirurgischer Prazision ein. Portraits von geliebten Menschen, Tiere mit Fell das du fast fuhlen kannst, Landschaften die atmen.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du etwas Reales verewigen willst - ein Gesicht, eine Erinnerung, einen eingefrorenen Moment. Du technische Meisterschaft schatzt und bereit bist, in grossere Stucke zu investieren, die dem Kunstler Raum zum Arbeiten geben.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Realism verlangt einen erfahrenen Kunstler mit nachweislichem Portfolio in genau diesem Stil. Kleine Fehler fallen sofort auf. Ausserdem braucht es ausreichend Grosse - Realism in einen winzigen Bereich zu quetschen zerstort das Detail.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Bei Asgard ist Imre unser Realism-Spezialist mit 15+ Jahren Portrait- und fotorealistischer Arbeit.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/blackwork/dark-surreal-winged-skeleton-shoulder-tattoo.jpg"
              alt="Dunkles surreales Blackwork Schulter-Tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Blackwork - Mutig, kompromisslos, gemacht fur die Ewigkeit
            </h2>
            <p className="mb-4">
              Reine schwarze Tinte. Hoher Kontrast. Geometrische Prazision oder rohe organische Formen. Blackwork flustert nicht - es macht eine Ansage.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du von starken visuellen Statements angezogen wirst. Du etwas willst, das mit Wurde altert, ohne zu grauem Matsch zu verblassen. Du architektonisches Denken im Design schatzt.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Blackwork ist unglaublich vielseitig - von feinen geometrischen Mustern uber schwere Tribal-Fullungen bis hin zu surrealen illustrativen Stucken. Es altert tendenziell besser als die meisten Stile, weil sattes Schwarz seinen Kontrast uber Jahrzehnte halt.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Beide Kunstler bei Asgard beherrschen Blackwork in der gesamten Bandbreite, von geometrischem Minimalismus bis dark illustrativ.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg"
              alt="Nordischer Wikinger-Gott Odin Realism Sleeve"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Norse & Viking - Mythologie trifft Hautkunst
            </h2>
            <p className="mb-4">
              Das ist Asgards DNA. Runen, Gotter, heilige Geometrie, Vegvisir-Kompasse, Yggdrasil-Baume, Fenrir-Wolfe, Odins Raben. Mythologie die seit Jahrhunderten Bedeutung tragt, tatowiert auf Krieger die sie weitertragen.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du dich mit nordischer Mythologie auf spiritueller oder ahnenbezogener Ebene verbunden fuhlst. Du Symbole willst, die Gewicht, Geschichte und Absicht tragen. Du dein Tattoo als Rustung siehst, nicht als Dekoration.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Norse-Arbeit lasst sich mit mehreren Techniken verbinden - realistische Gotter-Portraits, geometrisches Knotwork, Blackwork-Runen oder ornamentale Kompositionen. Die besten Norse-Tattoos werden nicht von Google kopiert - sie werden individuell aus der Mythologie gebaut, die mit DEINER Geschichte resoniert.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Das hat Asgards Ruf begrundet. Wir leben und atmen diesen Stil.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/fine line/floral/fineline-floral-forearm-blackwork1.jpg"
              alt="Fine Line florales Unterarm-Tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Fine Line - Eleganz in jedem Strich
            </h2>
            <p className="mb-4">
              Dunne, zarte Linien. Minimale Schattierung. Maximale Eleganz. Fine-Line-Tattoos wirken wie Federzeichnungen auf Haut - botanische Illustrationen, symbolische Icons, Portraits mit hauchfeiner Prazision.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du Subtilitat der Lautstarke vorziehst. Du etwas willst, das aus der Nahe schon und aus der Ferne dezent ist. Du minimalistische Asthetik schatzt.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Fine-Line-Arbeit erfordert eine aussergewohnlich ruhige Hand. Nicht jeder Kunstler kann das - die Fehlertoleranz ist null. Auch wichtig: Sehr dunne Linien konnen etwas schneller verblassen als kraftigere Arbeit, daher sind Platzierung und Pflege hier besonders wichtig.
            </p>
            <p className="text-lg text-[#D4AF37]">
              Eszter ist bei Asgard auf Fine Line Florals und symbolische Stucke spezialisiert.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/neo-traditional/neo-traditional-female-portrait-floral-sleeve-tattoo.jpg"
              alt="Neo-Traditional weibliches Portrait Floral Sleeve"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Neo-Traditional - Old-School-Wurzeln, moderne Meisterschaft
            </h2>
            <p className="mb-4">
              Kraftige Outlines. Satte Farbpaletten (oder markantes Schwarz-Grau). Illustrative Tiefe, die traditionelle Tattoos nie hatten. Neo-Traditional nimmt die Haltbarkeit der alten Schule und spritzt kunstlerischen Anspruch hinein.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du Kunstwerke willst, die vom anderen Ende des Raums visuell auffallen. Du kraftige Kompositionen, lebendige Bildsprache und Tattoos schatzt, die in eine Galerie gehoren. Du Langlebigkeit schatzt - diese altern wunderschon.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Neo-Trad funktioniert brillant fur Tiere, Portraits, mythologische Figuren und Pop-Culture-Sujets. Die kraftigen Outlines schutzen die Integritat des Designs uber die Zeit, wahrend das Innendetail dir den Wow-Faktor gibt.
            </p>
          </div>

          <div>
            <img
              src="/images/Portfolio/ornamental/mandala/lotus-mandala-sacred-geometry-back-tattoo.jpg"
              alt="Ornamentales Mandala Sacred Geometry Rucken-Tattoo"
              className="w-full max-w-2xl mx-auto rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Ornamental & Dotwork - Heilige Geometrie auf Haut
            </h2>
            <p className="mb-4">
              Mandalas, heilige Geometrie, fliessende ornamentale Kompositionen. Dotwork baut Textur und Tiefe durch tausende einzelne Punkte statt solider Fullungen auf - und erzeugt einen meditativen, fast spirituellen visuellen Effekt.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Passt zu dir, wenn:</strong> Du von Symmetrie, Mustern und spiritueller Symbolik angezogen wirst. Du ein Stuck willst, das meditativ wirkt wenn man es betrachtet. Du die Geduld und Prazision schatzt, die fur diese Designs notig ist.
            </p>
            <p className="mb-4">
              <strong className="text-[#D4AF37]">Gut zu wissen:</strong> Ornamentale Stucke funktionieren unglaublich gut als eigenstandige Statements oder als Rahmenelemente um andere Tattoos. Sie eignen sich auch hervorragend, um bestehende Stucke zu koharenten Kompositionen zu verbinden.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Immer noch unsicher? Hier die ehrliche Wahrheit.
        </h2>
        <p className="mb-4">
          Die meisten Menschen passen nicht sauber in eine Schublade. Die besten Custom-Tattoos mischen Elemente aus mehreren Stilen - ein realistisches Portrait mit ornamentaler Rahmung, ein nordisches Symbol in Dotwork ausgefuhrt, eine Fine-Line-Komposition mit Blackwork-Akzenten.
        </p>
        <p className="mb-12">
          Genau dafur gibt es die Beratung. Du bringst das Gefuhl mit. Wir ubersetzen es in einen Stil, der fur DEINE Haut, DEINE Geschichte und DEINE langfristige Vision funktioniert.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            Buche eine kostenlose Stil-Beratung
          </p>
          <p className="mb-4">
            Nicht sicher, in welche Richtung es gehen soll? Genau dafur sind wir da. Bring deine Ideen, deine Stimmung, deine Referenzen - oder komm mit nichts ausser einem Gefuhl. Wir helfen dir, deine Asthetik zu finden.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Null Druck. Null Kosten. Nur Klarheit uber dein nachstes Stuck.
          </p>
        </div>
      </div>
    )
  },
  "tattoo-studio-landshut-richtig-waehlen": {
    title: "Tattoo Studio Landshut: What to Actually Look for When Choosing Your Studio",
    titleDe: "Tattoo Studio Landshut: Worauf du bei der Wahl deines Studios wirklich achten musst",
    description: "The honest guide to choosing the right tattoo studio in Landshut. 7 non-negotiable criteria, red flags to avoid, and why the cheapest option always costs more.",
    descriptionDe: "Der ehrliche Guide zur Wahl des richtigen Tattoo Studios in Landshut. 7 unverzichtbare Kriterien, Red Flags und warum die billigste Option am Ende immer mehr kostet.",
    image: "/images/Portfolio/studio-bts/asgard-studio-outside-view.jpg",
    date: "June 17, 2026",
    dateDe: "17. Juni 2026",
    readTime: "9 min",
    content: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Landshut has a handful of tattoo studios.<br />
          Only one question matters: which one treats your skin like it deserves?
        </p>

        <p className="mb-8">
          Because here's the uncomfortable truth - the studio you choose determines whether you walk out with a masterpiece or a mistake. And unlike a bad haircut, this one doesn't grow back.
        </p>

        <p className="mb-12">
          Whether you end up at Asgard or somewhere else entirely, these are the non-negotiable criteria every serious client should check before sitting in anyone's chair.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. Hygiene Standards You Can Actually See
        </h2>
        <p className="mb-4">
          This isn't just about a clean floor. Look for:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>Single-use needles, opened in front of you</li>
          <li>Autoclave sterilization for reusable equipment</li>
          <li>Fresh gloves for every client, changed during the session</li>
          <li>Sealed ink caps, not bottles shared between clients</li>
          <li>A studio that smells clinical, not like yesterday's cigarettes</li>
        </ul>
        <p className="mb-8">
          If you can't see their hygiene process, ask. If they get defensive about the question, leave.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          2. A Portfolio That Proves Consistency
        </h2>
        <p className="mb-4">
          Every artist has their one amazing piece they post everywhere. Ignore that. Look for:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>Dozens of pieces in the same style at the same quality level</li>
          <li>Healed tattoo photos (not just fresh, still-bleeding shots)</li>
          <li>Different body placements showing adaptability</li>
          <li>Recent work - not just highlights from three years ago</li>
        </ul>
        <p className="mb-8">
          A single great tattoo might be luck. Fifty great tattoos is mastery.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          3. A Real Consultation Process
        </h2>
        <p className="mb-8">
          If a studio lets you walk in, point at a flash sheet, and sit in the chair within 15 minutes - that's not a studio. That's a tattoo factory. A proper consultation means discussing your vision, understanding your motivation, considering placement carefully, and making sure artist and client are aligned before any ink touches skin.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          4. Artists Who Specialize (Not "Do Everything")
        </h2>
        <p className="mb-8">
          Be cautious of artists who claim to master every single style. The best artists have clear specializations where they genuinely excel. A great realism artist might not be the right choice for your geometric dotwork piece. Studios with multiple artists who each bring different strengths give you the best chance of matching your vision with genuine expertise.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          5. Reviews That Tell Stories, Not Just Stars
        </h2>
        <p className="mb-4">
          Five stars with no text means nothing. Look for reviews that mention:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>The consultation experience</li>
          <li>How the artist handled changes or nervous clients</li>
          <li>Whether the final result matched what was promised</li>
          <li>The healing process and aftercare support</li>
        </ul>
        <p className="mb-8">
          And check multiple platforms - Google, Instagram comments, word of mouth. Fake reviews exist. Consistent stories across platforms don't lie.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          6. A Studio Atmosphere That Matches Your Energy
        </h2>
        <p className="mb-8">
          You're about to spend hours in this space, potentially through significant pain. The environment matters. Do you feel welcome? Respected? Comfortable asking questions? Or does it feel cold, judgmental, like you're interrupting someone's day? Trust your gut here. If the vibe is off before the needle starts, it won't improve during the session.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          7. Transparent Pricing and No Pressure Tactics
        </h2>
        <p className="mb-8">
          Run from any studio that demands a large non-refundable deposit before showing you a design. Be wary of pressure to "book now or lose the spot." A confident studio doesn't need urgency tactics - their work speaks for itself and the waiting list fills naturally. Clear communication about what costs what, with no surprises on the day - that's the minimum standard.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Red Flags: Walk Away If You See These
          </h2>
          <ul className="list-none mb-4 space-y-3">
            <li>No consultation offered before booking</li>
            <li>Designs clearly copied from Pinterest or other artists</li>
            <li>An artist who gets defensive when you ask questions</li>
            <li>No healed work in their portfolio</li>
            <li>A studio that's never available for a walk-in visit before committing</li>
            <li>Pricing that seems too good to be true (it always is)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Our Promise (Whether You Choose Us or Not)
        </h2>
        <p className="mb-4">
          At Asgard, we built our studio around these exact principles. Free consultations. Artists with clear specializations. A portfolio with hundreds of consistent pieces across styles. Reviews that speak for themselves. And an atmosphere that makes you feel like family from the first handshake.
        </p>
        <p className="mb-12">
          But more importantly - if we're not the right fit for what you want, we'll tell you honestly. Because a great tattoo on your skin matters more than a booking on our calendar.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            See For Yourself
          </p>
          <p className="mb-4">
            Curious whether Asgard meets your standards? Book a no-obligation consultation or simply drop by the studio. No pressure, no pitch - just a conversation about what you want and whether we're the right artists to bring it to life.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Walk-ins welcome. Consultations always free.
          </p>
        </div>
      </div>
    ),
    contentDe: () => (
      <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
        <p className="text-xl mb-6">
          Landshut hat eine Handvoll Tattoo-Studios.<br />
          Nur eine Frage zahlt: Welches behandelt deine Haut so, wie sie es verdient?
        </p>

        <p className="mb-8">
          Denn hier ist die unbequeme Wahrheit - das Studio, das du wahlst, entscheidet daruber, ob du mit einem Meisterwerk oder einem Fehler rausgehst. Und anders als ein schlechter Haarschnitt wachst das hier nicht nach.
        </p>

        <p className="mb-12">
          Egal ob du am Ende bei Asgard landest oder ganz woanders - das sind die unverzichtbaren Kriterien, die jeder ernsthafte Kunde prufen sollte, bevor er sich in irgendjemandes Stuhl setzt.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          1. Hygienestandards, die du tatsachlich sehen kannst
        </h2>
        <p className="mb-4">
          Es geht nicht nur um einen sauberen Boden. Achte auf:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>Einweg-Nadeln, vor dir geoffnet</li>
          <li>Autoklav-Sterilisation fur wiederverwendbares Equipment</li>
          <li>Frische Handschuhe fur jeden Kunden, gewechselt wahrend der Session</li>
          <li>Versiegelte Tinten-Kappen, keine Flaschen die zwischen Kunden geteilt werden</li>
          <li>Ein Studio das klinisch riecht, nicht nach den Zigaretten von gestern</li>
        </ul>
        <p className="mb-8">
          Wenn du den Hygieneprozess nicht sehen kannst, frag nach. Wenn sie bei der Frage defensiv werden, geh.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          2. Ein Portfolio, das Konstanz beweist
        </h2>
        <p className="mb-4">
          Jeder Kunstler hat sein eines grossartiges Stuck, das er uberall postet. Ignoriere das. Schau nach:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>Dutzende Stucke im gleichen Stil auf gleichem Qualitatsniveau</li>
          <li>Fotos von abgeheilten Tattoos (nicht nur frische, noch blutende Aufnahmen)</li>
          <li>Verschiedene Korperplatzierungen, die Anpassungsfahigkeit zeigen</li>
          <li>Aktuelle Arbeiten - nicht nur Highlights von vor drei Jahren</li>
        </ul>
        <p className="mb-8">
          Ein einzelnes grossartiges Tattoo kann Gluck sein. Funfzig grossartige Tattoos sind Meisterschaft.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          3. Ein echter Beratungsprozess
        </h2>
        <p className="mb-8">
          Wenn ein Studio dich reinlasst, auf ein Flash-Sheet zeigen lasst und innerhalb von 15 Minuten im Stuhl sitzen lasst - das ist kein Studio. Das ist eine Tattoo-Fabrik. Eine richtige Beratung bedeutet: deine Vision besprechen, deine Motivation verstehen, Platzierung sorgfaltig bedenken und sicherstellen, dass Kunstler und Kunde auf einer Linie sind, bevor Tinte die Haut beruhrt.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          4. Kunstler die sich spezialisieren (nicht "alles konnen")
        </h2>
        <p className="mb-8">
          Sei vorsichtig bei Kunstlern, die behaupten jeden einzelnen Stil zu beherrschen. Die besten Kunstler haben klare Spezialisierungen, in denen sie wirklich glanzen. Ein grossartiger Realism-Kunstler ist vielleicht nicht die richtige Wahl fur dein geometrisches Dotwork-Stuck. Studios mit mehreren Kunstlern, die jeweils unterschiedliche Starken mitbringen, geben dir die beste Chance, deine Vision mit echtem Konnen zu verbinden.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          5. Bewertungen die Geschichten erzahlen, nicht nur Sterne
        </h2>
        <p className="mb-4">
          Funf Sterne ohne Text bedeuten nichts. Schau nach Bewertungen die erwahnen:
        </p>
        <ul className="list-none mb-4 space-y-2">
          <li>Die Beratungserfahrung</li>
          <li>Wie der Kunstler mit Anderungen oder nervosen Kunden umgegangen ist</li>
          <li>Ob das Endergebnis dem entsprach, was versprochen wurde</li>
          <li>Den Heilungsprozess und die Nachsorge-Unterstutzung</li>
        </ul>
        <p className="mb-8">
          Und prufe mehrere Plattformen - Google, Instagram-Kommentare, Mundpropaganda. Fake-Bewertungen gibt es. Konsistente Geschichten uber Plattformen hinweg lugen nicht.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          6. Eine Studio-Atmosphare die zu deiner Energie passt
        </h2>
        <p className="mb-8">
          Du wirst Stunden in diesem Raum verbringen, moglicherweise mit deutlichen Schmerzen. Die Umgebung zahlt. Fuhlst du dich willkommen? Respektiert? Wohl dabei, Fragen zu stellen? Oder fuhlt es sich kalt an, wertend, als wurdest du jemandes Tag unterbrechen? Vertrau deinem Bauchgefuhl. Wenn die Stimmung schon vor der Nadel nicht stimmt, wird sie wahrend der Session nicht besser.
        </p>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          7. Transparente Preise und keine Drucktaktiken
        </h2>
        <p className="mb-8">
          Lauf weg von jedem Studio, das eine hohe nicht-erstattbare Anzahlung verlangt, bevor du ein Design siehst. Sei vorsichtig bei Druck "jetzt buchen oder den Platz verlieren." Ein selbstbewusstes Studio braucht keine Dringlichkeitstaktiken - ihre Arbeit spricht fur sich und die Warteliste fullt sich von selbst. Klare Kommunikation daruber, was was kostet, ohne Uberraschungen am Tag - das ist der Mindeststandard.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Red Flags: Geh, wenn du das siehst
          </h2>
          <ul className="list-none mb-4 space-y-3">
            <li>Keine Beratung angeboten vor der Buchung</li>
            <li>Designs offensichtlich von Pinterest oder anderen Kunstlern kopiert</li>
            <li>Ein Kunstler der defensiv wird, wenn du Fragen stellst</li>
            <li>Keine abgeheilten Arbeiten im Portfolio</li>
            <li>Ein Studio das nie fur einen Besichtigungsbesuch verfugbar ist, bevor du dich verpflichtest</li>
            <li>Preise die zu gut klingen, um wahr zu sein (sind sie immer)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Unser Versprechen (egal ob du uns wahlst oder nicht)
        </h2>
        <p className="mb-4">
          Bei Asgard haben wir unser Studio genau um diese Prinzipien gebaut. Kostenlose Beratungen. Kunstler mit klaren Spezialisierungen. Ein Portfolio mit hunderten konsistenten Stucken uber alle Stile. Bewertungen die fur sich sprechen. Und eine Atmosphare, die dich vom ersten Handschlag an wie Familie fuhlen lasst.
        </p>
        <p className="mb-12">
          Aber noch wichtiger - wenn wir nicht der richtige Fit fur das sind, was du willst, sagen wir dir das ehrlich. Weil ein grossartiges Tattoo auf deiner Haut mehr zahlt als eine Buchung in unserem Kalender.
        </p>

        <div className="bg-viking-navy/20 p-8 rounded-lg border border-metallic-gold/30 my-12">
          <p className="text-xl font-bold text-[#D4AF37] mb-4">
            Uberzeug dich selbst
          </p>
          <p className="mb-4">
            Neugierig, ob Asgard deinen Anspruchen gerecht wird? Buche eine unverbindliche Beratung oder schau einfach im Studio vorbei. Kein Druck, kein Verkaufsgesprach - nur ein Gesprach daruber, was du willst und ob wir die richtigen Kunstler sind, es zum Leben zu erwecken.
          </p>
          <p className="text-lg text-[#D4AF37]">
            Walk-ins willkommen. Beratung immer kostenlos.
          </p>
        </div>
      </div>
    )
  }
};

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useTranslation();
  const post = blogPosts[slug];

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return null;
  }

  const isDe = lang === 'de';
  const postTitle = (isDe && post.titleDe) ? post.titleDe : post.title;
  const postDescription = (isDe && post.descriptionDe) ? post.descriptionDe : post.description;
  const postDate = (isDe && post.dateDe) ? post.dateDe : post.date;
  const postContent = (isDe && post.contentDe) ? post.contentDe : post.content;

  const BlogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postTitle,
    "description": postDescription,
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
    .map(([key, relatedPost]) => ({
      title: (isDe && relatedPost.titleDe) ? relatedPost.titleDe : relatedPost.title,
      slug: key,
      image: relatedPost.image
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
            <span className="text-[#F5F5F5]">{postTitle}</span>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-8">
              <img
                src={post.image}
                alt={postTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">
              {postTitle}
            </h1>

            <div className="flex items-center space-x-6 mb-8 text-[#F5F5F5]">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{postDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime} {isDe ? 'Lesezeit' : 'read'}</span>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-[#F5F5F5] prose-headings:text-[#D4AF37]">
              {postContent()}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-viking-navy/20 p-6 rounded-lg border border-metallic-gold/30">
                <h3 className="text-xl font-bold text-[#D4AF37] mb-6">{isDe ? 'Weitere Artikel' : 'Related Articles'}</h3>
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
                  {isDe ? 'Bereit fur dein nachstes Stuck?' : 'Ready for Your Next Piece?'}
                </h3>
                <p className="text-[#F5F5F5] mb-6">
                  {isDe ? 'Buche deine Beratung und lass uns zusammen etwas Legendares schaffen.' : "Book your consultation today and let's create something legendary together."}
                </p>
                <Link
                  to="/booking#form"
                  className="cta-button bg-firebrick text-white font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center w-full"
                >
                  <span>{isDe ? 'Termin buchen' : 'Book Your Session'}</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 border-t border-metallic-gold/30 transform transition-transform duration-300 lg:hidden">
        <Link
          to="/booking#form"
          className="cta-button bg-firebrick text-white font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center justify-center w-full"
        >
          <span>{isDe ? 'Jetzt Termin buchen' : 'Book Your Session Now'}</span>
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default BlogPost;