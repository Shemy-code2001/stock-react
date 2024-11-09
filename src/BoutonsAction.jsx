import React, { Component } from "react";

class CalculateurTVA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prixHT: 5000,
      tauxTVA: 20,
      prixTTC: 6000.00,
    };

    this.handlePrixHTChange = this.handlePrixHTChange.bind(this);
    this.handleTauxTVAChange = this.handleTauxTVAChange.bind(this);
    this.calculerTTC = this.calculerTTC.bind(this);
    this.initialiser = this.initialiser.bind(this);
  }

  handlePrixHTChange(e) {
    this.setState({ prixHT: e.target.value });
  }
  
  handleTauxTVAChange(e) {
    this.setState({ tauxTVA: e.target.value });
  }

  calculerTTC() {
    const { prixHT, tauxTVA } = this.state;
    if (prixHT && tauxTVA) {
      const prixTTC = parseFloat(prixHT) * (1 + parseFloat(tauxTVA) / 100);
      this.setState({ prixTTC: prixTTC.toFixed(2) });
    }
  }

  initialiser() {
    this.setState({
      prixHT: "",
      tauxTVA: "",
      prixTTC: "",
    });
  }

  render() {
    return (
      <div>
        <div>
          <label>Prix Hors Taxe (HT): </label>
          <input
            type="number"
            value={this.state.prixHT}
            onChange={this.handlePrixHTChange}
            placeholder="Prix Hors Taxe"
          />
        </div>
        <div>
          <label>Taux de TVA (%): </label>
          <input
            type="number"
            value={this.state.tauxTVA}
            onChange={this.handleTauxTVAChange}
            placeholder="Taux de TVA"
          />
        </div>
        <div>
          <button onClick={this.calculerTTC}>Calculer</button>
          <button onClick={this.initialiser}>Initialiser</button>
        </div>
        <div>
          <label>Prix TTC: </label>
          <input
            type="number"
            value={this.state.prixTTC}
            placeholder="Prix TTC"
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default CalculateurTVA;
