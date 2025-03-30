import React, { useState } from "react";
import Plot from "react-plotly.js";

function Simulador() {
  const [datos, setDatos] = useState(null);
  const [parametros, setParametros] = useState({
    b: 1.0,
    v0: 200,
    dt: 0.00001,
    steps: 10000,
  });

  const handleChange = (e) => {
    setParametros({ ...parametros, [e.target.name]: parseFloat(e.target.value) });
  };

  const simular = async () => {
    const response = await fetch("http://localhost:8000/api/simular/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    });
    const data = await response.json();
    setDatos(data);
  };

  return (
    <div>
      <h2>Simulación de Dispersión de Rutherford</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>b (fm): </label>
        <input type="number" name="b" value={parametros.b} onChange={handleChange} />

        <label> v₀ (fm/fs): </label>
        <input type="number" name="v0" value={parametros.v0} onChange={handleChange} />

        <label> Δt (fs): </label>
        <input type="number" name="dt" value={parametros.dt} onChange={handleChange} />

        <label> steps: </label>
        <input type="number" name="steps" value={parametros.steps} onChange={handleChange} />

        <button onClick={simular}>Simular</button>
      </div>

      {datos && (
        <>
          {/* Título personalizado para gráfico 1 */}
          <h3>1. Trayectoria de la partícula (x vs y)</h3>
          <Plot
            data={[
              {
                x: datos.x,
                y: datos.y,
                mode: "lines",
                type: "scatter",
                name: "Trayectoria",
              },
              {
                x: [0],
                y: [0],
                mode: "markers",
                type: "scatter",
                name: "Núcleo",
                marker: { color: "red", size: 8 },
              },
            ]}
            layout={{
              width: 600,
              height: 600,
              title: `Ángulo de dispersión θ = ${datos.theta.toFixed(2)}°`,
              xaxis: { title: "x (fm)" },
              yaxis: { title: "y (fm)" },
            }}
          />

          {/* Título personalizado para gráfico 2 */}
          <h3>2. Distancia al núcleo en función del tiempo</h3>
          <Plot
            data={[
              {
                y: datos.r,
                mode: "lines",
                type: "scatter",
                name: "r(t)",
              },
            ]}
            layout={{
              width: 600,
              height: 300,
              title: "Distancia al núcleo vs paso",
              xaxis: { title: "Paso de simulación" },
              yaxis: { title: "Distancia r (fm)" },
            }}
          />

          {/* Tabla resumen */}
          <div style={{ marginTop: "1rem" }}>
            <h3>Parámetros usados:</h3>
            <ul>
              <li><b>b:</b> {parametros.b} fm (distancia inicial al núcleo)</li>
              <li><b>v₀:</b> {parametros.v0} fm/fs (velocidad horizontal)</li>
              <li><b>Δt:</b> {parametros.dt} fs (paso de tiempo)</li>
              <li><b>steps:</b> {parametros.steps} (número de pasos)</li>
              <li><b>θ final:</b> {datos.theta.toFixed(2)}°</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Simulador;
