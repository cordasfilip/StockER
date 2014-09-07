(ns utils.formatters
  (:require  
    [clojure.data.json :as json]
    [clj-time.format :as f]
    [clj-time.core :as t])) 

(def custom-formatter (f/formatter "yyyy-MM-dd"))

 ;; builds http responce
(defn  build-responce  [func,view,params] 
  (try 
    (view (func params) 200) 
  (catch Exception e
    (if (= (.getMessage e) "NotFound") (view "Not Found" 404) 
     (if (= (.getMessage e) "BadRequest") (view "Bad Request" 400)
      ;(view "Server error" 500)
      )))))

;;json responce
(defn json-responce [data status]
  {:status status
   :headers {"Content-Type" "application/json"}
   :body    (json/write-str data)})

(defn json-added [data status]
  {:status (if (= status 200) 201 status)
   :headers {"Content-Type" "application/json"}
   :body    (json/write-str data)})

(defn parse-json-request [json-data]
  (json/read-str json-data))

(defn- zero-format [number-string]
  (if (= (count number-string) 1)
    (str "0" number-string)
    number-string))

(defn format-yahoo-time 
  [date-string]
  (let [date (f/parse date-string)]
    (if-not (nil? date)
      {
       :year (t/year date)
       :month (zero-format (str (- (t/month date) 1)))
       :day (zero-format (str (t/day date)))
       }
      nil)))

