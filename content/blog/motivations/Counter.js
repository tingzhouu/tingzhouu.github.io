import React, { useState } from "react"

export default function Counter() {
  const [counter, setCounter] = useState(0)

  function increment() {
    setCounter(counter + 1)
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2", padding: "3%" }}>
      <p style={{ fontSize: 25 }}>The count is {counter}.</p>
      <button onClick={increment}>Increase Count</button>
    </div>
  )
}
