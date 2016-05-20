(ns db.stock-db
  (:use 
    [clojure.java.jdbc :exclude [resultset-seq]]
    [db.database]
    [model.transport-map :as models]))

(defn get-stock-by-id [id] 
  (with-connection database 
       (with-query-results rs ["select * from Stock where Id = ?" id]   
         (models/stock (first (doall rs))))))

(defn get-stock-starts-top [value take] 
     (with-connection database 
       (with-query-results rs 
         ["select * from Stock where (Id like ? or Name like ?) limit ?" 
          (clojure.string/join [value "%"]) (clojure.string/join [value "%"]) take] 
            (doall (map  models/stock rs)))))

(defn stock? [id] 
  (with-connection database 
    (with-query-results rs ["select * from Stock where Id = ?" id] 
       (> (count rs) 0))))
