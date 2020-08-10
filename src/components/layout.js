import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { rhythm } from "../utils/typography"
import "./globalStyles.css"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <MDXProvider
        components={{
          pre: props => <pre style={{ fontSize: "0.9rem" }} {...props} />,
        }}
      >
        {children}
      </MDXProvider>
      <footer>
        <a
          href="https://mobile.twitter.com/tingzhouu"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{" "}
        &bull;{" "}
        <a
          href="https://github.com/tingzhouu"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </footer>
    </div>
  )
}

export default Layout
