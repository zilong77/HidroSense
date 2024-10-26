// Mendefinisikan parameter kualitas air ideal untuk setiap jenis ikan berdasarkan data tabel
const fishParameters = {
    Gurame: {
        suhu: { idealMin: 25, idealMax: 30, adviceLow: "Tingkatkan suhu dengan pemanas.", adviceHigh: "Tambahkan naungan atau aerasi." },
        pH: { idealMin: 6.5, idealMax: 8.5, adviceLow: "Tambahkan kapur untuk meningkatkan pH.", adviceHigh: "Tambahkan asam organik untuk menurunkan pH." },
        DO: { idealMin: 3, adviceLow: "Tambahkan aerasi untuk meningkatkan DO." },
        ammonia: { idealMax: 0.1, adviceHigh: "Ganti air sebagian atau tambahkan zeolit untuk menurunkan amonia." },
        kecerahan: { idealMin: 25, idealMax: 40, adviceLow: "Tingkatkan filtrasi.", adviceHigh: "Kurangi pakan atau tambahkan air." },
        CO2: { idealMax: 12, adviceHigh: "Tambahkan aerasi untuk mengurangi CO2." },
        alkalinitas: { idealMin: 20, adviceLow: "Tambahkan kapur untuk meningkatkan alkalinitas." }
    },
    Koi: {
        suhu: { idealMin: 20, idealMax: 30, adviceLow: "Tingkatkan suhu dengan pemanas.", adviceHigh: "Tambahkan aerasi untuk mendinginkan air." },
        pH: { idealMin: 6.5, idealMax: 8, adviceLow: "Tambahkan kapur untuk meningkatkan pH.", adviceHigh: "Tambahkan asam organik untuk menurunkan pH." },
        DO: { idealMin: 5, adviceLow: "Tambahkan aerasi untuk meningkatkan DO." },
        ammonia: { idealMax: 0.02, adviceHigh: "Ganti air sebagian atau tambahkan zeolit untuk menurunkan amonia." },
        kecerahan: { idealMin: 20, idealMax: 35, adviceLow: "Perbaiki sistem filtrasi.", adviceHigh: "Kurangi pakan atau bersihkan air." },
        CO2: { idealMax: 12, adviceHigh: "Tambahkan aerasi untuk mengurangi CO2." },
        alkalinitas: { idealMin: 50, idealMax: 300, adviceLow: "Tambahkan kapur untuk meningkatkan alkalinitas." }
    },
    Lele: {
        suhu: { idealMin: 25, idealMax: 30, adviceLow: "Gunakan pemanas untuk meningkatkan suhu.", adviceHigh: "Tambah aerasi atau naungan." },
        pH: { idealMin: 6.5, idealMax: 8, adviceLow: "Tambahkan kapur untuk menaikkan pH.", adviceHigh: "Gunakan asam untuk menurunkan pH." },
        DO: { idealMin: 2, adviceLow: "Tambahkan aerasi untuk meningkatkan DO." },
        ammonia: { idealMax: 0.1, adviceHigh: "Ganti air atau tambahkan zeolit." },
        kecerahan: { idealMin: 25, idealMax: 30, adviceLow: "Perbaiki filtrasi.", adviceHigh: "Kurangi pakan atau lakukan penggantian air." },
        CO2: { idealMax: 12, adviceHigh: "Tambahkan aerasi." },
        alkalinitas: { idealMin: 50, adviceLow: "Tambahkan kapur." }
    },
    Nila: {
        suhu: { idealMin: 25, idealMax: 32, adviceLow: "Tingkatkan suhu dengan pemanas.", adviceHigh: "Tambah naungan atau aerasi." },
        pH: { idealMin: 6.5, idealMax: 8.5, adviceLow: "Tambahkan kapur.", adviceHigh: "Tambahkan asam organik." },
        DO: { idealMin: 3, adviceLow: "Tambah aerasi." },
        ammonia: { idealMax: 0.02, adviceHigh: "Ganti air sebagian atau tambahkan zeolit." },
        kecerahan: { idealMin: 30, idealMax: 40, adviceLow: "Perbaiki filtrasi.", adviceHigh: "Kurangi pakan atau tambahkan air." },
        CO2: { idealMax: 15, adviceHigh: "Tambahkan aerasi." },
        alkalinitas: { idealMin: 20, adviceLow: "Tambahkan kapur untuk meningkatkan alkalinitas." }
    }
};

// Fungsi untuk melakukan analisis kualitas air berdasarkan input
function analyzeWaterQuality() {
    const species = document.getElementById('species').value;
    const suhu = parseFloat(document.getElementById('temperature').value);
    const pH = parseFloat(document.getElementById('ph').value);
    const DO = parseFloat(document.getElementById('do').value);
    const ammonia = parseFloat(document.getElementById('ammonia').value);
    const kecerahan = parseFloat(document.getElementById('turbidity').value);
    const CO2 = parseFloat(document.getElementById('co2').value);
    const alkalinitas = parseFloat(document.getElementById('alkalinity').value);

    const params = fishParameters[species];
    let analysis = `<h3>Hasil Analisis untuk ${species}</h3><ul>`;

    // Analisis Suhu
    if (suhu < params.suhu.idealMin) {
        analysis += `<li>Suhu terlalu rendah (${suhu}°C). ${params.suhu.adviceLow}</li>`;
    } else if (suhu > params.suhu.idealMax) {
        analysis += `<li>Suhu terlalu tinggi (${suhu}°C). ${params.suhu.adviceHigh}</li>`;
    } else {
        analysis += `<li>Suhu dalam kisaran ideal (${suhu}°C).</li>`;
    }

    // Analisis pH
    if (pH < params.pH.idealMin) {
        analysis += `<li>pH terlalu rendah (${pH}). ${params.pH.adviceLow}</li>`;
    } else if (pH > params.pH.idealMax) {
        analysis += `<li>pH terlalu tinggi (${pH}). ${params.pH.adviceHigh}</li>`;
    } else {
        analysis += `<li>pH dalam kisaran ideal (${pH}).</li>`;
    }

    // Analisis DO
    if (DO < params.DO.idealMin) {
        analysis += `<li>DO terlalu rendah (${DO} mg/L). ${params.DO.adviceLow}</li>`;
    } else {
        analysis += `<li>DO dalam kisaran ideal (${DO} mg/L).</li>`;
    }

    // Analisis Amonia
    if (ammonia > params.ammonia.idealMax) {
        analysis += `<li>Amonia terlalu tinggi (${ammonia} mg/L). ${params.ammonia.adviceHigh}</li>`;
    } else {
        analysis += `<li>Kadar amonia dalam kisaran aman (${ammonia} mg/L).</li>`;
    }

    // Analisis Kecerahan
    if (kecerahan < params.kecerahan.idealMin) {
        analysis += `<li>Kecerahan terlalu rendah (${kecerahan} cm). ${params.kecerahan.adviceLow}</li>`;
    } else if (kecerahan > params.kecerahan.idealMax) {
        analysis += `<li>Kecerahan terlalu tinggi (${kecerahan} cm). ${params.kecerahan.adviceHigh}</li>`;
    } else {
        analysis += `<li>Kecerahan dalam kisaran ideal (${kecerahan} cm).</li>`;
    }

    // Analisis CO2
    if (CO2 > params.CO2.idealMax) {
        analysis += `<li>CO2 terlalu tinggi (${CO2} mg/L). ${params.CO2.adviceHigh}</li>`;
    } else {
        analysis += `<li>Kadar CO2 dalam kisaran aman (${CO2} mg/L).</li>`;
    }

    // Analisis Alkalinitas
    if (alkalinitas < params.alkalinitas.idealMin) {
        analysis += `<li>Alkalinitas terlalu rendah (${alkalinitas} mg/L). ${params.alkalinitas.adviceLow}</li>`;
    } else {
        analysis += `<li>Alkalinitas dalam kisaran ideal (${alkalinitas} mg/L).</li>`;
    }

    analysis += '</ul>';
    document.getElementById('analysisResult').innerHTML = analysis;
}
