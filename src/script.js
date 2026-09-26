// 1. Mengambil Batas Administrasi Resmi Kabupaten Solok
var kabupatenSolok = ee.FeatureCollection('FAO/GAUL/2015/level2')
                        .filter(ee.Filter.eq('ADM2_NAME', 'Solok'));

// =========================================================================
// 🌳 HULU - KEHILANGAN HUTAN (2000-2023)
// =========================================================================
var gfc = ee.Image('UMD/hansen/global_forest_change_2023_v1_11');
var lossYear = gfc.select('lossyear').clip(kabupatenSolok);
var forestLoss = lossYear.gt(0);
var forestLossArea = forestLoss.updateMask(forestLoss);

// 📊 STATISTIK HULU: Menghitung Luas Hutan yang Hilang (Hektar)
var lossAreaMeters = forestLossArea.multiply(ee.Image.pixelArea());
var lossStats = lossAreaMeters.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: kabupatenSolok,
  scale: 30, // Resolusi data Hansen (30 meter)
  maxPixels: 1e9,
  bestEffort: true
});
var forestLossHa = ee.Number(lossStats.get('lossyear')).divide(10000);

// =========================================================================
// 🚨 HILIR - CITRA RADAR GENANGAN BANJIR (MARET 2024)
// =========================================================================
var s1Collection = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterBounds(kabupatenSolok)
                      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                      .filter(ee.Filter.eq('instrumentMode', 'IW'));

var preFlood = s1Collection.filterDate('2024-02-01', '2024-02-28').mosaic().clip(kabupatenSolok);
var postFlood = s1Collection.filterDate('2024-03-08', '2024-03-31').mosaic().clip(kabupatenSolok);

var floodDifference = postFlood.select('VV').subtract(preFlood.select('VV'));
var floodMask = floodDifference.lt(-2.2); 
var floodArea = floodMask.updateMask(floodMask);

// 📊 STATISTIK HILIR: Menghitung Luas Area Tergenang Banjir (Hektar)
var floodAreaMeters = floodArea.multiply(ee.Image.pixelArea());
var floodStats = floodAreaMeters.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: kabupatenSolok,
  scale: 10, // Resolusi Sentinel-1 (10 meter)
  maxPixels: 1e9,
  bestEffort: true
});
var floodAreaHa = ee.Number(floodStats.get('VV')).divide(10000);

// =========================================================================
// 🖥️ MENAMPILKAN HASIL ANGKA STATISTIK KE TAB CONSOLE
// =========================================================================
print('==================================================');
print('📊 HASIL ANALISIS GEOGRAFI LINGKUNGAN KAB. SOLOK');
print('==================================================');
print('1. Total Luas Hutan Hilang di Hulu (2000-2023) [Hektar]:', forestLossHa);
print('2. Total Luas Area Tergenang Banjir/Lumpur (Maret 2024) [Hektar]:', floodAreaHa);
print('==================================================');

// 3. VISUALISASI PETA
Map.centerObject(kabupatenSolok, 10); 
Map.addLayer(postFlood.select('VV'), {min: -25, max: 0}, '1. Citra Radar Baseline');
Map.addLayer(forestLossArea, {palette: '800000'}, '🌳 Area Kehilangan Hutan di Hulu');
Map.addLayer(floodArea, {palette: '00FFFF'}, '🚨 Peta Deteksi Genangan Banjir/Lumpur');
var outline = ee.Image().paint({featureCollection: kabupatenSolok, color: 1, width: 2});
Map.addLayer(outline, {palette: 'FF0000'}, 'Batas Wilayah Kabupaten Solok');
