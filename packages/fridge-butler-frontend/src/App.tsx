import './App.css'
import HealthCheck from './features/HealthCheckComponent'
import ImageUpload from './features/ImageUpload'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Fridge Butler</h1>
      <h2>Your very happy fridge helper</h2>
      <HealthCheck></HealthCheck>
      <ImageUpload></ImageUpload>
    </>
  )
}

export default App
