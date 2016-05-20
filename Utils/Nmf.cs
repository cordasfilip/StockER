using Core.Models;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utils
{
    public class Nmf
    {
        public static WH Calculate(double[,] M, uint fc, uint iter) 
        {
            var distribution = new MathNet.Numerics.Distributions.ContinuousUniform(0, 1);
            var m = DenseMatrix.OfArray(M);

            
            Matrix<double> h = Matrix<double>.Build.Random((int)fc, m.ColumnCount, distribution);
            Matrix<double> w = Matrix<double>.Build.Random(m.RowCount, (int)fc, distribution);

            for (int i = 0; i < iter; i++)
            {
                var wh = w * h;
                var cost = CostFunction(m, wh, (a, b) => Math.Pow((a - b), 2));
               
                if (cost < double.MinValue)
                {
                    break;
                }

                var wt = w.Transpose();

                var hn = wt * m;
                var hd = wt * w * h;

                h = Improve(h, hn, hd);


                var ht = h.Transpose();

                var wn = m * ht;
                var wd = w * h * ht;

                w = Improve(w, wn, wd);
            }
            return new WH{ W = w.ToArray(), H = h.ToArray() };
        }

        public static double[,] GetStartMatrix(WH wh) 
        { 
            var w = DenseMatrix.OfArray(wh.W);
            var h = DenseMatrix.OfArray(wh.H);

            return (w * h).ToArray();
        }

        public static double CostFunction(Matrix<double> m1, Matrix<double> m2, Func<double, double, double> dis)
        {
            double result = 0;
            for (int i = 0; i < m1.RowCount; i++)
            {
                for (int j = 0; j < m1.ColumnCount; j++)
                {
                    result += dis(m1[i, j], m2[i, j]);
                }
            }
            return result;
        }

        public static Matrix<double> Improve(Matrix<double> m1, Matrix<double> m2, Matrix<double> m3)
        {
            for (int i = 0; i < m1.RowCount; i++)
            {
                for (int j = 0; j < m1.ColumnCount; j++)
                {
                    m1[i, j] = (m1[i, j] * m2[i, j]) / m3[i, j];
                }
            }
            return m1;
        }
    }
}
