import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewAd() {
  const INIT_FORM_DATA = {
    kategoriaId: 0,
    hirdetesDatuma: new Date().toISOString().slice(0, 10),
    leiras: "",
    tehermentes: true,
    kepUrl: "",
  };

  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const [kat, setKat] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/kategoriak")
      .then((res) => res.json())
      .then((data) => setKat(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/ujingatlan", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          navigate("/offers");
        }
        else{
            console.log(data);
            if(data.errors)
            setError(Object.values(data.errors).join("\n"))
        }
      })
      .catch(err => setError(err.message))
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Új hirdetés elküldése</h2>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Ingatlan kategóriája
              </label>
              <select
                id="category"
                className="form-select"
                name="kategoriaId"
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    [target.name]: Number(target.value),
                  })
                }
                defaultValue={formData.kategoriaId}
              >
                <option value="0" disabled>
                  Kérem válasszon
                </option>
                {kat.map((val, index) => (
                  <option value={val.id} key={index}>
                    {val.megnevezes}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Hirdetés dátuma
              </label>
              <input
                id="date"
                type="date"
                className="form-control"
                name="hirdetesDatuma"
                value={formData.hirdetesDatuma}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Ingatlan leírása
              </label>
              <textarea
                id="description"
                className="form-control"
                name="leiras"
                rows="3"
                value={formData.leiras}
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.value })
                }
              ></textarea>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="tehermentes"
                checked={formData.tehermentes}
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.checked })
                }
              />
              <label className="form-check-label" htmlFor="creditFree">
                Tehermentes ingatlan
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="pictureUrl" className="form-label">
                Fénykép az ingatlanról
              </label>
              <input
                id="pictureUrl"
                type="url"
                className="form-control"
                name="kepUrl"
                value={formData.kepUrl}
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.value })
                }
              />
            </div>
            <div className="mb-3 text-center">
              <button className="btn btn-primary px-5">Küldés</button>
            </div>

            {!!error && (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <strong>{error}</strong>
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
