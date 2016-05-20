using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class WH
    {
        public string[] Rows { get; set; }

        public string[] Columns { get; set; }

        public double[,] W { get; set; }

        public double[,] H { get; set; }
    }
}
