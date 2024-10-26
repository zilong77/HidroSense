function analyzeData() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const doLevel = parseFloat(document.getElementById('do').value);
    const ph = parseFloat(document.getElementById('ph').value);
    const turbidity = parseFloat(document.getElementById('turbidity').value);
    const ammonia = parseFloat(document.getElementById('ammonia').value);
    const nitrite = parseFloat(document.getElementById('nitrite').value);
    const nitrate = parseFloat(document.getElementById('nitrate').value);

    const results = [
        {
            parameter: "Suhu",
            ideal: "25-30°C",
            current: `${temperature}°C`,
            recommendation: temperature < 25 ? "Naikkan suhu air." :
                             temperature > 30 ? "Turunkan suhu air." :
                             "Suhu sudah ideal."
        },
        {
            parameter: "Oksigen Terlarut (DO)",
            ideal: "≥ 2 mg/L",
            current: `${doLevel} mg/L`,
            recommendation: doLevel < 2 ? "Tambahkan aerasi." : "DO sudah ideal."
        },
        {
            parameter: "pH",
            ideal: "6.5 - 8",
            current: `${ph}`,
            recommendation: ph < 6.5 ? "Tambahkan kapur." : 
                             ph > 8 ? "Tambahkan asam organik." :
                             "pH sudah ideal."
        },
        {
            parameter: "Kecerahan",
            ideal: "25 - 30 cm",
            current: `${turbidity} cm`,
            recommendation: turbidity < 25 ? "Kurangi kekeruhan air." : 
                             turbidity > 30 ? "Tingkatkan filtrasi." :
                             "Kecerahan sudah ideal."
        },
        {
            parameter: "Amonia",
            ideal: "< 0.1 mg/L",
            current: `${ammonia} mg/L`,
            recommendation: ammonia >= 0.1 ? "Ganti sebagian air atau tambahkan zeolit." : "Amonia sudah ideal."
        },
        {
            parameter: "Nitrit",
            ideal: "< 0.02 mg/L",
            current: `${nitrite} mg/L`,
            recommendation: nitrite >= 0.02 ? "Tambahkan aerasi." : "Nitrit sudah ideal."
        },
        {
            parameter: "Nitrat",
            ideal: "< 50 mg/L",
            current: `${nitrate} mg/L`,
            recommendation: nitrate >= 50 ? "Lakukan penggantian air." : "Nitrat sudah ideal."
        }
    ];

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    results.forEach(result => {
        const segment = document.createElement('div');
        segment.classList.add('parameter-segment');
        segment.innerHTML = `
            <h3>${result.parameter}</h3>
            <p>Ideal: ${result.ideal}</p>
            <p>Saat ini: ${result.current}</p>
            <p>Rekomendasi: ${result.recommendation}</p>
        `;
        resultContainer.appendChild(segment);
    });
}
