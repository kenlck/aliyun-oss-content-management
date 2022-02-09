import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html className="overflow-hidden">
        <title>Dashboard</title>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body className="font-poppins">
          <Main />
          <div id="modal-root" />
          <div id="slideover-root" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
