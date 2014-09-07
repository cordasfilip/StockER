App.Data.TestEnumerable = Enumerable.Range(0, 5000);

App.Data.TestMetaData =
{
    "LeftNavigationItems":
        [
            { "Id":"Home", "Type": "ActionLinq", "Value": { Text: "Home", "Icon": "icon-home", Href: "#/" }, "Order": 0 },
            {
                "Id": "Portfolios", "Type": "SubMenu", "Value":
                  {
                      "Text": "Portfolios",
                      "Icon": "icon-newspaper",
                      "Items":
                          [
                              { "Type": "ActionLinq", "Value": { "Text": "Industrial Portfolio", "Icon": "icon-briefcase", "Href": "#/Dashboard/Portfolio/0" }, Order: 0 },
                              { "Type": "ActionLinq", "Value": { "Text": "Technology Portfolio", "Icon": "icon-screen", "Href": "#/Dashboard/Portfolio/1" }, Order: 0 }
                          ]
                  },
                "Order": 1
            }
        ],
    "TopCreateItems":
        [
            { "Text": "NEWPORTFOLIO", "Icon": "icon-bars", "Action": "NewPortfolio" }
        ]
    
};

App.Data.TestStockData = Enumerable.From(
                [
                    new StockData({ Id: "^IXIC", StockExchange: "NIM", Name: "NASDAQ", Open: 4448.06, PreviousClose: 4472.107, Change: -22.543, ChangeInPercent: "-0.50%" }),
                    new StockData({ Id: "^DJI", StockExchange: "WCB", Name: "Dow", Open: 16960.57, PreviousClose: 17079.50, Change: -123.23, ChangeInPercent: "-0.72%" }),
                    new StockData({ Id: "^GDAXI", StockExchange: "XETRA", Name: "DAX", Open: 9770.24, PreviousClose: 9794.06, Change: -150.05, ChangeInPercent: "-1.53%" }),
                    new StockData({ Id: "^FTSE", StockExchange: "FSI", Name: "FTSE 100", Open: 6821.46, PreviousClose: 6821.46, Change: -29.91, ChangeInPercent: "-0.44%" }),
                    new StockData({ Id: "^GSPC", StockExchange: "SNP", Name: "S&P 500", Open: 1984.60, PreviousClose: 1987.98, Change: -9.64, ChangeInPercent: "-0.48%" }),
                    new StockData({ Id: "^HSI", StockExchange: "HKSE", Name: "HANG SENG INDEX", Open: 24247.199, PreviousClose: 24141.50, Change: -74.51, ChangeInPercent: "+0.31%" }),
                    new StockData({ Id: "^N225", StockExchange: "Osaka", Name: "Nikkei 225", Open: 15342.46, PreviousClose: 15284.42, Change: 173.45, ChangeInPercent: "+1.13%" }),
                    new StockData({ Id: "^FCHI", StockExchange: "Paris", Name: "CAC 40", Open: 4390.85, PreviousClose: 4410.65, Change: -80.10, ChangeInPercent: "-1.82%" }),
                    new StockData({ Id: "^IPSA", StockExchange: "Santiago", Name: "IPSA SANTIAGO DE ", Open: 3929.51, PreviousClose: 3929.51, Change: -10.43, ChangeInPercent: "-0.27%" }),
                    new StockData({ Id: "MSFT", StockExchange: "NasdaqNM ", Name: "Microsoft Corpora", Open: 43.23, PreviousClose: 43.23, Change: -0.03, ChangeInPercent: "-0.07%" }),
                    new StockData({ Id: "YHOO", StockExchange: "NasdaqNM ", Name: "Yahoo! Inc.", Open: 35.73, PreviousClose: 35.66, Change: 0.25, ChangeInPercent: "0.70%" }),
                    new StockData({ Id: "GOOG", StockExchange: "NasdaqNM ", Name: "Google Inc.", Open: 564, PreviousClose: 563.36, Change: 5.41, ChangeInPercent: "0.96%" }),
                    new StockData({ Id: "ORCL", StockExchange: "NYSE", Name: "Oracle Corporatio", Open: 39.73, PreviousClose: 39.67, Change: 0.27, ChangeInPercent: "0.68%" }),
                    new StockData({ Id: "AMZN", StockExchange: "NasdaqNM ", Name: "Amazon.com, Inc.", Open: 311.72, PreviousClose: 311.45, Change: 5.35, ChangeInPercent: "1.72%" }),
                    new StockData({ Id: "AAPL", StockExchange: "NasdaqNM ", Name: "Apple Inc.", Open: 94.2, PreviousClose: 94.48, Change: 0.26, ChangeInPercent: "0.28%" }),
                    new StockData({ Id: "CSCO", StockExchange: "NasdaqNM ", Name: "Cisco Systems, Inc", Open: 24.84, PreviousClose: 24.86, Change: 0.17, ChangeInPercent: "0.68%" }),
                    new StockData({ Id: "SSNLF", StockExchange: "Other OTC", Name: "SAMSUNG ELECT LTD", Open: 1238, PreviousClose: 1238, Change: -3, ChangeInPercent: "-0.24%" })
                ]);

App.Data.TestPortfolios = Enumerable.From(
    [
        new Portfolio({ Id: 0, Name: "Industrial Portfolio", Icon: "icon-briefcase", Stocks: ["MSFT"] }),
        new Portfolio({ Id: 1, Name: "Technology Portfolio", Icon: "icon-screen", Stocks: ["MSFT", "YHOO", "GOOG", "ORCL"] })
    ]);

App.Data.TestPortfolioStocks = Enumerable.From(
    [
        new PortfolioStock({ PortfolioId: 0, StockId: "MSFT" }),
        new PortfolioStock({ PortfolioId: 1, StockId: "YHOO" }),
        new PortfolioStock({ PortfolioId: 1, StockId: "GOOG" }),
        new PortfolioStock({ PortfolioId: 1, StockId: "ORCL" }),
        new PortfolioStock({ PortfolioId: 1, StockId: "MSFT" }),
    ]);


App.Data.TestStocks = Enumerable.From(
    [
        new Stock({Id:"XXII",StockExchange: "NasdaqNM ", Name:"22nd Century Group, Inc",                                        MarketCap:161514875.34   ,ADRTSO:"n/a", IPOyear:"n/a"  ,Sector: "Consumer Non-Durables", Industry:"Farming/Seeds/Milling",SummaryQuote:"http://www.nasdaq.com/symbol/xxii"}),
        new Stock({Id:"FAX",StockExchange: "NasdaqNM ",  Name:"Aberdeen Asia-Pacific Income Fund Inc",                          MarketCap:1627833360.8   ,ADRTSO:"n/a", IPOyear:"1986",Sector: "n/a"                   , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/fax"}),
        new Stock({Id:"IAF", StockExchange: "NasdaqNM ", Name:"Aberdeen Australia Equity Fund Inc",                              MarketCap:20174281       ,ADRTSO:"n/a", IPOyear:"n/a"  ,Sector: "n/a"                  , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/iaf"}),
        new Stock({Id:"CH", StockExchange: "NasdaqNM ",  Name:"Aberdeen Chile Fund, Inc.",                                     MarketCap:89359451.44    ,ADRTSO:"n/a", IPOyear:"n/a"  ,Sector: "n/a"                  , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/ch"}),
        new Stock({Id:"ETF",StockExchange: "NasdaqNM ",  Name:"Aberdeen Emerging Markets Smaller Company Opportunities Fund I", LastSale:14.32,MarketCap:139830962.24   ,ADRTSO:"n/a", IPOyear:"1992",Sector: "n/a"                   , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/etf"}),
        new Stock({Id:"FCO",StockExchange: "NasdaqNM ",  Name:"Aberdeen Global Income Fund, Inc.",                              MarketCap:101886804.8    ,ADRTSO:"n/a", IPOyear:"1992",Sector: "n/a"                   , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/fco"}),
        new Stock({Id:"IF", StockExchange: "NasdaqNM ",  Name:"Aberdeen Indonesia Fund, Inc.",                                   MarketCap:93050273.07    ,ADRTSO:"n/a", IPOyear:"1990",Sector: "n/a"                   , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/if"}),
        new Stock({Id:"ISL",StockExchange: "NasdaqNM ",  Name:"Aberdeen Israel Fund, Inc.",                                    MarketCap:73140765.14    ,ADRTSO:"n/a", IPOyear:"1992",Sector: "n/a"                   , Industry:"n/a"                  ,SummaryQuote:"http://www.nasdaq.com/symbol/isl"}),
        new Stock({Id:"MSFT",StockExchange: "NasdaqNM ", Name:"Microsoft Corporation",                                         MarketCap:355961467684.8, ADRTSO:"n/a",IPOyear:"1986", Sector:"Technology"             ,Industry:"Computer Software: Prepackaged Software",SummaryQuote:"http://www.nasdaq.com/symbol/msft"}),
        new Stock({ Id:"YHOO",StockExchange:"NYSE",      Name:"Yahoo! Inc.",       MarketCap:36154480091.94  ,ADRTSO:"n/a",IPOyear:"1996", Sector:"Technology",   Industry:"EDP Services",                                   SummaryQuote:"http://www.nasdaq.com/symbol/yhoo"}),
        new Stock({ Id:"GOOG",StockExchange:"NasdaqNM ", Name:"Google Inc.",       MarketCap:384711469877.22 ,ADRTSO:"n/a",IPOyear:"2004", Sector:"Technology",   Industry:"Computer Software: Programming, Data Processing",SummaryQuote:"http://www.nasdaq.com/symbol/goog"}),
        new Stock({ Id:"ORCL",StockExchange:"NasdaqNM ", Name:"Oracle Corporation",MarketCap:177928266660    ,ADRTSO:"n/a",IPOyear:"1986",Sector:"Technology",Industry:"Computer Software: Prepackaged Software",        SummaryQuote:"http://www.nasdaq.com/symbol/orcl"})

    ]);

