# Hulu-Hilir Nexus: Assessing Forest Degradation and Flash Flood Impacts in Solok, West Sumatra

## 🌍 Project Overview
Sebagai mahasiswa Geografi Lingkungan, proyek ini saya bangun untuk menganalisis hubungan sebab-akibat (nexus hulu-hilir) antara kerusakan tutupan hutan di area perbukitan hulu terhadap kerentanan bencana banjir bandang lumpur (*galodo*) di wilayah hilir Kabupaten Solok, Sumatera Barat. 

Studi kasus ini berfokus pada bencana hidrometeorologi ekstrem yang melanda wilayah Solok pada **Maret 2024**. Proyek ini mendemonstrasikan bagaimana komputasi awan berbasis spasial dapat digunakan untuk penilaian risiko bencana (*Disaster Risk Assessment*) secara cepat dan kuantitatif.

## 🛠️ Metodologi & Sumber Data (Methodology)
Analisis dilakukan sepenuhnya di platform **Google Earth Engine (GEE)** menggunakan bahasa pemrograman JavaScript dengan pendekatan multi-sensor:

1. **Analisis Hulu (Penyebab):** Menggunakan dataset **Hansen Global Forest Change (UMD/hansen/global_forest_change_2023_v1_11)** berbasis satelit optik multi-temporal untuk mengekstrak akumulasi kehilangan tutupan pohon (*Tree Cover Loss*) dari tahun 2000 hingga 2023.
2. **Analisis Hilir (Dampak):** Menggunakan data **Satelit Radar Sentinel-1 (COPERNICUS/S1_GRD)**. Pendekatan radar (SAR) dipilih karena kemampuannya menembus awan pekat tropis (*all-weather capability*) saat badai hujan terjadi. Deteksi genangan air lumpur dihitung berdasarkan penurunan drastis nilai pantulan balik gelombang (*VV Backscatter Change Detection*).
3. **Analisis Statistik:** Menggunakan fungsi `reduceRegion` dengan operator `ee.Reducer.sum()` untuk menghitung luas area spasial secara otomatis ke dalam satuan Hektar (Ha).

## 📊 Hasil Analisis & Angka Statistik (Results)
Berdasarkan visualisasi spasial dan perhitungan algoritma pada Google Earth Engine, ditemukan data kuantitatif sebagai berikut:

* **Akumulasi Kehilangan Hutan di Hulu (2000-2023):** `[Isi dengan angka Hektar dari Console GEE]` Ha.
* **Luas Area Hilir Tergenang Banjir/Lumpur (Maret 2024):** `[Isi dengan angka Hektar dari Console GEE]` Ha.

### Kesimpulan Geografi Lingkungan:
Peta menunjukkan adanya korelasi spasial yang kuat. Deforestasi yang terakumulasi di wilayah dataran tinggi perbukitan Solok selama dua dekade terakhir menurunkan kemampuan infiltrasi tanah secara signifikan. Akibatnya, saat curah hujan ekstrem melanda pada Maret 2024, air hujan langsung berubah menjadi aliran permukaan (*surface runoff*) pekat yang membawa material longsor dan merendam kawasan lembah pemukiman di hilir.

## 📁 Struktur Folder Repository
* `/src/script.js` : Berisi skrip pemrograman lengkap Google Earth Engine API.
* `README.md` : Halaman dokumentasi utama proyek.
