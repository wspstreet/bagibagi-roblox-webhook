const express = require('express');
const app = express();

// Biar API kita bisa baca data JSON dari BagiBagi
app.use(express.json());

// Ini "keranjang" buat nyimpen antrean donasi sementara
let antreanDonasi = [];

// JALUR 1: Nerima tembakan Webhook dari BagiBagi
app.post('/webhook', (req, res) => {
    const dataDonasi = req.body;
    
    // Masukin data ke dalem keranjang antrean
    antreanDonasi.push(dataDonasi);
    console.log("BOS ADA DONASI MASUK:", dataDonasi);
    
    // Ngasih jempol ke BagiBagi pertanda data sukses diterima
    res.status(200).send("OK MANTAP");
});

// JALUR 2: Buat di-cek sama Roblox Studio (HttpService)
app.get('/roblox-cek', (req, res) => {
    // Kita pindahin isi keranjang ke variabel baru
    const dataYangMauDikirim = [...antreanDonasi];
    
    // KOSONGIN keranjang antrean (biar notifnya nggak ngulang-ngulang terus di in-game)
    antreanDonasi = [];
    
    // Kirim datanya ke Roblox
    res.json(dataYangMauDikirim);
});

// Nyalain mesinnya
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jembatan nyala di port ${PORT}`);
});
