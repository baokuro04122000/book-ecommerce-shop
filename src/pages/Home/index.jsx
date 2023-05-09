import BestSelling from './BestSelling'
import Feature from './Feature'
const Home = () => {
  return (
    <main id="tg-main" className="tg-main tg-haslayout">
      <BestSelling/>

      {/* feature */}
      <Feature/>
    </main>
  )
}

export default Home;