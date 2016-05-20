(ns db.stock-data-db
  (:use [utils.csv :as csv]
        [db.database]
        [clojure.java.jdbc :exclude [resultset-seq]])
  (:require [http.async.client :as http]
            [model.transport-map :as model :only [stock-data-model]]))
(defn- read-date [d] d)
(defn- read-clean [d] (clojure.string/replace d #"\"" ""))
(def stock-data-model
  [[:Date read-date] [:Open read-string] [:High read-string] [:Low read-string] [:Close read-string] [:Volume read-string] [:AdjClose read-string]])



(def fields {
       ;:Ask                                 "a" 
       :DividendYield                       "y"
       ;:Bid                                 "b"
       :DividendPerShare                    "d"
       :AskRealtime                         "b2"
       :DividendPayDate                     "r1" 
       :BidRealtime                         "b3" 
       :ExDividend                          "q"
       ;//Date 
       :PreviousClose                       "p"  
       :OpenDate                            "o"
       :Change                              "c1" 
       :LastTradeDate                       "d1" 
       :ChangeAndPercentChange              "c"
       ;:TradeDate                           "d2" 
       :ChangeRealtime                      "c6" 
       :LastTradeTime                       "t1"
       :ChangePercentRealtime               "k2"  
       :ChangeInPercent                     "p2"  
       ;//Averages 
      ; :AfterHoursChangeRealtime            "c8"
       :ChangeFrom200DayMovingAverage       "m5"
    ;   :Commission                          "c3"
       :PercentChangeFrom200DayMovingAverage"m6"
       :DaysLow                             "g"
       :ChangeFrom50DayMovingAverage        "m7"
       :DaysHigh                            "h"
       :PercentChangeFrom50DayMovingAverage "m8"
       :LastTradeRealtimeWithTime           "k1"
       :DayMovingAverage50                  "m3"
       :LastTradeWithTime                   "l"
       :DayMovingAverage200                 "m4"
       :LastTradePriceOnly                  "l1"
       :TargetPrice1yr                      "t8"
       ;//Misc                              
       :DaysValueChange                     "w1"
      ; :HoldingsGainPercent                 "g1"
       :DaysValueChangeRealtime             "w4"
     ;  :AnnualizedGain                      "g3"
     ;  :PricePaid                           "p1"
     ;  :HoldingsGain                        "g4"
       :DaysRange                           "m"
     ;  :HoldingsGainPercentRealtime         "g5"
       :DaysRangeRealtime                   "m2"
     ;  :HoldingsGainRealtime                "g6"
       ;//52  WeekPricingSymbolInfo 
       :WeekHigh52                          "k" 
       :MoreInfo                            "v" 
       :WeekLow52                           "j" 
       :MarketCapitalization                "j1" 
       :ChangeFrom52WeekLow                 "j5" 
       :MarketCapRealtime                   "j3" 
       :ChangeFrom52WeekHigh                "k4" 
       :FloatShares                         "f6" 
       :PercentChangeFrom52WeekLow          "j6" 
   ;    :Name                                "n" 
       :PercentChangeFrom52WeekHigh         "k5" 
   ;    :Notes                               "n4"
  ;     :WeekRange52                         "w"
  ;     :Symbol                              "s"
 ;      :SharesOwned                         "s1" 
  ;     :StockExchange                       "x" 
   ;    :SharesOutstanding                   "j2" 
       ;//Volume 
  ;     :Volume                              "v" 
   ;    :AskSize                             "a5" 
  ;     :BidSizeMisc                         "b6"
  ;     :LastTradeSize                       "k3"
  ;     :TickerTrend                         "t7" 
  ;     :AverageDailyVolume                  "a2" 
  ;     :TradeLinks                          "t6" 
  ;     :OrderBookRealtime                   "i5" 
       ;//Ratios 
  ;     :HighLimit                           "l2"
  ;     :EarningsPerShare                    "e"
  ;     :LowLimit                            "l3"
 ;      :EPSEstimateCurrentYear              "e7"
  ;     :HoldingsValue                       "v1"
  ;     :EPSEstimateNextYear                 "e8"
   ;    :HoldingsValueRealtime               "v7"
  ;     :EPSEstimateNextQuarter              "e9"
  ;     :Revenue                             "s6"
  ;     :BookValue                           "b4"
  ;     :EBITDA                              "j4"
  ;     :PriceSales                          "p5"
  ;     :PriceBook                           "p6"
  ;     :PERatio                             "r"
  ;     :PERatioRealtime                     "r2"
   ;    :PEGRatio                            "r5"
   ;    :PriceEPSEstimateCurrentYear         "r6"
    ;   :PriceEPSEstimateNextYear            "r7"
    ;   :ShortRatio                          "s7"
    })

(defn- uri-safe [s] (clojure.string/replace s "^" "%5E")) 

(defn-  build-all-stock-data-url
   [stock-name] 
   (str "http://download.finance.yahoo.com/d/quotes.csv?" 
        "s=" (uri-safe stock-name)
         "&f=" (reduce (fn [a i] (str a (second i))) ""  fields)) )

(defn-  build-short-stock-data-url
   [stocks-names]   
     (str "http://download.finance.yahoo.com/d/quotes.csv?" 
        "s="  (if (= (type stocks-names) java.lang.String) stocks-names (clojure.string/join "+" (map (fn [s] (uri-safe s)) stocks-names)) )
        "&f=snopc1p2x" ))

(defn- build-ichart-url
   [stock-name start-date end-date interval] 
   (str "http://ichart.finance.yahoo.com/table.csv?" 
        "s=" (uri-safe stock-name)
        (if (nil? start-date) "" 
          (str "&c=" (:year start-date) 
               "&a=" (:month start-date)
               "&b=" (:day start-date)))
        (if (nil? end-date) "" 
          (str "&d=" (:month end-date) 
               "&e=" (:day end-date)
               "&f=" (:year end-date)))
         (if (nil? interval) "" 
          (str "&g=" interval))))

(defn- get-historical-stock-information-string  
  [stock-name start-date end-date interval] 
  (with-open [client (http/create-client)]
  (let [response (http/GET client (build-ichart-url stock-name start-date end-date interval))]
    (-> response 
      http/await
      http/string ))))

(defn- get-long-stock-data-string 
  [stock-name] 
  (with-open [client (http/create-client)]
  (let [response (http/GET client (build-all-stock-data-url stock-name))]
    (-> response 
      http/await
      http/string ))))

(defn- get-short-stock-data-string 
  [stock-name] 
  (with-open [client (http/create-client)]
  (let [response (http/GET client (build-short-stock-data-url stock-name))]
    (-> response 
      http/await
      http/string ))))



(defn get-single-historical-stock-information  
  "Gets the historical data information for array of stock names"
  [stock-name start-date end-date interval] 
   (csv/convert-csv 
              (get-historical-stock-information-string stock-name start-date end-date interval)
              stock-data-model))





(defn get-long-stock-data   
  [stock-name] 
  (let [data (get-long-stock-data-string stock-name)]
   (csv/first-convert-csv
           data
             (map (fn [i] [(first i) nil] ) fields))))


(defn get-short-stock-data   
  [stocks-names] 
  (let [data (get-short-stock-data-string stocks-names)]
    (csv/first-convert-csv
           data
             [[:Id read-clean], [:Name read-clean], [:Open nil], [:PreviousClose nil], [:Change nil], [:ChangeInPercent read-clean], [:StockExchange read-clean]])))


(defn get-multiple-historical-stock-information  
  "Gets the historical data information for array of stock names"
  [stocks-names start-date end-date interval] 
 (map 
 (fn [name] 
   {:name name :data (csv/convert-csv 
                      (get-historical-stock-information-string name start-date end-date interval)
                      stock-data-model)}) 
 stocks-names))

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
 
(defn get-all-features
  [portfolio-id]
  (with-connection database 
    (with-query-results rs [(str "select distinct Feature from [PortfolioFeatures_" portfolio-id "]")] 
      (doall (map #(:feature %) rs))))) 
  
(defn save-features 
  [portfolio-id rows columns w h] 
  (let [table-name (str "PortfolioFeatures_" portfolio-id)
        rows (create-rows table-name rows w columns h)
        table
        (with-connection database
         (do-commands 
          (str "drop table if exists [" table-name "]")              
             (str "create table if not exists [" table-name "] (Feature text,Type text,Name text,Value real)")
           (str "INSERT INTO [" table-name "] " (clojure.string/join " union "  rows))
          ))
           ] 
    table))



