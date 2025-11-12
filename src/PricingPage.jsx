import React from 'react';

const PricingPage = ({ theme, glassMode, close }) => {
  const pricingOptions = [
    {
      name: "Pro",
      tagline: "Untuk Profesional",
      monthlyPrice: 25000,
      discountedMonthlyPrice: 20000, // Example discount
      features: [
        "Perhitungan tak terbatas",
        "Riwayat perhitungan",
        "Tanpa iklan",
      ],
      discountText: "Diskon 20% untuk langganan tahunan!",
      buttonText: "Pilih Pro",
      isPopular: false,
    },
    {
      name: "Pro Plus",
      tagline: "Untuk Pengguna Mahir",
      monthlyPrice: 50000,
      discountedMonthlyPrice: 35000, // Example discount
      features: [
        "Semua fitur Pro",
        "Mode ilmiah",
        "Konversi unit",
        "Tema kustom",
      ],
      discountText: "Diskon 30% untuk langganan 2 tahun!",
      buttonText: "Pilih Pro Plus",
      isPopular: true,
    },
    {
      name: "Enterprise",
      tagline: "Untuk Tim & Perusahaan",
      monthlyPrice: null, // Contact us
      discountedMonthlyPrice: null,
      features: [
        "Semua fitur Pro Plus",
        "Dukungan prioritas",
        "Integrasi API",
        "Lisensi tim",
      ],
      discountText: null,
      buttonText: "Hubungi Sales",
      isPopular: false,
    },
  ];

  return (
    <div className="pricing-page" data-theme={theme} data-glass-mode={glassMode}>
      <div className="pricing-header">
        <button onClick={close} className="close-button">×</button>
      </div>
      <div className="pricing-title">
        <h1>Oops! Anda telah mencapai batas penggunaan.</h1>
        <p>Upgrade untuk melanjutkan perhitungan tanpa batas.</p>
      </div>

      <div className="pricing-grid">
        {pricingOptions.map((option, index) => (
          <div key={index} className={`pricing-card ${option.isPopular ? 'popular' : ''}`}>
            {option.isPopular && (
              <div style={{ textAlign: 'center' }}>
                <span className="popular-badge">Paling Populer</span>
              </div>
            )}
            <h2>{option.name}</h2>
            <p className="text-center text-gray-500 mt-2">{option.tagline}</p>
            <div className="price">
              {option.monthlyPrice ? (
                <>
                  {option.discountedMonthlyPrice && (
                    <span className="original-price">Rp {option.monthlyPrice.toLocaleString()}</span>
                  )}
                  <span className="amount">Rp {option.discountedMonthlyPrice ? option.discountedMonthlyPrice.toLocaleString() : option.monthlyPrice.toLocaleString()}</span>
                  <span className="period">/bulan</span>
                </>
              ) : (
                <span className="amount" style={{ fontSize: '2.25rem' }}>Hubungi Kami</span>
              )}
            </div>
            <ul>
              {option.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button style={option.name === "Enterprise" ? { backgroundColor: '#1f2937' } : {}}>{option.buttonText}</button>
            {option.discountText && <p className="discount">{option.discountText}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
