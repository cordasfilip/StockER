function StockData(startValues)
{
    this.Id = startValues.Id;

    for (var key in startValues)
    {
        this[key] = startValues[key];
    }
    //this.Ask = startValues.Ask
    //this.DividendYield = startValues.DividendYield
    //this.Bid = startValues.Bid
    //this.DividendPerShare = startValues.DividendPerShare
    //this.AskRealtime = startValues.AskRealtime
    //this.DividendPayDate = startValues.DividendPayDate
    //this.BidRealtime = startValues.BidRealtime
    //this.ExDividend = startValues.ExDividend
    ////Date                                    =startValues.//Date 
    //this.PreviousClose = startValues.PreviousClose
    //this.OpenDate = startValues.OpenDate
    //this.Change = startValues.Change
    //this.LastTradeDate = startValues.LastTradeDate
    //this.ChangeAndPercentChange = startValues.ChangeAndPercentChange
    //this.TradeDate = startValues.TradeDate
    //this.ChangeRealtime = startValues.ChangeRealtime
    //this.LastTradeTime = startValues.LastTradeTime
    //this.ChangePercentRealtime = startValues.ChangePercentRealtime
    //this.ChangeInPercent = startValues.ChangeInPercent
    ////Averages                                =startValues.//Averages 
    //this.AfterHoursChangeRealtime = startValues.AfterHoursChangeRealtime
    //this.ChangeFrom200DayMovingAverage = startValues.ChangeFrom200DayMovingAverage
    //this.Commission = startValues.Commission
    //this.PercentChangeFrom200DayMovingAverage = startValues.PercentChangeFrom200DayMovingAverage
    //this.DaysLow = startValues.DaysLow
    //this.ChangeFrom50DayMovingAverage = startValues.ChangeFrom50DayMovingAverage
    //this.DaysHigh = startValues.DaysHigh
    //this.PercentChangeFrom50DayMovingAverage = startValues.PercentChangeFrom50DayMovingAverage
    //this.LastTradeRealtimeWithTime = startValues.LastTradeRealtimeWithTime
    //this.DayMovingAverage50 = startValues.DayMovingAverage50
    //this.LastTradeWithTime = startValues.LastTradeWithTime
    //this.DayMovingAverage200 = startValues.DayMovingAverage200
    //this.LastTradePriceOnly = startValues.LastTradePriceOnly
    //this.TargetPrice1yr = startValues.TargetPrice1yr
    ////Misc                                    =startValues.//Misc                              
    //this.DaysValueChange = startValues.DaysValueChange
    //this.HoldingsGainPercent = startValues.HoldingsGainPercent
    //this.DaysValueChangeRealtime = startValues.DaysValueChangeRealtime
    //this.AnnualizedGain = startValues.AnnualizedGain
    //this.PricePaid = startValues.PricePaid
    //this.HoldingsGain = startValues.HoldingsGain
    //this.DaysRange = startValues.DaysRange
    //this.HoldingsGainPercentRealtime = startValues.HoldingsGainPercentRealtime
    //this.DaysRangeRealtime = startValues.DaysRangeRealtime
    //this.HoldingsGainRealtime = startValues.HoldingsGainRealtime
    ////52  WeekPricingSymbolInfo               =startValues.//52  WeekPricingSymbolInfo 
    //this.WeekHigh52 = startValues.WeekHigh52
    //this.MoreInfo = startValues.MoreInfo
    //this.WeekLow52 = startValues.WeekLow52
    //this.MarketCapitalization = startValues.MarketCapitalization
    //this.ChangeFrom52WeekLow = startValues.ChangeFrom52WeekLow
    //this.MarketCapRealtime = startValues.MarketCapRealtime
    //this.ChangeFrom52WeekHigh = startValues.ChangeFrom52WeekHigh
    //this.FloatShares = startValues.FloatShares
    //this.PercentChangeFrom52WeekLow = startValues.PercentChangeFrom52WeekLow
    //this.Name = startValues.Name
    //this.PercentChangeFrom52WeekHigh = startValues.PercentChangeFrom52WeekHigh
    //this.Notes = startValues.Notes
    //this.WeekRange52 = startValues.WeekRange52
    //this.Symbol = startValues.Symbol
    //this.SharesOwned = startValues.SharesOwned
    //this.StockExchange = startValues.StockExchange
    //this.SharesOutstanding = startValues.SharesOutstanding
    ////Volume                                  =startValues.//Volume 
    //this.Volume = startValues.Volume
    //this.AskSize = startValues.AskSize
    //this.BidSizeMisc = startValues.BidSizeMisc
    //this.LastTradeSize = startValues.LastTradeSize
    //this.TickerTrend = startValues.TickerTrend
    //this.AverageDailyVolume = startValues.AverageDailyVolume
    //this.TradeLinks = startValues.TradeLinks
    //this.OrderBookRealtime = startValues.OrderBookRealtime
    ////Ratios                                  =startValues.//Ratios 
    //this.HighLimit = startValues.HighLimit
    //this.EarningsPerShare = startValues.EarningsPerShare
    //this.LowLimit = startValues.LowLimit
    //this.EPSEstimateCurrentYear = startValues.EPSEstimateCurrentYear
    //this.HoldingsValue = startValues.HoldingsValue
    //this.EPSEstimateNextYear = startValues.EPSEstimateNextYear
    //this.HoldingsValueRealtime = startValues.HoldingsValueRealtime
    //this.EPSEstimateNextQuarter = startValues.EPSEstimateNextQuarter
    //this.Revenue = startValues.Revenue
    //this.BookValue = startValues.BookValue
    //this.EBITDA = startValues.EBITDA
    //this.PriceSales = startValues.PriceSales
    //this.PriceBook = startValues.PriceBook
    //this.PERatio = startValues.PERatio
    //this.PERatioRealtime = startValues.PERatioRealtime
    //this.PEGRatio = startValues.PEGRatio
    //this.PriceEPSEstimateCurrentYear = startValues.PriceEPSEstimateCurrentYear
    //this.PriceEPSEstimateNextYear = startValues.PriceEPSEstimateNextYear
    //this.ShortRatio = startValues.ShortRatio
}

var StockFields=
    {
        Ask                                 :'a', 
        DividendYield                       :'y', 
        Bid                                 :'b',
        DividendPerShare                    :'d',
        AskRealtime                         :'b2',
        DividendPayDate                     :'r1', 
        BidRealtime                         :'b3', 
        ExDividend                          :'q',
        //Date 
        PreviousClose                       :'p',  
        OpenDate                            :'o',
        Change                              :'c1', 
        LastTradeDate                       :'d1', 
        ChangeAndPercentChange              :'c',
        TradeDate                           :'d2', 
        ChangeRealtime                      :'c6', 
        LastTradeTime                       :'t1', 
        ChangePercentRealtime               :'k2',  
        ChangeInPercent                     :'p2',  
        //Averages 
        AfterHoursChangeRealtime            :'c8',
        ChangeFrom200DayMovingAverage       :'m5',
        Commission                          :'c3',
        PercentChangeFrom200DayMovingAverage:'m6',
        DaysLow                             :'g',
        ChangeFrom50DayMovingAverage        :'m7',
        DaysHigh                            :'h',
        PercentChangeFrom50DayMovingAverage :'m8',
        LastTradeRealtimeWithTime           :'k1',
        DayMovingAverage50                  :'m3',
        LastTradeWithTime                   :'l',
        DayMovingAverage200                 :'m4',
        LastTradePriceOnly                  :'l1',
        TargetPrice1yr                      :'t8',
        //Misc                              :
        DaysValueChange                     :'w1',
        HoldingsGainPercent                 :'g1',
        DaysValueChangeRealtime             :'w4',
        AnnualizedGain                      :'g3',
        PricePaid                           :'p1',
        HoldingsGain                        :'g4',
        DaysRange                           :'m ',
        HoldingsGainPercentRealtime         :'g5',
        DaysRangeRealtime                   :'m2',
        HoldingsGainRealtime                :'g6',
        //52  WeekPricingSymbolInfo 
        WeekHigh52                          :'k', 
        MoreInfo                            :'v', 
        WeekLow52                           :'j', 
        MarketCapitalization                :'j1', 
        ChangeFrom52WeekLow                 :'j5', 
        MarketCapRealtime                   :'j3', 
        ChangeFrom52WeekHigh                :'k4', 
        FloatShares                         :'f6', 
        PercentChangeFrom52WeekLow          :'j6', 
        Name                                :'n', 
        PercentChangeFrom52WeekHigh         :'k5', 
        Notes                               :'n4',
        WeekRange52                         :'w',
        Symbol                              :'s',
        SharesOwned                         :'s1', 
        StockExchange                       :'x', 
        SharesOutstanding                   :'j2', 
        //Volume 
        Volume                              :'v ', 
        AskSize                             :'a5', 
        BidSizeMisc                         :'b6', 
        LastTradeSize                       :'k3',
        TickerTrend                         :'t7', 
        AverageDailyVolume                  :'a2', 
        TradeLinks                          :'t6', 
        OrderBookRealtime                   :'i5', 
        //Ratios 
        HighLimit                           :'l2',
        EarningsPerShare                    :'e',
        LowLimit                            :'l3',
        EPSEstimateCurrentYear              :'e7',
        HoldingsValue                       :'v1',
        EPSEstimateNextYear                 :'e8',
        HoldingsValueRealtime               :'v7',
        EPSEstimateNextQuarter              :'e9',
        Revenue                             :'s6',
        BookValue                           :'b4',
        EBITDA                              :'j4',
        PriceSales                          :'p5',
        PriceBook                           :'p6',
        PERatio                             :'r ',
        PERatioRealtime                     :'r2',
        PEGRatio                            :'r5',
        PriceEPSEstimateCurrentYear         :'r6',
        PriceEPSEstimateNextYear            :'r7',
        ShortRatio                          :'s7'
    };