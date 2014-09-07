(ns so.calculate-nmf
  (:use [incanter.core :only [matrix]])
  (:require  [utils.nmf :as utils]))

(defn- calculate-nmf-format [stocks-data]
  (let [ 
        fr (fn [item] 
              (:name item))
        fc (fn [item] 
             (let [data (:data item)]  
              (map #(:Date %) data)))
        fd (fn [item] 
             (let [data (:data item)]             
               (map #(:Volume %) data)))]
    {:columns (fc (first stocks-data)) 
    :rows (map fr stocks-data)
    :data (map fd stocks-data)}))

(defn  calculate-nmf [stocks-data nf iter]
  (let [data (calculate-nmf-format stocks-data)]
  {:rows (:rows data)  
   :columns (:columns data) 
   :factors (utils/factorize (matrix (:data data)) nf iter)}))

