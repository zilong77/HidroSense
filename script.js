function analyzeWaterQuality() {
    const requiredFields = ['species', 'temperature', 'ph', 'do', 'ammonia', 'turbidity', 'co2', 'alkalinity'];
    for (const field of requiredFields) {
        const value = document.getElementById(field).value;
        if (!value) {
            alert("Mohon isi semua data sebelum melakukan analisis.");
            return;
        }
    }

    const analysisResult = document.getElementById('analysisResult');
    analysisResult.innerHTML = '<p>Analisis sedang berjalan...</p>';
    setTimeout(() => {
        const species = document.getElementById('species').value;
        const temperature = parseFloat(document.getElementById('temperature').value);
        const ph = parseFloat(document.getElementById('ph').value);
        const doLevel = parseFloat(document.getElementById('do').value);
        const ammonia = parseFloat(document.getElementById('ammonia').value);
        const turbidity = parseFloat(document.getElementById('turbidity').value);
        const co2 = parseFloat(document.getElementById('co2').value);
        const alkalinity = parseFloat(document.getElementById('alkalinity').value);

        const idealValues = {
            Gurame: { temperature: "25-30°C", ph: "6.5-8.5", doLevel: "≥ 3 mg/L", ammonia: "<0.1 mg/L", turbidity: "25-40 cm", co2: "<12 mg/L", alkalinity: ">20 mg/L" },
            Koi: { temperature: "20-30°C", ph: "6.5-8", doLevel: "≥ 5 mg/L", ammonia: "<0.02 mg/L", turbidity: "20-35 cm", co2: "<12 mg/L", alkalinity: "50-300 mg/L" },
            Lele: { temperature: "25-30°C", ph: "6.5-8", doLevel: "≥ 2 mg/L", ammonia: "<0.1 mg/L", turbidity: "25-30 cm", co2: "<12 mg/L", alkalinity: ">50 mg/L" },
            Nila: { temperature: "25-32°C", ph: "6.5-8.5", doLevel: "≥ 3 mg/L", ammonia: "<0.02 mg/L", turbidity: "30-40 cm", co2: "<15 mg/L", alkalinity: ">20 mg/L" }
        };

        const parameters = [
            { name: "Suhu", icon: "fa-thermometer-half", current: `${temperature}°C`, ideal: idealValues[species].temperature },
            { name: "pH", icon: "fa-flask", current: `${ph}`, ideal: idealValues[species].ph },
            { name: "Oksigen Terlarut (DO)", icon: "fa-water", current: `${doLevel} mg/L`, ideal: idealValues[species].doLevel },
            { name: "Amonia", icon: "fa-vial", current: `${ammonia} mg/L`, ideal: idealValues[species].ammonia },
            { name: "Kecerahan", icon: "fa-eye", current: `${turbidity} cm`, ideal: idealValues[species].turbidity },
            { name: "Karbondioksida Bebas (CO2)", icon: "fa-wind", current: `${co2} mg/L`, ideal: idealValues[species].co2 },
            { name: "Alkalinitas", icon: "fa-balance-scale", current: `${alkalinity} mg/L`, ideal: idealValues[species].alkalinity }
        ];

        analysisResult.innerHTML = `<h2>Hasil Analisis</h2>`;
        parameters.forEach(param => {
            const resultSegment = document.createElement('div');
            resultSegment.classList.add('card');
            resultSegment.innerHTML = `
                <i class="fas ${param.icon} icon"></i>
                <div class="result-segment">
                    <h4>${param.name}</h4>
                    <p><strong>Ideal:</strong> ${param.ideal}</p>
                    <p><strong>Saat Ini:</strong> ${param.current}</p>
                    <p><strong>Indikasi atau Rekomendasi:</strong> ${getRecommendation(param, species)}</p>
                </div>
            `;
            analysisResult.appendChild(resultSegment);
        });
    }, 500);
}

function getRecommendation(param, species) {
    switch (param.name) {
        case "Suhu":
            if (parseFloat(param.current) < 25) return "Suhu terlalu rendah, tambahkan pemanas air.";
            else if (parseFloat(param.current) > 30) return "Suhu terlalu tinggi, tambahkan aerasi.";
            break;

        case "pH":
            if (parseFloat(param.current) < 6.5) return "pH terlalu rendah, tambahkan kapur atau bahan peningkat pH.";
            else if (parseFloat(param.current) > 8.5) return "pH terlalu tinggi, tambahkan bahan penurun pH seperti asam organik.";
            break;

        case "Oksigen Terlarut (DO)":
            if (species === "Koi" && parseFloat(param.current) < 5) return "DO terlalu rendah untuk Koi, tambahkan aerasi.";
            else if ((species === "Gurame" || species === "Nila") && parseFloat(param.current) < 3) return "DO terlalu rendah, tambahkan aerasi.";
            else if (species === "Lele" && parseFloat(param.current) < 2) return "DO terlalu rendah untuk Lele, tambahkan aerasi.";
            break;

        case "Amonia":
            if (parseFloat(param.current) >= 0.1) return "Amonia terlalu tinggi, kurangi pemberian pakan atau lakukan pergantian air.";
            break;

        case "Kecerahan":
            if (species === "Gurame" && (parseFloat(param.current) < 25 || parseFloat(param.current) > 40)) 
                return "Kecerahan tidak ideal untuk Gurame, pastikan kecerahan dalam kisaran 25-40 cm.";
            else if (species === "Koi" && (parseFloat(param.current) < 20 || parseFloat(param.current) > 35)) 
                return "Kecerahan tidak ideal untuk Koi, pastikan kecerahan dalam kisaran 20-35 cm.";
            else if (species === "Lele" && (parseFloat(param.current) < 25 || parseFloat(param.current) > 30)) 
                return "Kecerahan tidak ideal untuk Lele, pastikan kecerahan dalam kisaran 25-30 cm.";
            else if (species === "Nila" && (parseFloat(param.current) < 30 || parseFloat(param.current) > 40)) 
                return "Kecerahan tidak ideal untuk Nila, pastikan kecerahan dalam kisaran 30-40 cm.";
            break;

        case "Karbondioksida Bebas (CO2)":
            if (species !== "Nila" && parseFloat(param.current) >= 12) 
                return "CO2 terlalu tinggi, pastikan aerasi cukup untuk mengurangi kadar CO2.";
            else if (species === "Nila" && parseFloat(param.current) >= 15)
                return "CO2 terlalu tinggi untuk Nila, pastikan aerasi cukup untuk mengurangi kadar CO2.";
            break;

        case "Alkalinitas":
            if (species === "Gurame" && parseFloat(param.current) <= 20) 
                return "Alkalinitas terlalu rendah untuk Gurame, tambahkan kapur atau bahan peningkat alkalinitas.";
            else if (species === "Koi" && (parseFloat(param.current) < 50 || parseFloat(param.current) > 300)) 
                return "Alkalinitas tidak ideal untuk Koi, pastikan dalam kisaran 50-300 mg/L.";
            else if (species === "Lele" && parseFloat(param.current) <= 50) 
                return "Alkalinitas terlalu rendah untuk Lele, tambahkan kapur atau bahan peningkat alkalinitas.";
            else if (species === "Nila" && parseFloat(param.current) <= 20) 
                return "Alkalinitas terlalu rendah untuk Nila, tambahkan kapur atau bahan peningkat alkalinitas.";
            break;

        default:
            return "Parameter dalam batas ideal.";
    }
    return "Parameter dalam batas ideal.";
}

