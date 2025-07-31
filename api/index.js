// api/index.js - Copy this entire code
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { year, month } = req.query;
  
  // 2025 Indonesian holidays
  const holidays2025 = [
    { tanggal: '2025-01-01', keterangan: 'Tahun Baru 2025', is_cuti: true },
    { tanggal: '2025-01-27', keterangan: 'Isra Miraj Nabi Muhammad SAW', is_cuti: true },
    { tanggal: '2025-01-29', keterangan: 'Tahun Baru Imlek 2576 Kongzili', is_cuti: true },
    { tanggal: '2025-03-29', keterangan: 'Hari Raya Nyepi Tahun Saka 1947', is_cuti: true },
    { tanggal: '2025-03-30', keterangan: 'Hari Raya Idul Fitri 1446 Hijriah', is_cuti: true },
    { tanggal: '2025-03-31', keterangan: 'Hari Raya Idul Fitri 1446 Hijriah', is_cuti: true },
    { tanggal: '2025-04-18', keterangan: 'Wafat Isa Almasih', is_cuti: true },
    { tanggal: '2025-05-01', keterangan: 'Hari Buruh Internasional', is_cuti: true },
    { tanggal: '2025-05-29', keterangan: 'Kenaikan Isa Almasih', is_cuti: true },
    { tanggal: '2025-06-01', keterangan: 'Hari Lahir Pancasila', is_cuti: true },
    { tanggal: '2025-06-06', keterangan: 'Hari Raya Idul Adha 1446 Hijriah', is_cuti: true },
    { tanggal: '2025-06-26', keterangan: 'Tahun Baru Islam 1447 Hijriah', is_cuti: true },
    { tanggal: '2025-08-17', keterangan: 'Hari Kemerdekaan Republik Indonesia', is_cuti: true },
    { tanggal: '2025-09-05', keterangan: 'Maulid Nabi Muhammad SAW', is_cuti: true },
    { tanggal: '2025-12-25', keterangan: 'Hari Raya Natal', is_cuti: true }
  ];

  let holidayData = holidays2025;

  // Filter by year if specified
  if (year) {
    holidayData = holidayData.filter(holiday => 
      holiday.tanggal.startsWith(year)
    );
  }

  // Filter by month if specified
  if (month) {
    const monthStr = month.toString().padStart(2, '0');
    holidayData = holidayData.filter(holiday => {
      const holidayMonth = holiday.tanggal.split('-')[1];
      return holidayMonth === monthStr;
    });
  }

  // If no data found
  if (holidayData.length === 0) {
    return res.status(404).json({ 
      error: 'No holidays found for the specified criteria' 
    });
  }

  // Return single object if only one result, otherwise return array
  if (holidayData.length === 1) {
    return res.status(200).json(holidayData[0]);
  }

  return res.status(200).json(holidayData);
}
