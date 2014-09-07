(ns stocker.app-start
  (:use 
    [compojure.core]   
    [ring.middleware.resource]
    [ring.adapter.jetty]
    [utils.formatters]
    [ring.middleware.params :only [wrap-params]])
  (:require  
    ;;core
 	  [compojure.route :as route] 
 	  [compojure.handler :as handler]
    ;;controllers
    [controller.stock :as stock]
    [controller.portfolio :as portfolio]
    [controller.stock-data :as stock-data]
    [controller.system-operations :as so])) 

;;definition for resources routh GET /page1.html
(defroutes resources-routes
    (route/resources "/"))


(defroutes api-routes   
  ;;test uri /api
  (GET "/api" [] "<h1>SUCCESS</h1>")
  
  ;;stocks
   ;;GET /api/Stock/StockThatStartsWith?value=MSF&take=5
  (GET "/api/Stock/StockThatStartsWith" {params :params} 
       (build-responce stock/get-stock-starts-top  json-responce {:value (get params "value") :take (get params "take")}))
  ;;GET /api/Stock/IsStock?name=MSFT
  (GET "/api/Stock/IsStock" {params :params} 
       (build-responce stock/stock? json-responce  {:name (get params "name")}))
  ;;GET /api/Stock/MSFT
  (GET "/api/Stock/:id" [id] 
       (build-responce stock/get-by-id json-responce {:id id}))
  
  ;;portfolio
  ;;/api/Portfolio/GetFactorNames?portfolioId=1
  (GET "/api/Portfolio/GetFactorNames" {params :params}  
        (build-responce portfolio/get-factor-names json-responce  {:portfolio-id (get params "portfolioId")})) 
 ;;/api/Portfolio/GetFactorData?portfolioId=1&featureName=F1
  (GET "/api/Portfolio/GetFactorData" {params :params}  
       (build-responce portfolio/get-factor-data json-responce  
                       {:portfolio-id (get params "portfolioId")
                        :feature-name (get params "featureName")}))
   ;;/api/Portfolio/GetAllFactorData?portfolioId=1
  (GET "/api/Portfolio/GetAllFactorData" {params :params}  
       (build-responce portfolio/get-all-factor-data json-responce  
                       {:portfolio-id (get params "portfolioId")}))
  ;;/api/Portfolio
  (GET "/api/Portfolio" [] 
        (build-responce portfolio/get-all json-responce { }))
  ;;/api/Portfolio/1
  (GET "/api/Portfolio/:id" [id] 
        (build-responce portfolio/get-by-id json-responce {:id id}))
   ;;api/Portfolio/AddStock {"PortfolioId":"","StockId":""}
  (POST "/api/Portfolio/AddStock" {body :body}  
         (build-responce portfolio/add-stock-to-portfolio  json-added {:portfolio-stock (parse-json-request (slurp body))}))
  ;;api/Portfolio {"Nane":"","Icon":""}
  (POST "/api/Portfolio" {body :body}  
         (build-responce portfolio/post  json-added {:portfolio(parse-json-request (slurp body))}))
    ;;/api/Portfolio/RemoveStock?portfolioId=1&stockId="MSFT"
  (DELETE "/api/Portfolio/RemoveStock" {params :params}  
           (build-responce portfolio/remove-stock-from-portfolio  json-responce 
                           {:portfolio-id (get params "portfolioId") 
                            :stock-id (get params "stockId")}))
  ;;/api/Portfolio/1
  (DELETE "/api/Portfolio/:id" [id]  
           (build-responce portfolio/delete  json-responce {:id id}))

  ;;stock data
    ;;/api/StockData/HistoricalData?id=MSFT&startDate=1990-1-10
  (GET "/api/StockData/HistoricalData" {params :params}  
       (build-responce stock-data/get-stock-data-by-id json-responce
                       {:stock-name (get params "id")
                        :start-date (format-yahoo-time (get params "startDate"))
                        :end-date (format-yahoo-time (get params "endDate"))
                        :interval (get params "interval")})) 
  ;/api/StockData/MSFT
  (GET "/api/StockData/:id" [id]  
       (build-responce stock-data/get-long-stock-data-by-id json-responce
                       {:id id}))
  
    ;/api/StockData?ids=[MSFT,YHOO]
  (GET "/api/StockData" {params :params}  
      (build-responce stock-data/get-short-data-by-ids json-responce
        { :ids (get params "ids[]")}))
  
  ;system operations
  ;/api/SystemOperations/NMF?portfolioId=1&startDate=2014-05-01&interval=m&nf=2&iter=10
  (GET "/api/SystemOperations/NMF" {params :params}  
       ;(build-responce 
         (str (so/calculate-nmf
              ;json-responce
              {:portfolio-id (get params "portfolioId")
          :start-date (format-yahoo-time (get params "startDate"))
          :end-date (format-yahoo-time (get params "endDate"))
          :interval (get params "interval")
               :nf (read-string (get params "nf"))
               :iter (read-string (get params "iter"))}))) 
  
  
  ;;not portfolio responce
  (route/not-found 
    (json-responce "Not Found" 404)))

 (def app
   (compojure.core/routes
       resources-routes
        (-> api-routes wrap-params)))

(defonce server (run-jetty app {:port 3000 :join? false}))

