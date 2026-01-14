const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-black dark:text-white py-10 p-3">
      <div className="mx-auto max-w-4xl px-4 py-16 shadow-lg dark:shadow-white shadow-black">
        {/* PAGE TITLE */}
        <h1 className="mb-10 text-start text-3xl font-semibold tracking-wide">
          About Us
        </h1>

        {/* WHO WE ARE */}
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-extrabold">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            Who doesn’t like to smell awesome and get compliments on their
            perfume? If you’re like us, obsessed with perfumes and always
            on-the-go, then we have something for you. BELLAVITA is a
            fragrance-forward brand that creates world-class luxury perfumes,
            bath and body products and skincare that feel good and smell even
            better. Our perfumes are perfect to make you the centre of
            attention, be it day or night. Our best selling perfumes are infused
            in our bath and body ranges so that you smell awesome straight from
            the shower. Made with imported perfume oils from France, Spain and
            Italy, BELLAVITA is single-mindedly and completely obsessed with
            making you smell fresh as you power through the day.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-xl font-extrabold">
            What We Want To Achieve
          </h2>
          <p className="text-lg leading-relaxed">
            We want to make luxury perfumes and aromatic bath and body ranges
            accessible to all at value-driven prices. No one should have to
            compromise on their right to smell good with BELLAVITA around. Light
            on the pocket and heavy on the fragrance, we’ve got your back.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-extrabold">Our Promise To You</h2>

          <div className="my-8">
            <h2 className="mb-4 text-xl font-extrabold">IFRA-certified</h2>
            <p className="text-lg leading-relaxed">
              We make perfumes that are safe to use on your skin so that
              allergies and reactions are not words in your vocabulary.
            </p>
          </div>
          {/* 2 */}
          <div className="my-8">
            <h2 className="mb-4 text-xl font-extrabold">Imported Oils</h2>
            <p className="text-lg leading-relaxed">
              We went out around the world for you, bringing you iconic and
              luxurious perfumes from France, Spain and Italy.
            </p>
          </div>
          {/* 3 */}
          <div className="my-8">
            <h2 className="mb-4 text-xl font-extrabold">Long-lasting</h2>
            <p className="text-lg leading-relaxed">
              All good things come to an end but we try our best to stay put for
              6-8 hours so that you can smell fresh all day long.
            </p>
          </div>
          {/* 4 */}
          <div>
            <h2 className="mb-4 text-xl font-extrabold">Cruelty-free</h2>
            <p className="text-lg leading-relaxed">
              Neither were any furry babies harmed nor will they ever be at
              BELLAVITA. We love animals and do not test our products on them
              before dispatching them to you, with love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
