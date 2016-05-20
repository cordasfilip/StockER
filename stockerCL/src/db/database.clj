(ns db.database
   (:use [clojure.java.jdbc :exclude [resultset-seq]]))

(def database 
  {:classname   "org.sqlite.JDBC" 
   :subprotocol "sqlite" 
   :subname     "data/StockER.db"}) 
