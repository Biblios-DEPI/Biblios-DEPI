import { useEffect } from 'react'; // 1. Import useEffect
import '../styles/global.css';
import '../styles/about.css'; 

const AboutPage = () => {
  
  // 2. Add the Scroll Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    // 3. Target the specific sections in About Page
    const sections = document.querySelectorAll(".story, .phiso, .exp, .journey");
    
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <header>
        <div className="header">
            <h2>About Us</h2>
        </div>
      </header>

      <main className='aboutmain'>
        {/* STORY SECTION */}
        <div className="story template">
            <h2>Our Story</h2>
            <h4>A journey inspired by the pursuit of knowledge and the beauty of words.</h4>
            <hr />
            <div className="equal-parts">
                <div className="text">
                    <p>
                        We noticed that people today are not reading as much as they once did. In a world full of
                        distractions, the timeless joy of books whether in print, digital, or audio form—has too
                        often been left behind. That simple realization inspired the creation of Biblios: a platform
                        built to bring reading back into everyday life in ways that fit the modern world.
                    </p>
                    <p>
                        Our vision is to make stories and knowledge more accessible than ever. Whether it’s the feel
                        of a physical book, the convenience of an ebook, or the immersive experience of an
                        audiobook, we believe that everyone deserves the chance to reconnect with the power of
                        words.
                    </p>
                    <p>
                        Biblios is more than just a bookstore—it’s a movement to revive reading culture. We aim to
                        inspire curiosity, spark imagination, and build a community where stories continue to shape
                        minds and enrich lives, just as they always have.
                    </p>
                </div>
                <div className="image">
                    <img src="/images/socrates.jpg" alt="socrat" />
                </div>
            </div>
        </div>

        {/* PHILOSOPHY SECTION */}
        <div className="phiso template">
            <h2>Our Philosophy</h2>
            <h4>Guiding principles that illuminate our path and enrich your reading journey.</h4>
            <hr />
            <div className="phcards">
                <div className="phcard">
                    <h5><i className="fa-solid fa-book-open"></i></h5>
                    <h6>Curated Knowledge</h6>
                    <p>Every book is a carefully chosen gem, reflecting profound thought and enduring relevance.</p>
                </div>
                <div className="phcard">
                    <h5><i className="fa-regular fa-map"></i></h5>
                    <h6>Unbounded Discovery</h6>
                    <p>Explore new horizons and perspectives through a diverse and expansive collection.</p>
                </div>
                <div className="phcard">
                    <h5><i className="fa-regular fa-user"></i></h5>
                    <h6>Vibrant Community</h6>
                    <p>Join fellow enthusiasts in discussions that deepen understanding and connection.</p>
                </div>
            </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="exp template">
            <h2>The Biblios Experience</h2>
            <h4>Blending the legacy of literature with the comfort of modern accessibility.</h4>
            <hr />
            <div className="equal-parts">
                <div className="text">
                    <h5>Seamless Navigation, Elegant Design</h5>
                    <p>
                        Biblios is built to honor the timeless legacy of knowledge while embracing modern simplicity.
                        With an intuitive layout, refined search tools, and intelligent recommendations, your
                        journey through literature becomes as effortless as it is inspiring.
                    </p>
                    <h5>Access Anywhere, Anytime</h5>
                    <p>
                        From timeless classics to immersive audiobooks, Biblios brings the wisdom of the ages to your
                        fingertips on any device. Whether you’re reading, listening, or exploring, your personal
                        library is always ready to travel with you carrying the spirit of knowledge wherever you go.
                    </p>
                </div>
                <div className="image">
                    <img src="/images/gettyimages-1454213980-612x612.jpg" alt="" />
                </div>
            </div>
        </div>

        {/* JOURNEY SECTION */}
        <div className="journey template">
            <h2>Begin Your Journey</h2>
            <h4>Ready to explore the vast world of Biblios? Your next adventure awaits.</h4>
            <hr />
            <a href="/books" className="btn jr-button">Explore Our Books</a>
        </div>
      </main>
    </>
  );
};

export default AboutPage;