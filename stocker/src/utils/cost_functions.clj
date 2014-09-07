(ns utils.cost-functions)

(defn euclidean-distance "returns (x+y)^2"  [^double x ^double y] 
  (let [dis (- x y)] 
    (* dis dis)))