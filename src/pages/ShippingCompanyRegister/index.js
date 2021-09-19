import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import travelManager from "../../travelManager";

import "./styles.css";

export default function ShippingCompanyRegister() {
  const [name, setName] = useState("");
  const [shippingCompanyWallet, setClientWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleShippingCompanyRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await travelManager.methods
        .createShippingCompany(name, shippingCompanyWallet)
        .send({ from: localStorage.getItem("userWallet") });

      history.push("/home");
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar a transportadora");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="new-shippingcompany-container">
      <div className="content">
        <section>
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#fff" />
            Voltar para Home
          </Link>
        </section>

        <form>
          <h1>Cadastrar nova transportadora</h1>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Endereço da carteira"
            value={shippingCompanyWallet}
            onChange={(e) => setClientWallet(e.target.value)}
          />

          <button
            onClick={handleShippingCompanyRegister}
            className="button"
            type="submit"
          >
            {loading ? <div className="loader"></div> : <>Cadastrar</>}
          </button>
        </form>
      </div>
    </div>
  );
}
