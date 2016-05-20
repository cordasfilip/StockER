function PortfolioDashboardViewModel(id)
{
    var self = this;

    var db = App.DataAccess.PortfolioDB;
    var stockDB=App.DataAccess.StockDataDB;
    
    self.Portfolio=null;

    self.IsEdit = ko.observable(false);

    self.Loading = ko.observable(true);

    self.Title = ko.observable();

    self.Stocks = ko.observableArray();  

    self.Avg = 0;

    self.Max = 0;

    self.FactorsVM =ko.observable(new FactorsViewModel(self));
    
    self.ShowNewStockWindow = function ()
    {       
        Utils.ShowWindow("NewStock").done(function (stock)
        {
            if (Enumerable.From(self.Portfolio.Stocks).Any("s=>s.Id=='" + stock.Id + "'"))
            {
                Utils.ShowInfo("Stock already in Portfolio")
            } else
            {
                db.AddStockToPortfolioAsync(self.Portfolio, stock)
                .done(function () { Utils.ShowSuccess("Stock:  "+stock.Id+" added to portfolio"); })
                .fail(function (e)
                {
                    Utils.ShowError("ERROR adding Stock", e);
                });
            }
        });
    }

    self.RemoveStock = function (stock)
    {
        db.RemoveStockFromPortfolioById(self.Portfolio, stock.Id).done(function ()
        {
            Utils.ShowSuccess("Stock:  " + stock.Id + " removed from Portfolio");
        }).fail(function (e)
        {
            Utils.ShowError("ERROR removing Stock", e);
        });
    }

    self.RemovePortfolio = function ()
    {
        db.RemovePortfolio(self.Portfolio).done(function ()
        {
            Utils.ShowSuccess("Portfolio:  " + self.Portfolio.Name + " removed");
        }).fail(function ()
        {
            Utils.ShowError("ERROR removing Portfolio", e);
        });
    };

    self.CalculateFactors = function ()
    {
        Utils.ShowWindow("CalculateFactors", { PortfolioId: id }).done(function ()
        {
            self.FactorsVM(new FactorsViewModel(self));
        });
    }

    self.GoToInfo = function ()
    {
        var data = self.FactorsVM().GetTop();

        var linq = "http://www.bing.com/news/search?q=" + data.Date + "+" + data.Stock + "&qs=n&form=QBNT&pq=10-10-2010+ford&sc=2-11&sp=-1&sk=";

        window.open(linq, '_blank');
    }

    $(db).on("Updated", UpdateEvent);
    $(db).on("Removed", PortfolioRemoved);
    db.GetAsync(id).done(UpdatePortfolio);
    
    function UpdateEvent(e, ports, prop)
    {
        var port = Enumerable.From(ports).FirstOrDefault(null, "r=>r.Id==" + self.Portfolio.Id);
        if (port!=null)
        {
            UpdatePortfolio(port, prop);
        }       
    }

    function PortfolioRemoved() { }

    function UpdatePortfolio(port,props)
    {
        if (self.Portfolio != null)
        {
            Utils.ShowInfo("Portfolio Updated");
        }
        self.Portfolio = port;
        if (port)
        {
            self.Title(self.Portfolio.Name);
            self.Loading(true);
            stockDB.GetAsync(Enumerable.From(self.Portfolio.Stocks).Select("s=>s.Id").ToArray()).done(
            function (data)
            {
                if (data.Count() > 0)
                {
                    var mult = 1;
                    self.Avg = data.Average("r=>(r.Change / r.Open) * 100");
                    self.Max = data.Max("r=>(r.Change / r.Open) * 100");
                    self.Min = data.Min("r=>(r.Change / r.Open) * 100");

                    if (Math.abs(self.Max) < 1 && Math.abs(self.Min) < 1)
                    {
                        self.Avg *= 10;
                        self.Max *= 10;
                        self.Min *= 10;
                        mult = 10;
                    }
                    self.Stocks(data.Select(function (r) { r.ChangeInPercent = (r.Change / r.Open) * 100 * mult; return r; }).ToArray());
                } else
                { self.Stocks([]); self.IsEdit(true); }

                self.Loading(false);
            });
        } else
        {
            location = "#/NotFound";
        }

    }

    function FactorsViewModel(pVM)
    {
       
        var self = this;

        var index = 0;

        self.FactorData = ko.observable();

        self.NoFactors = ko.observable(false);

        self.AllFactors = ko.observableArray([]);

        self.FactorByStockActive = ko.observable(false);

        self.FactorByStockSelected = ko.observable();

        self.FactorByStockSettings = ko.computed(function ()
        {
            if (self.FactorData() != null && self.FactorByStockSelected() != null)
            {
                var data = self.FactorData()
                     .Where(function (r)
                     {
                         return r.Type=='R' && self.FactorByStockSelected().Any("s=>s=='" + r.Name + "'");
                     })                    
                .OrderByDescending("r=>r.Value")
                .GroupBy("r=>r.Name")
               
                .Select(function (r)
                {
                    var s = { StockName: r.Key() };
                    r.Aggregate(s, function (a, f)
                    {
                        a[f.Feature] = f.Value;
                        return a;
                    });
                    return s;

                }).ToArray();

                return {
                    dataSource: data,
                    commonSeriesSettings: {
                        argumentField: "StockName",
                        type: "bar",
                        hoverMode: "allArgumentPoints",
                        selectionMode: "allArgumentPoints",
                        label: {
                            visible: false,
                        }
                    },
                    series: Enumerable.From(self.AllFactors()).Select("(r,i)=>{valueField:r,name:r,color:Utils.GetModColor(i)}").ToArray()
                    }
            }
            return {};
        });

        self.ShowRowFactorFilter = function ()
        {
            Utils.ShowWindow('Select', {
                Items: self
                    .SelectedFactorData()
                    .Where("r=>r.Type=='R'")
                    .Select("r=>r.Name").ToArray()
            }).done(function (items)
            {
                self.FactorByStockSelected(Enumerable.From(items));
            });
        }

        self.FactorByDateSelected = ko.observable();

        self.FactorByDateSettings = ko.computed(function ()
        {
            if (self.FactorData() != null && self.FactorByDateSelected() != null)
            {
                var data = self.FactorData()
                     .Where(function (r)
                     {
                         return r.Type == 'C' && self.FactorByDateSelected().Any("s=>s=='" + r.Name + "'");
                     })
                .OrderByDescending("r=>r.Value")
                .GroupBy("r=>r.Name")

                .Select(function (r)
                {
                    var s = { Date: r.Key() };
                    r.Aggregate(s, function (a, f)
                    {
                        a[f.Feature] = f.Value;
                        return a;
                    });
                    return s;

                }).ToArray();

                return {
                    dataSource: data,
                    commonSeriesSettings: {
                        argumentField: "Date",
                        type: "bar",
                        hoverMode: "allArgumentPoints",
                        selectionMode: "allArgumentPoints",
                        label: {
                            visible: false,
                        }
                    },
                    series: Enumerable.From(self.AllFactors()).Select("(r,i)=>{valueField:r,name:r,color:Utils.GetModColor(i)}").ToArray()
                }
            }
            return {};
        });

        self.ShowColumnFactorFilter = function ()
        {
            Utils.ShowWindow('Select', {
                Items: self
                    .SelectedFactorData()
                    .Where("r=>r.Type=='C'")
                    .Select("r=>r.Name").ToArray()
            }).done(function (items)
            {
                self.FactorByDateSelected(Enumerable.From(items));
            });
        }

        self.SelectedFactor = ko.observable();

        self.SelectedFactorData = ko.observable();

        self.RowFilterActive = ko.observable(false);

        self.MaxRows = ko.observable(0);

        self.RowsTop = ko.observable(5);

        self.SelectedFactorRows = ko.computed(function ()
        {
            if (self.SelectedFactorData()!=null)
            {
                return self.SelectedFactorData().Where("r=>r.Type=='R'").OrderByDescending("r=>r.Value").Take(self.RowsTop()).ToArray();
            }
        });

        self.ColumnsFilterActive = ko.observable(false);

        self.MaxColumns = ko.observable(0);

        self.ColumnsTop = ko.observable(5);

        self.SelectedFactorColumns = ko.computed(function ()
        {
            if (self.SelectedFactorData() != null)
            {
                return self.SelectedFactorData().Where("r=>r.Type=='C'").OrderByDescending("r=>r.Value").Take(self.ColumnsTop()).ToArray();
            }
        });

        self.HasNext = ko.computed(function ()
        {
            self.SelectedFactor();

            return index != 0;
        });

        self.Next = function ()
        {
            self.SelectIndex(index + 1);
        }

        self.HasPrev = ko.computed(function ()
        {
            self.SelectedFactor();

            return index != self.AllFactors().length - 1;
        });

        self.Prev = function ()
        {
            self.SelectIndex(index - 1);
        }     

        db.GetFactorNames(id)
            .done(function (factors)
            {
                self.AllFactors(factors.ToArray());               
                
                self.SelectIndex(0);
            })
            .fail(function () { self.NoFactors(true); });

        self.GetTop = function ()
        {
            return { Stock: self.SelectedFactorRows()[0].Name, Date: self.SelectedFactorColumns()[0].Name };
        }

        self.SelectIndex = function (i)
        {
            pVM.Loading(true);
            index = i;
            var factor = self.AllFactors()[i];
            
            self.SelectedFactor(factor);

            if (self.FactorData() != null)
            {
                DataDone(self.FactorData());
            }
            else
            {
                db.GetAllFactorData(id)
                    .done(function (data)
                    {
                        self.FactorData(data);
                        var maxRows = self.FactorData().Where("r=>r.Type=='R'").Distinct("r=>r.Name").Count();
                        var maxColumns = self.FactorData().Where("r=>r.Type=='C'").Distinct("r=>r.Name").Count();
                        self.MaxRows(maxRows);
                        if (self.MaxRows()<self.RowsTop())
                        {
                            self.RowsTop(self.MaxRows());
                        }
                        self.MaxColumns(maxColumns);
                        if (self.MaxColumns() < self.ColumnsTop())
                        {
                            self.ColumnsTop(self.MaxColumns());
                        }

                        self.FactorByStockSelected(data.Where("r=>r.Type=='R'")
                    .Take(5)
                    .OrderByDescending("r=>r.Value")
                    .Select("r=>r.Name"));

                        self.FactorByDateSelected(data.Where("r=>r.Type=='C'")
                    .Take(5)
                    .OrderByDescending("r=>r.Value")
                    .Select("r=>r.Name"));

                        DataDone(data);
                    })
                    .fail(function () { Utils.ShowError("Error loading data"); });
            }

            function DataDone(data)
            {
                data = data.Where("r=>r.Feature=='" + self.SelectedFactor() + "'");

                self.SelectedFactorData(data);
                pVM.Loading(false);
            }

        }
    }

    self.Dispose = function ()
    {
        $(db).off("Updated", UpdateEvent);
        $(db).off("Removed", PortfolioRemoved);
    }

}