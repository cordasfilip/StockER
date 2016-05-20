(ns utils.csv
  (:use  [model.transport-map :as models]))

(defn convert-csv [data props]   
 (let [lines (clojure.string/split-lines data)
       stuff (map (fn [row] 
                    (let [item-data (clojure.string/split row #",")] 
                     (models/stock-data props item-data)))                  
                (remove #(= % (first lines)) lines))]   stuff))

(defn first-convert-csv [data props]   
 (let [lines (clojure.string/split-lines data)
      stuff (map (fn [row] 
                    (let [item-data (clojure.string/split row #",")] 
                    (models/stock-data props item-data))) lines)]                  
                 stuff))