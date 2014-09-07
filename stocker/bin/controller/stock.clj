(ns controller.stock
  (:require [db.stock-db :as db]))

(defn get-by-id [params] 
  (db/get-stock-by-id  
    (:id params)))

(defn get-stock-starts-top  [params]    
  (db/get-stock-starts-top
     (:value params) (:take params)))

(defn stock?  [params] 
    (db/stock? (:name params)))
