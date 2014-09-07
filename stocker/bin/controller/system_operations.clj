(ns controller.system-operations
  (:require [so.calculate-nmf :as so]
            [db.portfolio-db :as portfolioDB]
            [db.stock-data-db :as stockDB]
            [clojure.tools.trace]))

(defn  calculate-nmf
  [params]
  ;portfolio-id stocks-names start-date end-date interval  nf iter]
 (let [
      stocks-names (portfolioDB/get-portfolio-stock-names (:portfolio-id params))
      data (stockDB/get-multiple-historical-stock-information stocks-names  
                                                              (:start-date params) 
                                                              (:end-date params) 
                                                              (:interval params))
       result (so/calculate-nmf data (:nf params) (:iter params))
       table  (portfolioDB/save-features  
               (:portfolio-id params)
               (:rows result)
              (:columns result)
              (:w (:factors result))
               (:h (:factors result)))
       ]
   table))



