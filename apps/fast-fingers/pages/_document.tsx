import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles'
import { resetIds } from '@uifabric/utilities'

const stylesheet = Stylesheet.getInstance()

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server'
})

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    stylesheet.reset()
    resetIds()
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel="stylesheet"
            href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/11.0.0/css/fabric.min.css"
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
