import BestSelling from './BestSelling'
import Feature from './Feature'
import NewRelease from './NewRelease';
const Home = () => {
  return (
    <main id="tg-main" className="tg-main tg-haslayout">
      <BestSelling/>
      {/* feature */}
      <Feature/>
      <NewRelease />
    </main>
  )
}

export default Home;