function DashboardViewModel()
{
    var self = this;
    var locations = ["^IXIC", /*"^DJI",*/ "^GDAXI", "^FTSE", "^GSPC", "^HSI", "^N225", "^FCHI", "^IPSA"];
    this.StockData = App.DataAccess.StockDataDB.GetAsync(locations);
}