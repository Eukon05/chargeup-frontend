import CurrentMix from './component/CurrentMixComponent.tsx'
import ChargeWindow from './component/ChargeWindowComponent.tsx'
import Header from './component/HeaderComponent.tsx'
import Error from './component/ErrorComponent.tsx'
import {useState} from 'react'
import './style/App.css'

function App() {
  const [hasError, setHasError] = useState<boolean>(false);

  const gui = (
    <>
      <ChargeWindow setHasError={setHasError} />
      <CurrentMix setHasError={setHasError} />
    </>
  )

  return (
    
    <div className='app'>
      <Header/>
      {hasError ? <Error/> : gui}
    </div>
  )
}

export default App
