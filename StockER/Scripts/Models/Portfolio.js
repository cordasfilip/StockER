function Portfolio(startValues)
{
    this.Id = startValues.Id;
    this.Name = startValues.Name;
    this.Icon = startValues.Icon;
    if (startValues.Stocks)
    {
        this.Stocks = startValues.Stocks;
    }
   
}