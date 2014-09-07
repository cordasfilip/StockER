(ns stocker.nmf-test
   (:use 
         [utils.nmf]
         [utils.cost-functions :as cf]
         [incanter.core :only [matrix sel nrow ncol mmult trans]])
  (:require
           [incanter.core :as incanter] 
           [incanter.stats :as stats])
  (:import [cern.colt.matrix.tdouble DoubleMatrix2D]))

(def m1 (matrix [[1 2 3]
                 [4 5 6]
                 [7 8 9]]))
(def a  (factorize m1 2 1000) )
(mmult (second a) (get a 2))

(def m2 (matrix [[1 2 3]
                 [4 5 6]
                ]))
(def a  (factorize m1 2 1000) )
(mmult (second a) (get a 2))

(def m3 (matrix [[1 2]
                 [4 5]
                 [7 8]]))
(def a  (factorize m3 2 1000) )
(mmult (second a) (get a 2))