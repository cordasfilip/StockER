using Core.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapping.EF
{
    public class PortfolioMap : EntityTypeConfiguration<Portfolio>
    {
        public PortfolioMap()
        {
            this.HasKey(p => p.Id);

            this.Property(p => p.Id).HasColumnName("Id");
            this.Property(p => p.Name).HasColumnName("Name");
            this.Property(p => p.Icon).HasColumnName("Icon");

            this.HasMany(p => p.Stocks)
                .WithMany(p => p.Portfolios)
                .Map(m =>
                      {
                          m.MapLeftKey("PortfolioId");
                          m.MapRightKey("StockId");
                          m.ToTable("PortfolioStock");
                      });

            this.ToTable("Portfolio");
        }
    }
    public class StockMap : EntityTypeConfiguration<Stock>
    {
        public StockMap()
        {
            this.HasKey(s => s.Id);

            this.Property(s => s.Id).HasColumnName("Id");
            this.Property(s => s.Name).HasColumnName("Name");
            this.Property(s => s.IPOyear).HasColumnName("IPOyear");
            this.Property(s => s.Industry).HasColumnName("Industry");
            this.Property(s => s.Sector).HasColumnName("Sector");
            this.Property(s => s.StockExchange).HasColumnName("StockExchange");
            this.Property(s => s.SummaryQuote).HasColumnName("SummaryQuote");

            this.HasMany(s => s.Portfolios)
                .WithMany(p => p.Stocks)
                .Map(m =>
                {
                    m.MapRightKey("PortfolioId");
                    m.MapLeftKey("StockId");                   
                    m.ToTable("PortfolioStock");
                });

            this.ToTable("Stock");
        }
    }

}
