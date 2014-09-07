(ns controller.stock-data
  (:require [db.stock-data-db :as db] 
            [so.calculate-nmf :as so] ))

(defn get-stock-data-by-id
  [params]
  (db/get-single-historical-stock-information 
    (:stock-name params) 
    (:start-date params) 
    (:end-date params) 
    (:interval params)))

(defn get-short-data-by-ids
  [params]
  (db/get-short-stock-data 
    (:ids params)))

(defn get-long-stock-data-by-id
  [params]
  (db/get-long-stock-data 
    (:id params)))
