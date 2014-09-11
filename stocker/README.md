# stocker

A Clojure web service designed to manipulate stock data.

## Usage

Star up 

1. Open stocker.app-start and run in REPL

2. Open a web browser (must be html5 and css3 compatable)

3. Use the app

The app
Application is a Spa that uses Clojure REST web services


Client MVVM

L1 - View - HTML,chart.js,kendo-core.js,velocity.js ...

	|

L2 View-Models -knockout.js,linq.js

	|

L3 Models/DataAccess - Jquery.js

|	|	|

    REST/HTTP

	|

Server MVC

L1  Ring/Http Request binding

	|

L2  Controllers- BL

	|

L3  db/Data access 

    |		|

Data Sqlite Yahoo Finance Api
'
## Features

Global Market Index info

Portfolio creation

Portfolio managment 

Portfolio analysis (finding important dates for stocks)

Stock info...

## License

Copyright © 2014 FIXME

Distributed under the Eclipse Public License either version 1.0.


## Links

http://www.infoq.com/presentations/DDD-Clojure

http://www.slideshare.net/mikeranderson/2013-1114-enter-thematrix

http://gnuvince.wordpress.com/2009/05/11/clojure-performance-tips/

http://www.infoq.com/presentations/Crunching-Numbers-Clojure