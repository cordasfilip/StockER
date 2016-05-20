(defproject stocker "0.1.0-SNAPSHOT"
  :description "Stock portfolio dashboard application"
  :dependencies [;core
                 [org.clojure/clojure "1.5.1"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [clj-time "0.8.0"]
                 ;statistics
                 ;;[net.mikera/core.matrix "0.29.1"]
                 [incanter "1.3.0"]
                 ;sqlite
                 [org.clojure/java.jdbc "0.0.6"] 
                 [org.xerial/sqlite-jdbc "3.7.2"] 
                 ;web
                 [compojure "1.1.8"] 
                 [ring "1.3.0"]                  
                 [org.clojure/data.json "0.2.5"]
                 ;;http client
                 ;; [clj-http "0.9.0"]                
                 [http.async.client "0.5.2"]
                 ;;test
                 [org.clojure/tools.trace "0.7.5"]])
