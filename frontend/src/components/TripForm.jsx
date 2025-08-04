import React, { useState } from 'react';


export function TripForm({ onSubmitForm }) {
  const [form, setForm] = useState({
    current_location: '',
    pickup: '',
    dropoff: '',
    cycle_used: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'cycle_used' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(form);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Detalles del viaje</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="current_location" className="form-label">
              Ubicación Actual
            </label>
            <input
              type="text"
              id="current_location"
              name="current_location"
              className="form-control"
              placeholder="e.g. San José, CR"
              value={form.current_location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="pickup" className="form-label">
              Punto de Recogida
            </label>
            <input
              type="text"
              id="pickup"
              name="pickup"
              className="form-control"
              placeholder="e.g. Alajuela, CR"
              value={form.pickup}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dropoff" className="form-label">
              Destino
            </label>
            <input
              type="text"
              id="dropoff"
              name="dropoff"
              className="form-control"
              placeholder="e.g. Cartago, CR"
              value={form.dropoff}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cycle_used" className="form-label">
              Horas de Ciclo Usado
            </label>
            <input
              type="number"
              id="cycle_used"
              name="cycle_used"
              className="form-control"
              placeholder="0 - 24"
              value={form.cycle_used}
              onChange={handleChange}
              min="0"
              max="24"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enviar Viaje
        </button>
      </form>
    </div>
  );
}
