import React from "react"


const Landing = () => {
  fetch('/api/').then(resp => resp.text().then(x => x).catch(console.error)).catch(err => console.error)
  return (
    <div>
      Welcome!
    </div>
  )
}

export default Landing