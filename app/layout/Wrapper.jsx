import dynamic from 'next/dynamic'

let Header=dynamic(()=>import('./Header'))
let Footer=dynamic(()=>import('./Footer'))
function Wrapper({children}) {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Wrapper