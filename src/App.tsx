import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import designerImg from './assets/designers/designer-banner.png'
import CheckoutBar from './components/CheckoutBar'
import ProductPage from './components/ProductPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <ProductPage
        heroImageUrl={heroImg}
        heroCredit="source: Amina Moroccan Abaya"
        title="Black Kaftan with Embellishment"
        rating={5}
        reviewCount={7}
        size="M"
        fabric="SILK"
        fit="TRUE TO SIZE"
        sizeGuide={[{ size: 'M', bust: '78 cm', length: '89 cm' }]}
        designerName="Amina"
        designerImageUrl={designerImg}
        ratingBreakdown={[
          { label: 'Small', percent: 2 },
          { label: 'True to Size', percent: 85 },
          { label: 'Large', percent: 13 },
        ]}
        reviews={[
          {
            reviewerStats: '165 CM   65 KG   88 / 78 / 110 CM',
            rating: 5,
            likeCount: 5,
            reviewText:
              "This black kaftan is a wardrobe staple for me now! The quality is outstanding, and it's incredibly versatile. I've worn it to brunch with friends, to the beach as a cover-up, and even to a formal dinner with the right accessories. It's so comfortable and easy to style. I can't recommend it enough! ps. btw im using my boyfriend account xixi!",
            imageUrl: heroImg,
            date: 'Nov 29, 2023',
          },
        ]}
        onViewSizeGuide={() => alert('View size guide')}
        onViewCollection={() => alert('View the collection')}
        onViewMoreReviews={() => alert('View more reviews')}
      />

      <CheckoutBar price="Rp 300.000" duration="4 Day" onAdd={() => alert('Added to cart')} />

      <div className="ticks"></div>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
