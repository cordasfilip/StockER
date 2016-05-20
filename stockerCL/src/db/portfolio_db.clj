(ns db.portfolio-db
  (:use 
    [clojure.java.jdbc :exclude [resultset-seq]]
    [db.database]
    [model.transport-map :as models])) 

 
(defn get-portfolios [] 
  (with-connection database 
    (with-query-results rs ["select * from Portfolio"] (doall (map models/portfolio rs))))) 
  
(defn get-portfolio-by-id [id]
     (with-connection database 
       (with-query-results rs ["select * from Portfolio where Id = ?" id] 
         (let [portfolio  rs] 
           (assoc (models/portfolio (first portfolio))  
                  :Stocks (with-query-results rs 
                            [(str "select s.* from PortfolioStock ps inner join Stock s on(s.Id = ps.StockId)  where ps.PortfolioId = " id)]  
                            (doall (map models/stock rs))))))))

(defn get-portfolio-stock-names [id]
  (with-connection database
    (with-query-results rs 
                        ["select StockId from PortfolioStock where PortfolioId = ?" id]  
                            (doall (map #(:stockid %) rs)))))

(defn add-portfolio [portfolio]
  (with-connection database 
    (second (first (insert-record :Portfolio portfolio)))))

(defn remove-portfolio-by-id [id]
  (with-connection database 
    ;(delete-rows :Portfolio ["Id=?" id])
    (do-commands 
          (str "drop table if exists [" (str "PortfolioFeatures_" id) "]")              
          (str "DELETE FROM Portfolio WHERE Id='" id "'")
           (str "DELETE FROM PortfolioStock WHERE PortfolioId='" id "'")
          )
    )) 
  
(defn add-stock-to-portfolio [portfilioId,stockId]
  (with-connection database 
    (insert-record :PortfolioStock {:PortfolioId portfilioId :StockId  stockId}))) 

(defn remove-stock-from-portfolio [portfilioId,stockId]
  (with-connection database 
    (delete-rows :PortfolioStock ["PortfolioId=? and StockId = ?" portfilioId stockId])))
       
 
(defn get-all-features
  [portfolio-id]
  (with-connection database 
    (with-query-results rs [(str "select distinct Feature from [PortfolioFeatures_" portfolio-id "]")] 
      (doall (map #(:feature %) rs))))) 

(defn get-feature-data
  [id feature-name]
  (with-connection database 
    (with-query-results rs [(str "select * from [PortfolioFeatures_" id "] where Feature=?") feature-name] 
      (doall (map (fn [i]
                   {:Feature (:feature i) :Type (:type i) :Name (:name i) :Value (:value i)}) 
                 rs))))) 
  
(defn get-all-feature-data
  [id]
  (with-connection database 
    (with-query-results rs [(str "select * from [PortfolioFeatures_" id "]")] 
      (doall (map (fn [i]
                   {:Feature (:feature i) :Type (:type i) :Name (:name i) :Value (:value i)}) 
                 rs))))) 

(defn- create-rows [table-name rows w columns h]
 (let [
       rows-data (for [i (range (count rows)) j (range (count (first w)))]
                 (str "select '"  (str "F" (+ j 1) "'")
                  ",'R'"
                  (str ",'"(nth rows i) "'")
                  (str "," (nth (nth w i) j))))
       column-data (for [i (range (count columns)) j (range (count h))]
                   (str "select '" (str "F" (+ j 1) "'")
                     ",'C'"
                    (str ",'" (nth columns i) "'")
                   (str "," (nth (nth h j) i))))]
  (clojure.set/union rows-data column-data))) 

(defn- create-o-rows [table-name rows w columns h]
 (let [
       rows-data (for [i (range (count rows)) j (range (count (first w)))]
                 {:Feature (str "F" (+ j 1) )
                  :Type "R"
                  :Name (nth rows i)
                  :Value (nth (nth w i) j)
                  })
       column-data (for [i (range (count columns)) j (range (count h))]
                   {:Feature (str "F" (+ j 1) 
                     :Type "C"
                     :Name (nth columns i)
                     :Value  (nth (nth h j) i))})]
  (clojure.set/union rows-data column-data)))


(defn save-features 
  [portfolio-id rows columns w h] 
  (let [table-name (str "PortfolioFeatures_" portfolio-id)
        rows (create-rows table-name rows w columns h)
       table
      
         (with-connection database
         (do
          (do-commands 
             (str "drop table if exists [" table-name "]")              
             (str "create table if not exists [" table-name "] (Feature text,Type text,Name text,Value real)"))
             (reduce (fn [a i] (do-commands (str "insert into [" table-name "] "  i))) rows )
           )
         ;(with-connection database 
          ;(insert-rows table-name rows))
         )] 
  table))

