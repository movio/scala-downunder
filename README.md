# Scala Downunder

Website at [http://scaladownunder.org](http://scaladownunder.org)

## Requirements

* NPM
* Bower
* Gulp
* Ruby
* Jekyll

## Build

Init the project by running:

~~~ shell
npm install
bower install
~~~

In order to serve the project, you will need to open 2 terminals at the root of the source code, run the following commands, and finally enjoy the result at [http://localhost:9000](http://localhost:9000) (live-reloading included).

~~~ shell
gulp
~~~

~~~ shell
jekyll build --watch
~~~

## Deploy

Running the following command will fully generate the website inside the `_site` subdirectory and deploy it online in the `gh-pages` branch. (you can see the full deploy script [here](https://github.com/movio/scala-downunder/blob/master/_gulp/deploy.js))

~~~ shell
gulp deploy
~~~
