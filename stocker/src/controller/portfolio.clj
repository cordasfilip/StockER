(ns controller.portfolio
  (:require [db.portfolio-db :as db]
            [model.transport-map :as models]))

(defn get-all [params] 
    (db/get-portfolios))

(defn get-by-id [params]   
  (db/get-portfolio-by-id  
      (:id params)))

(defn post [params] 
  (let [portfolio 
        {:Name (get (:portfolio params) "Name")
         :Icon (get (:portfolio params) "Icon")}] 
    (if (models/validate-portfolio portfolio)       
            (db/add-portfolio portfolio)
      (throw (Exception. "BadRequest")))))
  
 (defn delete [params] 
   (db/remove-portfolio-by-id (:id params)))
    ; (throw (Exception. "BadRequest"))))
    
(defn get-factor-names
  [params]
  (db/get-all-features (:portfolio-id params)))

(defn get-factor-data 
  [params]
  (db/get-feature-data 
    (:portfolio-id params) 
    (:feature-name params)))

(defn get-all-factor-data 
  [params]
  (db/get-all-feature-data 
    (:portfolio-id params)))

(defn add-stock-to-portfolio
  [params]
  (db/add-stock-to-portfolio 
    (get (:portfolio-stock params) "PortfolioId") 
    (get (:portfolio-stock params) "StockId")))
   
(defn remove-stock-from-portfolio
  [params]
  (db/remove-stock-from-portfolio 
    (:portfolio-id  params) 
    (:stock-id params))) 

