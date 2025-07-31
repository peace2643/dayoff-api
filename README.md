# dayoff-API 2025

API untuk mengecek hari libur Indonesia tahun 2025

## Cara Menggunakan

- Semua hari libur: `https://your-api-url/api`
- Hari libur bulan tertentu: `https://your-api-url/api?month=3`
- Hari libur tahun tertentu: `https://your-api-url/api?year=2025`

## Cara Kerja API ini?
API ini mengambil data dari [tanggalans.id](https://tanggalans.id/) dengan cara di scraping setiap 1 bulan sekali menggunakan github action.

## Format Response
```json
{
  "tanggal": "2025-01-01",
  "keterangan": "Tahun Baru 2025",
  "is_cuti": true
}
