;; NOTE used for mapping the data for transport to client app to format string and names 
(ns model.transport-map)

(defn stock [values] 
  { :Id (:id values) 
    :StockExchange (:stockexchange values)
    :Name (:name values)
    :IPOyear (:ipoyear values)
    :Sector (:sector values)
    :Industry (:industry values)
    :SummaryQuote (:summaryquote values)}) 

(defn portfolio [values] 
  { :Id  (:id values) 
    :Name (:name values)
    :Icon (:icon values)})

(defn validate-portfolio [portfolio] 
   (:Name portfolio))

(defn stock-data [props data]
  (first (reduce (fn [[aggr i],[prop parser]]
                   [(assoc aggr prop
                           (if (nil? parser) (get data i) (parser (get  data i)))) 
                    (inc i)] ) [{} 0] props)))