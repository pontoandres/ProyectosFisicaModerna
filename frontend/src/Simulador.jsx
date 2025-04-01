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

  const rMin = datos ? Math.min(...datos.r) : null;
  const rMinIndex = datos ? datos.r.indexOf(rMin) : null;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Simulación de Dispersión de Rutherford</h2>

      {/* Formulario */}
      <div className="row g-3 mb-4">
        {["b", "v0", "dt", "steps"].map((param) => (
          <div className="col-md-3" key={param}>
            <label className="form-label">
              {param === "b" && "b (fm)"}
              {param === "v0" && "v₀ (fm/fs)"}
              {param === "dt" && "Δt (fs)"}
              {param === "steps" && "Steps"}
            </label>
            <input
              type="number"
              name={param}
              className="form-control"
              value={parametros[param]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="col-md-12 text-end">
          <button className="btn btn-primary" onClick={simular}>
            Simular
          </button>
        </div>
      </div>

      {/* Gráficos */}
      {datos && (
        <>
          <h3 className="mt-5">1. Trayectoria de la partícula alfa</h3>
          <div className="d-flex justify-content-center mb-4">
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
                  marker: { color: "red", size: 10 },
                },
              ]}
              layout={{
                width: 600,
                height: 600,
                title: `Ángulo de dispersión θ = ${datos.theta.toFixed(2)}°`,
                xaxis: { title: { text: "x (fm)" }, automargin: true },
                yaxis: { title: { text: "y (fm)" }, automargin: true },
              }}
            />
          </div>

          <h3>2. Evolución de la distancia al núcleo</h3>
          <div className="d-flex justify-content-center mb-5">
          <Plot
            data={[
              {
                y: datos.r,
                mode: "lines",
                type: "scatter",
                name: "Distancia r(t)",
              },
              rMinIndex !== null && {
                x: [rMinIndex],
                y: [rMin],
                mode: "markers",
                type: "scatter",
                name: "rₘᵢₙ",
                marker: { color: "green", size: 10 },
              },
            ].filter(Boolean)} // Elimina null si aún no hay datos
            layout={{
              width: 600,
              height: 300,
              title: "Distancia de la partícula al núcleo vs paso de simulación",
              xaxis: { title: { text: "Paso de simulación (sin unidades)" }, automargin: true },
              yaxis: { title: { text: "Distancia r (fm)" }, automargin: true },
            }}
          />
          </div>

          {/* Card Bootstrap */}
          <div className="card mb-5">
            <div className="card-body">
              <h5 className="mb-3 fs-4">Parámetros usados:</h5>
              <ul className="mb-3 fs-5">
                <li><b>b:</b> {parametros.b} fm</li>
                <li><b>v₀:</b> {parametros.v0} fm/fs</li>
                <li><b>Δt:</b> {parametros.dt} fs</li>
                <li><b>steps:</b> {parametros.steps}</li>
                <li><span className="text-danger"><b>θ final:</b></span> {datos.theta.toFixed(2)}°</li>
                <li><span className="text-success"><b>r<sub>min</sub>:</b></span> {rMin?.toFixed(3)} fm</li>
              </ul>
              <p className="mb-0 fs-5"><b>fm</b> = femtómetro = 10⁻¹⁵ metros</p>
              <p className="mb-0 fs-5"><b>fs</b> = femtosegundo = 10⁻¹⁵ segundos</p>
            </div>
          </div>

          {/* imagen de la simulación */}
          <div className="text-center mb-5">
            <img
              src="/rutherford_scattering_geometry_2.png"
              alt="Ilustración del experimento de Rutherford"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "600px" }}
            />
            <p className="mt-2 text-muted">Ilustración del experimento de Rutherford</p>
          </div>

        </> 
      )}
    </div>
  );
}

export default Simulador;
