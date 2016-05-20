(ns utils.nmf
  (:use [utils.cost-functions :as cf]
        [incanter.core :only [matrix sel nrow ncol mmult trans]])
  (:require [incanter.core :as incanter] 
            [incanter.stats :as stats])
  (:import [cern.colt.matrix.tdouble DoubleMatrix2D]))

(defn- calculate-v1
  "The calculate function loops over every value in
two equal-sized matrices and sums the moduo between them."
   [f m1 m2]
 (let [
       a (atom 0)
       ff (for [i (range  (nrow m1)) j (range (ncol m1))] 
            (swap! a +  (f (sel  m1 i j) (sel m2 i j))))]
    (last ff)))

(defn- random-matrix
  "Generates a random matrix size ixj  
[(1 1) ... (i 1)]
...
[(1 j) ... (i j)]"
  [i j]
  (let [element-count (* i j) 
        randoms (stats/sample-uniform element-count :min Double/MIN_VALUE :max 100)] 
    (matrix randoms j)))

;;calculate version 2
(defn- calculate-v2
     "The calculate function loops over every value in
   two equal-sized matrices and sums the moduo between them."
      [f m1 m2]
    (let [
          for-ij (for [i (range (nrow m1)) j (range (ncol m1))] [i  j])
          ff (fn [aggr [i j]] 
               (+ aggr (f (sel  m1 i j) (sel m2 i j))))]
       (reduce ff 0 for-ij)))

(defn- calculate-test  [f m1 m2]
  m1)

(def calculate calculate-test)

;Update feature matrix
(defn- update-feature-matrix [v w h]
  "v-original matrix
   w-weights matrix
   h-feature matrix"
  (let [w-trans (trans w)
        hn (mmult w-trans v) 
        hd (mmult (mmult w-trans w) h)       
            for-ij (for [i (range (nrow h)) j (range (ncol h))] [i  j])
        ff (fn [[i j]]
         (/ 
               (* 
                 (sel h i j) 
                 (sel hn i j))            
                 (sel  hd i j)))]
    (matrix 
          (map ff for-ij) 
          (ncol h))))

;Update weights matrix
(defn- update-weights-matrix [v w h]
  "v-original matrix
   w-weights matrix
   h-feature matrix"
  (let [h-trans 
       (trans h)
       wn (mmult v h-trans) 
       wd (mmult (mmult w h) h-trans)
      
       for-ij (for [i (range (nrow w)) j (range (ncol w))] [i  j])
       ff (fn [[i j]]
            (/
              (* 
                (sel w i j) 
                (sel wn i j) )
                (sel  wd i j)))]
   (matrix 
     (map ff for-ij) 
     (ncol w))))


(defn- improve-factors
  [[v w h] i]
   (let [wh  (mmult w h)
         cost (calculate euclidean-distance v wh)]              
     (if (= cost 0)
       [v w h]
       
       (let [new-h (update-feature-matrix   v w h)
             new-w (update-weights-matrix v w new-h) ]
        [v new-w new-h]))))

(defn factorize
  "nfm algoritham implementation"
  [v nf iter] 
    (let [fac (reduce               
                improve-factors
                [v
                 (random-matrix (nrow v) nf)  
                 (random-matrix nf (ncol v))] 
                (range iter))]
      {
       :w (nth fac 1) 
       :h (nth fac 2)
       }))

(defn calculate-start-matrix [w h] 
  (mmult (matrix w) (matrix h)))


