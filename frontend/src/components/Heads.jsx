import React from 'react'
import { Helmet } from 'react-helmet'

class Heads extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
              <title>Homepage</title>
              <meta charSet='utf-8'></meta>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet"></link>
              <script type='text/javascript' src='/js/bootstrap.bundle.min.js'></script>
              <script type='text/javascript' src='/js/site.js'></script>
              <script type='text/javascript' src='/js/jquery.min.js'></script>
            </Helmet>
        </div>
    )
  }
}

export default Heads